<template>
    <el-aside class="menu" :width="collapsed?'60px':'180px'" style="min-height: 100vh">
        <div class="logo">
            <img v-if="!collapsed" :src="loginUser.logurl"/>
            <!--<img v-else :src="this.logMiniUrl"/>-->
        </div>
        <div class="user-panel" style="height: 145px;">
            <div class="user-img">
                <img :class="collapsed?'img-small':'img-big'" :src="loginUser.img"/>
            </div>
            <div class="user-info" v-show="!collapsed">
                <p>{{loginUser.name}}</p>
               <!--  <p style="font-weight: 400;font-size:15px;margin-top: 10px;">{{loginUser.group}}</p> -->
            </div>
        </div>
        <aside class="menu-list scrollbar scrollbar-show">
            <!--导航菜单-->
            <el-menu :default-active="$route.matched[1].path" class="el-menu-vertical-demo" @open="handleopen"
                     @close="handleclose" @select="handleselect" unique-opened router>
                <template v-for="(item,index) in menuList" v-if="!item.hidden">
                    <el-menu-item :class="collapsed?'icon-left':'icon-center'" v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
                        <i :class="item.iconImg"></i>
                        <!--<i class="fa fa-pencil"></i>-->
                        <span class="menu-name">{{item.children[0].name}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
            <!-- <div class="menu-box">
                <div :class="{'list': true, 'active': $route.matched[1].path == item.children[0].path}" 
                v-for="item in menuList" @click="toTargetPage(item.children[0].path)">
                    <img :src="item.iconImg">
                    <span class="menu-name">{{item.children[0].name}}</span>
                </div>
            </div> -->
            <!--导航菜单-折叠后-->
            <!--<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
                <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
                    <template v-if="!item.leaf">
                        <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                            <i :class="item.iconCls"></i>
                        </div>
                        <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)"@mouseout="showMenu(index,false)">
                            <li v-for="child in item.children" v-if="!child.hidden" :key="child.path"class="el-menu-item"style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <li class="el-submenu">
                            <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
                        </li>
                    </template>
                </li>
            </ul>-->
        </aside>
    </el-aside>
</template>
<script>
    import { clearAxios } from '@/common/js/new_axios.js';
    import { requestLoginOut } from '@/api/login_api.js'
    export default {
        name: 'asideMenu',
        mounted() {
            //显示菜单列表
            let menuList = sessionStorage.getItem('menuList');
            if(menuList !== undefined) this.menuList = JSON.parse(menuList);

            //让菜单列表自适应屏幕高度
            let winHeight = '';
            if (window.innerHeight) winHeight = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))  winHeight = document.body.clientHeight;
            let heig = (this.menuList.length * 50) + 280;
            document.getElementsByClassName('menu')[0].style.minHeight = Math.max(winHeight, heig) + 'px';
        },
        data() {
            return {
                menuList: [],
                logMiniUrl: './static/logo_mini.png',
                logurl:'./static/logo-t.png',/*后期要根据用户角色改变为教师版或学生版，暂写死*/
            }
        },
        props: {
            loginUser: {
                required: true
            },
            collapsed: {
                required: true
            }
        },
        methods: {
            toTargetPage: function(path){
                this.$router.push({path: path});
            },
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
            },
            showMenu(i,status){
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    .menu{
        display: flex;
        flex-direction: column;
        //position: fixed;
        overflow: visible;
        min-height: 100vh;
        //top: 0px;
        //bottom: 0px;
        z-index: 100;
        background: $color-primary;
        color:#fefefe;
        aside {
            //flex:0 0 180px;
            width: 180px;
            //height: calc(100vh - 215px);
            // position: absolute;
            // top: 0px;
            // bottom: 0px;
            .el-menu{
                height: 100%;
                background-color: transparent;
                .el-menu-item [class^=el-icon-]{
                    //margin-right: 17px;
                    font-size: 20px;
                }
                .el-menu-item [class^=fa]{
                    //margin-right: 17px;
                    font-size: 20px;
                }
            }
            .collapsed{
                width:60px;
                .item{
                    position: relative;
                }
                .submenu{
                    position:absolute;
                    top:0px;
                    left:60px;
                    z-index:99999;
                    height:auto;
                    display:none;
                }

            }
        }
        .logo {
            height:50px;
            font-size: 22px;
            padding: 10px;
            display: flex;
            justify-content: center;
            box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
            img {
                height: 40px;
                vertical-align: middle;
            }
            .txt {
                color:#fff;
            }
        }

        .logo-collapse-width{
            width:60px;
        }
        .menu-collapsed{
            flex:0 0 60px;
            width: 60px;
        }
        .menu-expanded{
            width: 180px;
        }
    }
    .user-panel{
        height: 160px;
        overflow: hidden;
        .user-img{
            position: relative;
            text-align: center;
            top: 20px;
            .img-big{
                height: 85px;
                width: 85px;
                border-radius: 30%;
            }
            .img-small{
                height: 30px;
            }
        }
        .user-info{
            text-align: center;
            padding-top: 10px;
            p{
                font-size: 16px;
                margin-top: 10px;
                margin-bottom: 0px;
            }
        }
    }
    .el-menu-item.is-active{
        z-index: 999;
        font-size: 17px;
        width: 102%;
        color: #fefefe;
        background: linear-gradient(0deg, #1381c8 , #3ebafa);
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 0 -2px 0 #90d7fb, 0 2px 0 #2498ea;
    }
    .el-menu-item.is-active.icon-left{
        width: 60px;
    }
    .icon-center{
        text-align: center;
        height: 48px;
        line-height: 48px;
    }
    .icon-left{
        text-align: left;
    }
    .menu-name{
        display: inline-block;
        width: 70px;
        text-align:justify;
        text-justify:distribute-all-lines;/*ie6-8*/
        text-align-last:justify;/* ie9*/
    }
    .menu-list{
        overflow-y: scroll;
        height: calc( 100vh - 215px);
    }
</style>