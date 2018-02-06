<template>
<div class="contact-search">
	<el-row>
		<el-col :span="3">
			<div class="label">详细信息</div>
		</el-col>
		<el-col :span="15" :offset="6">
			<div class="clearfix box">
				<!-- <div class="pull-right content">
					<input type="text" v-model="searchText" @keyup.13="searchBtn" placeholder="班级/学号/姓名">
					<div class="icon" @click="searchBtn">
						<span class="iconfont icon-fangdajing"></span>
					</div>
				</div> -->
				<div class="pull-right content">
					<el-input style="width: auto" v-model="searchText" placeholder="姓名" class="input-with-select"></el-input>
					<el-button slot="append" icon="el-icon-search" @click.native="searchBtn">查询</el-button>
					<!--<el-input placeholder="姓名" v-model="searchText" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
					</el-input> 20180109 yuyang-->
				</div>
				<!--<div class="pull-right lab">查询学生</div> 2018/01/09 yuyang-->
			</div>
		</el-col>
	</el-row>
</div>
</template>

<script>
export default {
	name: 'contact-search',
	data() {
		return {
			searchText: ''
		}
	},
	methods: {
		searchBtn: function(){
			if(!this.searchText) return;
			this.$emit('search-fun', this.searchText);
		}
	}
}
</script>

<style scoped>
.contact-search{
	background-color: #fff;
	border-bottom: 1px solid #ddd;
}
.contact-search .label{
	height: 40px;
	line-height: 40px;
	padding-left: 20px;
}
.contact-search .box{
	height: 40px;
	line-height: 40px;
	padding-right: 10px;
}
.contact-search .box .content{
	position: relative;
	padding-left: 10px;
	padding-right: 29px;
}
.contact-search .box input{
	padding-left: 10px;
	height: 20px;
	width: 200px;
}
.contact-search .box .icon{
	position: absolute;
	top: 8px;
	right: 0px;
	width: 28px;
	height: 24px;
	border: 1px solid #999;
	cursor: pointer;
}
.contact-search .box .icon span{
	position: relative;
	top: -8px;
	left: 6px;
}
.contact-search .box .icon:hover span{
	color: #1D82FE;
}
</style>