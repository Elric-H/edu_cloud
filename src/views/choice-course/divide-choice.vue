<template>
<div class="divide-choice">
	<divide-student-list 
	ref="divideStudentChoice"
	@show-new-class="showNewClass"></divide-student-list>
	<divide-new-class 
	ref="divideNewClass" 
	@create-class-success="createClassSuccess"></divide-new-class>
</div>
</template>

<script>
import DivideStudentList from '@/components/choice-course/divide-student-list.vue';
import DivideNewClass from '@/components/choice-course/divide-new-class.vue';
import { requestTeacherList } from '@/api/choice_api.js';
export default {
	name: 'divide-choice',
	components: {
		'divide-student-list': DivideStudentList,
		'divide-new-class': DivideNewClass
	},
	data() {
		return {
		}
	},
	methods: {
		showNewClass: function(params){
			let _this = this;
			requestTeacherList().then(data => {
				_this.$refs.divideNewClass.visibleAddClass = true;
				_this.$refs.divideNewClass.teacherOptions = data;
				_this.$refs.divideNewClass.curClassify = params.curClassify;
				_this.$refs.divideNewClass.studentList = params.studentList;
			}).catch(err => {
				_this.$message.error('服务器异常，请稍后重试。');
			});
		},
		createClassSuccess: function(){
			this.$refs.divideStudentChoice.reCurClassifyStudentList();
		}
	}
}
</script>

<style scoped>
.divide-choice{
	
}
</style>