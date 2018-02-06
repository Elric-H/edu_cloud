<template>
<div class="join-fill-will">
	<el-dialog
		title="填写选课意愿"
		:modal-append-to-body="false"
		:visible.sync="visibleFill"
		width="50%" style="padding: 10px;">
		<el-form :model="choiceObj" label-width="80px">
			<el-form-item label="课程类型" style="width: 60%;">
				<span style="color: #39AEFF;" v-text="classifyInfo.subjectClassName"></span>
			</el-form-item>
			<el-form-item label="热衷一" style="width: 60%;">
				<el-select v-model="choiceObj.likeOne" placeholder="请选择">
				    <el-option
						v-for="item in courseList"
						:key="item.name"
						:label="item.name"
						:value="item.name">
				    </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="热衷二" style="width: 60%;">
				<el-select v-model="choiceObj.likeTwo" placeholder="请选择">
				    <el-option
						v-for="item in courseList"
						:key="item.name"
						:label="item.name"
						:value="item.name">
				    </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="备注" style="width: 90%;">
				<el-input type="textarea" v-model="choiceObj.remarks" :row="8"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="visibleFill = false">取 消</el-button>
			<el-button type="primary" @click="submitChoiceCourse">提交选课</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import { requestChoiceCourse } from '@/api/online_api.js';
export default {
	name: 'join-fill-will',
	data() {
		return {
			visibleFill: false,
			classifyInfo: {},
			courseList: [],
			choiceObj: {
				likeOne: '',
				likeTwo: '',
				remarks: ''
			}
		}
	},
	methods: {	
		submitChoiceCourse: function(){		//提交选课
			let _this = this;
			_this.$confirm('是否参加该类型课程,该操作无法撤回?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	        	_this.getChoiceCourse();
	        });
		},
		getChoiceCourse: function(){
			let _this = this;
			let params = {
				subjectClassId: _this.classifyInfo.subjectClassId,
				subjectClassName: _this.classifyInfo.subjectClassName,
				years: _this.classifyInfo.years,
				likeSubjects: [_this.choiceObj.likeOne, _this.choiceObj.likeTwo].join('&'),
				remark: _this.choiceObj.remarks
			};
			requestChoiceCourse(params).then(data => {
				_this.visibleFill = false;
				_this.$message({ type: 'success', message: '操作成功!' });
				_this.$emit('choice-course-sucess', '');
			}).catch(err => {
				_this.$message({type: 'info', message: '提交失败'});
			});
		}
	}
}
</script>

<style scoped>
.join-fill-will{

}
</style>