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
                    <el-button  @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>-->
                <el-button  @click="handleAdd" icon="el-icon-plus">添加日程</el-button>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="dataList" :max-height="maxHeight" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="40">
			</el-table-column>
			<el-table-column prop="title" label="标题" align="center">
			</el-table-column>
			<!--<el-table-column prop="user.name" label="人员" align="center">
			</el-table-column>-->
			<el-table-column prop="content" label="内容" align="center">
			</el-table-column>
			<el-table-column prop="scheduleDate" label="日程时间" align="center" :formatter="scheduledateFormart">
			</el-table-column>
			<el-table-column prop="endDate" label="结束时间" align="center" :formatter="endDateFormart">
			</el-table-column>
			<el-table-column label="操作" width="190" align="center">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!--<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>-->

		<!--编辑界面-->
        <el-dialog title="编辑" append-to-body :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="editForm.title" placeholder="请输入标题" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <!--<el-col :span="12">
                            <el-form-item label="人员姓名" prop="name">
                                <el-select v-model="editForm.name" @visible-change="AllTeacherChange" placeholder="请选择人员" @change="teacherChange" :loading="teacherLoading" filterable clearable>
								<el-option v-for="item in teacherList" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
                            </el-form-item>
                        </el-col>-->
                        <el-col :span="12">
                            <el-form-item label="日程时间" prop="scheduleDate" class="w100">
                                <el-date-picker v-model="editForm.scheduleDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结束时间" prop="endDate" class="w100">
                                <el-date-picker v-model="editForm.endDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="内容" prop="content">
                                <el-input type="textarea" placeholder="请输入内容" v-model="editForm.content"></el-input>
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
                        <el-col :span="24">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="addForm.title" placeholder="请输入标题" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <!--<el-col :span="12">
                            <el-form-item label="人员姓名" prop="teacherId">
                                <el-select v-model="addForm.teacherId" placeholder="请选择人员" @visible-change="AllTeacherChange" :loading="teacherLoading" filterable clearable>
								<el-option v-for="item in teacherList" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
                            </el-form-item>
                        </el-col>-->
                        <el-col :span="12">
                            <el-form-item label="日程时间" prop="scheduleDate" class="w100">
                                <el-date-picker v-model="addForm.scheduleDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结束时间" prop="endDate" class="w100">
                                <el-date-picker v-model="addForm.endDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="内容" prop="content">
                            	<el-input type="textarea" placeholder="请输入内容" v-model="addForm.content"></el-input>
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
	import { getScheduleList, addScheduley,modifySchedule,removeSchedule } from '../../api/wp_api';

	export default {
		data() {
			return {
				pickerOptions: { //日期
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
				maxHeight:0,
                filters: {
                    title:''
                },
                dataList: [],
                total: 0,
                teacherList:[],
                teacherLoading:false,
                currentPage: 1,
                pageSize: 15,
                listLoading: false,
                editFormVisible: false, //编辑界面是否显示
                editLoading: false,
                editFormRules: {},
                //编辑界面数据
                editForm: {
                    id:'',
                    title:'',
                    teacherId:'',
                    scheduleDate:'',
                    endDate:'',
                    name:'',
                    content:''
                },
                addFormVisible: false, //新增界面是否显示
                addLoading: false,
                addFormRules: {
                },
                //新增界面数据
                addForm: {
                    title:'',
                    teacherId:'',
                    endDate:'',
                    scheduleDate:'',
                    name:'',
                    content:''
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
				this.teacherList.push({
					name: '学生1',
					id: 14
				});
				//				this.teacherLoading = true;
				//				getAllTeacher().then((res)=>{
				//					this.teacherLoading = false;
				//					if(res.data.result.code == 0){
				//						
				//					}
				//				});
			},
			//日程时间格式化
			scheduledateFormart(row, i, e) {
				if(!row.scheduleDate) return;
				return util.formatDate.format(new Date(row.scheduleDate), 'yyyy-MM-dd hh:mm:ss');
			},
			endDateFormart(row,i){
				if(!row.endDate) return;
				return util.formatDate.format(new Date(row.endDate), 'yyyy-MM-dd hh:mm:ss');
			},
			//分页数据刷新
			handleCurrentChange(val) {
				this.page = val;
				this.handleQuery();
			},
			//获取日程列表
			handleQuery() {
				let para = {
					page: this.page,
				};
				this.listLoading = true;
				getScheduleList().then((res) => {
					if(res.data.result.code == 0) {
						this.dataList = res.data.data.content;
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
                    removeSchedule(para).then((res) => {
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
                    title:'',
                    scheduleDate:'',
                    name:'',
                    teacherId:'',
                    content:''
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if(valid) {
                        this.editLoading = true;
                        let para = {
                            id: this.editForm.id,
                            user:{id:this.editForm.teacherId},
                            title:this.editForm.title,
                            content:this.editForm.content,
                            scheduleDate: util.formatDate.format(new Date(this.editForm.scheduleDate), 'yyyy-MM-dd hh:mm:ss'),
                            endDate:util.formatDate.format(new Date(this.editForm.endDate), 'yyyy-MM-dd hh:mm:ss')
                        }
                        modifySchedule(para).then((res) => {
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
                            user:{id:this.addForm.teacherId},
                            title:this.addForm.title,
                            content:this.addForm.content,
                            scheduleDate: util.formatDate.format(new Date(this.addForm.scheduleDate), 'yyyy-MM-dd hh:mm:ss'),
                            endDate:util.formatDate.format(new Date(this.addForm.endDate), 'yyyy-MM-dd hh:mm:ss')
                        }
                        addScheduley(para).then((res) => {
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