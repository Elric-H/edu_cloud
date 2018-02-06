<template>
<div class="primary-choice">
	<primary-course-list 
	ref="primaryCourseChoice"
	@show-unselect-student="showUnselectStudent" 
	@show-unpass-student="showUnpassStudent" 
	@show-student-list="showStudentList"></primary-course-list>
	<primary-unselect-list ref="primaryUnselectList"></primary-unselect-list>
	<primary-unpass-list ref="primaryUnpassList"></primary-unpass-list>
	<primary-student-list 
	ref="primaryStudentList" 
	@student-add-success="studentAddSuccess"></primary-student-list>
</div>
</template>

<script>
import PrimaryCourseList from '@/components/choice-course/primary-course-list.vue';
import PrimaryUnselectList from '@/components/choice-course/primary-unselect-list.vue';
import PrimaryUnpassList from '@/components/choice-course/primary-unpass-list.vue';
import PrimaryStudentList from '@/components/choice-course/primary-student-list.vue';
export default {
	name: 'primary-choice',
	components: {
		'primary-course-list': PrimaryCourseList,
		'primary-unselect-list': PrimaryUnselectList,
		'primary-unpass-list': PrimaryUnpassList,
		'primary-student-list': PrimaryStudentList
	},
	data() {
		return {

		}
	},
	methods: {
		showUnselectStudent: function(curYears){
			this.$refs.primaryUnselectList.visibleUnselect = true;
			this.$refs.primaryUnselectList.curYears = curYears;
			this.$refs.primaryUnselectList.getUnselectStudentList();
		},
		showUnpassStudent: function(curYears){
			this.$refs.primaryUnpassList.visibleUnpass = true;
			this.$refs.primaryUnpassList.curYears = curYears;
			this.$refs.primaryUnpassList.getUnpassStudentList();
		},
		showStudentList: function(classId){
			this.$refs.primaryStudentList.visibleStudentList = true;
			this.$refs.primaryStudentList.classId = classId;
			this.$refs.primaryStudentList.getStudentListByClassify();
		},
		studentAddSuccess: function(){
			this.$refs.primaryCourseChoice.getClassTypeList();
		}
	}
}
</script>

<style scoped>
.primary-choice{
	background-color: #fff;
}
</style>