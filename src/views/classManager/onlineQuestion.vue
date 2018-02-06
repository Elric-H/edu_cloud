<template>
    <section class="content-tab">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item class="text-left">
                    <el-button @click="addExam">题库导入</el-button>
                    <a href="/static/uploadmodel/试题导入模板.xlsx"><el-button>下载模板</el-button></a>
                </el-form-item>
                <el-form-item class="pull-right">
                    学科:
                    <el-select size="small" v-model="filters.subjectName" @change="getDataList" clearable placeholder="请选择">
                        <el-option label ='语文' value ='语文'></el-option>
                        <el-option label='数学' value='数学'></el-option>
                        <el-option label='英语' value='英语'></el-option>
                        <el-option label='物理' value='物理'></el-option>
                        <el-option label='化学' value='化学'></el-option>
                        <el-option label='生物' value='生物'></el-option>
                        <el-option label='政治' value='政治'></el-option>
                    </el-select>
                    <el-input style="width: auto" v-model="filters.name" placeholder="请输入题干查询"></el-input>
                    <el-button v-on:click="getDataList" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table cell-class-name="no-white-space" :data="exams" :max-height="maxHeight" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <!--<el-table-column type="selection" width="55">
            </el-table-column>-->
            <el-table-column type="index" width="80"  align="center">
            </el-table-column>
            <el-table-column prop="subjectName" label="学科" align="center">
            </el-table-column>
            <el-table-column label="题干" width="200" align="center">
                <template scope="scope">
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="scope.row.name">
                        <el-button style="border: none;padding:0px;margin: 0px;background-color: inherit" slot="reference">{{ scope.row.name }}</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="anwser" label="答案"  align="center">
            </el-table-column>
            <el-table-column prop="score" label="分数"  align="center">
            </el-table-column>
            <el-table-column prop="knowledgePoint" label="知识点"  align="center">
            </el-table-column>
            <el-table-column prop="questionBankTypeName" label="题库类型"  align="center">
            </el-table-column>
            <el-table-column prop="questionTypeName" label="题目类型" align="center">
            </el-table-column>
            <el-table-column prop="grade" label="年级" align="center">
            </el-table-column>

            <el-table-column label="操作" width="130" align="center">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

        <el-dialog :modal="modal" title="修改题库" :visible.sync="dialogFormVisible">
            <el-form :model="editFrom" :rules="rules" ref="editFrom" class="step-context" v-loading="fromLoading">
                <el-form-item prop="name" label="题干" :label-width="formLabelWidth">
                    <el-input type="textarea" autosize v-model="editFrom.name" :maxlength="areaLength"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" :label-width="formLabelWidth">
                    <el-upload
                            class="avatar-uploader"
                            :action="showUrl"
                            :show-file-list="false"
                            name="img"
                            :on-success="handleAvatarSuccess"
                            >
                        <img v-if="editFrom.questionImage" :src="imgUrl+editFrom.questionImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="questionTypeName" label="试题类型" :label-width="formLabelWidth">
                    <el-select v-model="editFrom.questionTypeName" @change="isSelect" clearable placeholder="请选择">
                        <el-option v-for="item, index in quesType"
                                   :key="index" :label="item.name"
                                   :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="questionBankTypeName" label="题库类型" :label-width="formLabelWidth">
                    <el-select v-model="editFrom.questionBankTypeName" clearable placeholder="请选择">
                        <el-option v-for="item, index in bankType"
                                   :key="index" :label="item.name"
                                   :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="isSelectExam" label="选项" :label-width="formLabelWidth">
                    <el-input type="textarea" autosize v-model="editFrom.option" :maxlength="areaLength"></el-input>
                </el-form-item>
                <el-form-item prop="anwser" label="答案" :label-width="formLabelWidth">
                    <el-input type="textarea" autosize v-model="editFrom.anwser" :maxlength="areaLength"></el-input>
                </el-form-item>
                <el-form-item label="知识点" :label-width="formLabelWidth">
                    <el-input type="textarea" autosize v-model="editFrom.knowledgePoint" :maxlength="areaLength"></el-input>
                </el-form-item>
                <el-form-item prop="score" label="分值" :label-width="formLabelWidth">
                    <el-input :maxlength="length" autosize v-model="editFrom.score"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit">确 定</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
    import { getAllExam, importUrl, getExam, getTypeCodes, updateExam } from '@/api/class_api'
    import { getToken } from '@/common/js/tqt_util.js'
    import url from '@/api/imgLoad.js'
    import moment from 'moment'
    import axios from 'axios'
    import util from '@/common/js/util'

    let _importUrl = importUrl;
    let _url = url;

    export default {
        name: 'onlinequestion',
        data() {
            var scoreCheck = (rule , value, callback) => {
                if(!value)
                {
                    return callback(new Error('分值不能为空'));
                }
                if(!/^[0-9]*$/.test(value))
                {
                    callback(new Error('请输入数字'));
                }else{
                    callback();
                }
            };
            return {
                imgUrl: '',
                showUrl: '',
                rowClass: 'table-height',//禁止自动撑开
                filters: {
                    name: '',
                    subjectName: ''
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

                //编辑表单
                dialogFormVisible: false,
                fromLoading: false,
                editFrom: {},
                quesType: '',
                bankType: '',
                formLabelWidth: '100px',
                isSelectExam: false,
                length:4,
                areaLength:500,
                imageUrl: '',
                //表单验证
                rules: {
                    name: [
                        { required: true, message: '题干不能为空', trigger: 'change' }
                    ],
                    questionTypeName: [
                        { required: true, message: '试题类型不能为空', trigger: 'change' }
                    ],
                    questionBankTypeName: [
                        { required: true, message: '题库类型不能为空', trigger: 'change' }
                    ],
                    anwser: [
                        { required: true, message: '答案不能为空', trigger: 'change' }
                    ],
                    score: [
                        { validator:scoreCheck, trigger:'blur'}
                    ]
                }
            }
        },
        methods: {

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
            //获取题库列表
            getDataList() {
                let para = {
                    subjectName: this.filters.subjectName,
                    code:'',
                    name: this.filters.name,
                    questionTypeName : '',
                    knowledgePoint: '',
                    questionBankTypeName: '',
                    grade: '',
                    isFixedAnwser: '',
                    currentPage: this.page,
                    perPage: this.PageSize
                };
                this.listLoading = true;

                getAllExam(para).then((res) => {
                    if(res.data.meta.success == true){
                        this.total = res.data.data.pageTools.totalSize;
                        this.exams = res.data.data.beanList;
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

            //获取题库信息
            getExamData(id){
                return getExam(id);
            },
            //获取试题类型
            getQuestionType(){
                let prop = {
                    type: 'QUESTION_TYPE'
                };
                return getTypeCodes(prop);
            },
            //获取题库类型
            getBankType(){
                let prop = {
                    type: 'QUESTION_BANK_TYPE'
                };
                return getTypeCodes(prop);
            },

            //判断是否为选择题
            isSelect(){
                if(this.editFrom.questionTypeName == '单选题'){
                    this.isSelectExam=true;
                }else{
                    this.isSelectExam=false
                }
            },
            getFromDate(id) {
                let _this = this;

                _this.fromLoading = true;
                this.editFrom = {};
                axios.all([this.getExamData(id), this.getQuestionType(), this.getBankType()]).then(
                    axios.spread(function(lists ,ques, bank){
                        _this.fromLoading = false;
                        _this.editFrom = lists.data.data;
                        _this.quesType = ques.data.data;
                        _this.bankType = bank.data.data;
                        _this.isSelect();
                }));
            },
            //编辑
            handleEdit: function(index, row) {
                this.dialogFormVisible = true;
                this.getFromDate(row.id);
            },
            //上传图片
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.editFrom.questionImage = res.data;
            },
            //保存编辑内容
            submitEdit() {

                this.$refs.editFrom.validate((valid) => {
                    if (valid) {
                        this.$confirm('正在提交题库,是否继续?','提示',{
                            confirmButtonText:'确定',
                            cancelButtonText: '取消',
                            beforeClose: (action, instance, done) =>{
                                if (action === 'confirm') {
                                    instance.confirmButtonLoading = true;
                                    instance.confirmButtonText = '提交中...';

                                    updateExam(this.editFrom).then(res => {
                                        done();
                                        instance.confirmButtonLoading = false;
                                        this.msg = res.meta.message;
                                        if (res.meta.success === true) {
                                            this.dialogFormVisible = false;
                                            this.getDataList();
                                        }
                                    }).catch(res => {
                                        done();
                                        instance.confirmButtonLoading = false;
                                        this.msg = '连接超时，请检查网络';
                                    })
                                } else {
                                    done();
                                }
                            }
                        }).then( action => {
                            this.$message({
                                type: 'info',
                                message: this.msg
                            });
                        });

                    } else {
                        return false;
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            }
        },
        created() {
            this.action = _importUrl;
            this.imgUrl = _url.url;
            this.showUrl = _url.url + '/img/one/'
            this.actionHeader = {'access_token': getToken()};
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