<template>
    <div>
        <h3>{{question.num}}.{{question.value.name}}</h3>
        <img class="quesImg" v-show="question.value.questionImage" :src="picUrl"/>
        <div class="result-div" v-for="ans in answer">
            <el-radio v-model="radio" :label="ans" @change="subAnswer">{{ans}}</el-radio>
        </div>
    </div>
</template>
<script>
    import url from '@/api/imgLoad.js'
    export default {
        name: 'student-chooseQue',
        props: {
            question: {
                required: true
            }
        },
        data() {
            return {
                answer:'',
                radio:'',
                picUrl: ''
            }
        },
        methods: {
            subAnswer() {
                this.$emit('getAnswer', this.radio);
            }
        },
        mounted() {
            this.radio = this.question.answer;
            this.answer = this.question.value.option.split('|');
            if(this.question.value.questionImage){
                this.picUrl = url.url + this.question.value.questionImage;
            }
        }
    }
</script>
<style scoped>
    .result-div{
        margin-bottom: 10px;
    }
    .quesImg{
        max-height: 200px;
        max-width: 200px;
    }
</style>