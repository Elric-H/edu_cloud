<template>
    <div class="food">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="7">
                    <div class="floatLeft" style="margin-left: 34px;">场地名称：</div>
                    <el-input v-model="searchInfo.fieldName" style="width: auto" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button @click="searchField" style="margin-left: 20px">查询</el-button>
                    <el-button @click="showAddField" type="primary">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <!--场地列表-->
        <fieldList v-loading="loadingList" @editField="showEditField" @deleteField="showDeleteField" :listInfo="listInfo"></fieldList>
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
                title="编辑场地"
                :visible.sync="editFieldDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="场地名称">
                    <el-input v-model="editInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="场地备注">
                    <el-input v-model="editInfo.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editFieldDialog = false">取 消</el-button>
                <el-button type="primary" @click="editField">确 定</el-button>
            </span>
        </el-dialog>
        <!--添加对话框-->
        <el-dialog
                title="添加场地"
                :visible.sync="addFieldDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="场地名称">
                    <el-input v-model="addInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="场地备注">
                    <el-input v-model="addInfo.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFieldDialog = false">取 消</el-button>
                <el-button type="primary" @click="addField">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除场地"
                :visible.sync="deleteFieldDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <span>是否要删除此条数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteFieldDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteField">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import fieldList from "./fieldList.vue";
    import httpRequest from "@/api/schoolAffair.js";
    import handleTime from "../handleTime";
    //导入vuex 的辅助函数
    import {mapState} from "vuex";  //用在computed属性中
    import {mapGetters} from 'vuex';//用在 computed属性中
    import {mapActions} from 'vuex';//用在 methods属性中
    //定义请求 fieldList数据的函数
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/general/canteen/area/list",submitData,data=>{
            if(data.data.meta.success){//成功
                var paginationInfo={};
                paginationInfo["currentPage"]=data.data.data.pageNum;
                paginationInfo["totalSize"]=data.data.data.totalSize;
                paginationInfo["pageSize"]=data.data.data.pageSize;
                this.changeCurrentPage(paginationInfo);
                this.listInfo=data.data.data.beanList;
                handleTime(this.listInfo);
            }else{
                this.$message.error("获取列表信息失败");
            }
            this.paginationIsRefresh=true;
            this.loadingList=false;
        });
    }
    //定义处理可空字段的处理函数
    function handleCanNotParam(submitData){
        if(this.searchInfo.fieldName){
            submitData["nameKey"]=this.searchInfo.fieldName;
        }
    }
    //处理时间搓函数
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
    export default {
        name:"field",
        mounted(){
            //查询场地 第一次访问页面或刷新页面
            var submitData={
                pageNum : 1,
                pageSize : 10,
            };
            requestList.call(this,submitData);
        },
        computed:{
            ...mapState("schoolAffairXField",{
                paginationInfo:state => state.paginationInfo,
            })
        },
        data(){
            return {
                loadingList:false,
                listInfo:[],
                searchInfo:{
                    fieldName:"",
                },
                addInfo:{
                    name:"",
                    remark:""
                },
                editInfo:{
                    name:"",
                    remark:""
                },
                editFieldDialog:false,//编辑场地对话框
                addFieldDialog:false,
                deleteFieldDialog:false,
                editObject:{},//用以记录编辑对象
                deleteObject:{},//用以记录删除对象
                paginationIsRefresh:true //控制翻页刷新用以跟随后台的翻页数据
            }
        },
        components:{
            "fieldList":fieldList
        },
        methods: {
            handleSizeChange(val) {
                var submitData={
                    pageNum : 1,
                    pageSize : val
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            handleCurrentChange(val) {
                var submitData={
                    pageNum : val,
                    pageSize : this.paginationInfo.pageSize
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            searchField(){
                var submitData={
                    pageNum : 1,
                    pageSize : this.paginationInfo.pageSize,
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            /*添加*/
            showAddField(){
                this.addFieldDialog=true; //显示添加对话框
            },
            addField(){
                if(this.addInfo.name){
                    //发送请求
                    var submitData={
                        name:this.addInfo.name,
                    };
                    if(this.addInfo.remark){
                        submitData["remark"]=this.addInfo.remark;
                    }
                    httpRequest.post("/general/canteen/area/add",submitData,data=>{
                        if(data.data.meta.success){
                            //添加数据成功 刷新页面
                            var submitData={
                                pageNum : 1,//默认条转至首页
                                pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                            };
                            requestList.call(this,submitData);
                            //隐藏对话框
                            this.addFieldDialog=false;
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('添加失败，请重试');
                        }
                    })
                }else{
                    this.$message.error('添加信息输入不合法');
                }
            },
            showEditField(index,row){
                this.editObject={
                    index,
                    row
                };
                //将当前的数据绑定到对话框中
                this.editInfo.name=row.name;
                this.editInfo.remark=row.remark;
                this.editFieldDialog=true;//显示对话框
            },
            editField(){
                if(this.editInfo.name){
                    var submitData={
                        id:this.editObject.row.id, //编辑场地的id
                        name:this.editInfo.name,
                    };
                    if(this.editInfo.remark){
                        submitData["remark"]=this.editInfo.remark;
                    }
                    //发送请求
                    httpRequest.put("/general/canteen/area/update",submitData,data=>{
                        if(data.data.meta.success){
                            //同步更改页面的数据
                            this.listInfo[this.editObject.index]["name"]=submitData.name;
                            this.listInfo[this.editObject.index]["remark"]=submitData.remark;
                            this.listInfo[this.editObject.index]["lastUpdateTime"]=formatDate(data.data.data.lastUpdateTime);
                            this.editFieldDialog=false;//隐藏对话框
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error('更新失败，请重试');
                        }
                    });
                }else{
                    this.$message.error('编辑信息输入不合法');
                }
            },
            showDeleteField(index,row){
                this.deleteObject={
                    index,
                    row
                };
                this.deleteFieldDialog=true;
            },
            deleteField(){
                //发送请求
                var url="/general/canteen/area/remove/"+this.deleteObject.row.id;
                httpRequest.delete(url,"",data=>{
                    if(data.data.meta.success){
                        //删除页面成功 刷新页面
                        var submitData={
                            pageNum : this.paginationInfo.currentPage,//当前设置的页面数
                            pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                        };
                        handleCanNotParam.call(this,submitData);
                        requestList.call(this,submitData);
                        //隐藏对话框
                        this.deleteFieldDialog=false;
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
    .food .pagination{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-color: #ffffff;
        padding-bottom: 20px;
    }
</style>