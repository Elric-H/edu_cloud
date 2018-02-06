<template>
    <div class="store">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="7">
                    <div class="floatLeft" style="margin-left: 34px;">商店名称：</div>
                    <el-input v-model="searchInfo.storeName" style="width: auto" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div class="floatLeft">负责人：</div>
                    <el-input v-model="searchInfo.chargePerson" style="width: 70%" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="6">
                    <div  class="floatLeft">联系电话：</div>
                    <el-input v-model="searchInfo.phone" style="width: 70%" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button @click="searchStore" style="margin-left: 20px" type="primary">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <!--菜品列表-->
        <List v-loading="loadingList" :listInfo="listInfo" @editStore="showEditStore" @deleteStore="showDeleteStore"></List>
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
            <div>
                <el-button @click="showAddStore" style="margin:0 20px 0 40px;" type="primary">添加</el-button>
            </div>
        </div>
        <!--编辑对话框-->
        <el-dialog
                title="编辑商店"
                :visible.sync="editStoreDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="商店名称">
                    <el-input v-model="editStoreInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="editStoreInfo.chargePerson"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="editStoreInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="经营范围">
                    <el-input v-model="editStoreInfo.operateRange"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editStoreInfo.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editStoreDialog = false">取 消</el-button>
                <el-button type="primary" @click="editStore">确 定</el-button>
            </span>
        </el-dialog>
        <!--新增对话框-->
        <el-dialog
                title="新增商店"
                :visible.sync="addStoreDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="商店名称">
                    <el-input v-model="addStoreInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="addStoreInfo.chargePerson"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="addStoreInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="经营范围">
                    <el-input v-model="addStoreInfo.operateRange"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addStoreInfo.remark"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addStoreDialog = false">取 消</el-button>
                <el-button type="primary" @click="addStore">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除菜品类型"
                :visible.sync="deleteStoreDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <span>是否要删除此条数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteStoreDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteStore">确 定</el-button>
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
    //导入userInfo的配置文件
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/edu-system/code/codeType",submitData,data=>{
            console.log("get list request");
            console.log(data);
            if(data.data.meta.success){//成功
                var paginationInfo={};
                paginationInfo["currentPage"]=data.data.data.pageNum;
                paginationInfo["totalSize"]=data.data.data.totalSize;
                paginationInfo["pageSize"]=data.data.data.pageSize;
                this.changeCurrentPage(paginationInfo);
                this.listInfo=data.data.data.beanList; //获取到的列表数据
            }else{
                console.log("get list fail");
            }
            this.paginationIsRefresh=true;
            this.loadingList=false;
        });
    }
    //定义处理可空字段的处理函数
    function handleCanNotParam(submitData){
        if(this.searchInfo.storeName){
            submitData["nameKey"]=this.searchInfo.storeName;
        }
        if(this.searchInfo.chargePerson){
            submitData["chargePersonKey"]=this.searchInfo.chargePerson;
        }
        if(this.searchInfo.phone){
            submitData["phone"]=this.searchInfo.phone;
        }
    }
    export default {
        name:"food",
        mounted(){
            //查询菜品分类 第一次访问页面或刷新页面
            var submitData={
                pageNum : 1,
                pageSize : 10,
            };
            requestList.call(this,submitData);
            console.log("test1");
        },
        data(){
            return {
                searchInfo:{
                    storeName:"",
                    chargePerson:"",
                    phone:""
                },
                listInfo:[],
                editStoreInfo:{
                    name:"",
                    chargePerson:"",
                    phone:"",
                    operateRange:"",
                    remark:""
                },
                addStoreInfo:{
                    name:"",
                    chargePerson:"",
                    phone:"",
                    operateRange:"",
                    remark:""
                },
                editStoreDialog: false,//编辑菜品对话框
                addStoreDialog:false,//添加菜品对话框
                deleteStoreDialog:false,//删除菜品对话框
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
            handleSizeChange(val) {
                var submitData={
                    pageNum : 1,
                    pageSize : val
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                console.log("size change----");
                console.log(submitData);
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
            searchStore(){
                var submitData={
                    pageNum : 1,
                    pageSize : this.paginationInfo.pageSize
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                console.log("查询搜索数据查询值:");
                console.log(submitData);
                requestList.call(this,submitData);
            },
            showAddStore(){
                this.addStoreDialog=true;
            },
            addStore(){
                if(this.addStoreInfo.name && this.addStoreInfo.chargePerson && this.addStoreInfo.phone && this.addStoreInfo.operateRange){
                    var submitData={
                        userId:userInfo.userId,
                        userName:userInfo.userName,
                        name:this.addStoreInfo.name,
                        chargePerson:this.addStoreInfo.chargePerson,
                        phone:this.addStoreInfo.phone,
                        operateRange:this.addStoreInfo.operateRange,
                    };
                    if(this.addStoreInfo.remark){
                        submitData["remark"]=this.addStoreInfo.remark;
                    }
                    //发送请求
                    httpRequest.put("/campus-general/shop/add",submitData,data=>{
                        if(data.data.meta.success){
                            console.log("add success");
                            var submitData={
                                pageNum : 1,//默认条转至首页
                                pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                            };
                            requestList.call(this,submitData);
                            //隐藏对话框
                            this.addStoreDialog=false;
                        }else{
                            console.log("add store fail");
                        }
                    });
                }else{
                    console.log("新增商店信息不合法");
                }
            },
            showEditStore(index,row){
                this.editObject={index,row};
                //将数据绑定到页面上显示
                this.editStoreInfo["name"]=row.name;
                this.editStoreInfo["chargePerson"]=row.chargePerson;
                this.editStoreInfo["phone"]=row.phone;
                this.editStoreInfo["operateRange"]=row.operateRange;
                this.editStoreInfo["remark"]=row.remark;
                this.editStoreDialog=true;
            },
            editStore(){
                console.log(this.editObject);
                if(this.editStoreInfo.name && this.editStoreInfo.chargePerson && this.editStoreInfo.phone && this.editStoreInfo.operateRange){
                    var submitData={
                        id:this.editObject.row.id,
                        name:this.editStoreInfo.name,
                        chargePerson:this.editStoreInfo.chargePerson,
                        phone:this.editStoreInfo.phone,
                        operateRange:this.editStoreInfo.operateRange,
                    };
                    if(this.editStoreInfo.remark){
                        submitData["remark"]=this.editStoreInfo.remark;
                    }
                    //发送请求
                    httpRequest.post("/campus-general/shop/update",submitData,data=>{
                        if(data.data.meta.success){
                            this.editStoreDialog=false;//隐藏编辑对话框
                            //同步页面更改
                            this.listInfo[this.editObject.index]["name"]=submitData.name;
                            this.listInfo[this.editObject.index]["chargePerson"]=submitData.chargePerson;
                            this.listInfo[this.editObject.index]["phone"]=submitData.phone;
                            this.listInfo[this.editObject.index]["operateRange"]=submitData.operateRange;
                            this.listInfo[this.editObject.index]["remark"]=data.data.data.remark;
                            this.listInfo[this.editObject.index]["lastUpdateTime"]=data.data.data.lastUpdateTime;
                        }else{
                            console.log("编辑商店失败");
                        }
                    });
                }else{
                    console.log("编辑商店输入信息不合法")
                }
            },
            showDeleteStore(index,row){
                this.deleteObject={index,row};
                this.deleteStoreDialog=true;
            },
            deleteStore(){
                var url="/campus-general/shop/remove/"+this.deleteObject.row.id;
                httpRequest.delete(url,"",data=>{
                    if(data.data.meta.success){
                        var submitData={
                            pageNum : this.paginationInfo.currentPage,//当前设置的页面数
                            pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                        };
                        handleCanNotParam.call(this,submitData);
                        requestList.call(this,submitData);
                        //隐藏对话框
                        this.deleteStoreDialog=false;
                    }else{
                        console.log("删除商店失败");
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