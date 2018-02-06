<template>
<div class="divide-new-class">
	<el-dialog
		title="班级信息"
		:modal-append-to-body="false"
		:visible.sync="visibleAddClass"
		width="50%">
		<el-form :model="classes" label-width="80px" ref="classes" :rules="rules"
		style="border: 1px solid #eee; box-shadow: 0 0 1px 2px #eee; padding: 15px 10px; position: relative;">
			<!-- <i class="fa fa-rocket rocket" :style="{color: rocketActive ? '#DE5549' : '#ddd'}" 
			@click="rocketActive = !rocketActive"
			aria-hidden="true" title="标记为火箭班"></i> -->
			<el-form-item label="学生人数" style="width: 50%;">
				<i style="color: #3AB1FF; font-size: 18px;" v-text="studentList.length"></i> 人
			</el-form-item>
			<el-form-item label="班级名称" prop="name" style="width: 40%;">
				<el-input type="input" v-model="classes.name"></el-input>
			</el-form-item>
			<el-form-item label="班主任" prop="teacher" style="width: 50%;">
				<el-select v-model="classes.teacher" placeholder="请选择">
				    <el-option
						v-for="item in teacherOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				    </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="教学科目" style="width: 80%;">
				<el-tag v-for="subject in curClassify.subjects" style="margin: 3px 8px;">
					{{subject}}
				</el-tag>
			</el-form-item>
			<el-form-item label="备注" style="width: 90%;">
				<el-input type="textarea" v-model="classes.remarks" :row="8"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="visibleAddClass = false">取 消</el-button>
			<el-button type="primary" @click="sureAddClass">成立班级</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import { requestTeacherList, requestCreateClass } from '@/api/choice_api.js';
export default {
	name: 'divide-new-class',
	data() {
		return {
			visibleAddClass: false,
			rocketActive: false,
			curClassify: '',
			teacherOptions: '',
			curTeacher: '',
			studentList: [],
			classes: {
				name: '',
				teacher: '',
				subjects: []
			},
			rules: {
				name: [
					{ required: true, message: '请输入班级名称', trigger: 'change' }
				],
				teacher: [
					{ required: true, message: '请为班级分配班主任', trigger: 'change' }
				]
			}
		}
	},
	methods: {
		sureAddClass: function(){
			let _this = this;
			_this.$refs.classes.validate((valid) => {
				if(!valid) return false;
				_this.$confirm('是否确定创建该班级?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	_this.requestNewClass();
		        });
			});
		},
		requestNewClass: function(){
			let _this = this;
			let curTeacher = JSON.parse(_this.classes.teacher);
			let params = {
				name: _this.classes.name,
				gradeId: _this.curClassify.gradeId,
				gradeName: _this.curClassify.gradeName,
				classTypeId: _this.curClassify.classTypeId,
				classTypeName: _this.curClassify.classTypeName,
				headTeacherId: curTeacher.teacherId,
				headTeacherName: curTeacher.teacherName,
				description: _this.classes.remarks,
				classStudents: _this.studentList,
			};
			requestCreateClass(params).then(data => {
				_this.$message({ type: 'success', message: '创建班级成功!' });
				_this.$emit('create-class-success', '');
				_this.visibleAddClass = false;
			}).catch(err => {
				_this.$message.error('操作失败');
			});
		}
	}
}
</script>

<style scoped>
.divide-new-class{

}
.divide-new-class .rocket{
	font-size: 36px;
	color: #ddd;
	position: absolute;
	right: 20px;
	top: 10px;
	cursor: pointer;
}
</style>