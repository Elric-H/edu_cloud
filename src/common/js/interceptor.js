/*拦截器*/
import { Message } from 'element-ui'

export const dealResponse = (res) => {
    let code = res.data.code;
    switch(code){
        case 2001:
            sessionStorage.clear();
            sessionStorage.setItem('tips', '登录超时，请重新登录');
            location.replace('/');
            // Message.error('');
            break;
    }
    return res;
}

export const dealError = (error) => {
    /*let code = error.response.status;
    switch(code){
        case 401:  //未认证，token失效
            sessionStorage.clear();
            sessionStorage.setItem('tips', '登录失效，请重新登录');
            location.replace('/');
            // Message.error('');
            break;
        case 400:  //提示性异常
            console.log(error.response);
            Message.error(error.response.data.meta.message);
            break;
        case 500:  //系统类异常
            Message.error(error.response.data.meta.message);
            break;
        case 403:  //无权限
            Message.error(error.response.data.meta.message);
            break;
        case 404:  //未找到请求
            Message.error(error.response.data.meta.message);
            break;
        case 405:  //请求类型错误
            Message.error(error.response.data.meta.message);
            break;
    }*/
    //ECONNABORTED
    /*if(error.toString().indexOf('ECONNABORTED') >= 0){
        Message.error('网络异常，请稍后再试');
    }*/
    return Promise.reject(error);
}