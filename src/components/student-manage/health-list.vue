<template>
<div class="health-list">
	<el-table v-loading="loadingList" :data="tableData" stripe>
        <el-table-column prop="number" label="学籍号" width="140"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="140"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="90"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" width="90"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="className" label="班级"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="healthN" label="健康档案标识"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="healthC" label="健康状况"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="examT" label="体检时间"
        header-align="center" align="center"></el-table-column>
        <el-table-column label="操作"
        header-align="center" align="center">
        	<template slot-scope="scope">
        		<el-button type="primary" size="small" @click="lookClick(scope.row)">查看</el-button>
	       	</template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import { getHealthList } from '@/api/sm_api.js'
export default {
	name: 'health-list',
	data() {
		return {
			loadingList: false,
			tableData: []
		}
	},
	methods: {
		getHealthList: function(params, pageInfo){
			let _this = this;
			let obj = {
				searchText: params.searchText,
				startDate: params.startDate,
				endDate: params.endDate,
				currentPage: pageInfo.currentPage,
				pageSize: pageInfo.pageSize
			};
			_this.loadingList = true;
			getHealthList(obj).then((data) => {
				_this.$parent.showPage = false;
				_this.tableData = data.list;
				_this.$parent.pageInfo = data.info;
				_this.$parent.showPage = true;
				_this.loadingList = false;
			}).catch(err => {
                if(err == '9999') _this.$message({type: 'info', message: '未查找到数据'});
				_this.loadingList = false;
			});
		},
      	lookClick: function(student) {
	        this.$emit('look-health-info', student.studentId);
	    },
	    updateClick: function(){
	    	alert('需求待定中...');
	    },
	    deleteClick: function(){
	    	alert('需求待定中...');
	    }
    },
}
</script>

<style scoped>
.health-list{
	min-width: 1120px;
}
</style>