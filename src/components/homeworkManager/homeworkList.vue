<template>
    <section class="content-tab">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item class="text-left">
                    <el-button icon="el-icon-plus" @click="addHomeWork">新增作业</el-button>
                </el-form-item>
                <el-form-item class="pull-right">
                    <el-input style="width: auto" v-model="filters.name" placeholder="请输入作业标题"></el-input>
                    <el-button v-on:click="getDataList" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table cell-class-name="no-white-space" :data="homeworks" :max-height="maxHeight" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <!--<el-table-column type="selection" width="55">
            </el-table-column>-->
            <el-table-column width="40">
            </el-table-column>
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
            <el-table-column prop="classFullName" label="年级"  align="center">
            </el-table-column>
            <el-table-column prop="subjectName" label="科目"  align="center">
            </el-table-column>
            <el-table-column prop="completeNum" label="完成状态"  align="center" :formatter="completeStatus">
                <template scope="scope">
                    <el-popover
                            placement="right"
                            width="200"
                            title="未完成作业人员清单"
                            trigger="hover"
                            :content="getUnWorkerList(scope.row.studentWorks)">
                        <el-button style="border: none;padding:0px;margin: 0px;background-color: inherit" slot="reference">{{ completeStatus(scope.row) }}</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="correctStatus" label="批改状态"  align="center" :formatter="correctStatus">
            </el-table-column>
            <el-table-column prop="isAssignment" label="提交状态"  align="center" :formatter="commitStatus">
            </el-table-column>
            <el-table-column prop="commitEndTime" label="截止时间"  align="center">
            </el-table-column>

            <el-table-column label="操作" width="230" align="center">
                <template scope="scope">
                    <el-button size="small" style="margin-left: 10px"  v-show="toggleBtn(scope.row)" @click="togglePage('AssignmentHomework', scope.row)">编辑</el-button>
                    <el-button size="small" v-show="!toggleBtn(scope.row)" @click="togglePage('MarkManager', scope.row)">批改</el-button>
                    <el-button type="danger" size="small" v-show="toggleBtn(scope.row)" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    <el-button type="danger" v-show="!toggleBtn(scope.row)" size="small" @click="handleback(scope.$index, scope.row)">撤回</el-button>
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

        <!--<el-col :span="12">
            <div id="chartDiv" style="height: 300px;width:100%"></div>
        </el-col>-->
    </section>
</template>
<script>
    import util from '@/common/js/util'
    import echarts from 'echarts'
    import { getHomeworkList, delHomeworkList, revokeAssignment } from '@/api/class_api'
    export default {
        name: 'homeworkList',
        data() {
            return {
                filters: {
                    name: ''
                },
                //未完成作业人员清单
                unWorkList: [],
                maxHeight:document.body.clientHeight - 240,
                homeworks: [],
                total: 0,
                page: 1,
                PageSize: 10,
                listLoading: false,
                sels: [],//列表选中列
                chart1: null
            }
        },
        props:{
            homeFrom: {
                required: false
            }
        },
        methods: {
            //切换按钮状态：只有未提交才能继续编辑
            toggleBtn(row){
                return row.isAssignment=='0'?true : false;
            },
            commitStatus(row, column) {
                return row.isAssignment=='0'?'未提交':'已提交';
            },
            correctStatus(row, column) {
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

            completeStatus(row , column){
                return row.completeNum+'/'+row.allNum;
            },
            addHomeWork() {
                let newFrom = {
                    id: '',
                    title:'',
                    classId:'',
                    classFullName:'',
                    subjectName:'',
                    questions:{},
                    customQuestion:'',
                    customQuestionScore: '',
                    customQuestionMedia:'',
                    commitEndTime:'',
                    description:'',

                }
                let prop = {
                    from: newFrom,
                    page: 'assignmentHomework'
                }
                this.$emit('getFrom',newFrom);
                this.$emit('togglePage', prop);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getDataList();
            },
            handleSizeChange(val) {
                this.PageSize = val;
                this.getDataList();
            },
            getUnWorkerList(lists ) {
                let list = [];
                if(lists){
                    lists.forEach(student => {
                        if(student.isCommit == 0)list.push(student.studentName);
                    });
                }
                return list.toString();
            },
            //获取用户列表
            getDataList() {
                let para = {
                    title: this.filters.name,
                    subjectName:'',
                    classFullName: '',
                    correctStatus : '',
                    isAssignment: '',
                    createStartTime: '',
                    createEndTime: '',
                    currentPage: this.page,
                    perPage: this.PageSize
                };
                this.listLoading = true;

                getHomeworkList(para).then((res) => {
                    if(res.data.meta.success == true){
                        this.total = res.data.data.pageTools.totalSize;
                        this.totalPage = res.data.data.pageTools.totalPage;
                        this.homeworks = res.data.data.beanList;
                    }else{
                        this.$message({
                            type: 'info',
                            message: res.data.meta.message
                        })
                    }

                    this.listLoading = false;
                }).catch(error => {
                    this.$message({
                        type: 'info',
                        message: '系统错误，请联系管理员'
                    })
                    this.listLoading = false;
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = row.id;

                    delHomeworkList(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: res.data.meta.message,
                            type: 'success'
                        });
                        this.getDataList();
                    });
                }).catch((error) => {
                    this.$message({
                        message: error,
                        type: 'info'
                    });
                });
            },
            handleback: function (index, row) {
                this.$confirm('确认撤回该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {id: row.id };

                    revokeAssignment(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: res.meta.message,
                            type: 'success'
                        });
                        this.getDataList();
                    });
                }).catch((error) => {
                    this.$message({
                        message: error,
                        type: 'info'
                    });
                });
            },
            togglePage(page, row){
                let prop={
                    page : page,
                    from: row
                }
                this.$emit('togglePage', prop);
            },

            selsChange: function (sels) {
                this.sels = sels;
            },
            drawChart1() {
                this.chart1 = echarts.init(document.getElementById('chartDiv'));
                this.chart1.setOption({
                    title: {
                        text:'学生作业提交情况'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['本月','上月']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'本月',
                            type:'bar',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'上月',
                            type:'bar',
                            stack: '广告',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        }
                    ]
                });
            }
        },
        mounted() {
           /* this.drawChart1();*/
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