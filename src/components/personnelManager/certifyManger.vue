<!--**人事管理 公用组件模板 **
**name:wp**
**date:2017/12/18*-->
<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!--<el-form-item>
					<el-input v-model="filters.title" placeholder="教师姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button  v-on:click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>-->
				<el-form-item>
					<el-button  @click="handleAdd" icon="el-icon-plus">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="maxHeight" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="40" align="center" label="#">
			</el-table-column>
			<el-table-column prop="tlUser.name" label="教师姓名" width="100" align="center">
			</el-table-column>
			<el-table-column prop="salaryCount" label="薪资待遇" align="center">
			</el-table-column>
			<el-table-column label="操作" width="190" align="center">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar ipmt5">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" append-to-body :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="姓名" prop="name">
							<el-select v-model="editForm.name" @visible-change="AllTeacherChange" placeholder="请选择老师" @change="teacherChange" :loading="teacherLoading" filterable clearable>
								<el-option v-for="item in teacherList" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="薪资待遇" prop="author">
							<el-input v-model="editForm.salaryCount" placeholder="请输入薪资待遇" auto-complete="off"><template slot="append">元</template></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" append-to-body :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="姓名" prop="teacherId">
							<el-select v-model="addForm.teacherId" placeholder="请选择老师" @visible-change="AllTeacherChange" :loading="teacherLoading" filterable clearable>
								<el-option v-for="item in teacherList" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="薪资待遇" prop="author">
							<el-input v-model="addForm.salaryCount" placeholder="请输入薪资待遇" auto-complete="off"><template slot="append">元</template></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import { getSalaryList, addSalary, modifySalary, removeSalary, getAllTeacher } from '../../api/wp_api';
	export default {
		data() {
			return {
				maxHeight: 0,
				filters: {
					title: ''
				},
				listData: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: '',
					name: '',
					teacherId: '',
					salaryCount: 0
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				teacherList: [],
				teacherLoading: false,
				//新增界面数据
				addForm: {
					name: '',
					salaryCount: 0,
					teacherId: ''
				}
			}
		},
		methods: {
			//改变老师 获取id
			teacherChange(val) {
				this.editForm.teacherId = val;
			},
			//第一次下拉获取所有老师
			AllTeacherChange(r) {
				if(!r || this.teacherList.length > 0) return;
				this.teacherLoading = true;
				getAllTeacher().then((res)=>{
					this.teacherLoading = false;
					this.teacherList = res.data.data;
				});
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			//获取保单列表
			handleQuery() {
				let para = {
					// currentPage: this.currentPage,
					// pageCount: this.pageSize,
					// title:this.filters.title
				};
				this.listLoading = true;
				getSalaryList(para).then((res) => {
					if(res.data.result.code == 0) {
						this.total = res.data.data.total;
						this.listData = res.data.data.content;
					}
					this.listLoading = false;
				});
			},
			//删除
			handleDel(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let para = {
						id: row.id
					};
					removeSalary(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuery();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = row;
				
				this.editForm.name = row.tlUser.name;
				this.editForm.teacherId = row.tlUser.id;
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					teacherId:'',
					salaryCount: 0
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							tlUser:{id:this.editForm.teacherId},
							salaryCount: this.editForm.salaryCount,
						}
						modifySalary(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.handleQuery();
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							tlUser:{id:this.addForm.teacherId},
							salaryCount: this.addForm.salaryCount,
						}
						addSalary(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.handleQuery();
						});
					}
				});
			}
		},
		activated(){
			this.handleQuery();
		},
		created() {
			let wobj = util.getWindowWH();
			this.maxHeight = wobj.height - 240;
		}
	}
</script>