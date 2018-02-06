import ElementUI from 'element-ui'
import { createAxios } from '@/common/js/new_axios.js';
//错误处理函数
function errorHandle(err){
    var status=err.response.data.status;
    switch(status){
        case 400:
            ElementUI.Message.error('请求错误，您输入的格式有误');
            break;
        case 401:
            ElementUI.Message.error('登录错误，3秒后跳转至首页');
            break;
        case 403:
            ElementUI.Message.error('禁止访问，您的权限不允许访问');
            break;
        case 404:
            ElementUI.Message.error('无效访问，您请求的路径或文件不存在');console.log("404 err");
            break;
        case 405:
            ElementUI.Message.error('方法不允许，请尝试其他方法获取');
            break;
        case 406:
            ElementUI.Message.error('账号或密码错误');
            break;
        case 415:
            ElementUI.Message.error('媒体类型错误，你的数据类型不被支持');
            break;
        case 500:
            ElementUI.Message.error('内部错误，请稍后重试');
            break;
        case 9999:
            ElementUI.Message.error('服务异常，稍后再试');
            break;
        default:
            ElementUI.Message.error('请求错误，请刷新后重试该操作');
            break;
    }
}
function ownPost(url,data,callback){
    createAxios().post(url,data).then(data=>{
        callback(data);
    }).catch(err=>{
        errorHandle.call(this,err)
    })
}
function ownUploadFile(url,data,callback){
    createAxios().post(url,data).then(data=>{
        callback(data);
    }).catch(err=>{
        errorHandle.call(this,err)
    })
}
function ownDelete(url,data,callback){
    createAxios().delete(url,{
        params:data
    }).then(data=>{
        callback(data);
    }).catch(err=>{
        errorHandle.call(this,err)
    })
}
function ownPut(url,data,callback){
    createAxios().put(url,data).then(data=>{
        callback(data);
    }).catch(err=>{
        errorHandle.call(this,err)
    })
}
function ownGet(url,data,callback){
    createAxios().get(url,{
        params:data
    }).then(data=>{
        callback(data);
    }).catch(err=>{
        errorHandle.call(this,err)
    })
}
export default {
    post:ownPost,
    delete:ownDelete,
    put:ownPut,
    get:ownGet,
    uploadFile:ownUploadFile,
}