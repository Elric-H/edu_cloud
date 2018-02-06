<template>
<div class="health-info" v-show="showInfo">
	<div class="info-header clearfix">
		<div class="pull-left" @click="backBtn">
			<span class="iconfont icon-left"></span>返回
		</div>
		<!-- <div class="pull-right">
			<span class="iconfont icon-download"></span>导出
		</div> -->
	</div>
	<div class="box" v-loading="loading">
		<div class="info-content">
			<div class="img">
				<img :src="studentInfo.img">
			</div>
			<div class="info clearfix">
				<div class="pull-left over-ell name" v-text="studentInfo.name"></div>
				<div class="pull-left over-ell">性别 <span v-text="studentInfo.gender"></span></div>
				<div class="pull-left over-ell">年龄 <span v-text="studentInfo.age + '岁'"></span></div>
				<div class="pull-left over-ell">身高 <span v-text="studentInfo.height + 'cm'"></span></div>
				<div class="pull-left over-ell">体重 <span v-text="studentInfo.weight + 'kg'"></span></div>
				<div class="pull-left over-ell">肺活量 <span v-text="studentInfo.vital + 'ml'"></span></div>
				<div class="pull-left over-ell">血压 <span v-text="studentInfo.blood + 'mmhg'"></span></div>
				<div class="pull-left over-ell">心率 <span v-text="studentInfo.heatRate"></span></div>
			</div>
		</div>
		<div class="bas clearfix">
			<div class="pull-left over-ell col-100">
				既往病史 <span v-text="studentInfo.prevH"></span>
			</div>
			<div class="pull-left over-ell col-100">
				家族病史 <span v-text="studentInfo.familyH"></span>
			</div>
			<div class="pull-left over-ell col-100">
				遗传病史 <span v-text="studentInfo.inherH"></span>
			</div>
		</div>
		<!-- <div class="other clearfix">
			<div class="pull-left col-48">
				<div></div>
			</div>
			<div class="pull-right col-48">
				<div></div>
			</div>
		</div> -->
	</div>
</div>
</template>

<script>
import { getHealthInfo } from '@/api/sm_api.js'
export default {
	name: 'health-info',
	data() {
		return {
			showInfo: false,
			loading: false,
			studentInfo: {}
		}
	},
	methods: {
		getHealthInfo: function(studentId){
			let _this = this;
			_this.loading = true;
			getHealthInfo({studentId: studentId}).then((data) => {
				_this.studentInfo = data;
				_this.loading = false;
			}).catch(err => {
                if(err == '9999') _this.$message({type: 'info', message: '未查找到数据'});
				_this.loading = false;
			});
		},
		backBtn: function(){
			this.showInfo = false;
			this.$emit('back-fun');
		}
	}
}
</script>

<style scoped>
.health-info .info-header{
	height: 40px;
	line-height: 40px;
	padding: 0px 10px;
	border-bottom: 1px solid #ddd;
}
.health-info .info-header span{
	margin: 0px 3px;
}
.health-info .info-header{
	cursor: pointer;
}
.health-info .info-header .pull-right{
	color: #4693D7;
}
.health-info .box{
	padding: 20px;
	font-size: 13px;
	color: #333;
	font-weight: bold;
	letter-spacing: 1px;
	border-left: 1px solid #ddd;
}
.health-info .info-content{
	position: relative;
	padding-left: 75px;
	border-bottom: 1px solid #ddd;
}
.health-info .info-content span{
	color: #444;
	margin-left: 5px;
	font-weight: 300;
}
.health-info .info-content .img{
	position: absolute;
	top: 0px;
	left: 0px;
	width: 60px;
}
.health-info .info-content img{
	width: 100%;
}
.health-info .info{
	padding: 10px 0px;
}
.health-info .info>div{
	width: 20%;
	line-height: 22px;
}
.health-info .info .name{
	font-size: 16px;
}
.health-info .bas{
	padding: 15px 0px 15px 75px;
	border-bottom: 1px solid #ddd;
}
.health-info .bas>div{
	line-height: 25px;
}
.health-info .bas span{
	color: #666;
	font-weight: 300;
}
.health-info .bas .col-20{
	width: 20%;
}
.health-info .bas .col-100{
	width: 100%;
}
.health-info .other{
	padding: 15px 0px 15px 75px;
}
.health-info .other .col-48{
	width: 48%;
}
.health-info .other .col-48>div{
	height: 200px;
	border: 1px solid #7AB8E9;
}
</style>