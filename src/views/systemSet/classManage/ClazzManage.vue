<template>
    <div class="store">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="6">
                    <div class="floatLeft" style="margin-left: 34px; width: 30%;">班级全称：</div>
                    <el-input v-model="searchInfo.fullName" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="6">
                    <div class="floatLeft" style="margin-left: 34px; width: 30%;">班级状态：</div>
                    <el-input v-model="searchInfo.classStateName" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
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
                title="编辑年级"
                :visible.sync="editDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="年级信息">
                    <el-select :clearable="true" v-model="editInfo.gradeId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in gradeInfoOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级信息">
                    <el-input v-model="editInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="班主任">
                    <el-select :clearable="true" v-model="editInfo.headTeacherId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in headTeacherOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级状态">
                    <el-input v-model="editInfo.classStateName"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editInfo.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
            </span>
        </el-dialog>
        <!--新增对话框-->
        <el-dialog
                title="新增年级"
                :visible.sync="addDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="年级信息">
                    <el-select :clearable="true" v-model="addInfo.gradeId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in gradeInfoOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级信息">
                    <el-input v-model="addInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="班主任">
                    <el-select :clearable="true" v-model="addInfo.headTeacherId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in headTeacherOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级状态">
                    <el-input v-model="addInfo.classStateName"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addInfo.remark"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除菜品类型"
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
    import handleTime from "../handleTime";
    //导入vuex 的辅助函数
    import {mapState} from "vuex";  //用在computed属性中
    import {mapActions} from 'vuex';//用在 methods属性中
    //转换时间戳
    function formatDate(now) {
        now=new Date(now);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
    //请求函数
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/edu-system/common/getAllClass",submitData,data=>{
            if(data.data.meta.success){ //成功
                var paginationInfo={};
                paginationInfo["currentPage"]=data.data.data.pageTools.currentPage;
                paginationInfo["totalSize"]=data.data.data.pageTools.totalSize;
                paginationInfo["pageSize"]=submitData.perPage;
                this.changeCurrentPage(paginationInfo);
                handleTime(data.data.data.beanList);//处理时间为字符串
                this.listInfo=data.data.data.beanList; //获取到的列表数据
            }else{
                this.$message.error('获取列表信息失败，请重试');
            }
            this.paginationIsRefresh=true;
            this.loadingList=false;
        });
    }
    //定义处理可空字段的处理函数
    function handleCanNotParam(submitData){
        if(this.searchInfo.fullName){
            submitData["fullName"]=this.searchInfo.fullName;
        }
        if(this.searchInfo.classStateName){
            submitData["classStateName"]=this.searchInfo.classStateName;
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
            //获取年级信息
            httpRequest.get("/edu-system/common/getGrades","",data=>{
                if(data.data.meta){
                    this.gradeInfoOptions=data.data.data;
                }else{
                    this.$message.error('获取年级信息失败，请重试');
                }
            });
            //获取班主任信息
            httpRequest.get("/edu-user/user/getAllTeacher","",data=>{
                if(data.data.meta){
                    this.headTeacherOptions=data.data.data;
                }else{
                    this.$message.error('获取班主任信息失败，请重试');
                }
            });
        },
        data(){
            return {
                listInfo:[],
                searchInfo:{
                    fullName:"",
                    classStateName:""
                },
                gradeInfoOptions:[],
                headTeacherOptions:[],
                editInfo:{
                    gradeId:"",//年级信息 id
                    name:"",
                    headTeacherId:"",//班主任 id
                    classStateName:"",//班级状态
                    remark:""
                },
                addInfo:{
                    gradeId:"",//年级信息 id
                    name:"",
                    headTeacherId:"",//班主任 id
                    classStateName:"",//班级状态
                    remark:""
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
                if(this.addInfo.gradeId && this.addInfo.name && this.addInfo.headTeacherId && this.addInfo.classStateName){
                    //根据年级id查出班级名称
                    var gradeName="";
                    var length_grades=this.gradeInfoOptions.length;
                    for(var i=0;i<length_grades;i++){
                        if(this.gradeInfoOptions[i].id===this.addInfo.gradeId ){
                            gradeName=this.gradeInfoOptions[i].name;break;
                        }
                    }
                    // 根据老师id查出老师名称
                    var headTeacherName="";
                    var length_teachers=this.headTeacherOptions.length;
                    for(var i=0;i<length_teachers;i++){
                        if(this.headTeacherOptions[i].id===this.addInfo.headTeacherId ){
                            headTeacherName=this.headTeacherOptions[i].name;break;
                        }
                    }
                    var submitData={
                        gradeId:this.addInfo.gradeId,
                        gradeName:gradeName,
                        name:this.addInfo.name,
                        headTeacherId:this.addInfo.headTeacherId,
                        headTeacherName:headTeacherName,
                        classStateName:this.addInfo.classStateName
                    };
                    if(this.addInfo.remark){
                        submitData["description"]=this.addInfo.remark;
                    }
                    //发送请求
                    httpRequest.post("/edu-system/common/class",submitData,data=>{
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
                this.editInfo["name"]=row.name;
                this.editInfo["classStateName"]=row.classStateName;
                this.editInfo["remark"]=row.description;
                this.editDialog=true;//显示对话框
            },
            edit(){
                if(this.editInfo.gradeId && this.editInfo.name && this.editInfo.headTeacherId && this.editInfo.classStateName){
                    //根据年级id查出班级名称
                    var gradeName="";
                    var length_grades=this.gradeInfoOptions.length;
                    for(var i=0;i<length_grades;i++){
                        if(this.gradeInfoOptions[i].id===this.editInfo.gradeId ){
                            gradeName=this.gradeInfoOptions[i].name;break;
                        }
                    }
                    // 根据老师id查出老师名称
                    var headTeacherName="";
                    var length_teachers=this.headTeacherOptions.length;
                    for(var i=0;i<length_teachers;i++){
                        if(this.headTeacherOptions[i].id===this.editInfo.headTeacherId ){
                            headTeacherName=this.headTeacherOptions[i].name;break;
                        }
                    }
                    var submitData={
                        id:this.editObject.row.id,
                        gradeId:this.editInfo.gradeId,
                        gradeName:gradeName,
                        name:this.editInfo.name,
                        headTeacherId:this.editInfo.headTeacherId,
                        headTeacherName:headTeacherName,
                        classStateName:this.editInfo.classStateName
                    };
                    if(this.editInfo.remark){
                        submitData["description"]=this.editInfo.remark;
                    }
                    //发送请求
                    httpRequest.put("/edu-system/common/class",submitData,data=>{
                        if(data.data.meta.success){
                            this.editDialog=false;//隐藏编辑对话框
                            //同步页面更改
                            this.listInfo[this.editObject.index]["name"]=submitData.name;
                            this.listInfo[this.editObject.index]["gradeId"]=submitData.gradeId;
                            this.listInfo[this.editObject.index]["gradeName"]=submitData.gradeName;
                            this.listInfo[this.editObject.index]["headTeacherId"]=submitData.headTeacherId;
                            this.listInfo[this.editObject.index]["headTeacherName"]=submitData.headTeacherName;
                            this.listInfo[this.editObject.index]["classStateName"]=submitData.classStateName;
                            this.listInfo[this.editObject.index]["description"]=data.data.data.description;
                            this.listInfo[this.editObject.index]["updateTime"]=formatDate(data.data.data.updateTime);
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
                var url="/edu-system/common/class/"+this.deleteObject.row.id;
                httpRequest.delete(url,"",data=>{
                    if(data.data.meta.success){
                        var submitData={
                            currentPage : this.paginationInfo.currentPage,//当前设置的页面数
                            perPage : this.paginationInfo.pageSize,//当前设置的页面大小
                        };
                        //handleCanNotParam.call(this,submitData);
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