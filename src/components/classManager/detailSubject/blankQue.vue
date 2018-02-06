<template>
    <div>
        <h3>{{question.num}}.{{question.value.name}}</h3>
        <img class="quesImg" v-show="question.value.questionImage" :src="picUrl"/>
        <h4 style="font-weight: 500">答案：{{question.answer}}</h4>

    </div>
</template>
<script>
    import url from '@/api/imgLoad.js'
    export default {
        name: 'blankQue',
        props: {
            question: {
                required: true
            }
        },
        data() {
            return {
                picUrl: ''
            }
        },
        created() {
            if(this.question.value.questionImage){
                this.picUrl = url.url + this.question.value.questionImage;
            }
        }
    }
</script>
<style scoped>
    .quesImg{
        max-height: 200px;
        max-width: 200px;
    }
</style>