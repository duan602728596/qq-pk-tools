import { combineReducers } from 'redux-immutable';
import indexReducer from '../modules/Index/reducer/reducer';

/* reducers */
const reducers = {
  ...indexReducer
};

/* 创建reducer */
export function createReducer(asyncReducers) {
  return combineReducers({
    ...reducers,
    ...asyncReducers
  });
}