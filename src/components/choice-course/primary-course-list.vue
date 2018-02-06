<template>
<div class="primary-course-list">
	<el-col :span="24" class="toolbar">
		<el-form :inline="true" class="me-form">
			<el-form-item style="float: left; margin-left: 10px;">
				<strong>预选结果统计</strong>
			</el-form-item>
			<el-form-item style="float: left; margin-left: 10px;">
				<el-date-picker
				    v-model="curYears"
				    align="right"
				    type="year"
				    value-format="yyyy"
				    style="width: 100px;"
				    placeholder="选择年度">
				</el-date-picker>
			</el-form-item>
			<el-form-item style="float: right; margin-left: 10px;">
				<el-button type="primary" @click="unSelect">未选课学生</el-button>
			</el-form-item>
			<el-form-item style="float: right; margin-left: 10px;">
				<el-button type="primary" @click="unPass">未通过学生</el-button>
			</el-form-item>
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
			<el-table-column prop="subject" label="学科" min-width="100" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="maxNum" label="分班人数" width="90" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="period" label="课时" width="90" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="95" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="endDate" label="截止时间" min-width="140" header-align="center" align="center">
			</el-table-column>
			<el-table-column prop="total" label="报名人数" width="80" header-align="center" align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="95" header-align="center" align="center">
				<template scope="scope">
					<el-button size="small" @click="showStudentList(scope.row)">查看学生</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-col>
</div>
</template>

<script>
import { getYear } from '@/common/js/tqt_util.js';
import { requestClassifyListByYears } from '@/api/choice_api.js';
export default {
	name: 'primary-course-list',
	mounted() {
		this.getClassTypeList();
	},
	data() {
		return {
			loadingList: false,
			curYears: new Date(),
			classTypeList: []
		}
	},
	methods: {
		getClassTypeList: function(){
			let _this = this;
			_this.loadingList = true;
			let years = this.curYears.toString().length == 4 ? this.curYears : getYear(this.curYears);
			requestClassifyListByYears(years).then(data => {
				_this.classTypeList = data;
				_this.loadingList = false;
			}).catch(err => {
				_this.$message.error(err);
				_this.loadingList = false;
			});
		},
		unSelect: function(){		//未选课学生
			let years = this.curYears.toString().length == 4 ? this.curYears : getYear(this.curYears);
			this.$emit('show-unselect-student', years);
		},
		unPass: function(){			//未通过学生
			let years = this.curYears.toString().length == 4 ? this.curYears : getYear(this.curYears);
			this.$emit('show-unpass-student', years);
		},
		showStudentList: function(classify){  	//显示指定学生
			this.$emit('show-student-list', classify.id);
		},
		changeYear: function(){		//当年度改变时
			this.getClassTypeList();
		}
	},
	watch: {
		'curYears': 'changeYear'
	}
}
</script>

<style scoped>
.primary-course-list{

}
.primary-course-list .me-form{
	border-left: 5px solid #409EFF; 
	padding: 14px; 
	height: 32px;
}
.primary-course-list .toolbar{
	padding: 0px; 
	background-color: #fff; 
	margin: 0px; 
	border-bottom: 1px solid #eee; 
	height: 60px;
}
.primary-course-list .foot{
	padding-top: 10px;
	padding-bottom: 10px;
	background-color: #fff;
	margin-bottom: 20px;
}
</style>