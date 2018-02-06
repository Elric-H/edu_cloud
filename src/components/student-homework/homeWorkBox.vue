<template>
    <div class="question-box">
        <components class="ques-detail" :is="boxTab" :question="question" @getAnswer ="changeAnswer"></components>
        <div class="detail-text">满分：{{question.value.score}}</div>

    </div>
</template>
<script>

    import StudentBlankQue from "./student-blankQue.vue";
    import StudentChooseQue from "./student-chooseQue.vue";

    export default {
        name: 'homeworkbox',
        components: {
            StudentChooseQue,
            StudentBlankQue

        },
        props: {
            question: {
                required: true
            }

        },
        data() {
            return {
                boxTab: '',
                value: '',
                changeFlag: ''
            }
        },
        methods: {
            subResult() {
                let item = {
                    num: this.question.num,
                    value: this.value,
                    status: 1 //改过了即为已回答
                }
                this.$emit('setScore', item);
            },
            changeAnswer( ans ) {
                this.value = ans;
                this.subResult();
            }
        },
        mounted() {
            if(this.question.value.questionTypeName == '单选题'){
                this.boxTab = 'StudentChooseQue';
            }
            else{
                this.boxTab = 'StudentBlankQue';
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