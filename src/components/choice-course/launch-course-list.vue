<template>
<div class="launch-course-list">
	<el-col :span="24" class="toolbar">
		<el-form :inline="true" class="me-form">
			<el-form-item style="float: left;">
				<strong>班级类型列表</strong>
			</el-form-item>
			<el-form-item style="float: left;">
				<el-button @click="addCourse">新增类型</el-button>
			</el-form-item>
			<el-form-item style="float: right;">
				<el-button type="primary" @click="launch">发起选课</el-button>
			</el-form-item>
		</el-form>
	</el-col>
	<el-table :data="classTypeList" highlight-current-row v-loading="loadingList" style="width: 100%;"
	ref="classTypeList" 
	@selection-change="handleSelectionChange">
		<el-table-column type="selection" label="全选" width="50" header-align="center" align="center" >
		</el-table-column>
		<el-table-column type="index" label="序列" width="50" header-align="center" align="center">
		</el-table-column>
		<el-table-column prop="years" label="年度" width="100" header-align="center" align="center">
		</el-table-column>
		<el-table-column prop="grade" label="年级" width="100" header-align="center" align="center">
		</el-table-column>
		<el-table-column prop="leading" label="负责人" width="100" header-align="center" align="center">
		</el-table-column>
		<el-table-column prop="subject" label="学科" min-width="140" header-align="center" align="center">
		</el-table-column>
		<el-table-column prop="maxNum" label="分班人数" width="90" header-align="center" align="center">
		</el-table-column>
		<el-table-column prop="period" label="课时" width="90" header-align="center" align="center">
		</el-table-column>
		<!-- <el-table-column prop="credit" label="学分" width="90" header-align="center" align="center">
		</el-table-column> -->
		<el-table-column prop="status" label="状态" width="90" header-align="center" align="center">
		</el-table-column>
		<el-table-column label="操作" min-width="160" header-align="center" align="center">
			<template scope="scope">
				<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				<el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-col :span="24">
		<div class="foot clearfix" v-if="showPage">
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
	</el-col>
</div>
</template>

<script>
import { requestClassifyList, requestDeleteClassify } from '@/api/choice_api.js';
export default {
	name: 'launch-course-list',
	mounted() {
		this.getClassTypeList();
	},
	data() {
		return {
			loadingList: false,
			showPage: true,
			classTypeList: [],
			checkedClassTypeArr: [],
			pageInfo: {
				currentPage: 1,
				pageSize: 10,
				totalSize: 0,
			}
		}
	},
	methods: {
		getClassTypeList: function(){
			let _this = this;
			let params = {
				pageNum: _this.pageInfo.currentPage,
				pageSize: _this.pageInfo.pageSize,
			};
			_this.loadingList = true;
			requestClassifyList(params).then(data => {
				console.log(data);
				_this.showPage = false;
				_this.classTypeList = data.list;
				_this.pageInfo.currentPage = data.info.currentPage;
				_this.pageInfo.totalSize = data.info.totalSize;
				_this.showPage = true;
				_this.loadingList = false;
			}).catch(err => {
				_this.$message.error(err);
				_this.loadingList = false;
			});
		},
		handleSizeChange(val) {		//分页大小改变
			this.pageInfo.currentPage = 1;
			this.pageInfo.pageSize = val;
			//this.getClassTypeList();
	    },
	    handleCurrentChange(val) {	//分页当前页改变
	    	this.pageInfo.currentPage = val;
	    	//this.getClassTypeList();
	    },
		addCourse: function(){				//新增类型
			this.$emit('add-course-classtype', '');
		},
		handleEdit: function(index, obj){		//编辑班级类型
			let params = {
				id: obj.id,
				years: obj.years,
				grade: JSON.stringify({id: obj.gradeId, name: obj.grade}),
				leading: obj.leading,
				subjects: obj.subject.split('&'),
				maxNum: obj.maxNum,
				period: obj.period,
				remarks: obj.remarks
			};
			this.$emit('editor-course-classtype', {index: index, classifyObj: params});
		},
		handleSelectionChange: function(val){
			this.checkedClassTypeArr = val;
		},
		launch: function(){						//发起选课
			if(this.checkedClassTypeArr.length == 0){
				return this.$message({ type: 'warning', message: '至少选中一项班级类型' });
			}
			let newArr = this.checkedClassTypeArr.map(function(one){
				return {
					id: one.id,
					name: one.subject
				};
			});
			this.$emit('publish-course-classtype', newArr);
		},
		handleDel: function(one){				//删除班级类型
			let _this = this;
			let classifyId = one.id;
			_this.$confirm('是否删除该课程类型?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	        	requestDeleteClassify({classifyId}).then(data => {
	        		_this.getClassTypeList();
	        		_this.$message({ type: 'success', message: '操作成功!' });
	        	}).catch(err => {
	        		_this.$message({ type: 'info', message: '操作失败' });
	        	});
	        });
		}
	}
}
</script>

<style scoped>
.launch-course-list{

}
.launch-course-list .me-form{
	border-left: 5px solid #409EFF; 
	padding: 14px; 
	height: 32px;
}
.launch-course-list .toolbar{
	padding: 0px; 
	background-color: #fff; 
	margin: 0px; 
	border-bottom: 1px solid #eee; 
	height: 60px;
}
.launch-course-list .foot{
	padding-top: 10px;
	padding-bottom: 10px;
	background-color: #fff;
	margin-bottom: 20px;
}
</style>