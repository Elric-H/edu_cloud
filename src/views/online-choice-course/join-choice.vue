<template>
<div class="join-choice">
	<join-course-list 
	ref="joinCourseList"
	@show-fill-will="showFillWill"></join-course-list>
	<join-fill-will 
	ref="joinFillWill" 
	@choice-course-sucess="choiceCourseSuccess"></join-fill-will>
</div>
</template>

<script>
import JoinCourseList from '@/components/online-choice-course/join-course-list.vue';
import JoinFillWill from '@/components/online-choice-course/join-fill-will.vue';
import { requestCourseList } from '@/api/choice_api.js';
export default {
	name: 'join-choice',
	components: {
		'join-course-list': JoinCourseList,
		'join-fill-will': JoinFillWill
	},
	data() {
		return {
			
		}
	},
	methods: {
		showFillWill: function(classifyInfo){
			let _this = this;
			requestCourseList().then(data => {
				console.log(data);
				_this.$refs.joinFillWill.courseList = data;
				_this.$refs.joinFillWill.classifyInfo = classifyInfo;
				_this.$refs.joinFillWill.visibleFill = true;
			}).catch(err => {
				_this.$message.error(err);
			});
		},
		choiceCourseSuccess: function(){
			this.$refs.joinCourseList.reRquestStatus();
		}
	}
}
</script>

<style scoped>
.join-choice{
	
}
</style>