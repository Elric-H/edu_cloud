<template>
<div class="enrollment-info" v-show="showInfo">
	<div class="info-header clearfix">
		<div style="cursor: pointer;" class="pull-left" @click="backBtn">
			<span  class="iconfont icon-left"></span>返回
		</div>
		<!-- <div class="pull-right">
			<span class="iconfont icon-download"></span>导出
		</div> -->
	</div>
	<div class="box" v-loading="loading">
		<div v-if="showPage">
			<div class="info-content">
				<div class="img">
					<img :src="enrollObj.infoObj.img">
				</div>
				<div class="info">
					<div class="info-1 clearfix">
						<div class="pull-left over-ell">姓名 <span v-text="enrollObj.infoObj.name"></span></div>
						<div class="pull-left over-ell">性别 <span v-text="enrollObj.infoObj.gender"></span></div>
						<div class="pull-left over-ell">年龄 <span v-text="enrollObj.infoObj.age"></span></div>
					</div>
					<div class="info-2 clearfix">
						<div class="pull-left over-ell">学籍 <span v-text="enrollObj.infoObj.enroll"></span></div>
						<div class="pull-left over-ell">民族 <span v-text="enrollObj.infoObj.native"></span></div>
					</div>
				</div>
				<div class="info other">
					<div>出生日期 <span v-text="enrollObj.infoObj.birthday"></span></div>
					<div>身份证号 <span v-text="enrollObj.infoObj.idCard"></span></div>
					<div>政治面貌 <span v-text="enrollObj.infoObj.politicalStatusName"></span></div>
				</div>
			</div>
			<div class="bas other clearfix">
				<div class="pull-left over-ell col-38">
					<span class="lab">曾用名</span>
					<span class="val" v-text="enrollObj.infoObj.beforeName"></span>
				</div>
				<div class="pull-left over-ell col-38">
					<span class="lab">籍贯</span>
					<span class="val" v-text="enrollObj.infoObj.nativePlace"></span>
				</div>
				<div class="pull-left over-ell col-100">
					<span class="lab">出生地</span>
					<span class="val" v-text="enrollObj.infoObj.birthPlace"></span>
				</div>
				<div class="pull-left over-ell col-100">
					<span class="lab">户口所在</span>
					<span class="val" v-text="enrollObj.infoObj.currentAddress"></span>
				</div>
			</div>
			<div>
				<h4 style="margin: 5px 0px 0px;">个人简历</h4>
				<el-table :data="enrollObj.schoolArr" style="width: 100%">
					<el-table-column
						prop="start_end"
						label="何年何月至何年何月"
						width="220">
					</el-table-column>
					<el-table-column
						prop="address"
						label="在何学校学习">
					</el-table-column>
			    </el-table>
			</div>
			<div>
				<h4 style="margin: 5px 0px 0px;">家庭成员</h4>
				<el-table :data="enrollObj.parentArr" style="width: 100%">
					<el-table-column
						prop="relationshipName"
						label="关系"
						width="50">
					</el-table-column>
					<el-table-column
						prop="name"
						label="姓名"
						width="50">
					</el-table-column>
					<el-table-column
						prop="age"
						label="年龄"
						width="50">
					</el-table-column>
					<el-table-column
						prop="politicalStatusName"
						label="政治面貌"
						width="80">
					</el-table-column>
					<el-table-column
						prop="workAddress"
						label="工作单位职务及地址">
					</el-table-column>
					<el-table-column
						prop="phone"
						label="联系电话">
					</el-table-column>
			    </el-table>
			</div>
			<div class="bas other clearfix">
				<div class="pull-left over-ell col-50">
					<span class="lab">入学时间</span>
					<span class="val" v-text="enrollObj.infoObj.enterDate"></span>
				</div>
				<div class="pull-left over-ell col-50">
					<span class="lab">班级</span>
					<span class="val" v-text="enrollObj.infoObj.className"></span>
				</div>
				<div class="pull-left over-ell col-50">
					<span class="lab">学籍状态</span>
					<span class="val" v-text="enrollObj.infoObj.status"></span>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { getEnrollInfo } from '@/api/sm_api.js'
export default {
	name: 'enrollment-info',
	data() {
		return {
			showInfo: false,
			loading: false,
			showPage: false,
			enrollObj: []
		}
	},
	methods: {
		getEnrollInfo: function(studentId){
			let _this = this;
			_this.loading = true
			getEnrollInfo({studentId: studentId}).then((data) => {
				_this.enrollObj = data;
				_this.showPage = true;
				_this.loading = false;
			}).catch(err => {
                if(err == '9999') _this.$message({type: 'info', message: '未查找到数据'});
				_this.$message(err);
				_this.showPage = true;
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
.enrollment-info .info-header{
	height: 40px;
	line-height: 40px;
	padding: 0px 10px;
	border-bottom: 1px solid #ddd;
}
.enrollment-info .info-header span{
	margin: 0px 3px;
}
.enrollment-info .info-header{
	//cursor: pointer;
}
.enrollment-info .info-header .pull-right{
	color: #4693D7;
}
.enrollment-info .box{
	padding: 20px;
	font-size: 13px;
	color: #333;
	font-weight: bold;
	letter-spacing: 1px;
}
.enrollment-info .info-content{
	position: relative;
	padding-left: 120px;
}
.enrollment-info .info-content span{
	color: #444;
	margin-left: 5px;
	font-weight: 300;
}
.enrollment-info .info-content .img{
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100px;
}
.enrollment-info .info-content img{
	width: 100%;
}
.enrollment-info .info{
	padding: 5px 0px;
	border-bottom: 1px solid #ddd;
}
.enrollment-info .other>div{
	line-height: 22px;
}
.enrollment-info .info-content .info-1>div{
	width: 33%;
	line-height: 22px;
}
.enrollment-info .info-content .info-2>div:first-child{
	width: 66%;
	line-height: 22px;
}
.enrollment-info .info-content .info-2>div:last-child{
	width: 33%;
	line-height: 22px;
}
.enrollment-info .bas{
	padding: 15px 0px;
	border-bottom: 1px solid #ddd;
}
.enrollment-info .bas .col-38{
	width: 38%;
}
.enrollment-info .bas .col-24{
	width: 24%;
}
.enrollment-info .bas .col-100{
	width: 100%;
}
.enrollment-info .bas .col-50{
	width: 50%;
}
.enrollment-info .bas .lab{
	display: inline-block;
	width: 60px;
	text-align:justify;
	text-align-last: justify;
}
.enrollment-info .bas .val{
	color: #444;
	margin-left: 5px;
	font-weight: 300;
}
</style>