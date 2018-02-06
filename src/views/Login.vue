<template>
    <transition name="el-fade-in-linear">
        <div v-show="showLogin" class="login-hidden-div">
            <el-row class="div-esc" type="flex" justify="end">
                <a href="#" @click="hiddenLogin"><i class="el-icon-close"></i></a>
            </el-row>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                     class="demo-ruleForm login-container">
                <img src="../assets/wellcome/logo-login.png"/>
                <div class="login-tab">
                    <a href="#" :class="{'active': curUser == '1'}" @click="changeUser('1')">
                        <span>教 师</span>
                    </a>
                    <a href="#" :class="{'active': curUser == '2'}" @click="changeUser('2')">
                        <span>学 生</span>
                    </a>
                    <a href="#" :class="{'active': curUser == '3'}" @click="changeUser('3')">
                        <span>家 长</span>
                    </a>
                </div>
                <el-form-item prop="account">
                    <el-input class="login-input" type="text" v-model="ruleForm2.account" auto-complete="off"
                              placeholder="请输入账号">
                        <template slot="prepend"><img src="../assets/wellcome/user.png"/></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input class="login-input" type="password" v-model="ruleForm2.checkPass"
                              @keyup.enter.native="handleSubmit2" auto-complete="off"
                              placeholder="密码">
                        <template slot="prepend"><img src="../assets/wellcome/key.png"/></template>
                    </el-input>
                </el-form-item>
                <el-col>
                    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                    <!--<span class="pull-right" style="margin-right:20px ">
                        <a href="#" style="color: #7a869d">忘记密码？</a>
                    </span>-->
                </el-col>

                <el-form-item class="login-button-box">
                    <el-button @click.native.prevent="handleSubmit2" :loading="logining">登录
                    </el-button>
                    <div style="padding-top:5px">
                        <!--<a href="#" style="color:#278ec2">立即注册</a> yuyang 2018/01/13-->
                    </div>
                    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
                </el-form-item>
                <div style="text-align:left;font-size:12px;width:350px;">
                    <span class="pull-left" style="padding-left:10px">本系统推荐浏览器chrome，您需要使用IE11或以上版本才能正常使用，如果您在使用中遇到问题，请联系现场工作人员或拨打客服电话，400-111-1123</span>
                </div>
            </el-form>

        </div>
    </transition>
</template>

<script>
    //import { requestLogin } from '../api/api';
    import {requestLogin} from '@/api/login_api.js';
    //import NProgress from 'nprogress'
    export default {
        props: {
            showLogin: {
                required: true
            }
        },
        data() {
            return {
                curUser: '1',       //1：教师， 2：学生， 3：家长
                appType: '1',       //1: pc, 2: app
                logining: false,
                ruleForm2: {
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            changeUser: function (user) {      //切换用户
                this.curUser = user;
            },
            hiddenLogin() {
                this.$emit('changeVisible');
            },
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                if(this.checked){
                    this.checkCookie();
                }else{
                    this.clearCookie('username');
                    this.clearCookie('psw');
                }
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        var loginParams = {
                            loginId: this.ruleForm2.account,
                            loginPwd: this.ruleForm2.checkPass,
                            userType: this.curUser,
                            appType: this.appType
                        };
                        requestLogin(loginParams).then(data => {
                            this.logining = false;
                            let {access_token, menuList, userInfo} = data;
                            sessionStorage.setItem('user', JSON.stringify(userInfo));
                            sessionStorage.setItem('access_token', access_token);
                            sessionStorage.setItem('menuList', JSON.stringify(menuList));
                            sessionStorage.setItem('userType', loginParams.userType);
                            this.$router.push({path: '/personal-center'});
                        }).catch(error => {
                            this.logining = false;
                            this.$message({
                                type: 'warning',
                                message: error
                            });
                        });
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '操作失败，请联系管理员'
                        });
                        return false;
                    }
                });
            },
            //从cookie中获取账号
            getCookie(c_name) {
                if (document.cookie.length > 0) {
                    let c_start = document.cookie.indexOf(c_name + "=");
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1;
                        let c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) c_end = document.cookie.length;
                        return document.cookie.substring(c_start, c_end);
                    }
                }
                return "";
            },
            setCookie(c_name, value) {
                var d = new Date();
                //默认存一年
                d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = c_name + "=" + value + ";" + expires;
            },
            checkCookie() {
                let username = this.ruleForm2.account;
                let psw = this.ruleForm2.checkPass;
                if (username != null && username != "") {
                    this.setCookie('username', username);
                }
                if (psw != null && psw != "") {
                    this.setCookie('psw', psw);
                }
            },
            //清除cookie
            clearCookie(name) {
                this.setCookie(name, "", -1);
            }
        },
        created() {
            if(this.checked){
                this.ruleForm2.account = this.getCookie("username");
                this.ruleForm2.checkPass = this.getCookie("psw");
            }
        }
    }

</script>

<style lang="scss" scoped>
    .div-esc {
        padding: 40px 50px 20px 20px;
        height: 100px;
        width: 100%;
        font-size: 50px;
        a {
            color: #e3dede;
        }
    }

    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 0px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        text-align: center;
        .remember {
            float: left;
            margin: 0px 0px 10px 15px;
        }
    }

    .login-hidden-div {
        position: absolute;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        z-index: 200;
    }

    .login-tab {
        margin-bottom: 20px;
        a {
            color: #7a869d;
            text-align: center;
            padding: 30px 0px 5px 0px;
            margin-right: 20px;
            margin-left: 20px;
            text-decoration: none;
            font-size: 15px;
        }
        .active {
            color: #278EC2
        }
    }

    .clicked-nav {
        border-bottom: 2px solid #00b3ee;
    }

    .login-button-box {
        width: 100%;
        margin-bottom: 5px;
        button {
            width: 100%;
            border-radius: 30px;
            background-color: #278ec2;
            border: none;
            color: #fff;
            font-size: 15px;
        }
    }
</style>