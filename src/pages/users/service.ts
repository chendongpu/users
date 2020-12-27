import request, { extend } from 'umi-request';
import {message } from 'antd';




const errorHandler = function(error) {

    if (error.response) {

        console.log(error.response.status);

        console.log(error.data);

        if(error.response.status>400){
            message.error(error.data.message?error.data.message:error.data);
        }

    } else {
        // 请求初始化时出错或者没有响应返回的异常
        console.log(error.message);
        message.error("Network Error");
    }

    throw error; // 如果throw. 错误将继续抛出.

    // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
    // return {some: 'data'};
};

// 1. 作为统一错误处理
const extendRequest = extend({ errorHandler });

export const getRemoteList=async ({page,per_page})=>{
      // const data = [
      //   {
      //       key: '1',
      //       name: 'John Brown',
      //       age: 32,
      //       address: 'New York No. 1 Lake Park',
      //       tags: ['nice', 'developer'],
      //   },
      //   {
      //       key: '2',
      //       name: 'Jim Green',
      //       age: 42,
      //       address: 'London No. 1 Lake Park',
      //       tags: ['loser'],
      //   },
      //   {
      //       key: '3',
      //       name: 'Joe Black',
      //       age: 32,
      //       address: 'Sidney No. 1 Lake Park',
      //       tags: ['cool', 'teacher'],
      //   },
      // ];


    return extendRequest(`http://public-api-v1.aspirantzhang.com/users?page=${page}&per_page=${per_page}`, {
        method: 'get',
        // params: { },
    })
        .then(function(response) {
           // console.log(response);
            return response;
        })
        .catch(function(error) {
            console.log(error);
            return false;
        });
     // return data;
};

export const editRecord=async ({id,values})=>{
    return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
        method: 'put',
        data: values,
    })
        .then(function(response) {
            console.log("edit ok")
          //  message.success('edit success');
          //  return response;
            return true;
        })
        .catch(function(error) {
            console.log(error);
            //message.error('edit fail');
            return false;
        });
};

export const addRecord=async ({values})=>{
    console.log("wwww  values:",values)
    return extendRequest(`http://public-api-v1.aspirantzhang.com/users/`, {
        method: 'post',
        data: values,
    })
        .then(function(response) {
            console.log("add ok")
           // message.success('add success');
            //  return response;
            return true;
        })
        .catch(function(error) {
            console.log(error);
          //  message.error('add fail');
            return false;
        });
};

export const deleteRecord=async ({id})=>{
    console.log("idxxx:",id);
    return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
        method: 'delete'
    })
        .then(function(response) {
            console.log("delete ok")
           // message.success('delete success');
            //return response;
            return true;
        })
        .catch(function(error) {
            console.log(error);
           // message.error('delete fail');
            return false;
        });
};