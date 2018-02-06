<template>
        <el-form :model="preFrom" v-loading="listLoading" :rules="rules" ref="preFrom" class="step-context">
            <el-form-item prop="subjectName" class="step-context-div">
                <div class="step-title">
                    您要备课的学科:
                </div>
                <div class="el-radio-group">
                    <el-radio v-for="item in subjectList" v-model="preFrom.subjectName" :key="item"
                              :label="item"  border size="medium">{{item}}</el-radio>
                </div>
            </el-form-item>
            <el-form-item prop="classFullName" class="step-context-div">
                <div class="step-title">
                    您要备课的年级:
                </div>
                <div class="el-radio-group" >
                    <el-radio v-for="item in classList" v-model="preFrom.classFullName" :key="item.classFullName"
                              :label="item.classFullName"  border size="medium">{{item.classFullName}}</el-radio>
                </div>
            </el-form-item>

            <el-form-item prop="term" class="step-context-div">
                <div class="step-title">
                    您要备课的学期:
                </div>
                <div class="el-radio-group">
                    <el-radio v-model="preFrom.term" label="1" border size="medium">第一学期</el-radio>
                    <el-radio v-model="preFrom.term" label="2" border size="medium">第二学期</el-radio>
                </div>
            </el-form-item>
            <el-form-item prop="bookEdition" class="step-context-div">
                <div class="step-title">
                    教程版本:
                </div>
                <div class="el-radio-group">
                    <el-radio v-model="preFrom.bookEdition" label="人教版" border size="medium">人教版</el-radio>
                    <el-radio v-model="preFrom.bookEdition" label="苏教版" border size="medium">苏教版</el-radio>
                    <el-radio v-model="preFrom.bookEdition" label="北师大版" border size="medium">北师大版</el-radio>
                    <el-radio v-model="preFrom.bookEdition" label="其他" border size="medium">其他</el-radio>
                </div>
            </el-form-item>
            <el-form-item class="text-center">
                <el-button class="step-button" size="medium"  @click="submitForm()">
                    下一步
                    <i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
            </el-form-item>
        </el-form>

</template>
<script>
    import { getClassInfo } from '@/api/class_api';
    export default {
        name: 'step1',
        props: {
            preFrom: {
                required: true
            }
        },
        data() {
            return {
                classList: '',
                subjectList: '',
                listLoading: false,
                rules: {
                    subjectName: [
                        { required: true, message: '请选择学科', trigger: 'change' }
                    ],
                    classFullName: [
                        { required: true, message: '请选择年级', trigger: 'change' }
                    ],
                    term: [
                        { required: true, message: '请选择学期', trigger: 'change' }
                    ],
                    bookEdition: [
                        { required: true, message: '请选择该条目', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.preFrom.validate((valid) => {
                    if (valid) {
                        this.$emit('nextStep' , 'step2');
                    } else {
                        return false;
                    }
                });
            }
        },
        created() {
            getClassInfo().then(res => {
                if(res.data.meta.success){
                    this.classList = res.data.data.classes;
                    this.subjectList = res.data.data.subjectNames;
                    this.listLoading = false;
                }
            })
        }
    }
</script>
<style scoped lang="scss">
    .step-context{
        padding: 40px 20px 40px 50px;
        box-sizing: border-box;
        .step-title{
            width: 15%;
            height: 100%;
            font-weight: 700;
            display: inline-block;
            vertical-align: top;
            padding-top: 5px;
        }
        ul{
            width: 70%;
            list-style-type: none;
            display: inline-block;
            padding-left: 10px;
        }
        .el-radio-group{
            width: 70%;
            .el-radio{
                margin-bottom: 10px;
            }
        }
        .step-context-div{
            margin-bottom: 20px;
        }
    }
    .step-button{
        border: 1px solid #d7af93;
        font-weight: 600;
        color: #d7af93;
    }
</style>