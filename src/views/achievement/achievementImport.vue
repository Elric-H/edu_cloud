<template>
    <section class="content-tab-box">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item class="text-left">
                    <el-button @click="addExam">成绩导入</el-button>
                    <a href="/static/uploadmodel/学生成绩导入模板.xlsx"> <el-button>下载模板</el-button></a>
                </el-form-item>
                <el-form-item class="pull-right">
                    考次选择:
                    <el-select size="small" v-model="filters.examName" @change="getDataList" clearable placeholder="请选择">
                        <el-option v-for="(item, index) in testTimes"
                                   :label ='item.examName' :key="item.id"
                                   :value ='item.examName'></el-option>

                    </el-select>
                    <!--科目:
                    <el-select size="small" v-model="filters.subjectName" @change="getDataList" clearable placeholder="请选择">
                        <el-option label ='语文' value ='语文'></el-option>
                        <el-option label='数学' value='数学'></el-option>
                        <el-option label='英语' value='英语'></el-option>
                        <el-option label='物理' value='物理'></el-option>
                        <el-option label='化学' value='化学'></el-option>
                        <el-option label='生物' value='生物'></el-option>
                        <el-option label='政治' value='政治'></el-option>
                    </el-select>-->
                    <el-input style="width: auto" v-model="filters.name" placeholder="请输入学生姓名"></el-input>
                    <el-button v-on:click="getDataList" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table cell-class-name="no-white-space" :data="exams" :max-height="maxHeight" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

            <el-table-column prop="schoolRollNum" width="60" label="学籍号" align="center">
            </el-table-column>

            <el-table-column prop="studentName" label="学生姓名" align="center">
            </el-table-column>
            <el-table-column prop="classFullName" label="班级" align="center">
            </el-table-column>
            <el-table-column label="考次" align="center">
                <template scope="scope">
                    <el-popover
                            placement="right"
                            width="200"
                            trigger="hover"
                            :content="scope.row.examName">
                        <el-button style="border: none;padding:0px;margin: 0px;background-color: inherit"
                                   slot="reference">{{ scope.row.examName }}</el-button>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column prop="shuxue" label="数学" align="center">
            </el-table-column>
            <el-table-column prop="yuwen" label="语文" align="center">
            </el-table-column>
            <el-table-column prop="yingyu" label="英语" align="center">
            </el-table-column>
            <el-table-column prop="huaxue" label="化学"  align="center">
            </el-table-column>
            <el-table-column prop="wuli" label="物理"  align="center">
            </el-table-column>
            <el-table-column prop="shengwu" label="生物"  align="center">
            </el-table-column>
            <el-table-column prop="dili" label="地理"  align="center">
            </el-table-column>
            <el-table-column prop="lishi" label="历史"  align="center">
            </el-table-column>
            <el-table-column prop="zhengzhi" label="政治"  align="center">
            </el-table-column>
            <el-table-column  label="总分" :formatter="totalScore"  align="center">
            </el-table-column>
            <el-table-column label="评语"  align="center">
                <template scope="scope">
                    <el-popover
                            placement="left"
                            trigger="hover"
                            width="200"
                            :content="scope.row.comment">
                        <el-button style="border: none;padding:0px;margin: 0px;background-color: inherit" slot="reference">{{ scope.row.comment }}</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <!--<el-table-column label="操作" width="130" align="center">
                <template scope="scope">
                    <el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDel(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>-->
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

        <el-dialog  :modal="modal"
                title="请导入题库"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <span>
                <el-upload
                    class="upload-demo"
                    :action="action"
                    name="excelFile"
                    :headers="actionHeader"
                    :on-success="uploadBack"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="files"
                    >
                <el-button size="small">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请按照给定的模板进行导入</div>
            </el-upload></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>


    </section>
</template>
<script>
    import { getTestTimes, getAchieveInfo } from '@/api/achievement_api'
    import { getToken } from '@/common/js/tqt_util.js'
    import { importScoresUrl } from '@/api/class_api'
    import moment from 'moment'
    import util from '@/common/js/util'

    let _importScoresUrl = importScoresUrl;

    export default {
        name: 'achievementImport',
        data() {
            return {
                filters: {
                    name: '',
                    subjectName: '',
                    examName: ''
                },
                msg: '',
                maxHeight:document.body.clientHeight - 240,
                exams: [],
                total: 0,
                page: 1,
                PageSize: 10,
                listLoading: false,
                sels: [],//列表选中列

                //上传容器
                dialogVisible: false,
                modal: false,
                action: '',
                actionHeader: '',
                files: [],

                testTimes: []
            }
        },
        methods: {
            //计算总分
            totalScore(row ){
                let score = 0;
                score = score + row.dili + row.huaxue+ row.lishi+
                    row.shengwu+ row.shuxue+ row.wuli+ row.yingyu+ row.yuwen+ row.zhengzhi;
                return score;
            },
            //文件上传
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            uploadBack(response, file, fileList){
                if(response.meta.success == true){
                    this.getDataList();
                    this.dialogVisible = false;
                }
                this.$message({
                    message: response.meta.message,
                    type: 'info'
                });
            },
            formatTerm(row , column) {
                return row.term==1?'第一学期':'第二学期';
            },
            formatDate(row , column) {
                return moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
            },
            addExam() {
                this.files= [];
                this.dialogVisible = true;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getDataList();
            },
            handleSizeChange(val) {
                this.PageSize = val;
                this.getDataList();
            },
            //获取成绩列表
            getDataList() {
                var user = JSON.parse(sessionStorage.getItem('user')) ;

                let para = {
                    teacherId: user.id,
                    subjectName: this.filters.subjectName,
                    studentName: this.filters.name,
                    examName: this.filters.examName,
                    currentPage: this.page,
                    pageSize: this.PageSize
                };
                this.listLoading = true;

                getAchieveInfo(para).then((res) => {
                    this.total = res.data.pagetools.totalSize;
                    this.exams = res.data.list;
                    this.listLoading = false;
                });
            },
            getExamList() {
                getTestTimes().then((res) => {
                    if(res.data.meta.success == true) {
                        this.testTimes = res.data.data;
                    }else{
                        this.$message({
                            type: 'info',
                            message: '获取考次信息失败，请联系管理员'
                        });
                        this.listLoading = false;
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            }
        },
        created() {
            this.action = _importScoresUrl;
            this.actionHeader = {'access_token': getToken()};;
            let wobj = util.getWindowWH();
            this.maxHeight = wobj.height - 240;
            this.getDataList();
            this.getExamList();
        }
    }

</script>
<style scoped>
    .content-tab-box{
        /*max-height: calc(100vh - 240px);*/
        background-color: #fff;
        margin: 10px;
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
        max-width: 90vh;
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