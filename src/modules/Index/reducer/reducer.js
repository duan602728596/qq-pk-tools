import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

/* 使用immutable初始化基础数据 */
const initData = {
  coolQ: null // 酷q
};

/* actions */
export const setCoolQ = createAction('index/coolQ');

/* reducer */
const reducer = handleActions({
  [setCoolQ]($$state, action) {
    return $$state.set('coolQ', action.payload);
  }
}, fromJS(initData));

export default {
  index: reducer
};