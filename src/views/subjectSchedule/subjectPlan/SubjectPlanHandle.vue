<template>
    <div class="store">
        <!--搜索条-->
        <div class="search-header">
            <el-row  >
                <el-col style="height: 50px;" class="VCenter" :span="7">
                    <!--<div class="floatLeft" style="margin-left: 34px; width: 30%;">班级名称：</div> 20180109 yuyang-->
                    <div class="floatLeft" style="margin-left: 34px; width: 28%;">班级名称：</div>
                    <el-input v-model="searchInfo.fullName" style="width: auto;" class="floatLeft" placeholder="请输入内容"></el-input>
                    <!--添加 20180109 yuyang-->
                    <div style="height: 50px; width: 5px"></div>
                    <el-button @click="search" icon="el-icon-search" >查询</el-button>
                    <!--添加 20180109 yuyang-->
                </el-col>
                <!--<el-col style="height: 50px;" class="VCenter" :span="3">
                    <el-button @click="search" style="margin-left: 20px">查询</el-button>
                </el-col> 20180109 yuyang-->
            </el-row>
        </div>
        <!--菜品列表-->
        <List v-loading="loadingList" :listInfo="listInfo"  @set="setSubject"></List>
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
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paginationInfo.totalSize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
	import List from "./List.vue";
	import httpRequest from "@/api/schoolAffair.js";
	//导入vuex 的辅助函数
	import {mapState} from "vuex";  //用在computed属性中
	import {mapActions} from 'vuex';//用在 methods属性中
	//处理是否设置信息
    function handleIsSetInfo(data){
		var length=data.length;
		for(var i=0;i<length;i++){
			if(data[i].set){
				data[i].set="已设置";
            }else{
				data[i].set="未设置";
            }
        }
    }
	//请求函数
	function requestList(submitData){
		this.paginationIsRefresh=false;
		this.loadingList=true;
		httpRequest.get("/edu-syllabus/class/timetable/getAllTimetable",submitData,data=>{
			console.log("get list request");
			console.log(data);
			if(data.data.meta.success){ //成功
				var paginationInfo={};
				paginationInfo["currentPage"]=data.data.data.pageTools.currentPage;
				paginationInfo["totalSize"]=data.data.data.pageTools.totalSize;
				paginationInfo["pageSize"]=submitData.perPage;
				this.changeCurrentPage(paginationInfo);//更新翻页数据
				this.listInfo=data.data.data.beanList; //获取到的列表数据
                handleIsSetInfo(this.listInfo);//处理是否设置信息
			}else{
				console.log("get list fail");
                this.$message.error('获取列表失败，请重试');
			}
			this.paginationIsRefresh=true;
			this.loadingList=false;
		});
	}
	//定义处理可空字段的处理函数
	function handleCanNotParam(submitData){
		if(this.searchInfo.fullName){
			submitData["fullName"]=this.searchInfo.fullName;
		}
	}
	export default {
		name:"SubjectPlanHandle",//年级管理
		mounted(){
			//查询菜品分类 第一次访问页面或刷新页面
			var submitData={
				currentPage : 1,
				perPage : 10,
			};
			requestList.call(this,submitData);
		},
		data(){
			return {
				listInfo:[],
				searchInfo:{
					fullName:"",
				},
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
			handleSizeChange(val){
				var submitData={
					currentPage : 1,
					perPage : val
				};
				handleCanNotParam.call(this,submitData);
				requestList.call(this,submitData);
			},
			handleCurrentChange(val){
				var submitData={
					currentPage : val,
					perPage : this.paginationInfo.pageSize
				};
				handleCanNotParam.call(this,submitData);
				requestList.call(this,submitData);
			},
			search(){
				var submitData={
					currentPage : 1,
					perPage : this.paginationInfo.pageSize
				};
				//处理是否有搜索数据
				handleCanNotParam.call(this,submitData);
				console.log("查询搜索数据查询值:");
				console.log(submitData);
				requestList.call(this,submitData);
			},
			setSubject(index,row){
				console.log("click set button");
				this.$emit("changeToTable",row);
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