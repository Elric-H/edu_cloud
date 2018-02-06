//手机号码验证
function phoneNumVerify(str){
    var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
    return reg.test(str);
}
export default {
    phoneNumVerify:phoneNumVerify
}