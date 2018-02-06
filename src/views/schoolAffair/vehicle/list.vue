<template>
    <div class="consume-list">
        <div v-show="showList">
            <el-table v-loading="loadingList" :data="listInfo" stripe  style="width: 100%">
                <el-table-column prop="name" label="车辆名称"  width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="classify" label="车辆类型"  width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号"  width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="belongTo" label="车主"  width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="contactPhone" label="联系方式" width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="150" header-align="center" align="center"></el-table-column>
                <el-table-column prop="lastUpdateTime" label="最近更新时间" width="150" header-align="center" align="center"></el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button
                                v-if="scope.row.showRepair"
                                size="mini"
                                type="primary"
                                @click="showRepairFun(scope.$index, scope.row)">维修管理</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--维修管理-->
        <div v-if="!showList" v-loading="loadingRepair" class="repair">
            <div class="add">
                <div class="repairTitle">
                    维修管理
                </div>
                <div class="repairInfo">
                    <span>校车名称:</span><span>{{schoolCarObject.row.name}}</span>
                    <span style="margin-left: 30px;">车牌号:</span><span>{{schoolCarObject.row.plateNumber}}</span>
                </div>
                <div class="addButtons">
                    <el-button @click="backTo"  style="margin-left: 35px;">返 回</el-button>
                    <el-button @click="showAddRepair"  style="margin-left: 10px;" type="primary">添 加</el-button>
                </div>
            </div>
            <el-table :data="repairInfo" stripe  style="width: 100%">
                <el-table-column prop="createTime" label="创建时间"  width="200" header-align="center" align="center"></el-table-column>
                <el-table-column prop="description" label="维修记录描述"  header-align="center" align="center"></el-table-column>
                <el-table-column label="操作" width="200" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="lookRepair(scope.$index, scope.row)">查 看</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="showDeleteRepair(scope.$index, scope.row)">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--新增维修对话框-->
        <el-dialog
                title="新增维修记录"
                :visible.sync="addRepairDialog"
                width="60%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="备注">
                    <el-input v-model="addRepairInfo.description"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                            :action="imgLoadUrl"
                            list-type="picture-card"
                            name="imgs"
                            :limit="5"
                            :on-exceed="handleExceed"
                            :on-success="handleSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRepairDialog = false">取 消</el-button>
                <el-button type="primary" @click="addRepair">确 定</el-button>
            </span>
        </el-dialog>
        <!--查看维修对话框-->
        <el-dialog
                title="查看维修记录详情"
                :visible.sync="lookRepairDialog"
                width="60%"
                :modal-append-to-body="false"
        >
            <div class="description">
                <span>描述：</span>
                <span>{{lookRepairInfo.description}}</span>
            </div>
            <div class="imgWrap">
                <div>图片：</div>
                <div class="img">
                    <img v-for="item in lookRepairInfo.imgs" :src="item"/>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary"  @click="lookRepairDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除对话框-->
        <el-dialog
                title="删除维修记录"
                :visible.sync="deleteRepairDialog"
                width="30%"
                :modal-append-to-body="false">
            <span>是否要删除此条数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteRepairDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteRepair">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import httpRequest from "@/api/schoolAffair.js";
    import imgUrl from "@/api/imgLoad.js";
    import handleTime from "../handleTime";
    //获取校车的维修信息
    function getSchoolCarRepairInfo(id){
        this.loadingRepair=true;
        var url="/general/voiture/repair/"+id;
        httpRequest.get(url,"",data=>{
            if(data.data.meta.success){
                handleTime(data.data.data);
                this.repairInfo=data.data.data;
            }else{
                this.$message.error("获取维修信息失败，请重试");
            }
            this.loadingRepair=false;
        });
    }
    export default {
        name: 'List',
        mounted() {

        },
        props:{
            'listInfo':Array
        },
        data() {
            var imgLoadUrl=imgUrl.url+'/img/any';
            return {
                loadingList: false,
                loadingRepair:false,
                showList:true,
                repairInfo:[],
                addRepairInfo:{
                    description:""
                },
                addRepairDialog:false,
                lookRepairDialog:false,
                deleteRepairDialog:false,
                schoolCarObject:{},//用于记录当前的校车对象
                deleteRepairObject:{},
                lookRepairInfo:{
                    description:"",
                    imgs:[]
                },
                //图片上传的字段
                dialogImageUrl: '',
                dialogVisible: false,
                imgList:[],
                imgLoadUrl:imgLoadUrl
            }
        },
        methods: {
            handleEdit(index, row) {
                //注册编辑事件
                this.$emit("editVehicle",index,row);
            },
            handleDelete(index, row) {
                //注册删除事件
                this.$emit("deleteVehicle",index,row);
            },
            backTo(){
                this.showList=true;
                this.$emit("showPaginationSearch");
            },
            showRepairFun(index,row){
                //注册隐藏搜索 和 翻页的显示
                this.$emit("hidePaginationSearch");
                this.showList=false;
                this.schoolCarObject={index,row};//用于记录当前的校车对象
                //获取维修记录
                getSchoolCarRepairInfo.call(this,row.id);
            },
            //添加维修记录
            showAddRepair(){
                this.addRepairDialog=true;//显示添加维修对话框
            },
            addRepair(){
                //处理上传的图片信息
                var imgList=[];//定义接收图片地址的临时变量
                for(var i=0;i<this.imgList.length;i++){
                    imgList.push(this.imgList[i].response.data[0]);
                }
                var repairPic=imgList.join("&");
                if(this.addRepairInfo.description){
                    var submitData={
                        voitureId:this.schoolCarObject.row.id,
                        voitureName:this.schoolCarObject.row.name,
                        plateNumber:this.schoolCarObject.row.plateNumber,
                        description:this.addRepairInfo.description,
                        repairPic:repairPic
                    };
                    httpRequest.post("/general/voiture/repair/add",submitData,data=>{
                        if(data.data.meta.success){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            getSchoolCarRepairInfo.call(this,submitData.voitureId);//刷新列表页
                        }else{
                            this.$message.error(`添加失败，请重试`);
                        }
                        this.addRepairDialog=false;//隐藏对话框
                    });
                }else{
                    this.$message.error(`添加输入信息不合法`);
                }
            },
            handleExceed(files, fileList) {
                this.$message.error(`当前限制只能上传五个文件`);
            },
            handleSuccess(response,file, fileList){
                this.imgList=fileList;
            },
            lookRepair(index,row){
                this.lookRepairInfo.description=row.description;
                this.lookRepairInfo.imgs=row.repairPic.split("&");
                for(var i=0;i<this.lookRepairInfo.imgs.length;i++){
                    this.lookRepairInfo.imgs[i]=imgUrl.url+this.lookRepairInfo.imgs[i];
                }
                this.lookRepairDialog=true;
            },
            showDeleteRepair(index,row){
                this.deleteRepairDialog=true;
                this.deleteRepairObject={index,row};
            },
            deleteRepair(){
                var url="/general/voiture/repair/remove/"+this.deleteRepairObject.row.id;
                httpRequest.delete(url,"",data=>{
                    if(data.data.meta.success){
                        //同步页面删除
                        this.repairInfo.splice(this.deleteRepairObject.index,1);
                        //隐藏对话框
                        this.deleteRepairDialog=false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error("删除失败，请重试");
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .consume-list{
        width: 100%;
    }
    .add{
        width:100%;
        height:56px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
    }

    /*维修管理*/
    .repair{
        width: 100%;
        height: auto;
        min-height: 600px;
        background-color: #FFFFFF;
    }
    .description{
        height: 25px;
        margin-bottom: 18px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .imgWrap{
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .img{
        height: 140px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .img img{
        height: 140px;
        width: 140px;
        margin-right: 8px;
        border:1px solid #ededed;
        border-radius: 4px;
    }
    .repairTitle {
        display: flex;
        flex: 1;
        padding-left: 35px;
        font-size: 16px;
        color: #409EFF;
    }
    .repairInfo {
        display: flex;
        flex: 3;
        font-size: 14px;
    }
    .addButtons{
        display: flex;
        flex: 1;
    }
    .repairInfo span{
        height: 30px;
        display: flex;
        align-items: center;
    }
</style>