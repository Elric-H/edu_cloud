<template>
    <div class="schoolAsset">
        <!--搜索条-->
        <div class="search-header">
            <el-row >
                <el-col style="height: 50px;margin-left: 10px;" class="VCenter" :span="4">
                    <div class="floatLeft" style="width: 70%">校产名称：</div>
                    <el-input v-model="searchInfo.nameKey" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;margin-left: 3px;" class="VCenter" :span="4">
                    <div class="floatLeft" style="width:80%;">供应商名称：</div>
                    <el-input v-model="searchInfo.supplierKey" style="width: auto" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;margin-left: 3px;" class="VCenter" :span="4">
                    <div class="floatLeft" style="width: 48%">负责人：</div>
                    <el-input v-model="searchInfo.leaderKey" style="width: auto" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;margin-left: 3px;" class="VCenter" :span="4">
                    <div class="floatLeft" style="width: 48%">使用人：</div>
                    <el-input v-model="searchInfo.useUserKey" style="width: auto" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;margin-left: 3px;" class="VCenter" :span="4">
                    <div class="floatLeft" style="width: 80%">使用人电话：</div>
                    <el-input v-model="searchInfo.useUserPhone" style="width: auto" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="2">
                    <el-button @click="searchSchoolAsset" style="margin-left: 20px">查询</el-button>
                    <el-button @click="showAddSchoolAsset" type="primary">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <!--菜品列表-->
        <List v-loading="loadingList" :listInfo="listInfo" @editSchoolAsset="showEditSchoolAsset" @deleteSchoolAsset="showDeleteSchoolAsset"></List>
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
                title="编辑校产"
                :visible.sync="editSchoolAssetDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="90px">
                <el-form-item style="margin-bottom: 8px;" label="校产名称">
                    <el-input v-model="eidtSchoolAssetInfo.name" ></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="数量">
                    <el-input v-model="eidtSchoolAssetInfo.num"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="供应商">
                    <el-select :clearable="true" v-model="eidtSchoolAssetInfo.supplierId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in supplierOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="库存量">
                    <el-input v-model="eidtSchoolAssetInfo.leftNum"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="单价">
                    <el-input v-model="eidtSchoolAssetInfo.unitPrice"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="状态">
                    <el-radio-group v-model="eidtSchoolAssetInfo.useStatus">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">维修中</el-radio>
                        <el-radio :label="3">报废</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="负责人">
                    <el-input v-model="eidtSchoolAssetInfo.leader"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="使用人">
                    <el-input v-model="eidtSchoolAssetInfo.useUser"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="使用人编号">
                    <el-input v-model="eidtSchoolAssetInfo.number"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="使用人电话">
                    <el-input v-model="eidtSchoolAssetInfo.useUserPhone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editSchoolAssetDialog = false">取 消</el-button>
                <el-button type="primary" @click="editSchoolAsset">确 定</el-button>
            </span>
        </el-dialog>
        <!--新增对话框-->
        <el-dialog
                title="新增校产"
                :visible.sync="addSchoolAssetDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="90px">
                <el-form-item style="margin-bottom: 8px;" label="校产名称">
                    <el-input v-model="addSchoolAssetInfo.name" ></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="数量">
                    <el-input v-model="addSchoolAssetInfo.num"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="供应商">
                    <el-select :clearable="true" v-model="addSchoolAssetInfo.supplierId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in supplierOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="库存量">
                    <el-input v-model="addSchoolAssetInfo.leftNum"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="单价">
                    <el-input v-model="addSchoolAssetInfo.unitPrice"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="状态">
                    <el-radio-group v-model="addSchoolAssetInfo.useStatus">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">维修中</el-radio>
                        <el-radio :label="3">报废</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="负责人">
                    <el-input v-model="addSchoolAssetInfo.leader"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="使用人">
                    <el-input v-model="addSchoolAssetInfo.useUser"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="使用人编号">
                    <el-input v-model="addSchoolAssetInfo.number"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px;" label="使用人电话">
                    <el-input v-model="addSchoolAssetInfo.useUserPhone"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addSchoolAssetDialog = false">取 消</el-button>
                <el-button type="primary" @click="addSchoolAsset">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除校产"
                :visible.sync="deleteSchoolAssetDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <span>是否要删除此条数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteSchoolAssetDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteSchoolAsset">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import List from "./list.vue";
    import httpRequest from "@/api/schoolAffair.js";
    import infoVerify from "../../infoVerify";
    //导入vuex 的辅助函数
    import {mapState} from "vuex";  //用在computed属性中
    import {mapGetters} from 'vuex';//用在 computed属性中
    import {mapActions} from 'vuex';//用在 methods属性中
    import handleTime from "../../handleTime.js";
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/general/asset/list",submitData,data=>{
            if(data.status==200){//成功
                var paginationInfo={};
                paginationInfo["currentPage"]=data.data.data.pageNum;
                paginationInfo["totalSize"]=data.data.data.totalSize;
                paginationInfo["pageSize"]=data.data.data.pageSize;
                this.changeCurrentPage(paginationInfo);
                this.listInfo=data.data.data.beanList; //获取到的列表数据
                handleTime(this.listInfo);
                //处理状态
                for(var i=0;i<this.listInfo.length;i++){
                    switch ( parseInt( this.listInfo[i].useStatus ) ){
                        case 1:this.listInfo[i].status="正常";break;
                        case 2:this.listInfo[i].status="维修中";break;
                        case 3:this.listInfo[i].status="报废";break;
                    }
                }
            }else{
                this.$message.error("获取列表信息失败，请重试");
            }
            this.paginationIsRefresh=true;
            this.loadingList=false;
        });
    }
    //定义处理可空字段的处理函数
    function handleCanNotParam(submitData){
        if(this.searchInfo.nameKey){
            submitData["nameKey"]=this.searchInfo.nameKey;
        }
        if(this.searchInfo.supplierKey){
            submitData["supplierKey"]=this.searchInfo.supplierKey;
        }
        if(this.searchInfo.leaderKey){
            submitData["leaderKey"]=this.searchInfo.leaderKey;
        }
        if(this.searchInfo.useUserKey){
            submitData["useUserKey"]=this.searchInfo.useUserKey;
        }
        if(this.searchInfo.useUserPhone){
            submitData["useUserPhone"]=this.searchInfo.useUserPhone;
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
        name:"schoolAsset",
        mounted(){
            //查询菜品分类 第一次访问页面或刷新页面
            var submitData={
                pageNum : 1,
                pageSize : 10,
            };
            requestList.call(this,submitData);
            //获取所有的供应商id
            httpRequest.get("/general/supplier/all","",data=>{
                if(data.data.meta.success){
                    this.supplierOptions=data.data.data;
                }else{
                    this.$message.error("获取供应商失败");
                }
            });
        },
        data(){
            return {
                loadingList:false,
                searchInfo:{
                    nameKey:"",
                    supplierKey:"",
                    leaderKey:"",
                    useUserKey:"",
                    useUserPhone:"",
                },
                listInfo:[],
                supplierOptions:[],
                eidtSchoolAssetInfo:{
                    name:"",
                    num:"",
                    supplierId:"",
                    leftNum:"",
                    unitPrice:"",
                    useStatus:"",
                    leader:"",
                    number:"",
                    useUser:"",
                    useUserPhone:""
                },
                addSchoolAssetInfo:{
                    name:"",
                    num:"",
                    supplierId:"",
                    leftNum:"",
                    unitPrice:"",
                    useStatus:"",
                    leader:"",
                    number:"",
                    useUser:"",
                    useUserPhone:""
                },
                editSchoolAssetDialog: false,//编辑菜品对话框
                addSchoolAssetDialog:false,//添加菜品对话框
                deleteSchoolAssetDialog:false,//删除菜品对话框
                editObject:{},//用以记录待编辑的对象
                deleteObject:{},//用以记录待删除的对象
                paginationIsRefresh:true, //控制翻页刷新用以跟随后台的翻页数据
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
            searchSchoolAsset(){
                var submitData={
                    pageNum : 1,
                    pageSize : this.paginationInfo.pageSize
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            showAddSchoolAsset(){
                this.addSchoolAssetDialog=true;
            },
            addSchoolAsset(){
                if(this.addSchoolAssetInfo.name && this.addSchoolAssetInfo.num&& this.addSchoolAssetInfo.supplierId
                    && this.addSchoolAssetInfo.leftNum&& this.addSchoolAssetInfo.unitPrice&& this.addSchoolAssetInfo.useStatus
                    && this.addSchoolAssetInfo.leader&& this.addSchoolAssetInfo.number&& this.addSchoolAssetInfo.useUser&& this.addSchoolAssetInfo.useUserPhone){
                    if(infoVerify.phoneNumVerify(this.addSchoolAssetInfo.useUserPhone) ){
                        var supplier="";
                        //获取供应商名称
                        for(var i=0;i<this.supplierOptions.length;i++){
                            if(this.addSchoolAssetInfo.supplierId ==this.supplierOptions[i].id){
                                supplier=this.supplierOptions[i].name;
                                break;
                            }
                        }
                        var submitData={
                            name:this.addSchoolAssetInfo.name,
                            num:this.addSchoolAssetInfo.num,
                            supplierId:this.addSchoolAssetInfo.supplierId,
                            supplier:supplier,
                            leftNum:this.addSchoolAssetInfo.leftNum,
                            unitPrice:this.addSchoolAssetInfo.unitPrice,
                            useStatus:this.addSchoolAssetInfo.useStatus,
                            leader:this.addSchoolAssetInfo.leader,
                            number:this.addSchoolAssetInfo.number,
                            useUser:this.addSchoolAssetInfo.useUser,
                            useUserPhone:this.addSchoolAssetInfo.useUserPhone,
                        };
                        //发送请求
                        httpRequest.post("/general/asset/add",submitData,data=>{
                            if(data.data.meta.success){
                                //添加数据成功 刷新页面
                                var submitData={
                                    pageNum : 1,//默认条转至首页
                                    pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                                };
                                requestList.call(this,submitData);
                                //隐藏对话框
                                this.addSchoolAssetDialog=false;
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
            showEditSchoolAsset(index,row){
                this.editObject={index,row};
                //显示修改的数据在编辑栏中
                this.eidtSchoolAssetInfo["name"]=row.name;
                this.eidtSchoolAssetInfo["num"]=row.num;
	            this.eidtSchoolAssetInfo["supplierId"]=row.supplierId;
	            this.eidtSchoolAssetInfo["supplier"]=row.supplier;
	            this.eidtSchoolAssetInfo["leftNum"]=row.leftNum;
	            this.eidtSchoolAssetInfo["unitPrice"]=row.unitPrice;
	            this.eidtSchoolAssetInfo["useStatus"]=row.useStatus;
	            this.eidtSchoolAssetInfo["leader"]=row.leader;
	            this.eidtSchoolAssetInfo["number"]=row.number;
                this.eidtSchoolAssetInfo["useUser"]=row.useUser;
                this.eidtSchoolAssetInfo["useUserPhone"]=row.useUserPhone;
                this.editSchoolAssetDialog=true;
            },
            editSchoolAsset(){
                if(this.eidtSchoolAssetInfo.name && this.eidtSchoolAssetInfo.num
                    && this.eidtSchoolAssetInfo.supplierId&& this.eidtSchoolAssetInfo.leftNum
                    && this.eidtSchoolAssetInfo.unitPrice&& this.eidtSchoolAssetInfo.useStatus
                    && this.eidtSchoolAssetInfo.leader&& this.eidtSchoolAssetInfo.number
                    && this.eidtSchoolAssetInfo.useUser&& this.eidtSchoolAssetInfo.useUserPhone){
                    if(infoVerify.phoneNumVerify(this.eidtSchoolAssetInfo.useUserPhone) ){
                        var supplier="";
                        //获取供应商名称
                        for(var i=0;i<this.supplierOptions.length;i++){
                            if(this.eidtSchoolAssetInfo.supplierId ==this.supplierOptions[i].id){
                                supplier=this.supplierOptions[i].name;
                                break;
                            }
                        }
                        var submitData={
                            id:this.editObject.row.id,
                            name:this.eidtSchoolAssetInfo.name,
                            num:this.eidtSchoolAssetInfo.num,
                            supplierId:this.eidtSchoolAssetInfo.supplierId,
                            supplier:supplier,
                            leftNum:this.eidtSchoolAssetInfo.leftNum,
                            unitPrice:this.eidtSchoolAssetInfo.unitPrice,
                            useStatus:this.eidtSchoolAssetInfo.useStatus,
                            leader:this.eidtSchoolAssetInfo.leader,
                            number:this.eidtSchoolAssetInfo.number,
                            useUser:this.eidtSchoolAssetInfo.useUser,
                            useUserPhone:this.eidtSchoolAssetInfo.useUserPhone,
                        };
                        //发送请求
                        httpRequest.put("/general/asset/update",submitData,data=>{
                            if(data.data.meta.success){
                                this.editSchoolAssetDialog=false;//隐藏编辑对话框
                                //同步页面更改
                                this.listInfo[this.editObject.index]["name"]=submitData.name;
                                this.listInfo[this.editObject.index]["num"]=submitData.num;
                                this.listInfo[this.editObject.index]["supplierId"]=submitData.supplierId;
                                this.listInfo[this.editObject.index]["supplier"]=submitData.supplier;
                                this.listInfo[this.editObject.index]["leftNum"]=submitData.leftNum;
                                this.listInfo[this.editObject.index]["unitPrice"]=submitData.unitPrice;
                                this.listInfo[this.editObject.index]["useStatus"]=submitData.useStatus;
                                //处理状态
                                switch ( parseInt( submitData.useStatus ) ){
                                    case 1:this.listInfo[this.editObject.index]["status"]="正常";break;
                                    case 2:this.listInfo[this.editObject.index]["status"]="维修中";break;
                                    case 3:this.listInfo[this.editObject.index]["status"]="报废";break;
                                }
                                this.listInfo[this.editObject.index]["leader"]=submitData.leader;
                                this.listInfo[this.editObject.index]["number"]=submitData.number;
                                this.listInfo[this.editObject.index]["useUser"]=submitData.useUser;
                                this.listInfo[this.editObject.index]["useUserPhone"]=submitData.useUserPhone;
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
                    this.$message.error("编辑信息输入不合法，请重试");
                }
            },
            showDeleteSchoolAsset(index,row){
                this.deleteObject={index,row};
                this.deleteSchoolAssetDialog=true;
            },
            deleteSchoolAsset(){
                var url="/general/asset/remove/"+this.deleteObject.row.id;
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
                        this.deleteSchoolAssetDialog=false;
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
    .schoolAsset .pagination{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-color: #ffffff;
        padding-bottom: 20px;
    }
</style>