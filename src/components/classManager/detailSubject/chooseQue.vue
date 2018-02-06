<template>
    <div>
        <h3>{{question.num}}.{{question.value.name}}</h3>
        <img class="quesImg" v-show="question.value.questionImage" :src="picUrl"/>
        <div class="result-div" v-for="ans in answer">
            <el-radio v-model="radio" :label="ans" >{{ans}}</el-radio>
        </div>
        <h4 style="font-weight: 500">答案：{{question.answer}}</h4>
    </div>
</template>
<script>
    import url from '@/api/imgLoad.js'
    export default {
        name: 'chooseQue',
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
        mounted() {
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