import { routerRedux } from 'dva/router';
import {login} from '../../../api';
//import { login } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {}
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
        }
      });
    }
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const { code, message, data } = yield call(login, payload);
         if (code !== null && code === 200) {
          $$.setStore('user', data);
          yield put(routerRedux.replace('/'));
        } else {
          yield put({
            type: 'loginError',
            payload: { message }
          });
        }
      } catch (e) {
        yield put({
          type: 'loginError',
          payload: e.message
        });
      }
    },
    *logout(_, { put }) {}
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message
      };
    }
  }
};
