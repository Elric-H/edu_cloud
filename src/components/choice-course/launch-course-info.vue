<template>
<div class="launch-course-info">
	<el-dialog
		title="发起选课"
		:modal-append-to-body="false"
		:visible.sync="visiblePublish"
		width="50%" style="padding: 10px;">
		<el-form :model="launch"  label-width="80px" ref="editorCourse" :rules="rules">
			<el-form-item label="预选时间" prop="primaryDate">
				<el-date-picker
			      v-model="launch.primaryDate"
			      type="datetimerange"
			      range-separator="至"
			      format="yyyy 年 MM 月 dd 日"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
			</el-form-item>
			<el-form-item label="调整时间" prop="adjectDate">
				<el-date-picker
			      v-model="launch.adjectDate"
			      type="datetimerange"
			      range-separator="至"
			      format="yyyy 年 MM 月 dd 日"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
			</el-form-item>
			<el-form-item label="公告内容" prop="content">
				<el-input type="textarea" v-model="launch.content"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="visiblePublish = false">取 消</el-button>
			<el-button type="primary" @click="submitPublish">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import { conventDate } from '@/common/js/tqt_util.js';
import { requestLaunchChoice } from '@/api/choice_api.js';
export default {
	name: 'launch-course-info',
	mounted() {
		this.launch.primaryDate[0] = new Date();
		this.launch.primaryDate[1] = new Date(new Date().getTime() + 1000*3600*24*5);
		this.launch.adjectDate[0] = new Date(new Date().getTime() + 1000*3600*24*5);
		this.launch.adjectDate[1] = new Date(new Date().getTime() + 1000*3600*24*10);
	},
	data() {
		return {
			visiblePublish: false,
			checkedClassTypeArr: [],
			launch: {
				primaryDate: [new Date(), new Date()],
				adjectDate: [new Date(), new Date()],
				content: '请输入内容...',
			},
			rules: {
				primaryDate: [
					{ required: true, message: '选择发布时间段', trigger: 'change' }
				],
				adjectDate: [
					{ required: true, message: '选择调整时间段', trigger: 'change' }
				]
			}
		}
	},
	methods: {
		submitPublish: function(){		//发布选课
			let _this = this;
			if(_this.launch.primaryDate[1].getTime() > _this.launch.adjectDate[0].getTime()){
				return _this.$message.error('请将调整时间设置在预选时间完成之后！');
			}
			_this.$confirm('是否确定发布选课任务?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	        	_this.launchChoice();
	        });
		},
		launchChoice: function(){
			let _this = this;
			let params = {
				startTime: conventDate(_this.launch.primaryDate[0], true),
				endTime: conventDate(_this.launch.primaryDate[1], true),
				changeStartTime: conventDate(_this.launch.adjectDate[0], true),
				changeEndTime: conventDate(_this.launch.adjectDate[1], true),
				content: _this.launch.content,
				subClassifyList: _this.checkedClassTypeArr
			};
			requestLaunchChoice(params).then(data => {
				_this.visiblePublish = false;
				_this.$emit('fresh-course-list', '');
				_this.$message({ type: 'success', message: '操作成功!' });
			}).catch(err => {
				_this.visiblePublish = false;
				_this.$message({ type: 'info', message: '操作失败' });
			});
		}
	}
}
</script>

<style scoped>
.launch-course-info{

}
</style>