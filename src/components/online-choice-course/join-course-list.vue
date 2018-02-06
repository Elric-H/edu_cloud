<template>
<div class="join-course-list">
	<el-col :span="24" class="toolbar">
		<el-form :inline="true" class="me-form">
			<el-form-item style="float: left; margin-left: 10px;">
				<strong>班级类型列表</strong>
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
			<!-- <el-form-item style="float: right; margin-left: 10px;">
				<i class="fa fa-question" aria-hidden="true" style="color: #DD4F43; font-size: 26px;"></i>
			</el-form-item> -->
		</el-form>
	</el-col>
	<el-col :span="24">
		<el-table :data="classTypeList" highlight-current-row v-loading="loadingList" style="width: 100%;">
			<el-table-column type="index" label="序列" width="50" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="years" label="年度" width="95" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="grade" label="年级" width="95" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="leading" label="负责人" width="95" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="subject" label="学科" min-width="140" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="maxNum" label="分班人数" width="80" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="period" label="课时" width="90" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="95" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="endDate" label="截止日期" min-width="140" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="total" label="报名人数" width="80" header-align="center" align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="95" header-align="center" align="center">
				<template scope="scope">
					<el-button size="small" type="primary" @click="fillWill(scope.row)">参加课程</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-col>
</div>
</template>

<script>
import { getYear } from '@/common/js/tqt_util.js';
import { requestIsSelected, requestClassifyList } from '@/api/online_api.js';
export default {
	name: 'join-course-list',
	mounted() {
		this.reRquestStatus();
	},
	data() {
		return {
			curStudentStatus: 0,
			loadingList: false,
			curYears: new Date(),
			classTypeList: []
		}
	},
	methods: {
		getClassifyListByYears: function(){
			let _this = this;
			let years = getYear(_this.curYears);
			_this.loadingList = true;
			requestClassifyList({years}).then(data => {
				_this.classTypeList = data;
				_this.loadingList = false;
			}).catch(err => {
				_this.loadingList = false;
				_this.$message.error(err);
			});
		},
		lookIsSelected: function(){
			let _this = this;
			requestIsSelected().then(data => {
				_this.curStudentStatus = data;
			});
		},
		handleSizeChange(val) {		//分页大小改变
			this.pageInfo.currentPage = 1;
			this.pageInfo.pageSize = val;
	    },
	    handleCurrentChange(val) {	//分页当前页改变
	    	this.pageInfo.currentPage = val;
	    },
		fillWill: function(classifyObj){		//填写意愿
			if(this.curStudentStatus !== 1) {
				this.$message({type: 'error', message: '你已经完成了选课，不能再次选课'});
				return;
			}
			let classifyInfo = {
				subjectClassId: classifyObj.id,
				subjectClassName: classifyObj.subject,
				years: classifyObj.years
			};
			this.$emit('show-fill-will', classifyInfo);
		},
		reRquestStatus: function(){
			this.lookIsSelected();
			this.getClassifyListByYears();
		}
	},
	watch: {
		'curYears': 'getClassifyListByYears'
	}
}
</script>

<style scoped>
.join-course-list{

}
.join-course-list .me-form{
	border-left: 5px solid #409EFF; 
	padding: 14px; 
	height: 32px;
}
.join-course-list .toolbar{
	padding: 0px; 
	background-color: #fff; 
	margin: 0px; 
	border-bottom: 1px solid #eee; 
	height: 60px;
}
.join-course-list .foot{
	padding-top: 10px;
	padding-bottom: 10px;
	background-color: #fff;
	margin-bottom: 20px;
}
</style>