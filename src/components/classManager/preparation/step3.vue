<template>
    <el-container>
        <el-header class="form-header" style="height: 30px">
            {{preFrom.subjectName}} {{preFrom.classFullName}} {{preFrom.term==1?'第一学期':'第二学期'}} {{preFrom.bookEdition}}
        </el-header>
        <el-main>
            <el-form :model="preFrom" :rules="rules" ref="preFrom" class="step-context">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item :title="framework.itemName" name="1">
                        <div>
                            <el-input type="textarea" v-model="framework.textValue" :maxlength="length" :rows="4"
                                      placeholder="请输入内容">
                            </el-input>
                            <el-upload
                                    class="upload"
                                    :action="imgUrl"
                                    :on-exceed="targetExceed"
                                    :on-remove="frameworkRemove"
                                    :on-success="frameworkSuccess"
                                    :limit="1"
                                    name="img">
                                <el-button size="small" class="updateBtn">选取文件</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                            </el-upload>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item :title="knowkeyPoint.itemName" name="2">
                        <div>
                            <el-input type="textarea" v-model="knowkeyPoint.textValue" :maxlength="length" :rows="4"
                                      placeholder="请输入内容">
                            </el-input>
                            <el-upload
                                    class="upload"
                                    :action="imgUrl"
                                    :on-exceed="targetExceed"
                                    :on-remove="knowkeyPointRemove"
                                    :on-success="knowkeyPointSuccess"
                                    :limit="1"
                                    name="img"
                            >
                                <el-button size="small" class="updateBtn">选取文件</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                            </el-upload>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item :title="resources.itemName" name="3">
                        <div>
                            <el-input type="textarea" v-model="resources.textValue" :maxlength="length" :rows="4"
                                      placeholder="请输入内容">
                            </el-input>
                            <el-upload
                                    class="upload"
                                    action="imgUrl"
                                    :on-exceed="targetExceed"
                                    :on-remove="resourcesRemove"
                                    :on-success="resourcesSuccess"
                                    :limit="1"
                                    name="img"
                            >
                                <el-button size="small" class="updateBtn">选取文件</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                            </el-upload>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item :title="homework.itemName" name="4">
                        <div>
                            <el-input type="textarea" v-model="homework.textValue" :maxlength="length" :rows="4"
                                      placeholder="请输入内容">
                            </el-input>
                            <el-upload
                                    class="upload"
                                    :action="imgUrl"
                                    :on-exceed="targetExceed"
                                    :on-remove="homeworkRemove"
                                    :on-success="homeworkSuccess"
                                    :limit="1"
                                    name="img"
                            >
                                <el-button size="small" class="updateBtn">选取文件</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                            </el-upload>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <el-form-item class="text-center" style="margin-top: 20px">
                    <el-button class="step-button" size="medium"  @click="back()">
                        <i class="el-icon-arrow-left el-icon--left"></i>
                        上一步
                    </el-button>
                    <el-button class="step-button" size="medium"  @click="submitForm()">
                        下一步
                        <i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
<script>
    import url from '@/api/imgLoad.js'

    let _url = url;

    export default {
        name: 'step3',
        props: {
            preFrom: {
                required: true
            }
        },
        data() {
            return {
                imgUrl: '',
                activeName: '1',
                length: 1000,
                framework:{
                    orderNum: 4,
                    itemName: '知识框架',
                    textValue: '',
                    mediaValue: ''
                },
                knowkeyPoint: {
                    orderNum: 5,
                    itemName: '知识要点',
                    textValue: '',
                    mediaValue: ''
                },
                resources: {
                    orderNum: 6,
                    itemName: '辅助资源',
                    textValue: '',
                    mediaValue: ''
                },
                homework: {
                    orderNum: 7,
                    itemName: '课后作业',
                    textValue: '',
                    mediaValue: ''
                },
                rules: {}
            }
        },
        methods: {
            submitForm() {
                let _preFrom = this.preFrom;
                this.$refs.preFrom.validate((valid) => {
                    if (valid) {
                        _preFrom.prepareLessonDetail[3] = this.framework;
                        _preFrom.prepareLessonDetail[4] = this.knowkeyPoint;
                        _preFrom.prepareLessonDetail[5] = this.resources;
                        _preFrom.prepareLessonDetail[6] = this.homework;
                        this.$emit('nextStep' , 'step4');
                    } else {
                        return false;
                    }
                });
            },
            back() {
                this.$emit('backStep','step2');
            },
            targetExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            frameworkRemove(file, fileList){
                this.framework.mediaValue = null;
            },
            frameworkSuccess(response,file, fileList){
                this.framework.mediaValue = file.response.data;
            },
            knowkeyPointSuccess(response,file, fileList){
                this.knowkeyPoint.mediaValue = file.response.data;
            },
            knowkeyPointRemove(file, fileList){
                this.knowkeyPoint.mediaValue = null;
            },
            resourcesSuccess(response,file, fileList){
                this.resources.mediaValue = file.response.data;
            },
            resourcesRemove(file, fileList){
                this.resources.mediaValue = null;
            },
            homeworkSuccess(response,file, fileList){
                this.homework.mediaValue = file.response.data;
            },
            homeworkRemove(file, fileList){
                this.homework.mediaValue = null;
            }
        },
        created() {
            this.imgUrl = _url.url + '/img/one/';
        }
    }
</script>
<style scoped>
    .form-header{
        border-bottom:1px solid #d2d2d2;;
    }
    .step-button{
        border: 1px solid #d7af93;
        font-weight: 600;
        color: #d7af93;
    }

</style>