<template>
<div class="tracked-info">
	<el-card class="box-card" style="min-height: 450px;">
	  	<div slot="header" class="clearfix">
	    	<span>分班详情</span>
	  	</div>
	  	<div class="box" v-loading="loading">
	  		<el-form :model="classObj" label-width="80px" v-if="showInfo">
				<el-form-item label="年级名称" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="classObj.gradeName"></span>
				</el-form-item>
				<el-form-item label="班级名称" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="classObj.classFullName"></span>
				</el-form-item>
				<el-form-item label="班主任" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="classObj.headTeacherName"></span>
				</el-form-item>
				<el-form-item label="班级人数" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="classObj.studentNum"></span>
				</el-form-item>
				<el-form-item label="班级状态" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="classObj.classStatus"></span>
				</el-form-item>
				<el-form-item label="教学科目" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-if="classObj.subjects.length == 0">
						待安排学科老师
					</span>
					<el-tag v-if="classObj.subjects.length != 0" 
					v-for="subject in classObj.subjects" style="margin: 3px 8px;">
						{{subject.teacherName}}——{{subject.subjectName}}
					</el-tag>
				</el-form-item>
			</el-form>
	  	</div>
	</el-card>
</div>
</template>

<script>
import { requestDivideResult } from '@/api/online_api.js';
export default {
	name: 'tracked-info',
	mounted() {
		this.getDivideInfo();
	},
	data() {
		return {
			loading: true,
			showInfo: false,
			classObj: {
				gradeName: '',
				classFullName: '',
				classTypeName: '',
				headTeacherName: '',
				studentNum: '',
				classStatus: '',
				subjects: []
			}
		}
	},
	methods: {
		getDivideInfo: function(){
			let _this = this;
			requestDivideResult().then(data => {
				_this.loading = false;
				if(data !== false){
					_this.classObj = data;
					_this.showInfo = true;
					return;
				}
				_this.$alert('未找到你的班级信息，请改天再试。', '抱歉！', {
		          	confirmButtonText: '确定',
		          	type: 'warning'
		        });
			}).catch(err => {
				_this.loading = false;
				_this.$message.error(err);
			});
		}
	}
}
</script>

<style scoped>
.tracked-info{

}
</style>