<template>
	<div class="contact-info">
		<div class="info-box">
			<img :src="student.headImg">
			<div class="name" v-text="student.name"></div>
			<el-row>
				<el-col :span="8">
					<div>
						学籍号
						<span v-text="student.number"></span>
					</div>
				</el-col>
				<el-col :span="8">
					<div>
						性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
						<span v-text="student.gender"></span>
					</div>
				</el-col>
				<el-col :span="8">
					<div>
						年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄
						<span v-text="student.age +'岁'"></span>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<div>
						班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级
						<span v-text="student.className"></span>
					</div>
				</el-col>
				<el-col :span="8">
					<div>
						民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族
						<span v-text="student.nation"></span>
					</div>
				</el-col>
				<el-col :span="8">
					<div>
						所在地
						<span v-text="student.currentAddress"></span>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="box info-contact" v-for="parent in student.parents">
			<div v-text="parent.relation"></div>
			<div style="padding-left: 50px;">
				<el-row>
					<el-col :span="8">
						姓名：<span class="val" v-text="parent.name"></span>
					</el-col>
					<el-col :span="8">
						民族：<span class="val" v-text="parent.nation"></span>
					</el-col>
					<el-col :span="8">
						职务：<span class="val" v-text="parent.occupation"></span>
					</el-col>
					<el-col :span="8">
						职业：<span class="val" v-text="parent.jobTitle"></span>
					</el-col>
					<el-col :span="8">
						联系电话：<span class="val" v-text="parent.phone"></span>
					</el-col>
					<el-col :span="8">
						qq：<span class="val" v-text="parent.qq"></span>
					</el-col>
					<el-col :span="8">
						email：<span class="val" v-text="parent.email"></span>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
    import { requestContactInfo } from '@/api/fs_api.js';
    export default {
        name: 'contact-info',
        data() {
            return {
                student: {}
            }
        },
        methods: {
            getStudentInfo: function(studentId){
                let _this = this;
                requestContactInfo(studentId).then(data => {
                    console.log(data);
                    _this.student = data;
                }).catch(err => {
                    _this.$message(err);
                    _this.$emit('hide-info', '');
                });
            },
        }
    }
</script>

<style scoped>
	.contact-info{
		background-color: #fff;
		padding: 30px 0px 50px 50px;
		min-height: 450px;
	}
	.contact-info .info-box{
		position: relative;
		padding: 20px 0px;
		border-bottom: 1px solid #ddd;
		height: 74px;
		padding-left: 94px;
		color: #333;
		font-weight: bold;
	}
	.contact-info .info-box img{
		position: absolute;
		top: 20px;
		left: 0px;
		width: 74px;
		height: 74px;
	}
	.contact-info .info-box .name{
		font-size: 24px;
		font-weight: bold;
		line-height: 35px;
		color: #555;
	}
	.contact-info .info-box span{
		padding-left: 10px;
		color: #666;
		font-weight: 300;
	}
	.contact-info .box{
		color: #666;
		padding: 20px 0px;
		border-bottom: 1px solid #ddd;
	}
	.contact-info .box .val{
		color: #333;
		font-weight: bold;
	}
</style>