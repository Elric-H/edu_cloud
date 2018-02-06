<template>
    <el-container style="display: block;">
        <el-header>
            <div class="login-header">
                <el-row class="row" type="flex" justify="center">
                    <el-col :span="18">
                        <el-col :span="4">
                            <img class="title-logo" src="../assets/wellcome/logo-left.png"/>
                        </el-col>
                        <el-col :span="20" class="menu">
                            <div class="pull-right border">申请账户</div>
                            <div class="pull-right border" @click="showLogin">已有账户</div>
                            <div class="pull-right no-border">APP下载</div>
                            <div class="pull-right no-border active">首页</div>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
        </el-header>
        <el-main>
            <el-carousel height="370px">
                <el-carousel-item>
                    <h3><img class="carousel-img" src="../assets/wellcome/banner1_bg.jpg"/></h3>
                </el-carousel-item>
                <el-carousel-item>
                    <h3><img class="carousel-img" src="../assets/wellcome/banner2_bg.jpg"/></h3>
                </el-carousel-item>
                <el-carousel-item>
                    <h3><img class="carousel-img" src="../assets/wellcome/banner3_bg.jpg"/></h3>
                </el-carousel-item>
            </el-carousel>
            <div>
                <el-row class="login-role-center">
                    <div><h4>三大角色</h4></div>
                    <div>一心共筑一流智慧教育平台</div>
                </el-row>
                <el-row class="role-box-container"  type="flex" justify="center">
                    <el-col :span="5">
                        <div class="login-role-center login-role-box">
                            <div class="img"><img src="../assets/wellcome/student.png"/></div>
                            <h4>学生</h4>
                            <p>一键选课、在线作业<br>学习从此无负担</p>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="login-role-center login-role-box">
                            <div class="img"><img src="../assets/wellcome/techer.png"/></div>
                            <h4>教师</h4>
                            <p>快速备课、智能辅助<br>教学效率更胜从前</p>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="login-role-center login-role-box">
                            <div class="img"><img src="../assets/wellcome/parents.png"/></div>
                            <h4>家长</h4>
                            <p>学习情况、分数评估<br>全面了解学习情况</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-main>
        <login :showLogin="isShow" @changeVisible="showLogin"></login>
    </el-container>

</template>
<script>
    import login from './Login.vue'
    export default {
        components: {
            login
        },
        methods: {
            showLogin(){
                this.isShow = !this.isShow;
            }
        },
        data() {
            return {
                isShow: false
            }
        },
        mounted() {
            //首页错误提示
            let tip = sessionStorage.getItem('tips');
            this.$message.error(tip);
            sessionStorage.removeItem('tips');
        }
    }
</script>
<style scoped lang="scss">
    h4{
        color:#666666
    }
    .el-main{
        padding:22px 0px 0px 0px;
    }
    .login-header{
        padding: 22px 0px;
    }
    .login-header .row{
        height: 50px;
    }
    .login-header .row>div{
        height: 100%;
    }
    .title-logo{
        height: 50px;
    }
    .login-header .menu{
        padding-top: 20px;
    }
    .login-header .menu>div{
        padding: 4px 10px;
        margin-right: 25px;
        font-size: 12px;
        line-height: 20px;
        border: 1px solid #fff;
        cursor: pointer;
        transition: .3s;
    }
    .login-header .menu>div.border{
        border: 1px solid rgba(0,0,0,0.2);
    }
    .login-header .menu>div.border:hover{
        -webkit-box-shadow: 0px 14px 20px -9px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 14px 20px -9px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 14px 20px -9px rgba(0, 0, 0, 0.75);
        transition: .3s;
    }
    .login-header .menu>div.no-border:hover{
        color: #00c0ef;
    }
    .login-header .menu>div.active{
        color: #00c0ef;
    }
    .carousel-img{
        width: 100%;
        height: 100%;
    }
    .login-role-center{
        padding:20px;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .login-role-box{
        border: 1px solid rgba(0,0,0,0.2);
    }
    .role-box-container{
        padding: 0px 20px 20px 20px;
        .el-col{
            padding: 20px 40px 20px 40px;
            h4{
                margin:10px;
            }
            p{
                margin:5px;
                color: #6a6a6a;
                font-size: 12px;
            }
        }
    }
</style>