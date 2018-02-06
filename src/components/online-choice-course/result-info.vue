<template>
<div class="result-info">
	<el-card class="box-card" style="min-height: 450px;">
	  	<div slot="header" class="clearfix">
	    	<span>选课详情</span>
	  	</div>
	  	<div class="box" v-loading="loading">
	  		<el-form :model="choiceObj" label-width="80px" v-if="showInfo">
				<el-form-item label="年度" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="choiceObj.years"></span>
				</el-form-item>
				<el-form-item label="年级" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="choiceObj.grade"></span>
				</el-form-item>
				<el-form-item label="负责人" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="choiceObj.leading"></span>
				</el-form-item>
				<el-form-item label="学科" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="choiceObj.subject"></span>
				</el-form-item>
				<el-form-item label="分班人数" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="choiceObj.maxNum"></span>
				</el-form-item>
				<el-form-item label="课时" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="choiceObj.period"></span>
				</el-form-item>
				<el-form-item label="热衷学科" style="width: 60%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" 
					v-text="choiceObj.likeOne + ', ' + choiceObj.likeTwo"></span>
				</el-form-item>
				<el-form-item label="是否分班" style="width: 90%; margin-bottom: 0px;">
					<span style="color: #39AEFF;" v-text="choiceObj.isDivide"></span>
				</el-form-item>
				<el-form-item label="备注" style="width: 90%;">
					<span style="color: #39AEFF;" v-text="choiceObj.remarks"></span>
				</el-form-item>
			</el-form>
	  	</div>
	</el-card>
</div>
</template>

<script>
import { requestIsSelected, requestChoiceResult } from '@/api/online_api.js';
export default {
	name: 'result-info',
	mounted() {
		this.lookIsChoice();
	},
	data() {
		return {
			showInfo: false,
			loading: true,
			choiceObj: {
				subject: '',
				years: '',
				grade: '',
				leading: '',
				maxNum: 0,
				period: 0,
				likeOne: '',
				likeTwo: '',
				remarks: ''
			}
		}
	},
	methods: {
		lookIsChoice: function(){
			let _this = this;
			requestIsSelected().then(data => {
				if(data == 2){
					return  _this.getChoiceInfo();
				} else {
					this.loading = false;
					this.$alert('你还未选课，暂无法查看选课结果。', '抱歉！', {
			          	confirmButtonText: '确定',
			          	type: 'warning'
			        });
				}
			});
		},
		getChoiceInfo: function(){
			let _this = this;
			requestChoiceResult().then(data => {
				_this.choiceObj = data;
				_this.showInfo = true;
				_this.loading = false;
				console.log(1);
			}).catch(err => {
				_this.loading = false;
				_this.$message.error(err);
			});
		}
	}
}
</script>

<style scoped>
.result-info{

}
</style>