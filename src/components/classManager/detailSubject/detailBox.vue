<template>
    <div class="question-box">
        <components class="ques-detail" :is="boxTab" :question="question"></components>
        <div class="detail-text">标准答案：{{question.value.anwser}}</div>
        <div class="detail-text">满分：{{question.value.score}}</div>
        <div class="detail-text">知识点：{{question.value.knowledgePoint}}</div>
        <div class="detail-text">题目解析：{{question.value.questionAnalysis}}</div>
        <div class="detail-text">评分：
            <el-select size="small" v-model="tscore" placeholder="请打分" @change="subResult">
                <el-option :label ="score" :value = "score"></el-option>
                <el-option :label ="0" :value ="0"></el-option>
                <el-option :label="question.value.score" :value="question.value.score"></el-option>
            </el-select>
        </div>

    </div>
</template>
<script>


    import ChooseQue from "./chooseQue.vue";
    import BlankQue from "./blankQue.vue";

    export default {
        name: 'detailBox',
        components: {
            BlankQue,
            ChooseQue
        },
        props: {
            question: {
                required: true
            }

        },
        data() {
            return {
                boxTab: '',
                tscore: ''
            }
        },
        methods: {
            subResult() {
                let item = {
                    num: this.question.num,
                    score: this.tscore,
                    result: this.tscore=='0'?2:1//得分为0为错误，不为0既是正确
                }
                this.$emit('setScore', item);
            }
        },
        mounted() {
			this.tscore = this.question.score;
			console.log(this.question);
            if(this.question.value.questionTypeName == '单选题'){
                this.boxTab = 'chooseQue';
            }
            else{
                this.boxTab = 'BlankQue';
            }
        }

    }
</script>
<style scoped lang="scss">
    .question-box{
        padding:10px 20px 20px 20px;
        text-align: left;
    }
    .ques-detail{
        border-bottom:1px solid rgba(0,0,0,0.1);
    }
    .detail-text{
        margin:10px;
    }
</style>