<template>
    <el-header class="header">
        <el-col :span="10" style="font-size: 20px;font-weight:700;">
            <!--<div class="tools" @click="toggleMenu">
                <i class="fa fa-align-justify"></i>
            </div>-->
            <div class="tools">
                <i class="fa fa-align-justify"></i>
            </div>
            <div class="hidden-sm-and-down" style="margin-top: 10px;">
                <div class="header-title">智 慧 教 育 平 台</div>
            </div>
        </el-col>

        <el-col :span="14" class="userinfo">
            <el-col :span="17" id="scroxt" style="color:#6f7180;margin-top: 20px;">
                <el-carousel :interval="5000"  arrow="never" height="40px" indicator-position="none">
                    <el-carousel-item v-for="item in scollText" :key="item">
                        <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </el-col>

            <el-dropdown class="top-right-img" trigger="hover">
                <span class="el-dropdown-link userinfo-inner"><img :src="loginUser.img" /> {{loginUser.name}}</span>
                <el-dropdown-menu slot="dropdown">
                    <!--<el-dropdown-item>我的消息</el-dropdown-item>-->
                    <el-dropdown-item @click.native="setInfo">设置头像</el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-header>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import { requestLoginOut } from '@/api/login_api.js'
    import { clearAxios } from '@/common/js/new_axios.js';
    export default {
        name: 'topheader',
        computed: {
            ...mapGetters([
                'isCollapsed'
            ])
        },
        data() {
            return {
                inputText:'',
                scollText: [
                    '办学理念：为学生可持续发展奠基',
                    '教育理念：全面  和谐',
                    '培养目标：具有健康身心、科学精神和人文素养的中学生',
                    '核心价值观：尊重',
                    '校    训：厚德  启智  求真  志新',
                    '校    风：团结  守纪  勤奋  争先',
                    '愿    景：文化共同体  诗意栖居地',
                ]
            }
        },
        props: {
            loginUser: {
                required: true
            }
        },
        methods: {
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    clearAxios();
                    sessionStorage.clear();
                    _this.$router.push('/index');
                }).catch(() => {
                    
                });
            },
	        //设置信息  author：zx
	        setInfo(){
		        this.$emit("setInfo");
	        },
            ...mapActions([
                'toggleMenu'
            ])
        }
    }
</script>
<style scoped lang="scss">
    .header {
        min-height: 70px;
        line-height: 60px;
        background: #ffffff;
        color:#c7c7c7;
        box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
        margin-bottom: 2px;
        .userinfo {
            text-align: right;
            padding-right: 20px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color:#c7c7c7;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
        .tools{
            float: left;
            padding: 10px 15px;
            width:14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
    .nav-icon {
        margin-top: 8px;
        display: inline-block;
        .el-button {
            position: relative;
            top: 5px;
            border-color: #ffffff;
            padding: 8px 10px 6px 6px;
            font-size: 25px;
        }

    }
    .header-title{
        display: inline-block;
        position: relative;
        margin-top: 8px;
        top: -10px;
    }
    #scroxt{
        height: 50px;
        margin-top: 10px;
    }
    .el-carousel__item h3 {
        color: inherit;
        font-size: 20px;
        opacity: 0.75;
        line-height: 40px;
        margin: 0;
        float: left;
    }
    .top-right-img{
        height: 50px;
        margin: 5px;
    }
    a{
        position: relative;
    }
</style>
