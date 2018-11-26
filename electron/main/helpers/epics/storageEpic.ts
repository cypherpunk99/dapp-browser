import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import * as storageActions  from '../actions/storage';
import * as constants from '../constants';
import { Storage } from '../systemComponents/Storage';

const storageSaveEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.STORAGE_SAVE),
  switchMap(async (action) => {
    try {
      const key = action.payload.key;
      const value = action.payload.value;

      const storage = new Storage(action.meta.sourceUUID);
      await storage.save(key, value);

      return storageActions.saveSuccess({ key, value });
    } catch (error) {
      return storageActions.saveFailure(error, action.meta.sourceUUID);
    }
  }),
);

const storageRemoveEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.STORAGE_REMOVE),
  switchMap(async (action) => {
    try {
      const key = action.payload.key;
      const storage = new Storage(action.meta.sourceUUID);
      await storage.remove(key);
      return storageActions.removeSuccess(key);
    } catch (error) {
      return storageActions.removeFailure(error, action.meta.sourceUUID);
    }
  }),
);

const storageFindAllEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.STORAGE_FIND_ALL),
  switchMap(async (action) => {
    try {
      const storage = new Storage(action.meta.sourceUUID);
      const result = await storage.findAll();
      return storageActions.findAllSuccess(result);
    } catch (error) {
      return storageActions.findAllFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  storageSaveEpic,
  storageRemoveEpic,
  storageFindAllEpic,
);
