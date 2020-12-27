import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {getRemoteList} from './service'
import {editRecord} from './service'
import {deleteRecord} from './service'
import {addRecord} from './service'
import {message } from 'antd';

const UserModel = {
    namespace: 'users',
    state: {
        data: [],
        meta:{
            total:0,
            per_page:5,
            page:1
        }
    },
    effects: {
        *query({ payload }, { call, put }) {
        },
        *getRemote({ payload:{page,per_page} },{put,call }){
            console.log("page---：",page);
            const data=yield call(getRemoteList,{page,per_page});
            if(data){
                yield put({
                    type:'getList',
                    payload:{...data}
                })
            }

        },
        *edit({ payload:{id,values} },{put,call ,select}){
            const meta=yield select((state)=>{
                console.log("state:",state);
                return state.users.meta});
            console.log("meta:",meta);
            var result=yield call(editRecord,{id,values});
          // console.log("result",result)

            if(result){
                message.success('edit success');
                var page=meta.page;
                console.log("edit page",page);
                var per_page=meta.per_page;
                yield put({
                    type:'getRemote',
                    payload:{page,per_page}
                })
            }else{
                message.error('edit fail');
            }

        },
        *add({ payload:{values} },{put,call,select }){
            const meta=yield select((state)=>{
                console.log("state:",state);
                return state.users.meta});
            console.log("meta:",meta);
            var result=yield call(addRecord,{values});
            if(result){
                message.success('add success');
                var page=meta.page;
                console.log("edit page",page);
                var per_page=meta.per_page;
                yield put({
                    type:'getRemote',
                    payload:{page,per_page}
                })
            }else{
                message.error('add fail');
            }
        },
        *del({ payload:{id} },{put,call,select }){
            const meta=yield select((state)=>{
                console.log("state:",state);
                return state.users.meta});
            console.log("meta:",meta);
            var result=yield call(deleteRecord,{id});
            //console.log("result",result)
            if(result){
                message.success('delete success');
                var page=meta.page;
                console.log("edit page",page);
                var per_page=meta.per_page;
                yield put({
                    type:'getRemote',
                    payload:{page,per_page}
                })
            }else{
                message.error('delete fail');
            }
        }

    },
    reducers: {
        save(state, action) {


        },
        getList(state,{payload}){


            return payload;
        }
        // 启用 immer 之后
        // save(state, action) {
        //   state.name = action.payload;
        // },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {

                if (pathname === '/users') {
                    dispatch({
                        type: 'getRemote',
                        payload:{page:1,per_page:5}
                    })
                }
            });
        }
    }
};
export default UserModel;