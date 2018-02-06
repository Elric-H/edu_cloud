<template>
    <el-container class="context-create">
        <el-button style="margin: 10px" @click="toList">返回</el-button>
        <el-aside class="step-tree" width="300px">
            <el-steps direction="vertical" :active="step" :space="100" process-status="finish" finish-status="success">
                <el-step title="第一步" description="选择学科和年级"></el-step>
                <el-step title="第二步" description="撰写教学设计"></el-step>
                <el-step title="第三步" description="上传资源"></el-step>
                <el-step title="第四步" description="提交预览"></el-step>
            </el-steps>
        </el-aside>
        <el-main class="no-padding-content">
            <keep-alive><!--缓存组件-->
                <component :is="boxTab" :preFrom="preFrom" @nextStep="next" @backStep="previous" @submitJump="toList"></component>
            </keep-alive>
        </el-main>
    </el-container>
</template>
<script>
    import Step1 from "./step1.vue";
    import Step2 from "./step2.vue";
    import Step3 from "./step3.vue";
    import Step4 from "./step4.vue";
    export default {
        components: {
            Step4,
            Step3,
            Step2,
            Step1
        },
        data() {
            return {
                step: 0,
                boxTab: Step1,
                preFrom: {
                    title: '',
                    subjectName: '',
                    grade: '',
                    classFullName: '',
                    term: '',
                    bookEdition: '',
                    classHour: '',
                    prepareLessonDetail: []
                }
            }
        },
        methods: {
            toList() {
                this.$emit('togglebox', 'Prelist');

            },
            next(tab) {
                if (this.step++ > 3) this.step = 4;
                this.boxTab = tab;

            },
            previous(tab) {
                if (this.step-- < 1) this.step = 0;
                this.boxTab = tab;
            }
        }
    }
</script>
<style scoped lang="scss">
    .context-create{
        background-color: #fff;
        height: calc(100vh - 230px);
    }
    .step-tree{
        border-right: 1px solid rgba(0,0,0,0.1);
        padding:40px 20px 40px 50px;
        overflow: hidden;
    }
    .el-step__description{
        font-size: 16px;
    }
</style>