<template>
<div class="adject-student-list">
	<el-col :span="24" class="toolbar" style="padding: 0px; background-color: #fff; margin: 0px; border-bottom: 1px solid #eee; height: 60px;">
		<el-form :inline="true" style="border-left: 5px solid #409EFF; padding: 14px; height: 32px;">
			<el-form-item style="float: left; margin-left: 10px;">
				<strong>待调整学生</strong>
			</el-form-item>
			<el-form-item style="float: left; margin-left: 10px;">
				<el-date-picker
				    v-model="curYears"
				    align="right"
				    type="year"
				    style="width: 100px;"
				    placeholder="选择年度">
				</el-date-picker>
			</el-form-item>
			<el-form-item style="float: right; margin-left: 10px;">
				<el-button type="primary" @click="sublimeAdject">提交调整</el-button>
			</el-form-item>
			<el-form-item style="float: right; margin-left: 10px;">
				<el-select v-model="selectClassify" placeholder="请选择" style="width: 300px;">
				    <el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				    </el-option>
				</el-select>
			</el-form-item>
			<el-form-item style="float: right; margin-left: 10px; position: relative; top: -3px;">
				已选中 <i style="color: #7AB8E9; font-size: 24px; font-weight: bold;" v-text="selectStudentBox.length"></i> 个学生
			</el-form-item>
		</el-form>
	</el-col>
	<el-col :span="24">
		<el-table :data="studentList" highlight-current-row v-loading="loadingList" style="width: 100%; border: 1px solid #eee;" 
		@selection-change="handleSelectionChange">
			<el-table-column type="selection" label="全选" width="70" header-align="center" align="center">
			</el-table-column>
			<el-table-column type="index" label="序列" width="70" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="number" label="学籍号" width="140" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="140" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="upScore" label="升学成绩" width="140" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="beforeSchool" label="学生来源" width="140" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="140" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="likeOne" label="热衷学科一" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="likeTwo" label="热衷学科二" header-align="center" align="center">
			</el-table-column>
		</el-table>
	</el-col>
	<el-col :span="24">
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
	</el-col>
</div>
</template>

<script>
import { getYear } from '@/common/js/tqt_util.js';
import { requestAllUnpassStudent, requestClassifyOptions, requestAdjectStudent } from '@/api/choice_api.js';
export default {
	name: 'adject-student-list',
	mounted() {
		this.classifyListAndStudentList();
	},
	data() {
		return {
			curNum: 1,
			showPage: true,
			curYears: new Date(),
			loadingList: false,
			pageInfo: {
				currentPage: 1,
				pageSize: 10,
				totalSize: 0,
			},
			studentList: [],
			options: [],
		    selectClassify: '',
		    selectStudentBox: []
		}
	},
	methods: {
		getAllUnpassStudentList: function(){
			let _this = this;
			let params = {
				pageNum: _this.pageInfo.currentPage,
				pageSize: _this.pageInfo.pageSize,
				years: getYear(_this.curYears)
			};
			_this.loadingList = true;
			requestAllUnpassStudent(params).then(data => {
				_this.showPage = false;
				_this.studentList = data.list;
				_this.pageInfo.currentPage = data.info.pageNum;
				_this.pageInfo.totalSize = data.info.totalSize;
				_this.showPage = true;
				_this.loadingList = false;
			}).catch(err => {
				_this.loadingList = false;
				_this.$message.error(err);
			});
		},
		getClassifyList: function(){
			let _this = this;
			let years = getYear(_this.curYears);
			requestClassifyOptions(getYear(_this.curYears)).then(data => {
				_this.options = data;
				if(data.length > 0) _this.selectClassify = data[0].value;
				else _this.selectClassify = '';
			}).catch(err => {
				_this.$message.error(err);
			});
		},
		handleSelectionChange: function(val){
			this.selectStudentBox = val;
		},
		handleSizeChange(val) {
			this.pageInfo.currentPage = 1;
			this.pageInfo.pageSize = val;
			this.getAllUnpassStudentList();
	    },
	    handleCurrentChange(val) {
	    	this.pageInfo.currentPage = val;
	    	this.getAllUnpassStudentList();
	    },
		sublimeAdject: function(){
			let _this = this;
			if(_this.selectClassify == ''){
				 return _this.$message({type: 'warning', message: '请选择一个班级类型'});
			}
			if(_this.selectStudentBox.length == 0){
				return _this.$message({type: 'warning', message: '请选择学生'});
			}
			let className = JSON.parse(_this.selectClassify).className;
			_this.$confirm(`是否将选中的学生添加至 ${className} 班级类型下?`, '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	          	_this.handleAdject();
	        });
		},
		handleAdject: function(){
			let _this = this;
			let selectClassify = JSON.parse(_this.selectClassify);
			let studentList = _this.selectStudentBox.map(function(one){
				let obj = {
					stuUserId: one.id,
					isSelect: one.isSelect
				};
				return obj;
			});
			let params = {
				classSubjectId: selectClassify.classId,
				classSubjectName: selectClassify.className,
				years: getYear(_this.curYears),
				stuList: studentList
			};
			requestAdjectStudent(params).then(data => {
				_this.$message({type: 'success', message: '操作成功'});
				_this.classifyListAndStudentList();
			}).catch(err => {
				_this.$message.error(err);
			});
		},
		classifyListAndStudentList: function(){
			this.getAllUnpassStudentList();
			this.getClassifyList();
		}
	},
	watch: {
		'curYears': 'classifyListAndStudentList',
	}
}
</script>

<style scoped>
.adject-student-list{

}
.adject-student-list .foot{
	padding-top: 10px;
	padding-bottom: 10px;
	background-color: #fff;
}
</style>