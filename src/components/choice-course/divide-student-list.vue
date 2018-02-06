<template>
<div class="divide-student-list">
	<el-col :span="24" class="toolbar">
		<el-form :inline="true" class="me-form">
			<el-form-item style="float: left; margin-left: 10px;">
				<strong>待分班学生</strong>
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
			<el-form-item style="float: left; margin-left: 10px;">
				<el-select v-model="curClassType" placeholder="请选择" style="width: 300px;">
				    <el-option
						v-for="item in classTypeOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				    </el-option>
				</el-select>
			</el-form-item>
			<el-form-item style="float: right; margin-left: 10px;">
				<el-button type="primary" @click="newClass">创建班级</el-button>
			</el-form-item>
			<el-form-item style="float: right; margin-left: 10px; position: relative; top: -3px;">
				已选中 <i style="color: #7AB8E9; font-size: 24px; font-weight: bold;" v-text="selectStudentList.length"></i> 个学生
			</el-form-item>
		</el-form>
	</el-col>
	<el-col :span="24">
		<el-table :data="studentList" highlight-current-row v-loading="loadingList" style="width: 100%; border: 1px solid #eee;" 
		@selection-change="handleSelectionChange" 
		:cell-style="isDevideColor">
			<el-table-column type="selection" label="全选" header-align="center" align="center" 
			:selectable="selectableFunction">
			</el-table-column>
			<el-table-column type="index" label="序列" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="number" label="学籍号" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="name" label="姓名" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="upScore" label="升学成绩" width="100" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="beforeSchool" label="学生来源" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="likeSubjects" label="热衷学科" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="isShow" label="是否分班" header-align="center" align="center">
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
import { requestClassifyOptions, requestLastStudentByClassify } from '@/api/choice_api.js';
export default {
	name: 'divide-student-list',
	mounted() {
		this.getClassifyList();
	},
	data() {
		return {
			showPage: true,
			loadingList: false,
			curYears: new Date(),
			pageInfo: {
				currentPage: 1,
				pageSize: 10,
				totalSize: 0,
			},
			classTypeOptions: [],
			curClassType: '',
			studentList: [],
			selectStudentList: []
		}
	},
	methods: {
		getCurClassifyStudentList: function(){
			let _this = this;
			if(_this.curClassType == '') return;
			let params = {
				pageNum: _this.pageInfo.currentPage,
				pageSize: _this.pageInfo.pageSize,
				classId: JSON.parse(_this.curClassType).classId
			};
			_this.loadingList = true;
			requestLastStudentByClassify(params).then(data => {
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
		reCurClassifyStudentList: function(){
			this.selectStudentList = [];
			this.pageInfo.currentPage = 1;
			this.getCurClassifyStudentList();
		},
		handleSizeChange(val) {		//分页大小改变
			this.pageInfo.currentPage = 1;
			this.pageInfo.pageSize = val;
			this.getCurClassifyStudentList();
	    },
	    handleCurrentChange(val) {	//分页当前页改变
	    	this.pageInfo.currentPage = val;
	    	this.getCurClassifyStudentList();
	    },
		newClass: function(){		//新建班级
			if(this.selectStudentList.length == 0){
				return this.$message({type: 'error', message: '请选择学生'});
			}
			if(!this.curClassType){
				return this.$message({type: 'error', message: '请选择班级类型'});
			}
			let classObj = JSON.parse(this.curClassType);
			let curClassify = {
				number: this.selectStudentList.length,
				gradeId: classObj.gradeId,
				gradeName: classObj.gradeName,
				classTypeId: classObj.classId,
				classTypeName: classObj.className,
				subjects: classObj.subjects.split('&')
			};
			let studentList = this.selectStudentList.map(function(one){
				let obj = {
					studentId: one.id,
					schoolRollNum: one.number,
					studentName: one.name
				};
				return obj;
			});
			this.$emit('show-new-class', { curClassify, studentList });
		},
		getClassifyList: function(){
			let _this = this;
			let years = getYear(_this.curYears);
			requestClassifyOptions(getYear(_this.curYears)).then(data => {
				_this.classTypeOptions = data;
				if(data.length > 0) _this.curClassType = data[0].value;
				else _this.curClassType = '';
				_this.getCurClassifyStudentList();
			}).catch(err => {
				_this.$message.error(err);
			});
		},
		handleSelectionChange: function(val){
			if(val.length == 0) return this.selectStudentList = val;
			let arr = [];
			val.forEach((one) => {
				if(one.isDivide != 1) arr.push(one);
			});
			this.selectStudentList = arr;
		},
		selectableFunction: function(row, index){		//禁用部分多选
			if(row.isDivide == 0) return true;
			else return false;
		},
		isDevideColor: function({row, column, rowIndex}){
			if(column.label == '是否分班'){
				if(row.isDivide == 1) return 'color: #19A15F';
				else return 'color: #DD4E42';
			}
		}
	},
	watch: {
		'curYears': 'getClassifyList',
		'curClassType': 'getCurClassifyStudentList'
	}
}
</script>

<style scoped>
.divide-student-list{

}
.divide-student-list .me-form{
	border-left: 5px solid #409EFF; 
	padding: 14px; 
	height: 32px;
}
.divide-student-list .toolbar{
	padding: 0px; 
	background-color: #fff; 
	margin: 0px; 
	border-bottom: 1px solid #eee; 
	height: 60px;
}
.divide-student-list .foot{
	padding-top: 10px;
	padding-bottom: 10px;
	background-color: #fff;
	margin-bottom: 20px;
}
</style>