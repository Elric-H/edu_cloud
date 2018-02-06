<!--**信息管理 **
**name:wp**
**date:2017/12/18*-->
<template>
	<section class="home-content-tab">
		<!--<el-col :span="24" class="homeHeader boxbaw">
			<div class="fl ml15">
				<i class="fa fa-clock-o"></i>
				<span>快捷提醒</span>
			</div>
		</el-col> yuyang 2018/01/09-->
		<el-main class="pd1015">
		<el-row>
			<el-col :span="24">
				<info-box class="fl mr12" ref="infobox" bgcolor="#7bc7eb" iconClass="fa fa-laptop" @click.native="toggleTab(1)">
					<div class="ptext">
						<p class="toptext">
							<span class="num">{{ teacherWorkCount }}</span>
							<span>项</span>
						</p>
						<p class="btext">
							待批改作业
						</p>
					</div>
				</info-box>

				<info-box class="fl mr12" v-if="userType == 2" ref="infobox" bgcolor="#7bc7eb" iconClass="fa fa-laptop" @click.native="toggleTab('homework')">
					<div class="ptext">
						<p class="toptext">
							<span class="num">{{ studentWorkCount }}</span>
							<span>项</span>
						</p>
						<p class="btext">
							待完成作业
						</p>
					</div>
				</info-box>

				<info-box class="fl mr12" ref="infobox" v-if="userType == 1" bgcolor="#81cbc7" iconClass="fa fa-envelope-open-o" @click.native="toggleTab(2)">
					<div class="ptext">
						<p class="toptext">
							<span class="num">{{ hrtNvTaskCount }}</span>
							<span>项</span>
						</p>
						<p class="btext">
							待审批出差
						</p>
					</div>
				</info-box>

				<info-box class="fl mr12" ref="infobox" v-if="userType == 1" bgcolor="#F1927C" iconClass="fa fa-sitemap" @click.native="toggleTab(3)">
					<div class="ptext">
						<p class="toptext">
							<span class="num">{{ hrlNvTaskCount }}</span>
							<span>项</span>
						</p>
						<p class="btext">
							待审批的请假
						</p>
					</div>
				</info-box>
				
				<info-box class="fl mr12" ref="infobox" v-if="userType == 1" bgcolor="#6ec9df" iconClass="fa fa-usd" @click.native="toggleTab(4)">
					<div class="ptext">
						<p class="toptext">
							<span class="num">0</span>
							<span>元</span>
						</p>
						<p class="btext">
							一卡通余额
						</p>
					</div>
				</info-box>
				<info-box class="fl" ref="infobox" v-if="userType == 1" bgcolor="#ed87ac" iconClass="fa fa-address-book" @click.native="toggleTab(5)">
					<div class="ptext">
						<p class="toptext">
							<!--<span class="num">已办事宜</span>-->
							<span class="tdss">已办事宜</span>
						</p>
						<p class="btext">
							点击查看
						</p>
					</div>
				</info-box>
			</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="14">
					<el-tabs type="border-card">
						<el-tab-pane>
							<span slot="label"><i class="el-icon-date"></i> 我的日程</span>
							<el-col :span="24" class="psonheight5">
								<full-calendar :events="fcEvents" lang="zh"></full-calendar>
							</el-col>
						</el-tab-pane>

						<el-tab-pane>
							<span slot="label"><i class="el-icon-tickets"></i> 我的课务</span>
							<el-col :span="24" class="psonheight5">
								<!--列表-->
								<el-table border :data="mykwData" max-height="700" highlight-current-row v-loading="listLoading" :row-class-name="tableRowClassName" style="width: 100%;">
									<el-table-column prop="dates" label="课数" width="100" align="center">
									</el-table-column>
									<el-table-column prop="1" label="星期一" align="center">
									</el-table-column>
									<el-table-column prop="2" label="星期二" align="center">
									</el-table-column>
									<el-table-column prop="3" label="星期三" align="center">
									</el-table-column>
									<el-table-column prop="4" label="星期四" align="center">
									</el-table-column>
									<el-table-column prop="5" label="星期五" align="center">
									</el-table-column>
									<el-table-column prop="6" label="星期六" align="center">
									</el-table-column>
									<el-table-column prop="7" label="星期日" align="center">
									</el-table-column>
								</el-table>
							</el-col>
						</el-tab-pane>
						<!--<el-tab-pane v-if="userType == 1">
							<span slot="label"><i class="el-icon-circle-check"></i> 已办事宜</span>
							<el-col :span="24" class="psonheight5">
								<div class="tzblock mt1510" v-for='(item,index) in myybData' v-if="index < 5">
									<span class="fa fa-bell-o"></span>
									<div class="textc">
										<h3>{{ item.name+'-'+item.description }}</h3>
										<p>{{ util.formatDate.format(new Date(item.apply_time),'yyyy-MM-dd hh:mm:ss') }}</p>
									</div>
									<span class="frLink">
									已完成
									<i class="fa fa-angle-right"></i>
								</span>
								</div>
							</el-col>

						</el-tab-pane>-->
					</el-tabs>

				</el-col>
				<el-col :span="10">
					<div class="topCard bgFFF pson-my-kewu psonheight2">
						<el-col :span="24" class="homeHeader boderBottom">
							<div class="fl ml15">
								<i class="fa fa-credit-card-alt"></i>
								<span>校园一卡通</span>
							</div>
							<!--<span class="fr cfa cursor">More</span>-->
						</el-col>

						<el-col :span="24">
							<div id="chartLine" style="width:100%; height:250px;"></div>
						</el-col>
					</div>

					<div class="topCard2 bgFFF pson-my-kewu psonheight3 mt10">
						<el-col :span="24" class="homeHeader boderBottom">
							<div class="fl ml15">
								<i class="fa fa-newspaper-o fl" style="margin: 14px 5px 0 0;"></i>
								<span class="fl">学校新闻</span>
								<el-breadcrumb class="fl" separator="|" style="margin: 13px 5px 0px 9px">
								  <el-breadcrumb-item @click.native="getNewsList(1)">公告</el-breadcrumb-item>
								  <el-breadcrumb-item @click.native="getNewsList(2)">规章</el-breadcrumb-item>
								  <el-breadcrumb-item @click.native="getNewsList(3)">通知</el-breadcrumb-item>
								  <el-breadcrumb-item @click.native="getNewsList(4)">会议</el-breadcrumb-item>
								  <el-breadcrumb-item></el-breadcrumb-item>
								</el-breadcrumb>
							</div>
							<!--<span class="fr cfa cursor">More</span>-->
						</el-col>

						<div class="newslist" v-loading="newsLoading" element-loading-text="新闻拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
							<ul>
								<li v-for="(item,index) in listData" @click="showDetail(item)">
									<span class="fl fltext">{{item.title}}</span>
									<span class="fr tpree">{{util.formatDate.format(new Date(item.releasedate), 'yyyy-MM-dd')}}</span>
								</li>
							</ul>
						</div>
					</div>

					<div class="topCard2 bgFFF pson-my-kewu psonheight4 mt10">
						<el-col :span="24" class="homeHeader boderBottom">
							<div class="fl ml15">
								<i class="fa fa-paper-plane-o"></i>
								<span>信息交互</span>
							</div>
						</el-col>
						<el-col :span="24">
							<el-input type="textarea" placeholder="请输入信息内容" class="mt5" v-model="ruleForm.content"></el-input>
							<el-button type="primary" @click="submitForm" class="fr mt5" :loading="addloading">提交</el-button>
						</el-col>
					</div>

				</el-col>
			</el-row>

		</el-main>
		<!-- 详情 弹窗 start-->
		<el-dialog title="新闻详情" :visible.sync="formDialogTableVisible" append-to-body class="newsc" :close-on-click-modal="false">
			<span>{{ newsContent }}</span>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->
	</section>
