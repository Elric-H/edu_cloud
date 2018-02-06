<template>
<div class="primary-unpass-list">
	<el-dialog
		title="未通过学生"
		:modal-append-to-body="false"
		:visible.sync="visibleUnpass"
		width="50%" style="padding: 10px;">
		<el-table :data="studentList" highlight-current-row v-loading="loadingList" style="width: 100%; border: 1px solid #eee;">
			<el-table-column type="index" label="序列" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="number" label="学籍号" width="140" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="name" label="姓名" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="upScore" label="升学成绩" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="beforeSchool" label="生源学校" width="120" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="likeSubjects" label="热衷学科" header-align="center" align="center">
			</el-table-column>
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
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="visibleUnpass = false">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import { requestUnpassStudentListByYears } from '@/api/choice_api.js';
export default {
	name: 'primary-unpass-list',
	data() {
		return {
			showPage: true,
			loadingList: false,
			visibleUnpass: false,
			curYears: undefined,
			pageInfo: {
				currentPage: 1,
				pageSize: 10,
				totalSize: 0,
			},
			studentList: []
		}
	},
	methods: {
		getUnpassStudentList: function(){
			let _this = this;
			if(_this.curYears === undefined) return;
			let params = {
				pageNum: _this.pageInfo.currentPage,
				pageSize: _this.pageInfo.pageSize,
				years: _this.curYears
			};
			_this.loadingList = true;
			requestUnpassStudentListByYears(params).then(data => {
				_this.showPage = false;
				_this.studentList = data.list;
				_this.pageInfo.currentPage = data.info.currentPage;
				_this.pageInfo.totalSize = data.info.totalSize;
				_this.showPage = true;
				_this.loadingList = false;
			}).catch(err => {
				_this.$message.error(err);
				_this.loadingList = false;
			});
		},
		handleSizeChange(val) {		//分页大小改变
			this.pageInfo.currentPage = 1;
			this.pageInfo.pageSize = val;
			this.getUnpassStudentList();
	    },
	    handleCurrentChange(val) {	//分页当前页改变
	    	this.pageInfo.currentPage = val;
	    	this.getUnpassStudentList();
	    },
	}
}
</script>

<style scoped>
.primary-unpass-list{

}
.primary-unpass-list .foot{
	background-color: #fff;
	position: relative;
	top: 20px;
}
</style>