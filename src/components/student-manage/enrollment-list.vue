<template>
<div class="enrollment-list">
	<el-table v-loading="loadingList" :data="tableData" stripe>
        <el-table-column prop="enroll" label="学籍号" width="140"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="140"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="100"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="className" label="班级"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="IDcard" label="身份证号"
        header-align="center" align="center"></el-table-column>
        <el-table-column prop="enterDate" label="入学时间"
        header-align="center" align="center"></el-table-column>
         <el-table-column prop="status" label="状态" width="100"
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
import { getEnrollList } from '@/api/sm_api.js'
export default {
	name: 'enrollment-list',
	data() {
		return {
			loadingList: false,
			tableData: []
		}
	},
	methods: {
      	lookClick(student) {
	        this.$emit('look-student-info', student.studentId);
	    },
	    getErollMentList(params, pageInfo){
	    	let _this = this;
	    	let obj = {
	    		searchText: params.searchText,
				startDate: params.startDate,
				endDate: params.endDate,
				currentPage: pageInfo.currentPage,
				pageSize: pageInfo.pageSize
	    	};
	    	_this.loadingList = true,
	    	getEnrollList(obj).then((data) => {
	    		_this.$parent.showPage = false;
				_this.tableData = data.list;
				_this.$parent.pageInfo = data.info;
				_this.$parent.showPage = true;
				_this.loadingList = false;
	    	}).catch(err => {
	    		if(err == '9999') _this.$message({type: 'info', message: '未查找到数据'});
	    		else _this.$message.error(err);
	    		_this.loadingList = false;
	    	});
	    }
    },
}
</script>

<style scoped>
.enrollment-list{
	min-width: 1120px;
}
</style>