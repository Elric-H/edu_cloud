<template>
<div class="launch-choice">
	<launch-course-list
	ref="launchCourseList"
	@add-course-classtype="addCourseClasstype" 
	@editor-course-classtype="editorCourseClasstype" 
	@publish-course-classtype="publishCourseClasstype"></launch-course-list>
	<launch-add-classtype 
	ref="launchAddClasstype" 
	:course-list="courseList" 
	@fresh-course-list="freshCourseList"></launch-add-classtype>
	<launch-editor-classtype 
	ref="launchEditorClasstype" 
	@fresh-course-list="freshCourseList" 
	:course-list="courseList"></launch-editor-classtype>
	<launch-course-info 
	ref="launchCourseInfo" 
	@fresh-course-list="freshCourseList"></launch-course-info>
</div>
</template>

<script>
import LaunchCourseList from '@/components/choice-course/launch-course-list.vue';
import LaunchAddClasstype from '@/components/choice-course/launch-add-classtype.vue';
import LaunchEditorClasstype from '@/components/choice-course/launch-editor-classtype.vue';
import LaunchCourseInfo from '@/components/choice-course/launch-course-info.vue';
import { requestCourseList } from '@/api/choice_api.js';
export default {
	name: 'launch-choice',
	components: {
		'launch-course-list': LaunchCourseList,
		'launch-add-classtype': LaunchAddClasstype,
		'launch-editor-classtype': LaunchEditorClasstype,
		'launch-course-info': LaunchCourseInfo
	},
	data() {
		return {
			courseList: []
		}
	},
	methods: {
		addCourseClasstype: function(){
			let _this = this;
			requestCourseList().then(data => {
				_this.courseList= data;
				_this.$refs.launchAddClasstype.visibleAdd = true;
				_this.$refs.launchAddClasstype.gradeList = [];
			}).catch(err => {
				_this.$message.error(err);
			});
		},
		editorCourseClasstype: function(params){
			let _this = this;
			requestCourseList().then(data => {
				_this.courseList= data;
				this.$refs.launchEditorClasstype.visibleEditor = true;
				this.$refs.launchEditorClasstype.index = params.index;
				this.$refs.launchEditorClasstype.classifyObj = params.classifyObj;
			}).catch(err => {
				_this.$message.error(err);
			});
		},
		publishCourseClasstype: function(params){
			this.$refs.launchCourseInfo.checkedClassTypeArr = params;
			this.$refs.launchCourseInfo.visiblePublish = true;
		},
		freshCourseList: function(){
			this.$refs.launchCourseList.getClassTypeList();
		}
	}
}
</script>

<style scoped>
.launch-choice{

}
</style>