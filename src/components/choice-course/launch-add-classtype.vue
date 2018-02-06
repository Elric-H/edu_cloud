<template>
<div class="launch-add-classtype">
	<el-dialog
		title="新增班级类型"
		:modal-append-to-body="false"
		:visible.sync="visibleAdd"
		@close="reForm"
		width="50%" style="padding: 10px;">
		<el-form :model="addCourse" label-width="80px" ref="addCourse" :rules="rules">
			<el-form-item label="年度" prop="years" style="width: 40%;">
				<el-date-picker
				    v-model="addCourse.years"
				    align="right"
				    type="year"
				    value-format="yyyy"
				    placeholder="选择年度">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="年级" prop="grade">
				<el-radio-group v-if="gradeList.length>0" v-model="addCourse.grade">
					<template v-for="grade in gradeList">
						<el-radio :label="grade" name="grade">{{grade.name}}</el-radio>
					</template>
				</el-radio-group>
				<span v-if="gradeList.length<=0" style="font-size: 80%;color: red">无数据，请重新选择年度</span>
			</el-form-item>
			<el-form-item label="负责人" prop="leading" style="width: 40%;">
				<el-input v-model="addCourse.leading"></el-input>
			</el-form-item>
			<el-form-item label="学科选择" prop="subjects">
				<el-checkbox-group v-model="addCourse.subjects" :max="3">
				    <template v-for="course in courseList">
				    	<el-checkbox :label="course.name">{{course.name}}</el-checkbox>
				    </template>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="分班人数" prop="maxNum">
				<el-input-number v-model="addCourse.maxNum" min="30" max="1000"></el-input-number>
			</el-form-item>
			<el-form-item label="课时" prop="period">
				<el-input-number v-model="addCourse.period" min="0" max="1000"></el-input-number>
			</el-form-item>
			<!-- <el-form-item label="学分" prop="credit">
				<el-input-number v-model="addCourse.credit" :min="1" :max="10"></el-input-number>
			</el-form-item> -->
			<el-form-item label="备注" prop="remarks" style="width: 90%;">
				<el-input type="textarea" placeholder="添加备注....." v-model="addCourse.remarks" :row="8"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="visibleAdd = false">取 消</el-button>
			<el-button type="primary" @click="submitAdd">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import { requestGradeList, requestAddClassify } from '@/api/choice_api.js';
export default {
	name: 'launch-add-classtype',
	props: {
		courseList: {
			required: true,
			type: Array
		}
	},
	data() {
		return {
			visibleAdd: false,
			gradeList: [],
			max: 100,
			addCourse: {
				subjects: [],							//学科
				years: '',								//年度
				grade: '',								//年级
				leading: '',							//负责人
				maxNum: 50,								//分班人数
				period: 36,								//课时
				credit: 5,								//学分
				remarks: ''				//备注
			},
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
			let years = _this.addCourse.years;
			if(!years) return;
			requestGradeList({years}).then(data=> {
				_this.gradeList = data;
			}).catch(err => {
				_this.$message.error(err);
			});
		},
		submitAdd: function(){	//提交新增
			let _this = this;
			_this.$refs.addCourse.validate((valid) => {
				if(!valid) return false;
				if(_this.addCourse.subjects.length !== 3) return _this.$message.error('请选择三门课程');
				let params = {
					years: _this.addCourse.years,
					gradeId: _this.addCourse.grade.id,
					gradeName: _this.addCourse.grade.name,
					classTypeName: _this.addCourse.subjects.join('&'),
					leading: _this.addCourse.leading,
					expectNum: _this.addCourse.maxNum,
					period: _this.addCourse.period,
					description: _this.addCourse.remarks
				};
				requestAddClassify(params).then(data => {
					_this.visibleAdd = false;
					_this.$message({ type: 'success', message: '操作成功!'});
					_this.$emit('fresh-course-list', '');
				}).catch(err => {
					_this.$message.error('服务异常，请联系管理员');
				});
			});
		},
		reForm: function() {
			this.addCourse = {
				subjects: [],							//学科
				years: '',								//年度
				grade: '',								//年级
				leading: '',							//负责人
				maxNum: 50,								//分班人数
				period: 36,								//课时
				credit: 5,								//学分
				remarks: '添加备注.....'				//备注
			};
		}
	},
	watch: {
		'addCourse.years': 'changeYears'
	}
}
</script>

<style scoped>
.launch-add-classtype{

}
</style>