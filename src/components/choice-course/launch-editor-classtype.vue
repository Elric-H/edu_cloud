<template>
<div class="launch-editor-classtype">
	<el-dialog
		title="编辑班级类型"
		:modal-append-to-body="false"
		:visible.sync="visibleEditor"
		@close="reForm"
		width="50%" style="padding: 10px;">
		<el-form :model="classifyObj" label-width="80px" :rules="rules">
			<el-form-item label="年度" prop="years" style="width: 40%;">
				<el-date-picker
				    v-model="classifyObj.years"
				    align="right"
				    type="year"
				    value-format="yyyy"
				    placeholder="选择年度">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="年级" prop="grade">
				<el-radio-group v-model="classifyObj.grade">
					<template v-for="grade in gradeList">
						<el-radio :label="JSON.stringify(grade)" name="grade" class="abc">
							{{grade.name}}
						</el-radio>
					</template>
				</el-radio-group>
				<span v-if="gradeList.length<=0" style="font-size:80%;color:red">无数据，请重新选择年度</span>
			</el-form-item>
			<el-form-item label="负责人" prop="leading" style="width: 40%;">
				<el-input v-model="classifyObj.leading"></el-input>
			</el-form-item>
			<el-form-item label="学科选择" prop="subjects">
				<el-checkbox-group v-model="classifyObj.subjects" :max="3">
				    <template v-for="course in courseList">
				    	<el-checkbox :label="course.name">{{course.name}}</el-checkbox>
				    </template>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="分班人数" prop="maxNum">
				<el-input-number v-model="classifyObj.maxNum" min="0" max="1000"></el-input-number>
			</el-form-item>
			<el-form-item label="课时" prop="period">
				<el-input-number v-model="classifyObj.period" min="0" max="1000"></el-input-number>
			</el-form-item>
			<!-- <el-form-item label="学分" prop="credit">
				<el-input-number v-model="classifyObj.credit"></el-input-number>
			</el-form-item> -->
			<el-form-item label="备注" prop="remarks" style="width: 90%;">
				<el-input type="textarea" placeholder="添加备注....." v-model="classifyObj.remarks" :row="8"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="visibleEditor = false">取 消</el-button>
			<el-button type="primary" @click="submitEditor">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import { requestGradeList, requestEditorClassify } from '@/api/choice_api.js';
export default {
	name: 'launch-editor-classtype',
	props: {
		courseList: {
			required: true,
			type: Array
		}
	},
	data() {
		return {
			visibleEditor: false,
			gradeList: [],
			index: undefined,
			classifyObj: {},
			rules: {
				years: [
					{ required: true, message: '选择年度（如2018）', trigger: 'change' }
				],
				grade: [
					{ required: true, message: '选择年级', trigger: 'change' }
				],
				leading: [
					{ required: true, message: '填写负责人', trigger: 'change' }
				],
				subjects: [
					{ required: true, message: '选择三门学科', trigger: 'change', type: 'array'},
				]
			}
		}
	},
	methods: {
		changeYears: function(){
			let _this = this;
			let years = _this.classifyObj.years;
			if(!years) return;
			requestGradeList({years}).then(data => {
				_this.gradeList = data;
			}).catch(err => {
				_this.$message.error(err);
			});
		},
		submitEditor: function(){	//提交编辑
			let _this = this;
			let gradeStr = JSON.parse(_this.classifyObj.grade);
			let params = {
				id: _this.classifyObj.id,
				years: _this.classifyObj.years,
				gradeId: gradeStr.id,
				gradeName: gradeStr.name,
				leading: _this.classifyObj.leading,
				classTypeName: _this.classifyObj.subjects.join('&'),
				expectNum: _this.classifyObj.maxNum,
				period: _this.classifyObj.period,
				description: _this.classifyObj.remarks
			};
			console.log('editor');
			requestEditorClassify(params).then(data => {
				console.log(data);
				_this.visibleEditor = false;
				_this.$message({ type: 'success', message: '操作成功!'});
				_this.$emit('fresh-course-list', '');
			}).catch(err => {
				_this.$message.error('服务异常，请联系管理员');
			});
		},
		reForm: function(){
			this.index = undefined;
			this.classifyObj = {}
		}
	},
	watch: {
		'classifyObj.years': 'changeYears'
	}
}
</script>

<style scoped>
.launch-editor-classtype{

}
</style>