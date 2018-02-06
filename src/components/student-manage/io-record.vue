<template>
<div class="io-record">
	<el-table v-loading="loadingList" :data="tableData" stripe>
        <el-table-column prop="number" label="学籍号" width="140"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="100"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="className" label="班级" width="180"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="posTime" label="刷卡时间" width="180"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="cardNum" label="卡号" width="120"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="place" label="地点" width="140"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注"
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
import { getSchoolIOData } from '@/api/sm_api.js'
export default {
	name: 'io-record',
	data() {
		return {
			loadingList: false,
			showPage: true,
			tableData: [],
			requestParams: {},
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
			getSchoolIOData(obj).then((data) => {
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
		getIOrecord: function(params){
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
.io-record{
	min-width: 1120px;
}
.io-record .foot{
	margin-top: 10px;
	background-color: #fff;
}
</style>