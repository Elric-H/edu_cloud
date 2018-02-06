<template>
    <el-container>
        <aside-menu :loginUser="sysUser" :collapsed="isCollapsed" @setInfo="setInfo"></aside-menu>
        <el-container class="is-vertical" :class="isCollapsed?'big-container':'right-container'">
            <topheader :loginUser="sysUser"  @setInfo="setInfo"></topheader>
            <el-main class="content-container main">
                <div class="grid-content bg-purple-light">
                    <!--<el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.name}}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>-->
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </el-main>
        </el-container>

        <!--设置头像对话框-->
        <el-dialog
                title="设置头像"
                :visible.sync="setHeaderDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-upload
                    :action="imgUrl+'/img/one'"
                    list-type="picture-card"
                    name="img"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess">
                <i class="el-icon-plus"></i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setHeaderDialog = false">取 消</el-button>
                <el-button type="primary" @click="setHeader">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
    import AsideMenu from "./AsideMenu.vue";
    import topheader from "./TopHeader.vue";
    import httpRequest from "@/api/schoolAffair.js";
    import imgLoad from "@/api/imgLoad.js";
    import { mapGetters } from 'vuex';

    export default {
        components: {
            topheader,
            AsideMenu

        },
        computed: {
            ...mapGetters([
                'isCollapsed'
            ])
        },
        data() {
            return {
                sysUser: '',
                sysUserName: '',
                sysUserAvatar: '',
                sysGroup: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
	            setHeaderDialog:false, //设置头像对话框
	            dialogImageUrl: '',
	            uploadHeaderImgInfo:"",
                imgUrl:imgLoad.url,
                imgLoadWrapShow:true,
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
	        //设置信息  author：zx
	        setInfo(){
		        this.setHeaderDialog=true; //显示设置头像对话框
	        },
	        setHeader(){//改变该用户的头像信息

		        if(this.uploadHeaderImgInfo){
			        var submitData={
				        headImage:this.uploadHeaderImgInfo
			        };
			        httpRequest.post("/edu-user/user/updateMyInfo",submitData,data=>{
				        if(data.data.meta.success){
					        this.sysUser.img=this.imgUrl+submitData.headImage;//修改页面显示的图片
					        this.setHeaderDialog=false;
							let user = JSON.parse(sessionStorage.getItem('user'));
					        user.img = this.imgUrl+submitData.headImage;
					        sessionStorage.setItem('user', JSON.stringify(user));                            this.$message({
                                message: '修改头像成功',
                                type: 'success'
                            });
				        }else{
					        console.log("修改头像失败");
                            this.$message.error(`修改头像失败`);
				        }
			        });
		        }

	        },
	        handleRemove(file, fileList) {
	            //显示加号框
                document.getElementsByClassName("el-upload")[0].style.display="block";
            },
	        handleExceed(files, fileList) {
		        this.$message.warning(`当前限制只能上传一个文件`);
	        },
	        handleSuccess(response,file, fileList){
		        console.log("上传文件成功");
		        this.uploadHeaderImgInfo=file.response.data;
		        this.imgLoadWrapShow=false;
		        console.log(document.getElementsByClassName("el-upload"));
                //隐藏加号框
                document.getElementsByClassName("el-upload")[0].style.display="none";
	        }
	        //设置信息 end  author：zx
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUser = user;
                this.sysUserName = user.name || '';
                this.sysUserAvatar = user.avatar || '';
                this.sysGroup = user.group || '';
            }

        }
    }

</script>
<style type="text/css">
    @import "../../static/css/common.css";
</style>
<style scoped lang="scss">
    @import '~scss_vars';

	.main {
		padding:0px;
		background-color: #f1f5f8;
		z-index: 100;
		.content-container {
			width: 100%;
			.breadcrumb-container {
				//margin-bottom: 15px;
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.content-wrapper {
				background-color: #f1f5f8;
				box-sizing: border-box;
			}
		}
	}
/*	.right-container{
		margin-left: 180px;
	}*/
	/*.big-container{
		margin-left: 60px;
	}*/

</style>