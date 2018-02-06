<template>
<div class="consume-list">
	<el-table v-loading="loadingList" :data="tableData" stripe>
        <el-table-column prop="number" label="学籍号" width="140"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="140"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="140"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="className" label="班级"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="consumeTime" label="消费时间"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="consumeWhere" label="消费地点"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="consumeType" label="消费类型"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="consumeSum" label="金额"
        header-align="center" align="center"></el-table-column>
    </el-table>
    <div class="foot clearfix" v-if="showPage">
		<el-pagination style="float: right"
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pageInfo.currentPage"
			:page-sizes="[5, 10, 25, 50]"
			:page-size="pageInfo.pageSize"
			layout="total, sizes, prev, pager, next"
			:total="pageInfo.totalSize">
	    </el-pagination>
	</div>
</div>
</template>

<script>
import { getOneCardData } from '@/api/sm_api.js'
export default {
	name: 'consume-list',
	data() {
		return {
			requestParams: {},
			loadingList: false,
			showPage: true,
			tableData: [],
			pageInfo: {
				currentPage: 1,
				pageSize: 10,
				totalSize: 0,
			}
		}
	},
	methods: {
		requestData: function(params){
			let _this = this;
			let obj = {
				searchText: params.searchText,
				startDate: params.startDate,
				endDate: params.endDate,
				currentPage: this.pageInfo.currentPage,
				pageSize: this.pageInfo.pageSize
			};
			_this.loadingList = true;
			getOneCardData(obj).then((data) => {
				_this.showPage = false;
				_this.tableData = data.list;
				_this.pageInfo = data.info;
				_this.showPage = true;
				_this.loadingList = false;
			}).catch(err => {
                if(err == '9999') _this.$message({type: 'info', message: '未查找到数据'});
                _this.loadingList = false;
			});
		},
		getConsumeList: function(params){
			this.requestParams = params;
			this.requestData(params);
		},
		handleSizeChange(val) {
			this.pageInfo.currentPage = 1;
			this.pageInfo.pageSize = val;
			this.requestData(this.requestParams);
	    },
	    handleCurrentChange(val) {
	    	this.pageInfo.currentPage = val;
	    	this.requestData(this.requestParams);
	    }
	} 
}
</script>

<style scoped>
.consume-list{
	min-width: 1120px;
}
.consume-list .foot{
	margin-top: 10px;
	background-color: #fff;
}
</style>