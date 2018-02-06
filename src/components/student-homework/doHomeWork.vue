<template>
    <div class="context-create">
        <div class="title-header">
            <span style="font-weight: 600">作业要求：</span>请学生在规定的时间内诚信作答
            <el-button type="text" class="pull-right"  @click="back" style="margin-right: 20px;color: inherit">返回</el-button>
        </div>
        <div class="title-header" style="background-color: #f1f5f8;">
            注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;意：作业一旦提交将无法重新作答，请仔细检查

        </div>

        <div v-loading="listLoading">
            <div v-for="item in questions">
                <homeworkbox :question="item" @setScore="setScore"></homeworkbox>
            </div>
            <el-button style="margin:20px" @click="saveStuHomeWork">保存</el-button>
            <el-button style="margin:20px" type="success" @click="subStuHomeWork">提交</el-button>
        </div>
    </div>
</template>
<script>
    import { getStudentWork, saveStuHomeWork, subStuHomeWork } from '@/api/student_api'
    import Homeworkbox from "./homeWorkBox.vue";
    export default {
        components: {
            Homeworkbox
        },
        name: 'dohomework',
        props: {
            homeId: {
                required: true
            }
        },
        data() {
            return {
                listLoading: false,
                questions: [],

                //作业提交参数
                correctWork:{
                    id: '',
                    anserValue: {},
                    anserStatus: {}
                }
            }
        },
        methods: {
            back() {
                this.$emit('togglebox','StudentAllhomework');
            },
            getHomeworkData() {
                this.listLoading = true;
                this.questions = [];
                getStudentWork(this.homeId ).then( res => {
                    if( res.data.meta.success == true){
                        let quesObj = res.data.data.questionsContent;
                        this.correctWork.anserValue = res.data.data.anserValue;
                        this.correctWork.anserStatus = res.data.data.anserStatus;
                        let quesList = [];
                        for( let key in quesObj){
                            let prop = {
                                num: key, //序号
                                value: quesObj[key], //题目
                                answer: res.data.data.anserValue[key]
                            }
                            quesList.push(prop);
                        }
                        this.questions = quesList;
                        this.visibile = false;
                        this.listLoading = false;
                    }else{
                        this.$message({
                            type: 'info',
                            message: res.data.meta.message
                        });
                    }

                });
            },
            setScore(item) {
                this.correctWork.anserStatus[item.num] = item.status;
                this.correctWork.anserValue[item.num] = item.value;
            },
            subStuHomeWork() {
                this.$confirm('作业一旦提交将无法重新作答,是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) =>{
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '提交中...';

                            subStuHomeWork(this.correctWork ).then(res => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.msg = res.meta.message;
                                if (res.meta.success === true) {
                                    this.back();
                                }
                            }).catch(res => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.msg = res.meta.message;
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
            },
            saveStuHomeWork() {
                this.$confirm('正在保存作业,是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) =>{
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '提交中...';

                            saveStuHomeWork(this.correctWork).then(res => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.msg = res.meta.message;
                                if (res.meta.success === true) {
                                    this.$emit('updateMenu');
                                }
                            }).catch(res => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.msg = res.meta.message;
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
            }
        },
        mounted() {
            this.correctWork.id = this.homeId;
            this.getHomeworkData();
        }
    }
</script>
<style scoped>
    .context-create{
        margin: 0px;
        background-color: #fff;
        overflow: auto;
        max-height: calc(100vh - 230px);
    }
    .title-header{
        height: 35px;
        line-height: 35px;
        padding-left: 20px;
        font-size: 12px;
        border-bottom:1px solid #d2d2d2;
    }
</style>