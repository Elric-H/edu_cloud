<template>
<div class="primary-student-list">
	<el-dialog
		title="调整学生"
		:modal-append-to-body="false"
		:visible.sync="visibleStudentList"
		width="50%" style="padding: 10px;">
		<el-table :data="studentList" highlight-current-row v-loading="loadingList" style="width: 100%; border: 1px solid #eee;" 
		@selection-change="handleSelectionChange">
			<el-table-column type="selection" label="全选" header-align="center" align="center">
			</el-table-column>
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
			<span class="pull-left">选中 <i style="color: #3AB2FF; font-size: 18px; font-weight: bold;" v-text="checkedStudentArr.length"></i> 人</span>
			<el-button @click="visibleStudentList = false">取 消</el-button>
			<el-button type="primary" @click="changeStudent">加入调整</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import { requestStudentByClassify, requestAddStudentUnpass } from '@/api/choice_api.js';
export default {
	name: 'primary-student-list',
	data() {
		return {
			showPage: true,
			loadingList: false,
			visibleStudentList: false,
			classId: undefined,
			pageInfo: {
				currentPage: 1,
				pageSize: 10,
				totalSize: 0,
			},
			studentList: [],
			checkedStudentArr: []
		}
	},
	methods: {
		getStudentListByClassify: function(){
			let _this = this;
			if(_this.classId === undefined) return;
			let params = {
				pageNum: _this.pageInfo.currentPage,
				pageSize: _this.pageInfo.pageSize,
				classId: _this.classId
			};
			_this.loadingList = true;
			requestStudentByClassify(params).then(data => {
				console.log(data);
				_this.showPage = false;
				_this.studentList = data.list;
				_this.pageInfo.currentPage = data.info.currentPage;
				_this.pageInfo.totalSize = data.info.totalSize;
				_this.showPage = true;
				_this.loadingList = false;
			}).catch(err => {
				_this.loadingList = false;
				_this.$message.error(err);
			});
		},
		handleSizeChange(val) {		//分页大小改变
			this.pageInfo.currentPage = 1;
			this.pageInfo.pageSize = val;
			this.getStudentListByClassify();
	    },
	    handleCurrentChange(val) {	//分页当前页改变
	    	this.pageInfo.currentPage = val;
	    	this.getStudentListByClassify();
	    },
	    handleSelectionChange: function(val){
	    	this.checkedStudentArr = val;
	    },
	    changeStudent: function(){
			let _this = this;
			console.log(this.checkedStudentArr);
			if(_this.checkedStudentArr.length == 0){
				return _this.$message({ type: 'warning', message: '至少选中一个学生' });
			}
			_this.$confirm('是否确定将该些学生加入未通过学生?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	        	_this.handleStudentAdd();
	        });
		},
		handleStudentAdd: function(){
			let _this = this;
			let stuUserIdList = _this.checkedStudentArr.map(function(one){ return one.id });
			let params = {
				stuUserIdList: stuUserIdList,
				subClassId: _this.classId
			};
			requestAddStudentUnpass(params).then(data => {
				_this.pageInfo.currentPage = 1;
				_this.checkedStudentArr = [];
				_this.$emit('student-add-success', '');
				_this.visibleStudentList = false;
				_this.$message({ type: 'success', message: '操作成功!'});
			}).catch(err => {
				_this.$message({ type: 'info', message: '操作失败' });
			});
		}
	}
}
</script>

<style scoped>
.primary-student-list{

}
.primary-student-list .foot{
	background-color: #fff;
	position: relative;
	top: 20px;
}
</style>