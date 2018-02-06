<template>
    <div class="store">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div class="floatLeft" style="margin-left: 34px;width: 45%;">班级名称：</div>
                    <el-input v-model="searchInfo.classFullName" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div class="floatLeft" style="margin-left: 34px;width: 45%;">学籍号：</div>
                    <el-input v-model="searchInfo.schoolRollNum" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div class="floatLeft" style="margin-left: 34px;width: 45%;">学生名字：</div>
                    <el-input v-model="searchInfo.studentName" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>

                <el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button @click="search" style="margin-left: 20px">查询</el-button>
                    <el-button @click="showAdd" type="primary">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <!--菜品列表-->
        <List v-loading="loadingList" :listInfo="listInfo" @edit="showEdit" @delete="showDelete"></List>
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
        <!--编辑对话框-->
        <el-dialog
                title="编辑学生"
                :visible.sync="editDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="学生姓名">
                    <el-input v-model="editInfo.studentName"></el-input>
                </el-form-item>
                <el-form-item label="学籍号">
                    <el-input v-model="editInfo.schoolRollNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
            </span>
        </el-dialog>
        <!--新增对话框-->
        <el-dialog
                title="新增学生"
                :visible.sync="addDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="学生姓名">
                    <el-input v-model="addInfo.studentName"></el-input>
                </el-form-item>
                <el-form-item label="班级名称">
                    <el-select :clearable="true" v-model="addInfo.classId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in clazzOptions"
                                :key="item.id"
                                :label="item.fullName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学籍号">
                    <el-input v-model="addInfo.schoolRollNum"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除学生"
                :visible.sync="deleteDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <span>是否要删除此条数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="delete_">确 定</el-button>
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
    //处理学期
    function handleTerm(data){
        var length=data.length;
        for(var i=0;i<length;i++){
            if(data[i].term==1){
                data[i].term="上学期";
            }else{
                data[i].term="下学期";
            }
        }
    }
    //导入userInfo的配置文件
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/edu-system/class/getAllClassStudent",submitData,data=>{
            if(data.data.meta.success){ //成功
                var paginationInfo={};
                paginationInfo["currentPage"]=data.data.data.pageTools.currentPage;
                paginationInfo["totalSize"]=data.data.data.pageTools.totalSize;
                paginationInfo["pageSize"]=submitData.perPage;
                this.changeCurrentPage(paginationInfo);
                this.listInfo=data.data.data.beanList; //获取到的列表数据
            }else{
                this.$message.error('获取列表失败，请重试');
            }
            this.paginationIsRefresh=true;
            this.loadingList=false;
        });
    }
    //定义处理可空字段的处理函数
    function handleCanNotParam(submitData){
        if(this.searchInfo.classFullName){
            submitData["classFullName"]=this.searchInfo.classFullName;
        }
        if(this.searchInfo.schoolRollNum){
            submitData["schoolRollNum"]=this.searchInfo.schoolRollNum;
        }
        if(this.searchInfo.studentName){
            submitData["studentName"]=this.searchInfo.studentName;
        }

    }
    export default {
        name:"gradeManage",//年级管理
        mounted(){
            //查询菜品分类 第一次访问页面或刷新页面
            var submitData={
                currentPage : 1,
                perPage : 10,
            };
            requestList.call(this,submitData);
            //获取班级信息
            httpRequest.get("/edu-system/common/getClasses","",data=>{
                if(data.data.meta.success){
                    this.clazzOptions=data.data.data;
                }else{
                    this.$message.error('获取班级信息失败，请重试');
                }
            });
        },
        data(){
            return {
                listInfo:[],
                clazzOptions:[],
                searchInfo:{
                    classFullName:"",
                    schoolRollNum:"",
                    studentName:""
                },
                editInfo:{
                    studentName:"",
                    schoolRollNum:""
                },
                addInfo:{
                    studentName:"",
                    classId:"",
                    schoolRollNum:""
                },
                editDialog: false,//编辑菜品对话框
                addDialog:false,//添加菜品对话框
                deleteDialog:false,//删除菜品对话框
                editObject:{},//用以记录待编辑的对象
                deleteObject:{},//用以记录待删除的对象
                paginationIsRefresh:true, //控制翻页刷新用以跟随后台的翻页数据
                loadingList:false,
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
            showAdd(){
                this.addDialog=true;
            },
            add(){
                if(this.addInfo.studentName && this.addInfo.classId && this.addInfo.schoolRollNum){
                    var submitData={
                        classId:this.addInfo.classId,
                        studentName:this.addInfo.studentName,
                        schoolRollNum:this.addInfo.schoolRollNum
                    };
                    //发送请求
                    httpRequest.post("/edu-system/class/student",submitData,data=>{
                        if(data.data.meta.success){
                            var submitData={
                                currentPage : 1,//默认条转至首页
                                perPage : this.paginationInfo.pageSize,//当前设置的页面大小
                            };
                            requestList.call(this,submitData);
                            //隐藏对话框
                            this.addDialog=false;
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('添加失败，请重试');
                        }
                    });
                }else{
                    this.$message.error('新增信息输入不合法');
                }
            },
            showEdit(index,row){
                this.editObject={index,row};
                //将数据绑定到页面上显示
                this.editInfo["studentName"]=row.studentName;
                this.editInfo["schoolRollNum"]=row.schoolRollNum;
                this.editDialog=true;//显示对话框
            },
            edit(){
                if(this.editInfo.studentName && this.editInfo.schoolRollNum){
                    var submitData={
                        id:this.editObject.row.id,
                        studentName:this.editInfo.studentName,
                        schoolRollNum:this.editInfo.schoolRollNum,
                    };
                    //发送请求
                    httpRequest.put("/edu-system/class/student",submitData,data=>{
                        if(data.data.meta.success){
                            this.editDialog=false;//隐藏编辑对话框
                            //同步页面更改
                            this.listInfo[this.editObject.index]["studentName"]=submitData.studentName;
                            this.listInfo[this.editObject.index]["schoolRollNum"]=submitData.schoolRollNum;
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('编辑失败，请重试');
                        }
                    });
                }else{
                    this.$message.error('编辑输入信息不合法');
                }
            },
            showDelete(index,row){
                this.deleteObject={index,row};
                this.deleteDialog=true;
            },
            delete_(){
                var url="/edu-system/class/student"+this.deleteObject.row.id;
                httpRequest.delete(url,"",data=>{
                    if(data.data.meta.success){
                        var submitData={
                            currentPage : this.paginationInfo.currentPage,//当前设置的页面数
                            perPage : this.paginationInfo.pageSize,//当前设置的页面大小
                        };
                        handleCanNotParam.call(this,submitData);
                        requestList.call(this,submitData);
                        //隐藏对话框
                        this.deleteDialog=false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error('删除失败，请重试');
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