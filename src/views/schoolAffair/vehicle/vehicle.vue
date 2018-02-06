<template>
    <div class="vehicle">
        <!--搜索条-->
        <div v-show="!showRepairManage" class="search-header">
            <el-row >
                <el-col style="height: 50px;" class="VCenter" :span="5">
                    <div  class="floatLeft searchInput" style="margin-left: 34px;">车辆名称：</div>
                    <el-input v-model="searchInfo.carName" class="floatLeft" style="width:auto;" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px; " class="VCenter" :span="4">
                    <div style="padding-left: 4px;" class="floatLeft searchInput">车牌号：</div>
                    <el-input v-model="searchInfo.carNumber" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="4">
                    <div class="floatLeft" style="width: 60%; padding-left: 4px;">车主名字：</div>
                    <el-input v-model="searchInfo.carOwner" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="4">
                    <div class="floatLeft" style="width: 60%; padding-left: 4px;">联系方式：</div>
                    <el-input v-model="searchInfo.ownerPhone" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="4">
                    <div  class="floatLeft" style="width: 45%; padding-left: 4px;">车辆类型：</div>
                    <el-select :clearable="true" v-model="searchInfo.carTypeId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in vehicleTypeOptions"
                                :key="item.id"
                                :label="item.classify"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col style="height: 50px;" class="VCenter" :span="2">
                    <el-button @click="searchVehicle" style="margin-left: 20px">查询</el-button>
                    <el-button @click="showAddVehicle" type="primary">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <!--菜品列表-->
        <List v-loading="loadingList" :listInfo="listInfo" @editVehicle="showEditVehicle" @deleteVehicle="showDeleteVehicle" @hidePaginationSearch="hidePaginationSearch" @showPaginationSearch="showPaginationSearch"></List>
        <!--分页代码-->
        <div v-show="!showRepairManage" class="pagination" v-if="paginationIsRefresh">
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
                title="编辑车辆"
                :visible.sync="editVehicleDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="90px">
                <el-form-item label="车辆名称">
                    <el-input v-model="editVehicleInfo.carName"></el-input>
                </el-form-item>
                <el-form-item label="车辆类型">
                    <el-select :clearable="true" v-model="editVehicleInfo.carTypeId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in vehicleTypeOptions"
                                :key="item.id"
                                :label="item.classify"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="有无车牌号">
                    <el-radio-group @change="isHaveCarNumFunEdit" v-model="editVehicleInfo.isHaveCarNum">
                        <el-radio :label="1">有</el-radio>
                        <el-radio :label="0">无</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="editVehicleInfo.editCarNum" label="车牌号">
                    <el-input v-model="editVehicleInfo.carNumber"></el-input>
                </el-form-item>
                <el-form-item label="车主">
                    <el-input v-model="editVehicleInfo.carOwner"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="editVehicleInfo.ownerPhone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVehicleDialog = false">取 消</el-button>
                <el-button type="primary" @click="editVehicle">确 定</el-button>
            </span>
        </el-dialog>
        <!--新增对话框-->
        <el-dialog
                title="新增车辆"
                :visible.sync="addVehicleDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="90px">
                <el-form-item label="车辆名称">
                    <el-input v-model="addVehicleInfo.carName"></el-input>
                </el-form-item>
                <el-form-item label="车辆类型">
                    <el-select :clearable="true" v-model="addVehicleInfo.carTypeId" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in vehicleTypeOptions"
                                :key="item.id"
                                :label="item.classify"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="有无车牌号">
                    <el-radio-group @change="isHaveCarNumFunAdd" v-model="addVehicleInfo.isHaveCarNum">
                        <el-radio :label="1">有</el-radio>
                        <el-radio :label="0">无</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="addVehicleInfo.addCarNum" label="车牌号">
                    <el-input v-model="addVehicleInfo.carNumber"></el-input>
                </el-form-item>
                <el-form-item label="车主">
                    <el-input v-model="addVehicleInfo.carOwner"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="addVehicleInfo.ownerPhone"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addVehicleDialog = false">取 消</el-button>
                <el-button type="primary" @click="addVehicle">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除车辆"
                :visible.sync="deleteVehicleDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <span>是否要删除此条数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVehicleDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteVehicle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import List from "./list.vue";
    import httpRequest from "@/api/schoolAffair.js";
    import handleTime from "../handleTime";
    import infoVerify from "../infoVerify";
    //导入vuex 的辅助函数
    import {mapState} from "vuex";  //用在computed属性中
    import {mapGetters} from 'vuex';//用在 computed属性中
    import {mapActions} from 'vuex';//用在 methods属性中
    //导入userInfo的配置文件
    import userInfo from "../userInfoConfig";
    function requestList(submitData){
        this.paginationIsRefresh=false;
        this.loadingList=true;
        httpRequest.get("/general/voiture/list",submitData,data=>{
            if(data.data.meta.success){//成功
                var paginationInfo={};
                paginationInfo["currentPage"]=data.data.data.pageNum;
                paginationInfo["totalSize"]=data.data.data.totalSize;
                paginationInfo["pageSize"]=data.data.data.pageSize;
                this.changeCurrentPage(paginationInfo);
                handleTime(data.data.data.beanList);//处理时间
                handleSchoolCar(data.data.data.beanList);//处理校车专有的查看维修功能
                this.listInfo=data.data.data.beanList; //获取到的列表数据
            }else{
                this.$message.error("获取列表信息失败，请重试");
            }
            this.paginationIsRefresh=true;
            this.loadingList=false;
        });
    }
    //处理校车专有的查看维修功能
    function handleSchoolCar(data){
        for(var i=0;i<data.length;i++){
            if(data[i].classifyId==3){//校车id
                data[i]["showRepair"]=true;
            }else{
                data[i]["showRepair"]=false;
            }
        }
    }

    //定义处理可空字段的处理函数
    function handleCanNotParam(submitData){
        if(this.searchInfo.carName){
            submitData["nameKey"]=this.searchInfo.carName;
        }
        if(this.searchInfo.carNumber){
            submitData["plateKey"]=this.searchInfo.carNumber;
        }
        if(this.searchInfo.carOwner){
            submitData["belongUserKey"]=this.searchInfo.carOwner;
        }
        if(this.searchInfo.ownerPhone){
            submitData["contactPhone"]=this.searchInfo.ownerPhone;
        }
        if(this.searchInfo.carTypeId){
            submitData["classifyId"]=this.searchInfo.carTypeId;
        }
    }
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
    export default {
        name:"vehicle",
        mounted(){
            //查询菜品分类 第一次访问页面或刷新页面
            var submitData={
                pageNum : 1,
                pageSize : 10,
            };
            requestList.call(this,submitData);

            //获取所有的车辆类型
            httpRequest.get("/general/voiture/classify","",data=>{
                if(data.data.meta.success){
                    this.vehicleTypeOptions=data.data.data;
                }else{
                    this.$message.error(`获取车辆类型失败，请重试`);
                }
            });
        },
        data(){
            return {
                loadingList:false,
                listInfo:[],
                searchInfo:{
                    carName:"",
                    carNumber:"",
                    carOwner:"",//车主
                    ownerPhone:"",
                    carTypeId:"",
                },
                vehicleTypeOptions:[],
                addVehicleInfo:{
                    carName:"",
                    carTypeId:"",
                    carType:"",
                    carNumber:"",
                    carOwner:"",
                    ownerPhone:"",
                    isHaveCarNum:"",//接受是否有车牌号

                    addCarNum:false,//是否显示有无车牌号
                },
                editVehicleInfo:{
                    carName:"",
                    carTypeId:"",
                    carType:"",
                    carNumber:"",
                    carOwner:"",
                    ownerPhone:"",
                    isHaveCarNum:"",

                    editCarNum:false,//是否显示有无车牌号
                },
                showRepairManage:false,//是否显示维修管理界面
                editVehicleDialog: false,//编辑菜品对话框
                addVehicleDialog:false,//添加菜品对话框
                deleteVehicleDialog:false,//删除菜品对话框
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
            searchVehicle(){
                var submitData={
                    pageNum : 1,
                    pageSize : this.paginationInfo.pageSize
                };
                //处理是否有搜索数据
                handleCanNotParam.call(this,submitData);
                requestList.call(this,submitData);
            },
            showAddVehicle(){
                this.addVehicleDialog=true;//显示对话框
            },
            addVehicle(){
                if(this.addVehicleInfo.carName && this.addVehicleInfo.carTypeId && this.addVehicleInfo.carOwner && this.addVehicleInfo.ownerPhone && this.addVehicleInfo.isHaveCarNum!==""){
                    if(infoVerify.phoneNumVerify(this.addVehicleInfo.ownerPhone) ){
                        //获取分类的名字
                        var classify='';
                        for(var i=0;i<this.vehicleTypeOptions.length;i++){
                            if(this.addVehicleInfo.carTypeId==this.vehicleTypeOptions[i].id){
                                classify=this.vehicleTypeOptions[i].classify;
                                break;
                            }
                        }
                        var submitData={
                            name:this.addVehicleInfo.carName,
                            classifyId:parseInt(this.addVehicleInfo.carTypeId),
                            classify:classify,
                            belongTo:this.addVehicleInfo.carOwner,
                            contactPhone:this.addVehicleInfo.ownerPhone,
                            isPlate:this.addVehicleInfo.isHaveCarNum
                        };
                        //改字段可空
                        if(this.addVehicleInfo.isHaveCarNum==1){
                            if(this.addVehicleInfo.carNumber){
                                submitData["plateNumber"]=this.addVehicleInfo.carNumber;
                            }else{
                                return;
                            }
                        }
                        //发送请求
                        httpRequest.post("/general/voiture/add",submitData,data=>{
                            if(data.data.meta.success){
                                var submitData={
                                    pageNum : 1,//默认条转至首页
                                    pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                                };
                                requestList.call(this,submitData);
                                this.addVehicleDialog=false; //隐藏对话框
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
                    this.$message.error("新增车辆数据输入错误");
                }
            },
            showEditVehicle(index,row){
                this.editObject={index,row};
                //对话框显示 编辑的内容
                this.editVehicleInfo.carName=row.name;
                this.editVehicleInfo.carNumber=row.plateNumber;
                this.editVehicleInfo.carOwner=row.belongTo;
                this.editVehicleInfo.ownerPhone=row.contactPhone;
                this.editVehicleInfo.isHaveCarNum=row.isPlate;
                this.editVehicleInfo.carNumber=row.plateNumber;
                this.editVehicleInfo.carTypeId=row.classifyId;
                if(this.editVehicleInfo.isHaveCarNum==1){
                    this.editVehicleInfo.editCarNum=true;
                }else{
                    this.editVehicleInfo.editCarNum=false;
                }
                this.editVehicleDialog=true;
            },
            editVehicle(){
                if(this.editVehicleInfo.carName&& this.editVehicleInfo.carTypeId && this.editVehicleInfo.carOwner&& this.editVehicleInfo.ownerPhone && this.editVehicleInfo.isHaveCarNum!==""){
                    if(infoVerify.phoneNumVerify(this.editVehicleInfo.ownerPhone) ){
                        //获取分类的名字
                        var classify='';
                        for(var i=0;i<this.vehicleTypeOptions.length;i++){
                            if(this.editVehicleInfo.carTypeId==this.vehicleTypeOptions[i].id){
                                classify=this.vehicleTypeOptions[i].classify;
                                break;
                            }
                        }
                        var submitData={
                            id:this.editObject.row.id,
                            name:this.editVehicleInfo.carName,
                            classifyId:parseInt(this.editVehicleInfo.carTypeId),
                            classify:classify,
                            belongTo:this.editVehicleInfo.carOwner,
                            contactPhone:this.editVehicleInfo.ownerPhone,
                            isPlate:this.editVehicleInfo.isHaveCarNum
                        };
                        //改字段可空
                        if(this.editVehicleInfo.isHaveCarNum==1){
                            if(this.editVehicleInfo.carNumber){
                                submitData["plateNumber"]=this.editVehicleInfo.carNumber;
                            }else{
                                return;
                            }
                        }
                        //发送请求
                        httpRequest.put("/general/voiture/update",submitData,data=>{
                            if(data.data.meta.success){
                                var submitData={
                                    pageNum : this.paginationInfo.currentPage,//当前设置的页面数
                                    pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                                };
                                handleCanNotParam.call(this,submitData);
                                requestList.call(this,submitData);
                                this.editVehicleDialog=false; //隐藏对话框
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
                    this.$message.error("编辑车辆数据输入错误");
                }
            },
            showDeleteVehicle(index,row){
                this.deleteObject={index,row};
                this.deleteVehicleDialog=true;//显示删除对话框
            },
            deleteVehicle(){
                var url="/general/voiture/remove/"+this.deleteObject.row.id;
                httpRequest.delete(url,"",data=>{
                    if(data.data.meta.success){
                        var submitData={
                            pageNum : this.paginationInfo.currentPage,//当前设置的页面数
                            pageSize : this.paginationInfo.pageSize,//当前设置的页面大小
                        };
                        handleCanNotParam.call(this,submitData);
                        requestList.call(this,submitData);
                        //隐藏对话框
                        this.deleteVehicleDialog=false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error("删除失败，请重试");
                    }
                });
            },
            isHaveCarNumFunAdd(data){
                if(data==0){
                    this.addVehicleInfo.addCarNum=false;//无车牌号
                }else{
                    this.addVehicleInfo.addCarNum=true;//有车牌号
                }
            },
            isHaveCarNumFunEdit(data){
                if(data==0){
                    this.editVehicleInfo.editCarNum=false;//无车牌号
                }else{
                    this.editVehicleInfo.editCarNum=true;//有车牌号
                }
            },
            hidePaginationSearch(){//隐藏翻页界面和搜索界面
                this.showRepairManage=true;
            },
            showPaginationSearch(){//显示翻页界面和搜索界面
                this.showRepairManage=false;
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
    .vehicle .pagination{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-color: #ffffff;
        padding-bottom: 20px;
    }
    .vehicle .searchInput{
        width: 46%;
    }
</style>