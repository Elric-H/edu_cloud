<template>
    <div class="store">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button @click="showAdd" style="margin:0 20px 0 40px;" type="primary">添加</el-button>
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
                title="编辑学科"
                :visible.sync="editDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="学科">
                    <el-input v-model="editInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="简称">
                    <el-input v-model="editInfo.shorthand"></el-input>
                </el-form-item>
                <el-form-item label="学科类型">
                    <el-select :clearable="true" v-model="editInfo.typeName" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in typeNameOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学科类别">
                    <el-select :clearable="true" v-model="editInfo.categoryName" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in categoryNameOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总分">
                    <el-input v-model="editInfo.fullScore"></el-input>
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
                title="新增学科"
                :visible.sync="addDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="学科">
                    <el-input v-model="addInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="简称">
                    <el-input v-model="addInfo.shorthand"></el-input>
                </el-form-item>
                <el-form-item label="学科类型">
                    <el-select :clearable="true" v-model="addInfo.typeName" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in typeNameOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学科类别">
                    <el-select :clearable="true" v-model="addInfo.categoryName" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in categoryNameOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总分">
                    <el-input v-model="addInfo.fullScore"></el-input>
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
                title="删除学科"
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
    //导入userInfo的配置文件
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/edu-system/common/getAllSubject",submitData,data=>{
            if(data.data.meta.success){//成功
                var paginationInfo={};
                paginationInfo["currentPage"]=data.data.data.pageTools.currentPage;
                paginationInfo["totalSize"]=data.data.data.pageTools.totalSize;
                paginationInfo["pageSize"]=submitData.perPage;
                this.changeCurrentPage(paginationInfo);
                handleTime(data.data.data.beanList);
                this.listInfo=data.data.data.beanList; //获取到的列表数据
            }else{
                this.$message.error('获取列表信息失败，请重试');
            }
            this.paginationIsRefresh=true;
            this.loadingList=false;
        });
    }
    //定义处理可空字段的处理函数
    function handleCanNotParamAdd(submitData){
        if(this.addInfo.shorthand){
            submitData["shorthand"]=this.addInfo.shorthand;
        }
        if(this.addInfo.fullScore){
            submitData["fullScore"]=this.addInfo.fullScore;
        }
        if(this.addInfo.remark){
            submitData["description"]=this.addInfo.remark;
        }
    }
    function handleCanNotParamEdit(submitData){
        if(this.editInfo.shorthand){
            submitData["shorthand"]=this.editInfo.shorthand;
        }
        if(this.editInfo.fullScore){
            submitData["fullScore"]=this.editInfo.fullScore;
        }
        if(this.editInfo.remark){
            submitData["description"]=this.editInfo.remark;
        }
    }
    export default {
        name:"subjectManage",//学科管理
        mounted(){
            //查询菜品分类 第一次访问页面或刷新页面
            var submitData={
                currentPage : 1,
                perPage : 10,
            };
            requestList.call(this,submitData);
            //获取学科类型
            var submitTypeData={
                type:"SUBJECT_TYPE"
            };
            httpRequest.get("/edu-system/code/getTypeCodes",submitTypeData,data=>{
                if(data.data.meta.success){
                    this.typeNameOptions=data.data.data;
                }else{
                    this.$message.error('获取学科类型信息失败，请重试');
                }

            });
            //获取学科类别
            var submitCategoryData={
                type:"SUBJECT_CATEGORY"
            };
            httpRequest.get("/edu-system/code/getTypeCodes",submitCategoryData,data=>{
                if(data.data.meta.success){
                    this.categoryNameOptions=data.data.data;
                }else{
                    this.$message.error('获取学科类别信息失败，请重试');
                }

            });
        },
        data(){
            return {
                listInfo:[],
                typeNameOptions:[],
                categoryNameOptions:[],
                editInfo:{
                    name:"",
                    shorthand:"",
                    typeName:"",
                    categoryName:"",
                    fullScore:"",
                    remark:""
                },
                addInfo:{
                    name:"",
                    shorthand:"",
                    typeName:"",
                    categoryName:"",
                    fullScore:"",
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
            handleSizeChange(val) {
                var submitData={
                    currentPage : 1,
                    perPage : val
                };
                requestList.call(this,submitData);
            },
            handleCurrentChange(val) {
                var submitData={
                    currentPage : val,
                    perPage : this.paginationInfo.pageSize
                };
                requestList.call(this,submitData);
            },
            showAdd(){
                this.addDialog=true;
            },
            add(){
                if(this.addInfo.name && this.addInfo.typeName && this.addInfo.categoryName){
                    var submitData={
                        name:this.addInfo.name,
                        typeName:this.addInfo.typeName,
                        categoryName:this.addInfo.categoryName
                    };
                    handleCanNotParamAdd.call(this,submitData);
                    //发送请求
                    httpRequest.post("/edu-system/common/subject",submitData,data=>{
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
                this.editInfo["shorthand"]=row.shorthand;
                this.editInfo["fullScore"]=row.fullScore;
                this.editInfo["remark"]=row.description;
                this.editDialog=true;//显示对话框
            },
            edit(){
                if(this.editInfo.name && this.editInfo.typeName && this.editInfo.categoryName){
                    var submitData={
                        id:this.editObject.row.id,
                        name:this.editInfo.name,
                        typeName:this.editInfo.typeName,
                        categoryName:this.editInfo.categoryName
                    };
                    handleCanNotParamEdit.call(this,submitData);
                    //发送请求
                    httpRequest.put("/edu-system/common/subject",submitData,data=>{
                        if(data.data.meta.success){
                            this.editDialog=false;//隐藏编辑对话框
                            //同步页面更改
                            this.listInfo[this.editObject.index]["name"]=submitData.name;
                            this.listInfo[this.editObject.index]["typeName"]=submitData.typeName;
                            this.listInfo[this.editObject.index]["categoryName"]=submitData.categoryName;
                            this.listInfo[this.editObject.index]["shorthand"]=data.data.data.shorthand;
                            this.listInfo[this.editObject.index]["fullScore"]=data.data.data.fullScore;
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
                var url="/edu-system/common/subject/"+this.deleteObject.row.id;
                httpRequest.delete(url,"",data=>{
                    if(data.data.meta.success){
                        var submitData={
                            currentPage : this.paginationInfo.currentPage,//当前设置的页面数
                            perPage : this.paginationInfo.pageSize,//当前设置的页面大小
                        };
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