<template>
<div class="score-header">
	<el-row>
		<el-col :span="24">
			<div class="clearfix box">
				<div class="pull-left" style="padding-left: 15px; width: 110px;">
					<el-select v-model="curYear" placeholder="请选择">
					    <el-option
					      v-for="item in yearsList"
					      :key="item"
					      :label="item"
					      :value="item">
					    </el-option>
					</el-select>
				</div>
				<div class="pull-left" style="padding-left: 15px; width: 100px;">
					<el-select v-model="curTrem" placeholder="请选择">
					    <el-option
					      v-for="item in tremsList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="pull-left" style="padding-left: 15px; width: 140px;">
					<el-select v-model="curSelect" placeholder="请选择">
					    <el-option
					      v-for="item in selectArr"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="pull-right content">
					<el-input style="width: auto" v-model="searchText" placeholder="姓名" class="input-with-select"></el-input>
					<el-button slot="append" icon="el-icon-search" @click.native="onSubmit">查询</el-button>
				</div>
			</div>
		</el-col>
	</el-row>
</div>
</template>

<script>
import { getScoreType } from '@/api/sm_api.js'
export default {
	name: 'score-header',
	mounted() {
		this.requestSelect();
	},
	data() {
		return {
			listBox: [],	//所以列表
			curYear: '',	//当前时间
			yearsList: [],	//时间列表
	        curSelect: '',	//当前考试
	        selectArr: [],	//考试列表
	        searchText: '',	//查询条件
	        curTrem: 1,		//当前学期
	        tremsList: [	//学期列表
				{
					value: 1,
					label: '上学期'
				},
				{
					value: 2,
					label: '下学期'
				}
			],
		}
	},
	methods: {
		requestSelect: function(){
			let _this = this;
			getScoreType().then((data) => {
				_this.yearsList = data.years;
				_this.curYear = _this.yearsList[0];
				_this.listBox = data.arr;
				_this.showSelect();
			}).catch(err => {
				_this.$message.error(err);
			});
		},
		showSelect: function(){
			let _this = this;
			if(_this.listBox.length == 0) return;
			let arr = [];
			_this.listBox.forEach(function(one){
				if(one.years == _this.curYear && one.term == _this.curTrem){
					arr.push(one);
				}
			});
			if(arr.length !== 0){
				_this.selectArr = arr;
				_this.curSelect = arr[0].value;
			} else {
				_this.selectArr = [];
				_this.curSelect = '';
			}
		},
		onSubmit: function(){
			if(!this.curSelect) return;
			let cur = JSON.parse(this.curSelect);
			let obj = {
				searchText: this.searchText,
				examId: cur.examId,
				examType: cur.examType
			};
			console.log(obj);
			this.$emit('submit-search', obj);
		}
	},
	watch: {
		'curYear': 'showSelect',
		'curTrem': 'showSelect',
		'curSelect': 'onSubmit'
	}
}
</script>

<style scoped>
.score-header{
	background-color: #fff;
	border-bottom: 1px solid #ddd;
}
.score-header .label-list{
	margin-top: 12px;
	height: 16px;
	line-height: 16px;
	padding-left: 15px;
}
.score-header .box{
	height: 40px;
	line-height: 40px;
	padding-right: 30px;
}
.score-header .box .content{
	position: relative;
	padding-left: 10px;
}
</style>