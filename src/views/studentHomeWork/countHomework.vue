<template>
    <section class="content-tab">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item class="text-left">
                    <el-button icon="el-icon-plus" @click="toList">题库导入</el-button>
                </el-form-item>
                <el-form-item class="pull-right">
                    <el-input style="width: auto" v-model="filters.name" placeholder="请输入关键字"></el-input>
                    <el-button v-on:click="getDataList" icon="el-icon-search">查询</el-button>
                </el-form-item>


            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="classes" :max-height="maxHeight" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="40">
            </el-table-column>
            <el-table-column prop="classname" label="学科" align="center">
            </el-table-column>
            <el-table-column prop="grade" label="年级"  align="center">
            </el-table-column>
            <el-table-column prop="classtime" label="课时"  align="center">
            </el-table-column>
            <el-table-column prop="classVersion" label="教材版本"  align="center">
            </el-table-column>
            <el-table-column prop="years" label="学年"  align="center">
            </el-table-column>
            <el-table-column prop="date" label="创建时间"  align="center">
            </el-table-column>
            <el-table-column prop="user" label="创建人"  align="center">
            </el-table-column>
            <el-table-column label="操作" width="130" align="center">
                <template scope="scope">
                    <el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDel(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination class="pull-right"
                           background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="page"
                           :page-sizes="[10, 15, 20]"
                           :page-size="PageSize"
                           layout="total, sizes, prev, pager, next"
                           :total="total">
            </el-pagination>
        </el-col>


    </section>
</template>
<script>
    import util from '@/common/js/util'
    export default {
        name: 'onlinequestion',
        data() {
            return {
                filters: {
                    name: ''
                },
                maxHeight:document.body.clientHeight - 92,
                classes: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    type: '',
                    imageUrl:''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' }
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    type: '',
                    imageUrl:''
                }
            }
        },
        methods: {
            toList() {
                this.$emit('togglebox');
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getDataList();
            },
            handleSizeChange(val) {
                this.PageSize = val;
                this.getDataList();
            },
            //获取用户列表
            getDataList() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                getClassList(para).then((res) => {
                    this.total = res.data.total;
                    this.classes = res.data.classes;
                    this.listLoading = false;
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getDataList();
                    });
                }).catch(() => {

                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
        created() {
            let wobj = util.getWindowWH();
            this.maxHeight = wobj.height - 240;
            this.getDataList();
        }
    }
</script>
<style scoped>
    .content-tab{
        max-height: calc(100vh - 180px);
        background-color: #fff;
    }
    .toolbar{
        background-color: #fff;
    }
    div.avatar-uploader div.el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
</style>