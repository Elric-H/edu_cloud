<!--**人事管理 公用组件模板 **
**name:wp**
**date:2017/12/18*-->
<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!--<el-form-item>
					<el-input v-model="filters.title" placeholder="请输入关键字"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button v-on:click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>-->
				<el-form-item>
					<el-button @click="handleAdd" icon="el-icon-plus">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="maxHeight" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="40" align="center" label="#">
			</el-table-column>
			<!--<el-table-column prop="" label="头像" align="center" width="80">
				<template scope="scope">
					<div class="brod">
						<img :src="scope.row.user.icon" class="avatar">
					</div>
				</template>
			</el-table-column>-->
			<el-table-column prop="user.name" label="教师姓名" width="100" align="center">
			</el-table-column>
			<el-table-column prop="sex" label="性别" align="center">
			</el-table-column>
			<el-table-column prop="age" label="年龄" align="center">
			</el-table-column>
			<el-table-column prop="birthdate" label="生日" align="center" :formatter="birthdateFormart">
			</el-table-column>
			<el-table-column prop="height" label="身高" align="center">
			</el-table-column>
			<el-table-column prop="weight" label="体重" align="center">
			</el-table-column>
			<el-table-column prop="maritalStatus" label="婚姻" align="center">
			</el-table-column>
			<el-table-column prop="graduateInstitutions" label="毕业机构" align="center">
			</el-table-column>
			<el-table-column prop="workExperience" label="工作经验" align="center">
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
					<!--<el-col :span="24">
						<el-form-item label="头像" prop="icon">
							<el-upload class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" name="mediaFile" list-type="picture-card" :on-success="headImgSuccess">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>-->
					<el-col :span="12">
						<el-form-item label="教师姓名" prop="name">
							<el-select v-model="editForm.name" class="w100" @visible-change="AllTeacherChange" @change="teacherChange" :loading="teacherLoading" filterable placeholder="请选择教师" clearable>
                                <el-option v-for="item in teacherList" :key="item.name" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="editForm.sex" size="small" class="w100">
								<el-radio label="男" border>男</el-radio>
								<el-radio label="女" border>女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="年龄" prop="age">
							<el-input v-model="editForm.age" placeholder="请输入年龄" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="生日" prop="birthdate" class="w100">
							<el-date-picker v-model="editForm.birthdate" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身高" prop="height">
							<el-input v-model="editForm.height" placeholder="请输入教师身高" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="体重" prop="weight">
							<el-input v-model="editForm.weight" placeholder="请输入教师体重" auto-complete="off"></el-input>
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
					<!--<el-col :span="24">
						<el-form-item label="头像" prop="icon">
							<el-upload class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" name="mediaFile" list-type="picture-card" :on-success="headImgSuccess">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>-->
					
					<el-col :span="12">
						<el-form-item label="教师姓名" prop="teacherId">
							<el-select v-model="addForm.teacherId" class="w100" @visible-change="AllTeacherChange" :loading="teacherLoading" filterable placeholder="请选择教师" clearable>
                                <el-option v-for="item in teacherList" :key="item.name" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
						</el-form-item>
					</el-col>
					
					<el-col :span="12">
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="addForm.sex" size="small" class="w100">
								<el-radio label="男" border>男</el-radio>
								<el-radio label="女" border>女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="年龄" prop="age">
							<el-input v-model="addForm.age" placeholder="请输入年龄" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="生日" prop="birthdate" class="w100">
							<el-date-picker v-model="addForm.birthdate" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身高" prop="height">
							<el-input v-model="addForm.height" placeholder="请输入身高" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="体重" prop="weight">
							<el-input v-model="addForm.weight" placeholder="请输入体重" auto-complete="off"></el-input>
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

<style type="text/css" scoped>
	div.brod {
		border-radius: 100%;
		width: 35px;
		height: 35px;
		overflow: hidden;
		margin: 2px auto;
	}
	
	div.brod img {
		width: 100%;
		height: 100%;
	}
	
	.el-upload--picture-card {
		overflow: hidden;
	}
</style>

<script>
	import util from '../../common/js/util';
	import { getTeacherArchives, addTeacherArchives, modifyTeacherArchives, removeTeacherArchives,getAllTeacher } from '../../api/wp_api';
	export default {
		props: ['activeName'],
		data() {
			return {
				maxHeight: 0,
				filters: {
					title: ''
				},
				teacherLoading:false,
				teacherList:[],
				listData: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				imageUrl: '', //头像
				accept: '.jpg,.png,.jpeg',
				editFormRules: {

				},
				//编辑界面数据
				editForm: {
					name: '',
					sex: '男',
					age: 0,
					teacherId:'',
					birthdate: '',
					height: '',
					weight: ''
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				categoryType: '1',
				//新增界面数据
				addForm: {
					name: '',
					sex: '男',
					age: 0,
					teacherId:'',
					birthdate: '',
					height: '',
					weight: ''
				}
			}
		},
		methods: {
			//改变老师 获取id
			teacherChange(val){
				this.editForm.teacherId = val;
			},
			//第一次下拉获取所有老师
			AllTeacherChange(r){
				if(!r || this.teacherList.length > 0) return;
//				this.teacherList.push({name:'学生1',id:14});
				this.teacherLoading = true;
				getAllTeacher().then((res)=>{
					this.teacherLoading = false;
					this.teacherList = res.data.data;
				});
			},
			birthdateFormart(row, i, d) {
				return util.formatDate.format(new Date(row.birthdate), 'yyyy-MM-dd');
			},
			// 上传图片成功后
			headImgSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.editForm.abstract_pic = res;
				this.addForm.abstract_pic = res;
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
				getTeacherArchives(para).then((res) => {
					this.total = res.data.data.total;
					this.listData = res.data.data.content;
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
					removeTeacherArchives(para).then((res) => {
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
				this.editForm.name = row.user.name;
				this.editForm.teacherId = row.user.id;
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: '男',
					age: 0,
					birthdate: '',
					height: '',
					weight: ''
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							user: {
								id: this.editForm.teacherId
							},
							sex: this.editForm.sex,
							age: this.editForm.age,
							birthdate: util.formatDate.format(new Date(this.editForm.birthdate), 'yyyy-MM-dd'),
							height: this.editForm.height,
							weight: this.editForm.weight,
						}
						modifyTeacherArchives(para).then((res) => {
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
						let para = {
							user: {
								id: this.addForm.teacherId
							},
							sex: this.addForm.sex,
							age: this.addForm.age,
							birthdate: util.formatDate.format(new Date(this.addForm.birthdate), 'yyyy-MM-dd'),
							height: this.addForm.height,
							weight: this.addForm.weight,
						}
						this.addLoading = true;
						addTeacherArchives(para).then((res) => {
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