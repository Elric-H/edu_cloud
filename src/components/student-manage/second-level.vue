<template>
<div class="second-level">
	<div class="toUp text-center" @click="toUp">
		<img src="../../assets/student-manage/arrow_left.png">
	</div>
	<div class="box" ref="srcollBox">
		<div class="box-list clearfix" ref="srcoll">
			<div class="list enroll clearfix">
				<div :class="{'e-active': curPage == 'enroll'}" @click="toTargetPage('enroll')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/enrollment-manage.png">
					</div>
					<div class="right pull-left text-center">
						<div>学籍管理</div>
					</div>
				</div>
			</div>
			<div class="list credit clearfix">
				<div :class="{'c-active': curPage == 'credit'}" @click="toTargetPage('credit')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/credit-manage.png">
					</div>
					<div class="right pull-left text-center">
						<div>学分管理</div>
					</div>
				</div>
			</div>
			<div class="list score clearfix">
				<div :class="{'s-active': curPage == 'score'}" @click="toTargetPage('score')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/score-manage.png">
					</div>
					<div class="right pull-left text-center">
						<div>成绩档案</div>
					</div>
				</div>
			</div>
			<div class="list health clearfix">
				<div :class="{'h-active': curPage == 'health'}" @click="toTargetPage('health')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/health-file.png">
					</div>
					<div class="right pull-left text-center">
						<div>健康档案</div>
					</div>
				</div>
			</div>
			<div class="list school clearfix">
				<div :class="{'sc-active': curPage == 'school'}" @click="toTargetPage('school')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/io-school.png">
					</div>
					<div class="right pull-left text-center">
						<div>每日出、入校时间</div>
					</div>
				</div>
			</div>
			<div class="list card clearfix">
				<div :class="{'ca-active': curPage == 'card'}" @click="toTargetPage('card')">
					<div class="left pull-left text-center">
						<img src="../../assets/student-manage/ICcard.png">
					</div>
					<div class="right pull-left text-center">
						<div>一卡通消费</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="toDown text-center" @click="toDown">
		<img src="../../assets/student-manage/arrow_right.png">
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
			curPage: 'enroll'
		}
	},
	methods: {
		toTargetPage: function(name){
			this.curPage = name;
			this.$router.push(name);
		},
		toUp: function(){
			let left = parseInt(this.$refs.srcoll.style.left);
			if(left >= 0) return;
			if((left + 234) >= 0) this.$refs.srcoll.style.left = 0 + 'px';
			else this.$refs.srcoll.style.left = (left + 234) + 'px';
		},
		toDown: function(){
			let max = this.$refs.srcollBox.getBoundingClientRect().width;
			let left = parseInt(this.$refs.srcoll.style.left);
			if((max - 1416) == left) return;
			if((max - 1416) <= (left - 234)) this.$refs.srcoll.style.left = (left - 234) + 'px';
			else this.$refs.srcoll.style.left = (max - 1416) + 'px';
		}
	}
}
</script>

<style scoped>
.second-level{
	position: relative;
	padding: 0px 25px; 
	height: 106px;
}
.second-level .toUp{
	position: absolute;
	top: 0px;
	left: 0px;
	background-color: #BAD0E7;
	height: 100%;
	width: 25px;
	z-index: 2;
	cursor: pointer;
}
.second-level .toUp img, .second-level .toDown img{
	margin-top: 33px;
}
.second-level .toDown{
	position: absolute;
	top: 0px;
	right: 0px;
	background-color: #BAD0E7;
	height: 100%;
	width: 25px;
	z-index: 2;
	cursor: pointer;
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
.second-level .enroll{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .enroll:hover{
	border: 1px solid #7AB8E9;
	box-shadow: 0px 0px 4px #7AB8E9;
}
.second-level .e-active{
	border: 1px solid #7AB8E9;
	box-shadow: 0px 0px 4px #7AB8E9;
}
.second-level .enroll .left{
	background-color: #7AB8E9;
}
.second-level .credit{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .credit:hover{
	border: 1px solid #6EC9DE;
	box-shadow: 0px 0px 4px #6EC9DE;
}
.second-level .c-active{
	border: 1px solid #6EC9DE;
	box-shadow: 0px 0px 4px #6EC9DE;
}
.second-level .credit .left{
	background-color: #6EC9DE;
}
.second-level .score{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .score:hover{
	border: 1px solid #80CBC7;
	box-shadow: 0px 0px 4px #80CBC7;
}
.second-level .s-active{
	border: 1px solid #80CBC7;
	box-shadow: 0px 0px 4px #80CBC7;
}
.second-level .score .left{
	background-color: #80CBC7;
}
.second-level .health{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .health:hover{
	border: 1px solid #F2D780;
	box-shadow: 0px 0px 4px #F2D780;
}
.second-level .h-active{
	border: 1px solid #F2D780;
	box-shadow: 0px 0px 4px #F2D780;
}
.second-level .health .left{
	background-color: #F2D780;
}
.second-level .school{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .school:hover{
	border: 1px solid #F1927C;
	box-shadow: 0px 0px 4px #F1927C;
}
.second-level .sc-active{
	border: 1px solid #F1927C;
	box-shadow: 0px 0px 4px #F1927C;
}
.second-level .school .left{
	background-color: #F1927C;
}
.second-level .card{
	border: 1px solid #ddd;
	box-shadow: 0px 0px 4px #F1F5F8;
}
.second-level .card:hover{
	border: 1px solid #ED87AC;
	box-shadow: 0px 0px 4px #ED87AC;
}
.second-level .ca-active{
	border: 1px solid #ED87AC;
	box-shadow: 0px 0px 4px #ED87AC;
}
.second-level .card .left{
	background-color: #ED87AC;
}
.second-level .list img{
	position: absolute;
	top: 23px;
	left: 25px;
	width: 30px;
	height: 30px;
}
</style>