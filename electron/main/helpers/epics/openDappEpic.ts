import 'rxjs'; 
import {  ofType, Epic } from 'redux-observable';
import { mapTo, map, mergeMap } from 'rxjs/operators';
import { ChannelAction } from '../actions/channel';

import { 
  TOGGLE_APP_HOME,
  ADD_APP_ITEM
} from '../constants';
  

const addAppItem = (item: AppItem) => ({ type: ADD_APP_ITEM, payload: item });


const openDappEpic: Epic<ChannelAction> = action$ => action$.pipe(
  ofType(TOGGLE_APP_HOME), //@todo get appName from payload

  mergeMap(action =>
    AppsManager.getAppItem(action.payload.dappName).pipe(
      map(appItem => addAppItem(appItem))
    )
  )

  // mapTo({ type: ADD_APP_ITEM }) // by appName resolve TrayItem
);

export default openDappEpic;
