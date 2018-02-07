<template>
    <section class="content-tab">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item class="text-left">
                    <el-button icon="el-icon-plus" @click="toList">新增备课</el-button>
                </el-form-item>
                <el-form-item class="pull-right">
                    <el-input style="width: auto" v-model="filters.name" placeholder="请输入科目名称"></el-input>
                    <el-button v-on:click="getDataList" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="classes" :max-height="maxHeight" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
            <el-table-column width="55">
            </el-table-column>
            <el-table-column type="index" width="40">
            </el-table-column>
            <el-table-column sortable prop="subjectName" label="学科" align="center">
            </el-table-column>
            <el-table-column sortable prop="classFullName" label="年级"  align="center">
            </el-table-column>
            <el-table-column sortable prop="classHour" label="课时"  align="center">
            </el-table-column>
            <el-table-column prop="bookEdition" label="教材版本"  align="center">
            </el-table-column>
            <el-table-column prop="term" label="学年" :formatter="formatTerm"  align="center">
            </el-table-column>
            <el-table-column sortable prop="createTime" label="创建时间" :formatter="formatDate" align="center">
            </el-table-column>
            <el-table-column prop="user" label="创建人"  align="center">
            </el-table-column>
            <el-table-column label="操作" width="240" align="center">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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

        <el-dialog title="查看备课" :visible.sync="preView" :modal="modal">
            <div class="preview-box">
                <div class="preview-title">{{viewFrom.subjectName}} {{viewFrom.classFullName}} {{viewFrom.term==1?'第一学期':'第二学期'}} {{viewFrom.bookEdition}}</div>
                <div class="preview-title">课时：{{viewFrom.classHour}}</div>
            </div>
            <div class="preview-box" v-for="list in viewFrom.prepareLessonDetail" :key="list.itemName">
                <div class="preview-title">{{list.itemName}}：</div>
                <div>{{list.textValue}}</div>
                <div><img v-if="list.mediaValue" class='showPic' :src="picUrl+list.mediaValue"/></div>
            </div>
        </el-dialog>


    </section>
</template>
<script>
    import util from '../../../common/js/util'
    import { getPreList, delPreList } from '../../../api/class_api'
    import moment from 'moment'
    import url from '@/api/imgLoad.js'

    let _url = url;

    export default {
        name: 'prelist',
        data() {
            return {
                filters: {
                    name: ''
                },
                msg: '',
                maxHeight:document.body.clientHeight - 240,
                classes: [],
                total: 0,
                page: 1,
                PageSize: 10,
                listLoading: false,
                sels: [],//列表选中列

                //查看页
                preView: false,
                modal:false,
                picUrl:'',
                viewFrom: {}
            }
        },
        methods: {
            formatTerm(row , column) {
                return row.term==1?'第一学期':'第二学期';
            },
            formatDate(row , column) {
                return moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
            },
            toList() {
                this.$emit('togglebox', 'PreCreate');
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
                    subjectName: this.filters.name,
                    grade:'',
                    classFullName: '',
                    term : '',
                    bookEdition: '',
                    classHour: '',
                    currentPage: this.page,
                    perPage: this.PageSize
                };
                this.listLoading = true;

                getPreList(para).then((res) => {
                    if( res.data.meta.success == true){
                        this.total = res.data.data.pageTools.totalSize;
                        this.classes = res.data.data.beanList;
                    }else{
                        this.$message({
                            type: 'info',
                            message: res.data.meta.message
                        });
                    }
                    this.listLoading = false;
                }).catch(error => {
                    this.$message({
                        type: 'info',
                        message: '系统错误，请联系管理员'
                    })
                });
            },
            //查看
            handleEdit: function(index, row) {
                this.viewFrom = row;
                this.preView = true;
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = row.id;

                    delPreList(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: res.data.meta.message,
                            type: 'success'
                        });
                        this.getDataList();
                    });
                }).catch((err) => {
                    console.log(err);
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            }
        },
        created() {
            this.picUrl = _url.url;
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
    .showPic{
        max-width: 50vh;
    }
    .preview-box{
        padding: 10px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .preview-title{
        font-size:15px;
        font-weight: 700;
        margin-bottom:5px;
    }
</style>