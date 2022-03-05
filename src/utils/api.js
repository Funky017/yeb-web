import axios from 'axios';
import { Message  } from 'element-ui';
import router from '../router';

/**
 * 拦截请求、响应失败统一处理
*/
// 请求拦截器
axios.interceptors.request.use(config => {
    // 如果存在token，请求携带token
    if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
}, error => {
    console.log(error)
})

// 响应拦截器
axios.interceptors.response.use(success=>{
    if (success.status && success.status == 200) {
        // 业务逻辑错误
        if(success.data.code == 500 || success.data.code == 401 ||success.data.code==403 ) {
            // 后端返回响应错误信息
            Message.error({message:success.data.message});
            return;
        }
        // 成功信息
        if(success.data.message) {
            Message.success({message:success.data.message});
        }
    }
    return success.data;
}, error => {
    if (error.response.code === 504 || error.response.code == 404) {
        Message.error({message: '服务器被吃了'});
    }  else if(error.response == 403) {
        Message.error({message: '权限不足'});
    } else if(error.response == 401) {
        Message.error({message: '请先登录'});
        // 跳转登录页面
        router.replace('/')
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message});
        } else{
            Message.error({message: '未知错误!'});
        }
    }
});

let base = '';

// 请求拦截器
export const postRequest = (url, params) => {
    return axios({
        method: 'POST',
        url: `${base}${url}`,
        data:params
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'GET',
        url: `${base}${url}`,
        data:params
    })
}

export const putRequest = (url, params) => {
    return axios({
        method: 'GET',
        url: `${base}${url}`,
        data:params
    })
}

export const deleteRequest = (url, params) => {
    return axios({
        method: 'GET',
        url: `${base}${url}`,
        data:params
    })
}