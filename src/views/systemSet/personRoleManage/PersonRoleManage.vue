<template>
    <div class="store">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div class="floatLeft" style="margin-left: 34px;width: 45%;">老师工号：</div>
                    <el-input v-model="searchInfo.teacherJodNum" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div class="floatLeft" style="margin-left: 34px;width: 45%;">老师姓名：</div>
                    <el-input v-model="searchInfo.name" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>

                <el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button @click="search" style="margin-left: 20px">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <!--菜品列表-->
        <List v-loading="loadingList" :listInfo="listInfo"  @distributeRole="showDistributeRole"></List>
        <!--分页代码-->
        <div class="pagination" v-if="paginationIsRefresh">
            <el-pagination
                    style="margin-right:20px"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="paginationInfo.currentPage"
                    :page-sizes="[1, 2, 3, 10]"
                    :page-size="paginationInfo.pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="paginationInfo.totalSize">
            </el-pagination>
        </div>
        <!--分配角色对话框-->
        <el-dialog
                title="分配角色"
                :visible.sync="distributeRoleDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px" v-loading="loadingRole">
                <el-checkbox-group v-model="selectedRoleInfo" size="small">
                    <el-checkbox v-for="item in roleInfo" :label="item.nameInfo" border></el-checkbox>
                </el-checkbox-group>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="distributeRoleDialog = false">取 消</el-button>
                <el-button type="primary" @click="distributeRole">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import List from "./List.vue";
    import httpRequest from "@/api/schoolAffair.js";
    //导入vuex 的辅助函数
    import {mapState} from "vuex";  //用在computed属性中
    import {mapActions} from 'vuex';//用在 methods属性中
    //处理性别
    function handleSex(data){
        var length=data.length;
        for(var i=0;i<length;i++){
            if(data[i].gender==0){
                data[i].gender="男";
            }else{
                data[i].gender="女";
            }
        }
    }
    //获取列表数据
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/edu-user/user/getAllTeacherWithPage",submitData,data=>{
            if(data.data.meta.success){ //成功
                var paginationInfo={};
                paginationInfo["currentPage"]=data.data.data.pageTools.currentPage;
                paginationInfo["totalSize"]=data.data.data.pageTools.totalSize;
                paginationInfo["pageSize"]=submitData.perPage;
                this.changeCurrentPage(paginationInfo);
                handleSex(data.data.data.beanList);//处理性别
                this.listInfo=data.data.data.beanList; //获取到的列表数据
            }else{
                this.$message.error('获取列表信息失败,请刷新重试');
            }
            this.paginationIsRefresh=true;
            this.loadingList=false;
        });
    }
    //定义处理可空字段的处理函数  用于搜索功能
    function handleCanNotParam(submitData){
        if(this.searchInfo.teacherJodNum){
            submitData["teacherJodNum"]=this.searchInfo.teacherJodNum;
        }
        if(this.searchInfo.name){
            submitData["name"]=this.searchInfo.name;
        }
    }
    //后去当前用户的权限
    function awardCurrentUserRole(userId){
        var url="/edu-user/role/getUserRole/"+userId;
        this.loadingRole=true;
        httpRequest.get(url,"",data=>{
            if(data.data.meta.success){
                var length=data.data.data.length;
                for(var i=0;i<length;i++){
                    this.selectedRoleInfo.push(data.data.data[i].nameInfo);
                }
            }else{
                this.$message.error('获取当前用户权限失败,请重试');
            }
            this.loadingRole=false;
        });
    }
    export default {
        name:"personRoleManage",//年级管理
        mounted(){
            //查询 第一次访问页面或刷新页面
            var submitData={
                currentPage : 1,
                perPage : 10,
            };
            requestList.call(this,submitData);
            //获取所有的角色
            httpRequest.get("/edu-user/role/getRoles","",data=>{
                if(data.data.meta.success){
                    var resultData=data.data.data;
                    this.roleInfo=resultData;
                    //过滤权限
//                    for(var i=0;i<resultData.length;i++){
//                        switch (resultData[i].name){
//                            case "TEACHER" : this.roleInfo.push(resultData[i]);break;
//                            case "LEADER" :  this.roleInfo.push(resultData[i]);break;
//                        }
//                    }
                }else{
                    this.$message.error('获取角色信息失败,请重试');
                }
            });
        },
        data(){
            return {
                listInfo:[],
                searchInfo:{
                    teacherJodNum:"",
                    name:"",
                },
                loadingRole:false,
                roleInfo:[],
                selectedRoleInfo:[],//权限信息2
                distributeRoleDialog:false,
                paginationIsRefresh:true, //控制翻页刷新用以跟随后台的翻页数据
                loadingList:false,
                distributeRoleObject:{},
            }
        },
        components:{
            "List":List
        },
        computed:{
            ...mapState("schoolAffairXField",{
                paginationInfo:state => state.paginationInfo,
            })
        },
        methods: {
            handleSizeChange(val){
                var submitData={
                    currentPage : 1,
                    perPage : val
                };
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            handleCurrentChange(val){
                var submitData={
                    currentPage : val,
                    perPage : this.paginationInfo.pageSize
                };
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            search(){
                var submitData={
                    currentPage : 1,
                    perPage : this.paginationInfo.pageSize
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            showDistributeRole(index,row){
                //显示角色分配的对话框
                this.distributeRoleDialog=true;
                this.distributeRoleObject={index,row};
                //获取当前用户的权限
                var currentUserId=row.id;//当前的userID
                awardCurrentUserRole.call(this,currentUserId);
            },
            distributeRole(){
                //处理选中的角色
                var roleList=[];
                var length=this.selectedRoleInfo.length;
                for(var i=0;i<length;i++){
                    for(var r=0;r<this.roleInfo.length;r++){
                        if(this.selectedRoleInfo[i]==this.roleInfo[r].nameInfo){
                            roleList.push(this.roleInfo[r]);
                        }
                    }
                }
                //设置用户角色
                var userId=this.distributeRoleObject.row.id;//当前的userID
                var submitData={
                    userId:userId,
                    roleList:roleList
                };
                httpRequest.post("/edu-user/role/changeRole",submitData,data=>{
                    if(data.data.meta.success){
                        this.$message({
                            message: '设置用户角色成功',
                            type: 'success'
                        });
                        this.distributeRoleDialog=false;
                    }else{
                        this.$message.error('设置用户角色失败,请重试');
                    }
                });

            },
            ...mapActions("schoolAffairXField",[
                "changeCurrentPage"
            ]),
        }
    }
</script>

<style scoped>
    .search-header{
        background-color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .search-header .VCenter{
        display: flex;
        align-items: center;
    }
    .search-header .floatLeft{
        float: left;
    }

    .search-header .box{
        height: 40px;
        line-height: 40px;
        padding-right: 30px;
    }
    .search-header .box .content{
        position: relative;
        padding-left: 10px;
        padding-right: 29px;
    }
    .search-header .box input{
        padding-left: 10px;
        height: 20px;
        width: 200px;
    }
    .search-header .box .icon{
        position: absolute;
        top: 8px;
        right: 0px;
        width: 28px;
        height: 24px;
        border: 1px solid #999;
        cursor: pointer;
    }
    .search-header .box .icon span{
        position: relative;
        top: -8px;
        left: 6px;
    }
    .search-header .box .icon:hover span{
        color: #1D82FE;
    }
    .store .pagination{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-color: #ffffff;
        padding-bottom: 20px;
    }
</style>