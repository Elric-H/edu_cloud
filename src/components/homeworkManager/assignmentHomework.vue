<!--布置作业-->
<template>
    <el-container class="context-create">
        <el-aside class="left-div" width="35%">
            <div class="title-header">
                布置作业
            </div>
            <el-form class="left-form" ref="homeFrom" :model="homeFrom" :rules="rules" label-width="80px">
                <el-form-item prop="title" label="作业标题">
                    <el-input v-model="homeFrom.title" @change="disSubmit"></el-input>
                </el-form-item>
                <el-form-item prop="subjectName"  label="科目">
                    <el-select v-model="homeFrom.subjectName" @change="disSubmit" placeholder="请选择科目">
                        <el-option :label="item" v-for="item , index in subjectList" :key="index" :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="classFullName" label="班级">
                    <el-select v-model="homeFrom.classFullName" @change="setClassId" placeholder="请选择班级">
                        <el-option :label="item.classFullName" v-for="(item, index) in classList" :key="index" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="commitEndTime" label="截止时间">
                    <el-date-picker
                            v-model="homeFrom.commitEndTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right"
                            :editable="false"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="disSubmit">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" :maxlength="length" @change="disSubmit" v-model="homeFrom.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSave">保存</el-button>
                    <el-button type="success" :disabled="subType" @click="onSubmit">提交</el-button>
                    <el-button @click="toList">关闭</el-button>
                </el-form-item>
            </el-form>
        </el-aside>
        <el-main class="right-div">
            <div class="title-header">
                题库选择
            </div>
            <keep-alive>
                <exam-inquiry :is="boxTab" @setQuestion="setQuestion"
                              :subjectName="fliter"
                              :question="homeFrom.questions">
                </exam-inquiry>
            </keep-alive>
        </el-main>
    </el-container>

</template>
<script>
    import { subAssignment, saveAssignment, getClassInfo } from '@/api/class_api'
    import ExamInquiry from "./examInquiry.vue";
    import detailBox from "@/components/classManager/detailSubject/detailBox.vue"
    export default {
        name: "assignmentHomework",
        components: {
            ExamInquiry,
            detailBox
        },
        props: {
            homeFrom: {
                default: {},
                required: false
            }
        },
        data() {
            return {
                //初始化提交为dis
                subType: false,
                length: 100,
                classList:{},
                subjectList: {},
                boxTab: ExamInquiry,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    subjectName: [
                        { required: true, message: '请选择学科', trigger: 'change' }
                    ],
                    classFullName: [
                        { required: true, message: '请选择班级', trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请输入标题', trigger: 'change' }
                    ],
                    commitEndTime: [
                        { required: true, message: '请选择截止日期', trigger: 'change' }
                    ]
                },
                //日期选择器设置
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 );
                            picker.$emit('pick', date);
                        }
                    }]
                },
                fliter: ''
            }
        },
        methods: {
            toList() {
                this.$emit('togglebox', 'HomeworkList');
            },

            disSubmit(){
                this.fliter = this.homeFrom.subjectName;
                this.subType = true;
            },
            setQuestion(question) {
                this.homeFrom.questions = question;
            },
            //设置CLASSid
            setClassId(){
                this.subType = true;
                this.homeFrom.classId = this.homeFrom.classFullName.classId;
                this.homeFrom.classFullName = this.homeFrom.classFullName.classFullName;
            },
            onSave() {
                this.$refs.homeFrom.validate((valid) => {
                    if (valid) {
                        this.$confirm('正在保存作业,是否继续?','提示',{
                            confirmButtonText:'确定',
                            cancelButtonText: '取消',
                            beforeClose: (action, instance, done) =>{
                                if(action === 'confirm') {
                                    instance.confirmButtonLoading = true;
                                    instance.confirmButtonText = '保存中...';

                                    saveAssignment( this.homeFrom ).then(res => {
                                        done();
                                        instance.confirmButtonLoading = false;
                                        this.msg = res.meta.message;
                                        if(res.meta.success === true){
                                            this.homeFrom.id = res.data.id;//获取最新ID
                                            this.subType = false;
                                        }
                                    }).catch(res => {
                                        done();
                                        instance.confirmButtonLoading = false;
                                        this.msg = '未知错误';
                                    })
                                }else{
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
            onSubmit() {
                this.$refs.homeFrom.validate((valid) => {
                    this.$confirm('作业提交后将无法编辑,是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                instance.confirmButtonLoading = true;
                                instance.confirmButtonText = '提交中...';

                                subAssignment( this.homeFrom ).then(res => {
                                    done();
                                    instance.confirmButtonLoading = false;
                                    this.msg = res.meta.message;
                                    if (res.meta.success === true) {
                                        this.subType = false;
                                        this.toList();
                                    }
                                }).catch(res => {
                                    done();
                                    instance.confirmButtonLoading = false;
                                    this.msg = '未知错误';
                                })
                            } else {
                                done();
                            }
                        }
                    }).then(action => {
                        this.$message({
                            type: 'info',
                            message: this.msg
                        });
                    });
                });
            }

        },
        created() {
            getClassInfo().then(res => {
                if(res.data.meta.success){
                    this.classList = res.data.data.classes;
                    this.subjectList = res.data.data.subjectNames;

                    let list = [];
                    //处理科目结构，用以查询题库
                    this.subjectList.forEach( sub => {
                        list.push( sub );
                    })
                    this.fliter = list.toString();
                }else{
                    this.$message.error(res.data.meta.message);
                }
            })
        }
    }
</script>
<style scoped>
    .context-create{
        margin: 10px;
        background-color: #fff;
        height: calc(100vh - 230px);
    }
    .title-header{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        border-bottom:1px solid #d2d2d2;
    }
    .left-div{
        border-right:1px solid #d2d2d2;
    }
    .left-form{
        padding:30px 30px 10px 10px;
    }
    .right-div{
        padding:0px;
    }
</style>