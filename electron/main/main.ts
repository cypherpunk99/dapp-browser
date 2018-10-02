/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

import { app, BrowserView, ipcMain, screen, BrowserWindow , dialog} from 'electron';
import { Store } from 'redux';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { configureStore, initialState } from './helpers/store/configureStore';
import { AppsManager, AppItem } from './helpers/AppsManager';
import { DappFrame } from './helpers/DappFrame';
import { createClientWindow } from './createClientWindow';
import { createPermissionWindow } from './createPermissionWindow';
import { createDappView } from './createDappView';
import { RendererConf } from './createDappView';
import { IState, Client } from "./helpers/reducers/state";
 

import * as nodeConsole from 'console';
const console = new nodeConsole.Console(process.stdout, process.stderr);

const isProduction = process.env.ELECTRON_ENV !== 'development';

let store: Store<IState>;

require('electron-context-menu')({
	prepend: (params: any, browserWindow: BrowserWindow) => [{
    label: 'Pin to top',
		// Only show it when right-clicking images
		// visible: params.mediaType === 'image'
  },
  {
    label: 'Close app',
		// visible: params.mediaType === 'image'
    click: (e: any) => {
      store.dispatch({type: "REMOVE_TRAY_ITEM", payload: {targetDappName: "Game"}}); // todo how to determine app name where the click has been made?
    }
	}]
});

const globalUUIDList: RendererConf[] = [];
let clientWindow: Electron.BrowserWindow = null;



if (process.env.ELECTRON_ENV === 'development') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {

  if (process.env.ELECTRON_ENV === 'development') {
    let devtools = await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
    console.log(`Added Extension: ${devtools}`);
  }
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    clientWindow = createClientWindow(globalUUIDList);
  });
  clientWindow = createClientWindow(globalUUIDList);
  await AppsManager.parseDapps();

  store = configureStore({
    ...initialState,
    feed: {items: AppsManager.dapps},
  }, globalUUIDList); // @todo pass parsed dapps

  store.subscribe(() => {
    const storeState = store.getState();

    process.stdout.write(JSON.stringify(storeState));
    if (storeState.client.fileDialog.isOpen) {
      dialog.showOpenDialog(clientWindow, {
        filters: [
          {name: 'Images', extensions: ['jpg', 'png', 'gif']},
          {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
          {name: 'Custom File Type', extensions: ['as']},
          {name: 'All Files', extensions: ['*']}
        ]
      }, (filePaths: string[]) => {
        console.log("filePaths", filePaths);
        store.dispatch({type: "INTENT_OPEN_FILE", payload: {isFileDialogOpen: false}});
      })
    }
    if (storeState.client.isHome) {
      clientWindow.setBrowserView(null);
    } else {
      let activeDappName: string = storeState.client.activeDapp.appName;

      let targetDappObj: AppItem = AppsManager.dapps.find(dappObj => dappObj.appName == activeDappName);
      // createPermissionWindow(clientWindow, targetDappObj.appName, targetDappObj.permissions);

      // @todo pass approved permissions back, close created window on 'APPROVE' button clicked,
      // add data from permissionManager to state, on next action dispatch check state for permissions data exists,
      // do not open permissionManager window if so.

      // if (approve)
      // permissionWindow.close();

      //@todo create on permissions granted
      createDappView(globalUUIDList, targetDappObj);
      let nameObj: RendererConf = globalUUIDList.find(renObj => renObj.name === activeDappName);
      if (nameObj) {
        let view = nameObj.dappView;
        if (view) {
          clientWindow.setBrowserView(view);
        } else {
          clientWindow.setBrowserView(null);
          process.stdout.write('error: view is null');
        }
      }
    }
    correctDappViewBounds(storeState.client);
  });

  if (isProduction) {
    clientWindow.on('resize', () => correctDappViewBounds(store.getState().client));
    clientWindow.on('maximize', () => correctDappViewBounds(store.getState().client));
    clientWindow.on('restore', () => correctDappViewBounds(store.getState().client));
  }
});

const correctDappViewBounds = (clientState: Client) => {
  if (!clientWindow) {
    process.stdout.write('Trying to send bounds of Dapp View while its parent window has not been initialized');
    return;
  }

  const view = clientWindow.getBrowserView();
  const windowBounds = clientWindow.getBounds();
  if (view) {
    const dappFrame: Electron.Rectangle = new DappFrame(clientState, isProduction ? windowBounds : null);
    view.setBounds(dappFrame);
  }
};

process.stdout.write("Main initialized");
