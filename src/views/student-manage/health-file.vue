<template>
<div class="health-file clearfix">
	<div class="left pull-left" :style="{'width': leftWidth}">
		<search-header @submit-search="submitSearch"></search-header>
		<div class="list">
			<health-list ref="healthList" :page-info="pageInfo" @look-health-info="LookHealthInfo"></health-list>
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
		<health-info ref="healthInfo" @back-fun="backFun"></health-info>
	</div>
</div>
</template>

<script>
import SearchHeader from '../../components/student-manage/search-header.vue'
import HealthList from '../../components/student-manage/health-list.vue'
import HealthInfo from '../../components/student-manage/health-info.vue'
export default {
	name: 'health-file',
	components: {
		'search-header': SearchHeader,
		'health-list': HealthList,
		'health-info': HealthInfo
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
			this.$refs.healthList.getHealthList(params, this.pageInfo);
		},
		handleSizeChange(val) {
			this.pageInfo.currentPage = 1;
			this.pageInfo.pageSize = val;
			this.$refs.healthList.getHealthList(this.requestParams, this.pageInfo);
	    },
	    handleCurrentChange(val) {
	    	this.pageInfo.currentPage = val;
			this.$refs.healthList.getHealthList(this.requestParams, this.pageInfo);
	    },
		LookHealthInfo: function(num){
			this.leftWidth = '50%';
			this.$refs.healthInfo.showInfo = true;
			this.$refs.healthInfo.getHealthInfo(num);
		},
		backFun: function(){
			this.leftWidth = '100%';
		}
	}
}
</script>

<style scoped>
.health-file{
	background-color: #fff;
	padding-bottom: 20px;
}
.health-file .left{
	box-sizing: border-box;
	border-right: 1px solid #ddd;
	transition: .5s;
}
.health-file .left .list{
	overflow: auto;
	margin-bottom: 10px;
}
.health-file .right{
	width: 50%;
}
</style>