</template>
<script>
	import util from '../../common/js/util';
	import echarts from 'echarts';
	import vueFullcalendar from 'vue-fullcalendar';
	import infobox from 'components/classManager/info-box.vue';
	import axios from 'axios';
	import { getArtcileList, addInfoInteract, getScheduleList, getHistasks, getTeacherTimetable,getUserPending,getStudentTimetable } from '../../api/wp_api';

	export default {
		components: {
			'info-box': infobox,
			'full-calendar': vueFullcalendar
		},
		data() {
			return {
				hrlNvTaskCount:0,
				hrtNvTaskCount:0,
				studentWorkCount:0,
				teacherWorkCount:0,
				formDialogTableVisible: false,
				userType: 1,
				util: util,
				fcEvents: [],
				activeName: '1',
				listLoading: false,
				listData: [],
				myybData: [],
				mykwData: [],
				newsLoading: false,
				addloading: false,
				ruleForm: {
					content: ''
				},
				currentPage: 1,
				pageSize: 15,
				total: 2,
				newsContent: ''
			};
		},
		methods: {
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getListData();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getListData();
			},
			toggleTab(index) {
				if(index == 1) {
					this.$router.push({
						path: '/class-Manager',
						query: {
							type: 2
						}
					});
				}
				if(index == 'homework') {
					this.$router.push('/student-homeWork');
				}
				if(index == 2) {
					this.$router.push({
						path: '/transactionManager',
						query: {
							type: 1
						}
					});
				}
				if(index == 3) {
					this.$router.push({
						path: '/transactionManager',
						query: {
							type: 2
						}
					});
					
				}
				if(index == 5) {
					this.$router.push({
						path: '/transactionManager',
						query: {
							type: 1
						}
					});
					
				}
			},
			showDetail(row) {

				this.formDialogTableVisible = true;
//				this.newsContent = row.content;
				this.$nextTick(function(){
					$('div.newsc .el-dialog__body').html(row.content);
				});
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if(rowIndex % 2 === 0) {
					return 'warning-row';
				} else {
					return 'success-row';
				}
				return '';
			},
			submitForm() {
				let para = {
					f_content: this.ruleForm.content
				}
				if(!this.ruleForm.content) return;
				this.addloading = true;
				addInfoInteract(para).then((res) => {
					this.addloading = false;
					if(res.data.result.code == 0) {
						this.$message({
							message: '提交成功',
							type: 'success'
						});
						this.ruleForm.content = '';
					}
				});
			},
			drawLineChart() {
				this.chartLine = echarts.init(document.getElementById('chartLine'));
				this.chartLine.setOption({
					title: {
						text: ''
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['消费', '充值']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['01', '02', '03', '04', '05', '06', '07']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '消费',
							type: 'line',
							stack: '总量',
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '充值',
							type: 'line',
							stack: '总量',
							data: [220, 182, 191, 234, 290, 330, 310]
						}
					]
				});
			},
			//获取我的课务
			getListData() {
				this.listLoading = true;
				setTimeout(() => {
					this.mykwData = [{
							dates: '第一节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第二节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第三节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第四节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第五节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第六节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第七节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第八节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第九节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第十节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第十一节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第十二节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第十三节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						}
					];
				}, 50);
				getTeacherTimetable().then((res) => {
					res.data.data.timetableInfos.forEach((item, index) => {
						let value = item.subjectName + '-' + item.className,
							tea = item.teachingTime;
							
						if(tea[1].length > 0) {
							tea[1].forEach((items, index) => {
								this.mykwData[items-1][1] = value;
							})
						}
						if(tea[2].length > 0) {
							tea[2].forEach((items, index) => {
								this.mykwData[items-1][2] = value;
							})
						}
						if(tea[3].length > 0) {
							tea[3].forEach((items, index) => {
								this.mykwData[items-1][3] = value;
							})
						}
						if(tea[4].length > 0) {
							tea[4].forEach((items, index) => {
								this.mykwData[items-1][4] = value;
							})
						}
						if(tea[5].length > 0) {
							tea[5].forEach((items, index) => {
								this.mykwData[items-1][5] = value;
							})
						}
						if(tea[6].length > 0) {
							tea[6].forEach((items, index) => {
								this.mykwData[items-1][6] = value;
							})
						}
						if(tea[7].length > 0) {
							tea[7].forEach((items, index) => {
								this.mykwData[items-1][7] = value;
							})
						}
					})
					this.listLoading = false;
				});
			},
			
			//获取学生课务
			getStudentListData() {
				this.listLoading = true;
				setTimeout(() => {
					this.mykwData = [{
							dates: '第一节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第二节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第三节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第四节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第五节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},
						{
							dates: '第六节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第七节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第八节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第九节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第十节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第十一节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第十二节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						},{
							dates: '第十三节',
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							7: ''
						}
					];
				}, 50);
				getStudentTimetable().then((res) => {
					let className = res.data.data.classFullName;
					res.data.data.classTimetables.forEach((item, index) => {
						let value = item.subjectName,
							tea = item.content;
							
						if(tea[1].length > 0) {
							tea[1].forEach((items, index) => {
								this.mykwData[items-1][1] = value;
							})
						}
						if(tea[2].length > 0) {
							tea[2].forEach((items, index) => {
								this.mykwData[items-1][2] = value;
							})
						}
						if(tea[3].length > 0) {
							tea[3].forEach((items, index) => {
								this.mykwData[items-1][3] = value;
							})
						}
						if(tea[4].length > 0) {
							tea[4].forEach((items, index) => {
								this.mykwData[items-1][4] = value;
							})
						}
						if(tea[5].length > 0) {
							tea[5].forEach((items, index) => {
								this.mykwData[items-1][5] = value;
							})
						}
						if(tea[6].length > 0) {
							tea[6].forEach((items, index) => {
								this.mykwData[items-1][6] = value;
							})
						}
						if(tea[7].length > 0) {
							tea[7].forEach((items, index) => {
								this.mykwData[items-1][7] = value;
							})
						}
					})
					this.listLoading = false;
				});
			},
			//获取保单列表
			getNewsList(typeid) {
				let para = {
                    'category.id':typeid
                };
                this.newsLoading = true;
				getArtcileList(para).then((res) => {
					if(res.data.result.code == 0) {
						this.listData = res.data.data.content;
					}
					this.newsLoading = false;
				});
			},
			//获取日程列表
			getScheduleList() {
				getScheduleList().then((res) => {
					if(res.data.result.code == 0) {
						res.data.data.content.forEach((item, index) => {
							this.fcEvents.push({
								title: item.title,
								start: util.formatDate.format(new Date(item.scheduleDate), 'yyyy-MM-dd'),
								end: util.formatDate.format(new Date(item.scheduleDate), 'yyyy-MM-dd')
							});
						});
					}
				});
			},
			getUserPending(){
				getUserPending().then((res) => {
					let o = res.data.data;
					this.hrlNvTaskCount = o.hrlNvTaskCount;
					this.hrtNvTaskCount = o.hrtNvTaskCount;
					this.studentWorkCount = o.studentWorkCount;
					this.teacherWorkCount = o.teacherWorkCount;
				});
			},
			//获取已办事宜
			getHistasksList() {
				getHistasks().then((res) => {
					if(res.data.result.code == 0) {
						this.myybData = res.data.data;
					}
				});
			}
		},
		mounted() {
			this.drawLineChart();
		},
		updated() {
			this.drawLineChart();
		},
		created() {
			this.userType = JSON.parse(sessionStorage.getItem('userType'));
			//初始化新闻列表
			this.getNewsList();
			if(this.userType == 1){
				this.getListData();
			}
			if(this.userType == 2){
				this.getStudentListData();
			}
			
			this.getScheduleList();
			this.getHistasksList();
			this.getUserPending();
		}
	};
</script>