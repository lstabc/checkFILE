import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'sysUser',

  state: {
    pageData: PageHelper.create(),
    departmentDic:[],
    roleDic:[],
  },
  // dva中我们可以在 Model 中实现事件监听， model 中的 subscriptions 相当于一个监听器，可以监听路由变化，
  // 鼠标，键盘变化，服务器连接变化，状态变化等，这样在其中就可以根据不同的变化做出相应的处理，在这个 
  // subsriptions 中的方法名是随意定的，每次变化都会一次去调用里面的所有方法，所以一边会加相应的判断。
  // 通过 在model 中添加一个 subscriptions,并且在里面创建一个方法，即可简单快速地使用 subscriptions 方法。
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/sys_manage/sysUser' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'init'
          });
        }
      });
    }
  },
  // dva 提供多个 effect 函数内部的处理函数，比较常用的是 call 和 put。
  // call：执行异步函数
  // put：发出一个 Action，类似于 dispatch
  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select(state => state.sysUser);
      yield put({
        type: 'getPageList', //'getPageInfo',/sysUser/
        payload: {
          pageData: pageData //pageData.startPage(1, 10)
        }
      });
      yield put({
        type: 'getDepartmentDic'
      });
      yield put({
        type: 'getRoleDic'
      });
    },
    // 获取分页数据
    *getPageList({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: '/sysUser/getPageList',
          pageInfo: pageData
        }
      });
    },
    // 保存 之后查询分页
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      const { pageData } = yield select(state => state.sysUser);
      // put是非阻塞的 put.resolve是阻塞型的
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/sysUser/add',
          data: values
        }
      });
      yield put({
        type: 'getPageList',
        payload: { pageData }
      });
      success();
    },
    // 修改  之后查询分页
    *update({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      const { pageData } = yield select(state => state.sysUser);
      // put是非阻塞的 put.resolve是阻塞型的
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/sysUser/update',
          data: values
        }
      });
      yield put({
        type: 'getPageList',
        payload: { pageData }
      });
      success();
    },
    // 重置密码
    *onRePwd({ payload }, { call, put, select }){
      const { passwordOBJ, success } = payload;
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '/sysUser/resetPassword', //管理员重置用户密码
          data: passwordOBJ
        }
      });
      success();
    },
    // 删除 之后查询分页
    *remove({ payload }, { call, put, select }) {
      const { records, success } = payload;
      const { pageData } = yield select(state => state.sysUser);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: `/sysUser/delete/${records.map(item => item.rowKey)}`,
          //data: records.map(item => item.rowKey)
        }
      });
      yield put({
        type: 'getPageList',
        payload: { pageData }
      });
      success();
    },
    // 获取部门列表
    *getDepartmentDic({ payload }, { call, put }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'departmentDic',
          url:'/sysDepartment/getList',              ///部门列表
        }
      });
    },
    // 获取角色列表
    *getRoleDic({ payload }, { call, put }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'roleDic',
          url:'/sysRole/getList',//系统角色列表
        }
      });
    }
  },
  reducers: {}
});
