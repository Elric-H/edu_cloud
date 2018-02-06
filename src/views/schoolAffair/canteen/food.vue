<template>
    <div class="food">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div class="floatLeft" style="margin-left: 34px; width: 45%;">菜品名称：</div>
                    <el-input v-model="searchInfo.foodName" style="width: auto" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;  margin-left: 15px;" class="VCenter" :span="4">
                    <div  class="floatLeft">菜品：</div>
                    <el-select :clearable="true" v-model="searchInfo.foodTypeId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in foodTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button @click="searchFood" style="margin-left: 20px" >查询</el-button>
                    <el-button @click="showAddFood" type="primary">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <!--菜品列表-->
        <foodList  v-loading="loadingList" :listInfo="listInfo" @editFood="showEditFood" @deleteFood="showDeleteFood"></foodList>
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
                title="编辑菜品"
                :visible.sync="editFoodDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="菜品名称">
                    <el-input v-model="editFoodInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="菜品类型">
                    <el-select :clearable="true" v-model="editFoodInfo.classifyId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in foodTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="editFoodInfo.price"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editFoodInfo.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editFoodDialog = false">取 消</el-button>
                <el-button type="primary" @click="editFood">确 定</el-button>
            </span>
        </el-dialog>
        <!--新增对话框-->
        <el-dialog
                title="新增菜品"
                :visible.sync="addFoodDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="100px">
                <el-form-item label="菜品名称">
                    <el-input v-model="addFoodInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="菜品类型">
                    <el-select :clearable="true" v-model="addFoodInfo.classifyId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in foodTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="addFoodInfo.price"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addFoodInfo.remark"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addFoodDialog = false">取 消</el-button>
                <el-button type="primary" @click="addFood">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除菜品"
                :visible.sync="deleteFoodDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <span>是否要删除此条数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteFoodDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteFood">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import foodList from "./foodList.vue";
    import httpRequest from "@/api/schoolAffair.js";
    //导入vuex 的辅助函数
    import {mapState} from "vuex";  //用在computed属性中
    import {mapGetters} from 'vuex';//用在 computed属性中
    import {mapActions} from 'vuex';//用在 methods属性中
    import handleTime from "../handleTime.js";
    //定义请求 获取foodtype 数据 的函数
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/general/canteen/food/list",submitData,data=>{
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
        if(this.searchInfo.foodName){
            submitData["nameKey"]=this.searchInfo.foodName;
        }
        if(this.searchInfo.foodTypeId){
            submitData["classifyId"]=this.searchInfo.foodTypeId;
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
        name:"food",
        mounted(){
            //查询菜品 第一次访问页面或刷新页面
            var submitData={
                pageNum : 1,
                pageSize : 10,
            };
            requestList.call(this,submitData);
            //获取所有的菜品类型
            httpRequest.get("/general/canteen/classify/all","",data=>{
                if(data.data.meta.success){//成功
                    this.foodTypeOptions=data.data.data;
                }else{
                    this.$message.error("获取菜品类型失败，请重试");
                }
            });
        },
        data(){
            return {
                loadingList:false,//列表加载效果
                paginationIsRefresh:true, //控制翻页刷新用以跟随后台的翻页数据
                foodTypeOptions: [],//菜品的类型
                searchInfo:{  //搜索信息
                    foodName:"",
                    foodCode:"",
                    foodTypeId:""
                },
                listInfo:[],
                addFoodInfo:{
                    classifyId:"",
                    classify:"",
                    name:"",
                    price:"",
                    remark:"" //可空
                },
                editFoodInfo:{
                    classifyId:"",
                    classify:"",
                    name:"",
                    price:"",
                    remark:""//可空
                },
                addFoodDialog:false,
                editFoodDialog:false,
                deleteFoodDialog:false,//对话框
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
            "foodList":foodList
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
            searchFood(){
                var submitData={
                    pageNum : 1,
                    pageSize : this.paginationInfo.pageSize,
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            /*添加*/
            showAddFood(){
                this.addFoodDialog=true;//显示添加的对话框
            },
            addFood(){
                if(this.addFoodInfo.name && this.addFoodInfo.price && this.addFoodInfo.classifyId){
                    //遍历菜品分类获取菜品名称
                    var classifyName="";
                    for(var i=0;i<this.foodTypeOptions.length;i++){
                        if(this.addFoodInfo.classifyId==this.foodTypeOptions[i].id){
                            classifyName=this.foodTypeOptions[i].name;
                            break;
                        }
                    }
                    var submitData={
                        classifyId:this.addFoodInfo.classifyId,
                        classify:classifyName,
                        name:this.addFoodInfo.name,
                        price:parseFloat(this.addFoodInfo.price)
                    };
                    if(this.addFoodInfo.remark){
                        submitData["remark"]=this.addFoodInfo.remark;
                    }
                    //发送请求
                    httpRequest.post("/general/canteen/food/add",submitData,data=>{
                        if(data.data.meta.success){
                            //添加数据成功 刷新页面
                            var submitData={
                                pageNum : 1,//默认条转至首页
                                pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                            };
                            requestList.call(this,submitData);
                            //隐藏对话框
                            this.addFoodDialog=false;
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
            showEditFood(index,row){
                this.editObject={
                    index,
                    row
                };//记录待编辑的对象
                //将当前对象的值绑定到对话框中
                this.editFoodInfo["name"]=row.name;
                this.editFoodInfo["classifyId"]=row.classifyId;
                this.editFoodInfo["price"]=row.price;
                this.editFoodInfo["remark"]=row.remark;
                this.editFoodDialog=true;//显示对话框
            },
            editFood(){
                if(this.editFoodInfo.name && this.editFoodInfo.price && this.editFoodInfo.classifyId){
                    //遍历菜品分类获取菜品名称
                    var classifyName="";
                    for(var i=0;i<this.foodTypeOptions.length;i++){
                        if(this.editFoodInfo.classifyId==this.foodTypeOptions[i].id){
                            classifyName=this.foodTypeOptions[i].name;
                            break;
                        }
                    }
                    var submitData={
                        id:this.editObject.row.id,
                        classifyId:this.editFoodInfo.classifyId,
                        classify:classifyName,
                        name:this.editFoodInfo.name,
                        price:parseFloat(this.editFoodInfo.price),
                    };
                    if(this.editFoodInfo.remark){
                        submitData["remark"]=this.editFoodInfo.remark;
                    }
                    //发送请求
                    httpRequest.put("/general/canteen/food/update",submitData,data=>{
                        if(data.data.meta.success){
                            this.editFoodDialog=false;//隐藏编辑对话框
                            //同步页面更改
                            this.listInfo[this.editObject.index]["name"]=submitData.name;
                            this.listInfo[this.editObject.index]["price"]=submitData.price;
                            this.listInfo[this.editObject.index]["remark"]=data.data.data.remark;
                            this.listInfo[this.editObject.index]["classify"]=submitData.classify;
                            this.listInfo[this.editObject.index]["classifyId"]=submitData.classifyId;
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
                    this.$message.error("编辑信息输入不合法");
                }
            },
            showDeleteFood(index,row){
                this.deleteObject={index, row};
                this.deleteFoodDialog=true;
            },
            deleteFood(){
                var url="/general/canteen/food/remove/"+this.deleteObject.row.id;
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
                        this.deleteFoodDialog=false;
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