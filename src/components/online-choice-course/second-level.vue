<template>
<div class="second-level">
	<div class="box" ref="srcollBox">
		<div class="box-list clearfix" ref="srcoll">
			<div class="list introduce clearfix">
				<div :class="{'e-active': curPage == 'introduce'}" @click="toTargetPage('introduce')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/enrollment-manage.png">
					</div>
					<div class="right pull-left text-center">
						<div>选课规定</div>
					</div>
				</div>
			</div>
			<div class="list join clearfix">
				<div :class="{'c-active': curPage == 'join'}" @click="toTargetPage('join')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/credit-manage.png">
					</div>
					<div class="right pull-left text-center">
						<div>参加预选</div>
					</div>
				</div>
			</div>
			<div class="list result clearfix">
				<div :class="{'s-active': curPage == 'result'}" @click="toTargetPage('result')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/score-manage.png">
					</div>
					<div class="right pull-left text-center">
						<div>选课结果</div>
					</div>
				</div>
			</div>
			<div class="list tracked clearfix">
				<div :class="{'h-active': curPage == 'tracked'}" @click="toTargetPage('tracked')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/health-file.png">
					</div>
					<div class="right pull-left text-center">
						<div>分班结果</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'second-level',
	mounted() {
		this.$refs.srcoll.style.left = '0px';
	},
	data() {
		return {
			curPage: 'introduce'
		}
	},
	methods: {
		toTargetPage: function(name){
			this.curPage = name;
			this.$router.push(name);
		}
	}
}
</script>

<style scoped>
.second-level{
	position: relative;
	padding: 0px 10px; 
	background-color: #fff;
	height: 106px;
}
.second-level .box{
	padding: 15px 12px;
	background-color: #fff;
	overflow: hidden;
}
.second-level .box-list{
	height: 76px;
	position: relative;
	left: 0px;
	width: 1416px;
	transition: .5s;
}
.second-level .list{
	display: inline-block;
	float: left;
	height: 100%;
	width: 220px;
	cursor: pointer;
	margin-right: 12px;
}
.second-level .list>div{
	height: 100%;
}
.second-level .left{
	position: relative;
	width: 80px;
	height: 100%;
}
.second-level .right{
	width: 138px;
	color: #333;
	height: 100%;
	display:flex; 
	justify-content:center; 
	align-items:center;
	background-color: #fff;
}
.second-level .introduce{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .introduce:hover{
	border: 1px solid #7AB8E9;
	box-shadow: 0px 0px 4px #7AB8E9;
}
.second-level .e-active{
	border: 1px solid #7AB8E9;
	box-shadow: 0px 0px 4px #7AB8E9;
}
.second-level .introduce .left{
	background-color: #7AB8E9;
}
.second-level .join{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .join:hover{
	border: 1px solid #6EC9DE;
	box-shadow: 0px 0px 4px #6EC9DE;
}
.second-level .c-active{
	border: 1px solid #6EC9DE;
	box-shadow: 0px 0px 4px #6EC9DE;
}
.second-level .join .left{
	background-color: #6EC9DE;
}
.second-level .result{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .result:hover{
	border: 1px solid #80CBC7;
	box-shadow: 0px 0px 4px #80CBC7;
}
.second-level .s-active{
	border: 1px solid #80CBC7;
	box-shadow: 0px 0px 4px #80CBC7;
}
.second-level .result .left{
	background-color: #80CBC7;
}
.second-level .tracked{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .tracked:hover{
	border: 1px solid #F2D780;
	box-shadow: 0px 0px 4px #F2D780;
}
.second-level .h-active{
	border: 1px solid #F2D780;
	box-shadow: 0px 0px 4px #F2D780;
}
.second-level .tracked .left{
	background-color: #F2D780;
}
.second-level .list img{
	position: absolute;
	top: 23px;
	left: 25px;
	width: 30px;
	height: 30px;
}
</style>