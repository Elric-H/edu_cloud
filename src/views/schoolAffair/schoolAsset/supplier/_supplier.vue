<template>
    <div class="store">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button style="margin-left: 35px;" @click="showAddStore"  type="primary">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <!--菜品列表-->
        <List v-loading="loadingList" :listInfo="listInfo" @editStore="showEditStore" @deleteStore="showDeleteStore"></List>
        <!--编辑对话框-->
        <el-dialog
                title="编辑供应商"
                :visible.sync="editStoreDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="90px">
                <el-form-item label="供应商名称">
                    <el-input v-model="editStoreInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="editStoreInfo.address"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="editStoreInfo.contactUser"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="editStoreInfo.contactPhone"></el-input>
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
                title="新增供应商"
                :visible.sync="addStoreDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="90px">
                <el-form-item label="供应商名称">
                    <el-input v-model="addStoreInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="addStoreInfo.address"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="addStoreInfo.contactUser"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="addStoreInfo.contactPhone"></el-input>
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
                title="删除供应商"
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
    import List from "./list.vue";
    import httpRequest from "@/api/schoolAffair.js";
    import handleTime from "../../handleTime.js";
    import infoVerify from "../../infoVerify.js";
    function requestList(){
        this.loadingList=true;
        httpRequest.get("/general/supplier/all","",data=>{
            if(data.data.meta.success){//成功
                handleTime(data.data.data);
                this.listInfo=data.data.data; //获取到的列表数据
            }else{
                this.$message.error("获取列表信息失败，请重试");
            }
            this.loadingList=false;
        });
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
        name:"supplier",
        mounted(){
            //查询菜品分类 第一次访问页面或刷新页面
            requestList.call(this);
        },
        data(){
            return {
                listInfo:[],
                editStoreInfo:{
                    name:"",
                    address:"",
                    contactUser:"",
                    contactPhone:"",
                    operateRange:"",
                    remark:""
                },
                addStoreInfo:{
                    name:"",
                    address:"",
                    contactUser:"",
                    contactPhone:"",
                    operateRange:"",
                    remark:""
                },
                editStoreDialog: false,//编辑菜品对话框
                addStoreDialog:false,//添加菜品对话框
                deleteStoreDialog:false,//删除菜品对话框
                editObject:{},//用以记录待编辑的对象
                deleteObject:{},//用以记录待删除的对象
                loadingList:false,
            }
        },
        components:{
            "List":List
        },
        methods: {
            showAddStore(){
                this.addStoreDialog=true;
            },
            addStore(){
                if(this.addStoreInfo.name && this.addStoreInfo.address && this.addStoreInfo.contactUser && this.addStoreInfo.contactPhone && this.addStoreInfo.operateRange){
                    if(infoVerify.phoneNumVerify(this.addStoreInfo.contactPhone)){
                        var submitData={
                            name:this.addStoreInfo.name,
                            address:this.addStoreInfo.address,
                            contactUser:this.addStoreInfo.contactUser,
                            contactPhone:this.addStoreInfo.contactPhone,
                            operateRange:this.addStoreInfo.operateRange,
                        };
                        if(this.addStoreInfo.remark){
                            submitData["remark"]=this.addStoreInfo.remark;
                        }
                        //发送请求
                        httpRequest.post("/general/supplier/add",submitData,data=>{
                            if(data.data.meta.success){
                                requestList.call(this);
                                //隐藏对话框
                                this.addStoreDialog=false;
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
            showEditStore(index,row){
                this.editObject={index,row};
                //将数据绑定到页面上显示
                this.editStoreInfo["name"]=row.name;
                this.editStoreInfo["address"]=row.address;
                this.editStoreInfo["contactUser"]=row.contactUser;
                this.editStoreInfo["contactPhone"]=row.contactPhone;
                this.editStoreInfo["operateRange"]=row.operateRange;
                this.editStoreInfo["remark"]=row.remark;
                this.editStoreDialog=true;
            },
            editStore(){
                if(this.editStoreInfo.name && this.editStoreInfo.address && this.editStoreInfo.contactUser && this.editStoreInfo.contactPhone && this.editStoreInfo.operateRange){
                    if( infoVerify.phoneNumVerify(this.editStoreInfo.contactPhone) ){
                        var submitData={
                            id:this.editObject.row.id,
                            name:this.editStoreInfo.name,
                            address:this.editStoreInfo.address,
                            contactUser:this.editStoreInfo.contactUser,
                            contactPhone:this.editStoreInfo.contactPhone,
                            operateRange:this.editStoreInfo.operateRange,
                        };
                        if(this.editStoreInfo.remark){
                            submitData["remark"]=this.editStoreInfo.remark;
                        }
                        //发送请求
                        httpRequest.put("/general/supplier/update",submitData,data=>{
                            if(data.data.meta.success){
                                this.editStoreDialog=false;//隐藏编辑对话框
                                //同步页面更改
                                this.listInfo[this.editObject.index]["name"]=submitData.name;
                                this.listInfo[this.editObject.index]["address"]=submitData.address;
                                this.listInfo[this.editObject.index]["contactUser"]=submitData.contactUser;
                                this.listInfo[this.editObject.index]["contactPhone"]=submitData.contactPhone;
                                this.listInfo[this.editObject.index]["operateRange"]=submitData.operateRange;
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
            showDeleteStore(index,row){
                this.deleteObject={index,row};
                this.deleteStoreDialog=true;
            },
            deleteStore(){
                var url="/general/supplier/remove/"+this.deleteObject.row.id;
                httpRequest.delete(url,"",data=>{
                    if(data.data.meta.success){
                        requestList.call(this);
                        //隐藏对话框
                        this.deleteStoreDialog=false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error("删除失败，请重试");
                    }
                });
            }
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