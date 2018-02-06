<!--**请假管理 **
**name:wp**
**date:2017/12/20*-->
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!--<el-form-item>
					<el-input v-model="filters.name" placeholder="请输入关键字"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button  @click="getDataList" icon="el-icon-search">查询</el-button>
				</el-form-item>-->
				<el-form-item>
					<el-button @click="handleAdd" icon="el-icon-plus">请假申请</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="dataList" :max-height="maxHeight" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="40">
			</el-table-column>
			<el-table-column prop="name" label="当前节点" align="center">
			</el-table-column>
			<el-table-column prop="name" label="当前状态" align="center">
				<template scope="scope">
					<template v-if="scope.row.result == undefined">
						待审核
					</template>
					<template v-if="scope.row.result == true">
						审核通过
					</template>
					<template v-if="scope.row.result == false">
						审核未通过
					</template>
				</template>
			</el-table-column>
			<el-table-column prop="apply_time" label="申请时间" align="center">
			</el-table-column>
			<el-table-column prop="description" label="描述" align="center">
			</el-table-column>
			<el-table-column label="操作" width="150" align="center">
				<template scope="scope">
					<el-button size="small" @click.native="showDetail(scope.$index, scope.row)">查看审核</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			 <el-pagination
			 	class="fr"
			 	background
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-sizes="[10, 15, 20]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next"
		      :total="total">
		    </el-pagination>
		</el-col>

		<!--请假申请界面-->
		<el-dialog title="请假申请" :visible.sync="applicationFormVisible" width="30%" append-to-body :close-on-click-modal="false">
			<application-forLeave @closeDialog="closeDialog"></application-forLeave>
		</el-dialog>

		<!-- 详情 弹窗 start-->
		<el-dialog title="流程详情" :visible.sync="formDialogTableVisible" append-to-body :close-on-click-modal="false">
			<el-tabs>
				<el-row style="padding:0 40px;">
					<el-col :span="24">
						<dl class="dllist boderBottom">
							<dt class="fl">请假人:</dt>
							<dd v-if="deptData.apply_name">{{ deptData.apply_name }}</dd>
						</dl>
						<dl class="dllist boderBottom">
							<dt class="fl">请假时长:</dt>
							<dd v-if="deptData.days">{{ deptData.days }}</dd>
						</dl>
						<dl class="dllist boderBottom">
							<dt class="fl">请假类型:</dt>
							<dd v-if="deptData.type">{{ deptData.type == 1 ? '病假' : (deptData.type == 2 ? '事假' :(deptData.type == 3 ? '丧假' :(deptData.type == 4 ? '产假' :'婚假'))) }}</dd>
						</dl>
						<dl class="dllist boderBottom">
							<dt class="fl">请假开始时间:</dt>
							<dd v-if="deptData.startTime">{{ deptData.startTime }}</dd>
						</dl>
						<dl class="dllist boderBottom">
							<dt class="fl">请假结束时间:</dt>
							<dd v-if="deptData.endTime">{{ deptData.startTime }}</dd>
						</dl>
						<dl class="dllist boderBottom">
							<dt class="fl">请假原因:</dt>
							<dd v-if="deptData.reason">{{ deptData.reason }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row style="padding:0 40px;" v-if="comfirmISff">
					<el-col :span="24" class="mt10">
						<el-input type="textarea" placeholder="备注说明" v-model="ruleForm.remark"></el-input>
						<el-button size="small" class="mt10 fr ml15" type="danger" @click.native="noHandle">拒绝</el-button>
						<el-button size="small" class="mt10 fr" @click.native="passHandle">通过</el-button>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import { getLeaveTaskList, showDetailVariables,addPassTogo } from '../../api/wp_api';
	import applicationForLeave from '../../components/leaveManager/applicationForLeave.vue';

	export default {
		components: {
			'application-forLeave': applicationForLeave
		},
		data() {
			return {
				filters: {
					name: ''
				},
				comfirmISff:false,
				ruleForm: {
					remark: ''
				},
				formDialogTableVisible: false,
				maxHeight: document.body.clientHeight - 92,
				dataList: [],
				deptData: {},
				total: 0,
				currentPage: 1,
				pageSize:15,
				listLoading: false,
				traveFormVisible: false, //出差申请界面是否显示
				applicationFormVisible: false, //请假申请界面是否显示
				curId: ''
			}
		},
		methods: {
			showDetail(index, row) {
				this.formDialogTableVisible = true;
				this.curId = row.id;
				let para = {
					executionId: row.proc_inst_id
				}
				showDetailVariables(para).then((res) => {
					if(res.data.result.code == 0) {
						this.deptData = res.data.data;
					}
				});
			},
			//拒绝
			noHandle() {
				let para = {
					vars:{
						result: false,
						remark: this.ruleForm.remark,
					},
					taskid:this.curId
				}
				addPassTogo(para).then((res) => {
					if(res.data.result.code == 0) {
						this.$message({
							message: '拒绝成功',
							type: 'success'
						});
						this.closeDialog();
					}
				});
			},
			//通过
			passHandle() {
				let para = {
					vars:{
						result: true,
						remark: this.ruleForm.remark,
					},
					taskid:this.curId
				}
				addPassTogo(para).then((res) => {
					if(res.data.result.code == 0) {
						this.$message({
							message: '审核成功',
							type: 'success'
						});
						this.closeDialog();
					}
				});
			},
			//关闭弹窗
			closeDialog() {
				this.traveFormVisible = false;
				this.applicationFormVisible = false;
				this.formDialogTableVisible = false;
				this.getDataList();
			},
			 handleSizeChange(val) {
		        this.pageSize = val;
				this.getDataList();
		      },
			//分页数据刷新
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getDataList();
			},
			//获取请假任务列表
			getDataList() {
				let para = {
					type:2,
					pageNum:this.currentPage,
					pageSize:this.pageSize
				};
				this.listLoading = true;
				getLeaveTaskList(para).then((res) => {
					this.dataList = res.data.data.content;
					this.total = res.data.data.total;
					this.listLoading = false;
				});
			},
			//显示出差申请界面
			handleEdit(index, row) {
				this.traveFormVisible = true;
			},
			//显示请假申请界面
			handleAdd() {
				this.applicationFormVisible = true;
			},
		},
		activated(){
			let user = JSON.parse(sessionStorage.getItem('user'));
			if(user.id == 1){
				this.comfirmISff = true;
			}
			this.getDataList();
		},
		created() {
			let wobj = util.getWindowWH();
			this.maxHeight = wobj.height - 240;
		}
	}
</script>