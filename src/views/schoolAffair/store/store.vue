<template>
    <div class="food">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div class="floatLeft" style="margin-left: 34px; width: 45%;">负责人：</div>
                    <el-input v-model="searchInfo.leaderKey" style="width: auto" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div class="floatLeft" style="margin-left: 34px; width: 45%;">联系电话：</div>
                    <el-input v-model="searchInfo.contactPhone" style="width: auto" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button @click="search" style="margin-left: 20px" >查询</el-button>
                    <el-button @click="showAdd" type="primary">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <!--菜品列表-->
        <List  v-loading="loadingList" :listInfo="listInfo" @_edit="showEdit" @_delete="showDelete"></List>
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
                title="编辑商店"
                :visible.sync="editDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="90px">
                <el-form-item label="商店名称">
                    <el-input v-model="editInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="editInfo.leader"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="editInfo.contactPhone"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editInfo.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="_edit">确 定</el-button>
            </span>
        </el-dialog>
        <!--新增对话框-->
        <el-dialog
                title="新增商店"
                :visible.sync="addDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="90px">
                <el-form-item label="商店名称">
                    <el-input v-model="addInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="addInfo.leader"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="addInfo.contactPhone"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addInfo.remark"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="_add">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除商店"
                :visible.sync="deleteDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <span>是否要删除此条数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="_delete">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import List from "./list.vue";
    import httpRequest from "@/api/schoolAffair.js";
    //导入vuex 的辅助函数
    import {mapState} from "vuex";  //用在computed属性中
    import {mapGetters} from 'vuex';//用在 computed属性中
    import {mapActions} from 'vuex';//用在 methods属性中
    import handleTime from "../handleTime.js";
    import infoVerify from "../infoVerify.js";
    //定义请求 获取foodtype 数据 的函数
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/general/shop/list",submitData,data=>{
            if(data.data.meta.success){//成功
                var paginationInfo={};
                paginationInfo["currentPage"]=data.data.data.pageNum;
                paginationInfo["totalSize"]=data.data.data.totalSize;
                paginationInfo["pageSize"]=data.data.data.pageSize;
                this.changeCurrentPage(paginationInfo);
                this.listInfo=data.data.data.beanList; //获取到的列表数据
                handleTime(this.listInfo);
            }else{
                this.$message.error("获取列表信息失败，请重试");
            }
            this.paginationIsRefresh=true;
            this.loadingList=false;
        });
    }
    //定义处理可空字段的处理函数
    function handleCanNotParam(submitData){
        if(this.searchInfo.leaderKey){
            submitData["leaderKey"]=this.searchInfo.leaderKey;
        }
        if(this.searchInfo.contactPhone){
            submitData["contactPhone"]=this.searchInfo.contactPhone;
        }
    }
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
        name:"store",
        mounted(){
            //查询菜品 第一次访问页面或刷新页面
            var submitData={
                pageNum : 1,
                pageSize : 10,
            };
            requestList.call(this,submitData);
        },
        data(){
            return {
                loadingList:false,//列表加载效果
                paginationIsRefresh:true, //控制翻页刷新用以跟随后台的翻页数据
                searchInfo:{  //搜索信息
                    leaderKey:"",
                    contactPhone:"",
                },
                listInfo:[],
                addInfo:{
                    name:"",
                    leader:"",
                    contactPhone:"",
                    remark:""
                },
                editInfo:{
                    name:"",
                    leader:"",
                    contactPhone:"",
                    remark:""
                },
                addDialog:false,
                editDialog:false,
                deleteDialog:false,//对话框
                editObject:{},//用以记录待编辑的对象
                deleteObject:{},//用以记录待删除的对象
            }
        },
        computed:{
            ...mapState("schoolAffairXField",{
                paginationInfo:state => state.paginationInfo,
            })
        },
        components:{
            "List":List
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
                //请求翻页数据
                var submitData={
                    pageNum : val,
                    pageSize : this.paginationInfo.pageSize,
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            search(){
                var submitData={
                    pageNum : 1,
                    pageSize : this.paginationInfo.pageSize,
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            /*添加*/
            showAdd(){
                this.addDialog=true;//显示添加的对话框
            },
            _add(){
                if(this.addInfo.name && this.addInfo.leader && this.addInfo.contactPhone){
                    if(infoVerify.phoneNumVerify(this.addInfo.contactPhone) ){
                        var submitData={
                            name:this.addInfo.name,
                            leader:this.addInfo.leader,
                            contactPhone:this.addInfo.contactPhone,
                        };
                        if(this.addInfo.remark){
                            submitData["remark"]=this.addInfo.remark;
                        }
                        //发送请求
                        httpRequest.post("/general/shop/add",submitData,data=>{
                            if(data.data.meta.success){
                                //添加数据成功 刷新页面
                                var submitData={
                                    pageNum : 1,//默认条转至首页
                                    pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                                };
                                requestList.call(this,submitData);
                                //隐藏对话框
                                this.addDialog=false;
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            }else{
                                this.$message.error("添加失败，请重试");
                            }
                        });
                    }else{
                        this.$message.error("联系电话格式不正确");
                    }
                }else{
                    this.$message.error("添加信息输入不合法");
                }
            },
            showEdit(index,row){
                this.editObject={
                    index,
                    row
                };//记录待编辑的对象
                //将当前对象的值绑定到对话框中
                this.editInfo["name"]=row.name;
                this.editInfo["leader"]=row.leader;
                this.editInfo["contactPhone"]=row.contactPhone;
                this.editInfo["remark"]=row.remark;
                this.editDialog=true;//显示对话框
            },
            _edit(){
                if(this.editInfo.name && this.editInfo.leader && this.editInfo.contactPhone){
                    if(infoVerify.phoneNumVerify(this.editInfo.contactPhone) ){
                        var submitData={
                            id:this.editObject.row.id,
                            name:this.editInfo.name,
                            leader:this.editInfo.leader,
                            contactPhone:this.editInfo.contactPhone,
                        };
                        if(this.editInfo.remark){
                            submitData["remark"]=this.editInfo.remark;
                        }
                        //发送请求
                        httpRequest.put("/general/shop/update",submitData,data=>{
                            if(data.data.meta.success){
                                this.editDialog=false;//隐藏编辑对话框
                                //同步页面更改
                                this.listInfo[this.editObject.index]["name"]=submitData.name;
                                this.listInfo[this.editObject.index]["leader"]=submitData.leader;
                                this.listInfo[this.editObject.index]["contactPhone"]=submitData.contactPhone;
                                this.listInfo[this.editObject.index]["remark"]=data.data.data.remark;
                                this.listInfo[this.editObject.index]["lastUpdateTime"]=formatDate(data.data.data.lastUpdateTime);
                                this.$message({
                                    message: '编辑成功',
                                    type: 'success'
                                });
                            }else{
                                this.$message.error("编辑失败，请重试");
                            }
                        });
                    }else{
                        this.$message.error("联系电话格式不正确");
                    }
                }else{
                    this.$message.error("编辑信息输入不合法");
                }
            },
            showDelete(index,row){
                this.deleteObject={index, row};
                this.deleteDialog=true;
            },
            _delete(){
                var url="/general/shop/remove/"+this.deleteObject.row.id;
                //发送请求
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
                        this.deleteDialog=false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error("删除失败，请重试");
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