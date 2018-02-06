<template>
    <section class="content-tab" style="margin:0px">
        <!--工具条-->
        <el-col :span="24" class="toolbar title-header" style="padding-bottom: 0px;">
            <el-form class="title-form" :inline="true" :model="filters">
                <el-button size="middle" @click="changeCompleteStatus('')" type="text">全部</el-button>|
                <el-button size="middle" @click="changeCompleteStatus('0')" type="text">未完成</el-button>|
                <el-button size="middle" @click="changeCompleteStatus('1')" type="text">已完成</el-button>
                <el-form-item class="pull-right right-select">
                    学科:
                    <el-select class="small-select" size="small" v-model="filters.subjectName" @change="getDataList" clearable placeholder="请选择">
                        <el-option label ='语文' value ='语文'></el-option>
                        <el-option label='数学' value='数学'></el-option>
                        <el-option label='英语' value='英语'></el-option>
                        <el-option label='物理' value='物理'></el-option>
                        <el-option label='化学' value='化学'></el-option>
                        <el-option label='生物' value='生物'></el-option>
                        <el-option label='政治' value='政治'></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table cell-class-name="no-white-space" :data="homeworks" :max-height="maxHeight" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <!--<el-table-column type="selection" width="55">
            </el-table-column>-->
            <el-table-column type="index" width="40">
            </el-table-column>
            <el-table-column prop="title" label="作业标题" align="center">
                <template scope="scope">
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="scope.row.title">
                        <el-button style="border: none;padding:0px;margin: 0px;background-color: inherit" slot="reference">{{ scope.row.title }}</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="assignmentTeacherName" label="布置老师"  align="center">
            </el-table-column>
            <el-table-column prop="subjectName" label="科目"  align="center">
            </el-table-column>
            <el-table-column prop="isComplete" label="完成状态"  align="center" :formatter="completeStatus">
            </el-table-column>
            <el-table-column prop="correctStatus" label="批改状态"  align="center" :formatter="correctStatus">
            </el-table-column>
            <el-table-column prop="commitEndTime" label="截止时间"  align="center" :formatter="formatDate">
            </el-table-column>
            <el-table-column prop="totalScore" label="得分"  align="center">
            </el-table-column>
            <el-table-column label="操作" width="230" align="center">
                <template scope="scope">
                    <el-button size="small" v-show="!isCommit(scope.row)"
                               @click="togglePage('DoHomeWork', scope.row)">做作业</el-button>
                    <el-button size="small" v-show="isCommit(scope.row)"
                               style="margin-left: 0px" @click="togglePage('DoHomeWork', scope.row)">查 看</el-button>
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
                           :page-sizes="[8, 15, 20]"
                           :page-size="PageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
    import util from '@/common/js/util'
    import moment from 'moment'
    import { getAllStudentWork } from '@/api/student_api'
    export default {
        name: 'student-allhomework',
        data() {
            return {
                filters: {
                    isComplete: '',
                    subjectName: ''
                },
                maxHeight:document.body.clientHeight - 92,
                homeworks: [],
                total: 0,
                page: 1,
                PageSize: 8,
                listLoading: false,
                sels: [],//列表选中列
            }
        },
        props:{
            homeFrom: {
                required: false
            }
        },
        methods: {
            //判断作业是否提交
            isCommit(row) {
                return row.isCommit == 1?true:false;
            },
            formatDate(row , column) {
                return moment(row.commitEndTime).format('YYYY-MM-DD HH:mm:ss');
            },
            completeStatus( row, column ){
                if( row.isComplete == '0'){
                    return '未完成';
                }else if( row.isComplete == '1') {
                    return '已完成'
                }
            },
            correctStatus( row,  column ) {
                if(row.correctStatus == '0'){
                    return '未批改';
                }else if(row.correctStatus == '1')
                {
                    return '批改完成';
                }else if(row.correctStatus == '2')
                {
                    return '批改中';
                }else if (row.correctStatus == '3'){
                    return '退回';
                }else{return '';}
            },

            handleCurrentChange(val) {
                this.page = val;
                this.getDataList();
            },
            handleSizeChange(val) {
                this.PageSize = val;
                this.getDataList();
            },
            //更改完成状态
            changeCompleteStatus(status) {
                this.filters.isComplete = status;
                this.getDataList();
            },
            //获取作业列表
            getDataList() {
                let para = {
                    subjectName:this.filters.subjectName,
                    teacherName: '',
                    correctStatus : '',
                    isCommit: '',
                    isComplete: this.filters.isComplete,
                    assingmentStartTime: '',
                    assingmentEndTime: '',
                    currentPage: this.page,
                    perPage: this.PageSize
                };
                this.listLoading = true;

                getAllStudentWork(para).then((res) => {
                    if(res.data.meta.success == true){
                        this.total = res.data.data.pageTools.totalSize;
                        this.homeworks = res.data.data.beanList;
                    }else{
                        this.$message({
                            message: res.data.meta.message,
                            type: 'info'
                        });
                    }
                    this.listLoading = false;
                });
            },

            togglePage(page, row){
                let prop={
                    page : page,
                    workId: row.id
                }
                this.$emit('togglePage', prop);
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
<style scoped lang="scss">
    .content-tab{
        height: calc(100vh - 240px);
        background-color: #fff;
    }
    .toolbar{
        background-color: #fff;
    }
    .title-header{
        border-bottom: 1px solid #e5d0d0;
        padding: 0px;
        margin: 5px 0px;
    }
    .title-form{
        padding-left:20px;
        button{
            margin-right: 10px;
            color: inherit;
        }
    }
    .right-select{
        margin-bottom: 5px;
    }
    .el-input--small .el-input__inner{
        height: 25px;
    }
    div.avatar-uploader div.el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }


</style>