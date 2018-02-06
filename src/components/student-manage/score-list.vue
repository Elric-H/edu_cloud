<template>
<div class="score-list">
	<el-table v-loading="loadingList" :data="tableData" stripe>
        <el-table-column prop="number" label="学籍号"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="className" label="班级"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="examType" label="考试类别"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="scorelist.chinese" label="语文" width="100"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="scorelist.math" label="数学" width="100"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="scorelist.english" label="英语" width="100"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="scorelist.physical" label="物理" width="100"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="scorelist.chemistry" label="化学" width="100"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="scorelist.biology" label="生物" width="100"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="total" label="总分"
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
import { getScoreList } from '@/api/sm_api.js'
export default {
	name: 'score-list',
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
				examId: params.examId,
				currentPage: this.pageInfo.currentPage,
				pageSize: this.pageInfo.pageSize,
				examType: this.requestParams.examType
			};
			_this.loadingList = true;
			getScoreList(obj).then((data) => {
				_this.showPage = false;
				_this.tableData = data.list;
				_this.pageInfo = data.info;
				_this.showPage = true;
				_this.loadingList = false;
			}).catch(err => {
                if(err == '9999') _this.$message({type: 'info', message: '未查找到数据'});
				_this.loadingList = false;
				/*_this.$message.error(err);*/
			});
		},
		getScoreList: function(params){
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
.score-list{
	min-width: 1120px;
}
.score-list .foot{
	padding-top: 10px;
	background-color: #fff;
	padding-bottom: 20px;
}
</style>