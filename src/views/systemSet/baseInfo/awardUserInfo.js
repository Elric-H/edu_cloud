export default function(){
    var access_token=sessionStorage.getItem('access_token');
    var userInfo=sessionStorage.getItem('user');
    return {access_token,userInfo}
}