<template>
    <div class="food">
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button style="margin-left: 35px;" @click="showAddFoodType" type="primary">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <!--菜品类型列表-->
        <foodTypeList v-loading="loadingList" :listInfo="listInfo"  @deleteFoodType="showDeleteFoodType"></foodTypeList><!--@editFoodType @deleteFoodType为自己注册的方法-->
        <!--新增对话框-->
        <el-dialog
                title="新增菜品类型"
                :visible.sync="addFoodTypeDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="100px">
                <el-form-item label="菜品类型名称">
                    <el-input v-model="addInfo.name"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addFoodTypeDialog = false">取 消</el-button>
                <el-button type="primary" @click="addFoodType">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除菜品类型"
                :visible.sync="deleteFoodTypeDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <span>是否要删除此条数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteFoodTypeDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteFoodType">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import foodTypeList from "./foodTypeList.vue";
    import httpRequest from "@/api/schoolAffair.js";
    import handleTime from "../handleTime.js";
    //定义请求 获取foodtype 数据 的函数
    function requestList(){
        this.loadingList=true;
        httpRequest.get("/general/canteen/classify/all","",data=>{
            if(data.data.meta.success){//成功
                handleTime(data.data.data);
                this.listInfo=data.data.data; //获取到的列表数据
            }else{
                this.$message.error("获取列表信息失败，请重试");
            }
            this.loadingList=false;
        });
    }
    export default {
        name:"foodType",
        mounted(){
            //查询菜品分类 第一次访问页面或刷新页面
            requestList.call(this);
        },
        data(){
            return {
                loadingList:false,
                addInfo:{
                    name:""
                },
                addFoodTypeDialog:false,//添加菜品对话框
                deleteFoodTypeDialog:false,//删除菜品对话框
                listInfo:[],
                deleteObject:{},//用以记录待删除的对象
            }
        },
        components:{
            "foodTypeList":foodTypeList
        },
        methods: {
            /*删除*/
            showDeleteFoodType(index,row){
                //记录将要删除的数据
                this.deleteObject={
                    index,
                    row
                };
                this.deleteFoodTypeDialog=true;
            },
            deleteFoodType(){
                var url="/general/canteen/classify/remove/"+this.deleteObject.row.id;
                httpRequest.delete(url,"",data=>{
                    if(data.data.meta.success){
                        requestList.call(this);
                        //隐藏对话框
                        this.deleteFoodTypeDialog=false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error("删除失败，请重试");
                    }
                });
            },
            /*添加*/
            showAddFoodType(){
                this.addFoodTypeDialog=true;
            },
            addFoodType(){
                if(this.addInfo.name){
                    //请求新添数据
                    var submitData={
                        name:this.addInfo.name,
                    };
                    httpRequest.post("/general/canteen/classify/add",submitData,data=>{
                        if(data.data.meta.success){
                            requestList.call(this);
                            //隐藏对话框
                            this.addFoodTypeDialog=false;
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error("添加失败，请重试");
                        }
                    });
                }else{
                    this.$message.error("添加信息输入不合法");
                }
            },
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
    .editFoodType{
        z-index: 5000;
    }
</style>