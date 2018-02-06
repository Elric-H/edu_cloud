<template>
    <div>
        <h3>{{question.num}}.{{question.value.name}}</h3>
        <img class="quesImg" v-show="question.value.questionImage" :src="picUrl"/>
        <h4 style="font-weight: 500" v-model="value">答案：
        </h4>
        <el-input size="small" style="width:200px;margin-bottom:20px" v-model="value" @change="subAnswer"></el-input>
    </div>
</template>
<script>
    import url from '@/api/imgLoad.js'
    export default {
        name: 'student-blankQue',
        props: {
            question: {
                required: true
            }
        },
        methods: {
            subAnswer() {
                this.$emit('getAnswer', this.value);
            }
        },
        data() {
            return {
                value: '',
                picUrl: ''
            }
        },
        mounted() {
            this.value = this.question.answer;
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