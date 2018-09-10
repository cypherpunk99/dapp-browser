import { webContents, ipcMain } from 'electron';
import { createStore, applyMiddleware, compose, Store, Middleware, GenericStoreEnhancer, Dispatch } from 'redux';
import { isFSA } from 'flux-standard-action';
// import { triggerAlias } from 'electron-redux';
import { createEpicMiddleware } from 'redux-observable';
import { validatePermissionAction } from './validatePermissionAction';
import rootEpic from '../epics';
import { rootReducer } from '../reducers';
import { RendererConf } from '../../createDappView';

import { IState } from '../reducers/state';

export interface Action {
  type: string;
  payload?: {
    uuid?: string;
    uuidSend?: string;
    uuidRec?: string;
    status?: string;
  };
  meta?: {
    scope?: string
  };
}

export const initialState: IState = {
  counter: 0,
  channel: {},
  client: {
    activeDapp: {
      appName: null
    },
    isHome: true,
    notification: {isOpen: false},
    loader: {isOpen: false},
    statusBar: {isOpen: false},
    window: {width: 0, height: 0}
  },
  feed: {}
};

declare global {
  namespace NodeJS {
    interface Global {
      getReduxState: () => string,
      state: IState
    }
  }
}

interface uuidChannelMap {
  uuid: string;
  channel: string;
};
let uuidChannelMapList: Array<uuidChannelMap>;

const epicMiddleware = createEpicMiddleware();

const validateAction = (action: Action) => {
  return isFSA(action);
}

const targetWebContents = (targetId: number) => {
  const allWebContents = webContents.getAllWebContents();
  // console.log('webContents chrome proc Id\'s: ', allWebContents.map((contents) => contents.getProcessId()) );
  const targetContents = allWebContents.find(contents => contents.getProcessId() === targetId);
  return targetContents;
}

const forwardToRendererWrapper = (globalId: RendererConf[]) => {
  return () => (next: Dispatch<void>) => <A extends Action>(action: A) => {
    if (!validateAction(action)) return next(action);
    if (action.meta && action.meta.scope === 'local') return next(action);

    // change scope to avoid endless-loop
    const rendererAction = Object.assign({}, action, {
      meta: {
        ...action.meta,
        scope: 'local',
      }
    });

    if (action.type == 'INTENT_OPEN_CHANNELS') {

      uuidChannelMapList = [
        {
          uuid: action.payload.uuidSend,
          channel: 'testChannel1'
        },
        {
          uuid: action.payload.uuidRec,
          channel: 'testChannel2'
        }
      ];

      globalId.forEach(function(renObj, i, arr) {
        if (renObj.id == action.payload.uuidSend) {
          arr[i].intent = action.payload.uuidRec;
        }
        if (renObj.id == action.payload.uuidRec) {
          arr[i].intent = action.payload.uuidSend;
        }
      });
    }

    if (action.type == 'OPEN_CHANNEL') {
      let uuidObj = globalId.find(renObj => renObj.id === action.payload.uuid);
      let intentObj = globalId.find(renObj => renObj.id === uuidObj.intent);
      const channelSender = uuidChannelMapList.find(uuidChannelMap => uuidChannelMap.uuid == uuidObj.id).channel;
      const channelReceiver = uuidChannelMapList.find(uuidChannelMap => uuidChannelMap.uuid == uuidObj.intent).channel;
      bindChannel(intentObj.winId, channelReceiver, channelSender);
    }

    // if (action.payload && action.payload.uuid) {
    //   // loop through all action uuid's passed in payload {
    //   let uuidObj = globalId.find(renObj => renObj.id === action.payload.uuid);
    //   if (uuidObj) {
    //     const resolver = targetWebContents(uuidObj.winId);
    //     // console.log(resolver);
    //     if (resolver) {
    //       resolver.send('redux-action', rendererAction);
    //     } else {
    //       console.log('resolver error: ', 'action message lost');
    //       return next(action);
    //     }
    //   }
    //   // }
    //   return next(action);
    // } else {
    //   return next(action);
    // }

    const allWebContents = webContents.getAllWebContents();
    allWebContents.forEach((contents) => {
      // console.log('---> contents id: ', contents.id);
      contents.send('redux-action', rendererAction);
    });
    return next(action);

  };
}

const bindChannel = (webId: number, channelReceiver: string, channelSender: string) => {
  ipcMain.on(channelSender, (event: Electron.Event, payload: string) => {
    const bindResolver = targetWebContents(webId);
    if (bindResolver) {
      bindResolver.send(channelReceiver, payload);
    } else {
      console.log('resolver error: ', 'message lost');
    }

  });
}

const replyActionMain = (store: Store<{}>, globalId: RendererConf[]) => {
  global.getReduxState = () => JSON.stringify(store.getState());
  ipcMain.on('redux-action', (event: Electron.Event, uuid: string, payload: any) => {
    let uuidObj = globalId.find(renObj => renObj.id === uuid);
    if (uuidObj) {
      const statusObj = { status: uuidObj.status };
      payload.payload = (payload.payload) ? Object.assign(payload.payload, statusObj) : statusObj;
      // uuid resolver
      let uuidTargetObj = globalId.find(renObj => renObj.name === payload.payload.targetDapp);
      if (uuidTargetObj) {
        const payloadUuidObj = {
          uuidRec: uuidTargetObj.id,
          uuidSend: uuid
        };
        payload.payload = Object.assign(payload.payload, payloadUuidObj)
      }
      store.dispatch(payload);
    } else {
      console.log("Spoofing detected")
    }
  });
}

export const configureStore = (state: IState = initialState, globalId?: RendererConf[]) => {
  const middleware: Middleware[] = [];
  middleware.push(epicMiddleware, validatePermissionAction(globalId), forwardToRendererWrapper(globalId));
  const enhanced = [applyMiddleware(...middleware)];
  const enhancer: GenericStoreEnhancer = compose(...enhanced);
  const store = createStore(rootReducer, state, enhancer);
  epicMiddleware.run(rootEpic);
  replyActionMain(store, globalId);
  return store;
};
