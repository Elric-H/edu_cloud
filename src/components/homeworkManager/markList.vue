<template>
    <div v-loading="listLoading">
        <h3 v-show="visibile" style="padding:20px">请点击左侧学生姓名开始批改作业</h3>
        <div v-show="!visibile" v-for="item in questions">
            <detail-box :question="item" @setScore="setScore"></detail-box>
        </div>
        <el-button v-show="!visibile" style="margin:0px 20px 50px 20px" @click="subCorrectWork">提交</el-button>
        <el-button type="danger" v-show="!visibile" style="margin:0px 20px 50px 20px" @click="backCorrectWork">退回</el-button>
    </div>
</template>
<script>
    import { getStudentHomework, postCorrectWork, backCorrectWork } from '@/api/class_api'
    import DetailBox from "../classManager/detailSubject/detailBox.vue";
    export default {
        components: {DetailBox},
        name: 'markList',
        props: {
            studentId: {
                required: true
            }
        },
        data() {
            return {
                listLoading: false,
                visibile: true,
                questions: [],

                //老师手动批改作业提交参数
                correctWork:{
                    id: '',
                    correctResult: {},
                    correctScore: {}
                }
            }
        },
        methods: {
            getHomeworkData() {
                this.listLoading = true;
                this.questions = [];
                getStudentHomework( this.studentId ).then( res => {
                    if( res.data.meta.success == true){
                        let quesObj = res.data.data.questionsContent;
                        let quesList = [];
                        for( let key in quesObj){
                            let prop = {
                                num: key, //序号
                                value: quesObj[key], //题目
                                answer: res.data.data.anserValue[key],
								score: res.data.data.correctScore?res.data.data.correctScore[key]:''
                            }
                            quesList.push(prop);
                        }
                        this.questions = quesList;
						this.correctWork.correctResult = res.data.data.correctResult;
						this.correctWork.correctScore = res.data.data.correctScore;
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
                this.correctWork.correctScore[item.num] = item.score;
                this.correctWork.correctResult[item.num] = item.result;
            },
            subCorrectWork() {
                this.$confirm('正在提交作业批改信息,是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) =>{
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '提交中...';

                            postCorrectWork(this.correctWork).then(res => {
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
            },
            backCorrectWork() {
                this.$confirm('正在退回该学生作业,是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) =>{
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '退回中...';

                            backCorrectWork(this.correctWork).then(res => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.msg = res.meta.message;

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
        watch: {
            studentId: function () {
                this.correctWork = {
                    id: this.studentId,
                    correctResult: {},
                    correctScore: {}
                };
                if(this.studentId != ''){
                    this.getHomeworkData();
                }
            }
        },
        mounted() {
            this.questions = [];
        }
    }
</script>
<style scoped>
</style>