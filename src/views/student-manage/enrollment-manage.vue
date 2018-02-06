<template>
<div class="enrollment-manage clearfix">
	<div class="left pull-left" :style="{'width': leftWidth}">
		<search-header @submit-search="submitSearch" :show-date-range="false"></search-header>
		<div class="list">
			<enrollment-list ref="enrollList" @look-student-info="LookStudentInfo"></enrollment-list>
		</div>
		<div class="page" v-if="showPage"> 
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
	</div>
	<div class="right pull-left">
		<enrollment-info ref="studentInfo" @back-fun="backFun"></enrollment-info>
	</div>
</div>
</template>

<script>
import SearchHeader from '../../components/student-manage/search-header.vue'
import EnrollmentList from '../../components/student-manage/enrollment-list.vue'
import EnrollmentInfo from '../../components/student-manage/enrollment-info.vue'
export default {
	name: 'enrollment-manage',
	components: {
		'search-header': SearchHeader,
		'enrollment-list': EnrollmentList,
		'enrollment-info': EnrollmentInfo
	},
	data() {
		return {
			showInfo: false,
			showPage: true,
			leftWidth: '100%',
			requestParams: {},
			pageInfo: {
				currentPage: 1,
				pageSize: 10,
				totalSize: 0,
			}
		}
	},
	methods: {
		submitSearch: function(params){
			this.requestParams = params;
			this.$refs.enrollList.getErollMentList(params, this.pageInfo);
		},
		handleSizeChange(val) {
			this.pageInfo.currentPage = 1;
	        this.pageInfo.pageSize = val;
			this.$refs.enrollList.getErollMentList(this.requestParams, this.pageInfo);
	    },
	    handleCurrentChange(val) {
	        this.pageInfo.currentPage = val;
			this.$refs.enrollList.getErollMentList(this.requestParams, this.pageInfo);
	    },
		LookStudentInfo: function(num){
			this.leftWidth = '60%';
			this.$refs.studentInfo.showInfo = true;
			this.$refs.studentInfo.getEnrollInfo(num);
		},
		backFun: function(){
			this.leftWidth = '100%';
		}
	}
}
</script>

<style scoped>
.enrollment-manage{
	background-color: #fff;
	padding-bottom: 20px;
}
.enrollment-manage .left{
	box-sizing: border-box;
	border-right: 1px solid #ddd;
	transition: .5s;
}
.enrollment-manage .left .list{
	overflow: auto;
	margin-bottom: 10px;
}
.enrollment-manage .right{
	width: 40%;
}
</style>
