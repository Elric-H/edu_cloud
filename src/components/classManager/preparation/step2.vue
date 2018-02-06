<template>
    <el-container>
        <el-header class="form-header" style="height: 30px">
            {{preFrom.subjectName}} {{preFrom.classFullName}} {{preFrom.term==1?'第一学期':'第二学期'}} {{preFrom.bookEdition}}
        </el-header>
        <el-main>
            <el-form :model="preFrom" :rules="rules" ref="preFrom" class="step-context">
                <el-form-item prop="classHour" class="step-context-div">
                    <div class="step-title">
                        请输入课时:
                    </div>
                    <div class="el-radio-group">
                        <el-input placeholder="请输入课时" :maxlength="length1" v-model="preFrom.classHour" clearable></el-input>
                    </div>
                </el-form-item>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item :title="target.itemName" name="1">
                        <div>
                            <el-input type="textarea" v-model="target.textValue" :maxlength="length2" :rows="4"
                                      placeholder="请输入内容">
                            </el-input>
                            <el-upload
                                    class="upload"
                                    :action="imgUrl"
                                    :on-exceed="targetExceed"
                                    :on-remove="targetRemove"
                                    :on-success="targetSuccess"
                                    :limit="1"
                                    name="img"
                                    >
                                <el-button size="small" class="updateBtn">选取文件</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                            </el-upload>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item :title="analysis.itemName" name="2">
                        <div>
                            <el-input type="textarea" v-model="analysis.textValue" :maxlength="length2" :rows="4"
                                      placeholder="请输入内容">
                            </el-input>
                            <el-upload
                                    class="upload"
                                    :action="imgUrl"
                                    :on-exceed="targetExceed"
                                    :on-remove="analysisRemove"
                                    :on-success="analysisSuccess"
                                    :limit="1"
                                    name="img"
                            >
                                <el-button size="small" class="updateBtn">选取文件</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                            </el-upload>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item :title="keyPoint.itemName" name="3">
                        <div>
                            <el-input type="textarea" v-model="keyPoint.textValue" :maxlength="length2" :rows="4"
                                      placeholder="请输入内容">
                            </el-input>
                            <el-upload
                                    class="upload"
                                    :action="imgUrl"
                                    :on-exceed="targetExceed"
                                    :on-remove="keyPointRemove"
                                    :on-success="keyPointSuccess"
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
    import axios from 'axios'
    import url from '@/api/imgLoad.js'

    let _url = url;
    export default {
        name: 'step2',
        props: {
            preFrom: {
                required: true
            }
        },
        data() {
            var hourCheck = (rule , value, callback) => {
                if(!value)
                {
                    return callback(new Error('课时不能为空'));
                }
                if(!/^[0-9]*$/.test(value))
                {
                    callback(new Error('请输入数字'));
                }else{
                    callback();
                }
            };
            return {
                imgUrl: '',
                activeName: '1',
                length1: 6,
                length2: 1000,
                dialogVisible: false,
                //媒体列表
                targetlist: '',
                analysislist: '',
                keyPointlist: '',
                //end
                target:{
                    orderNum: 1,
                    itemName: '教学目标',
                    textValue: '',
                    mediaValue: ''
                },
                analysis: {
                    orderNum: 2,
                    itemName: '教学分析',
                    textValue: '',
                    mediaValue: ''
                },
                keyPoint: {
                    orderNum: 3,
                    itemName: '重点难点',
                    textValue: '',
                    mediaValue: ''
                },
                rules: {
                    classHour: [
                        { validator:hourCheck, trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                let _preFrom = this.preFrom;
                this.$refs.preFrom.validate((valid) => {
                    if (valid) {
                        _preFrom.prepareLessonDetail[0] = this.target;
                        _preFrom.prepareLessonDetail[1] = this.analysis;
                        _preFrom.prepareLessonDetail[2] = this.keyPoint;
                        this.$emit('nextStep', 'step3');
                    } else {
                        return false;
                    }
                });
            },
            back() {
                this.$emit('backStep', 'step1');
            },
            targetExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            targetRemove(file, fileList){
                this.target.mediaValue = null;
            },
            targetSuccess(response,file, fileList){
                this.target.mediaValue = file.response.data;
            },
            analysisRemove(file, fileList){
                this.analysis.mediaValue = null;
            },
            analysisSuccess(response,file, fileList){
                this.analysis.mediaValue = file.response.data;
            },
            keyPointRemove(file, fileList){
                this.keyPoint.mediaValue = null;
            },
            keyPointSuccess(response,file, fileList){
                this.keyPoint.mediaValue = file.response.data;
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

    .step-title{
        width: auto;
        height: 100%;
        font-size: 18px;
        display: inline-block;
        vertical-align: top;
        margin-right: 10px;
    }
    .updateBtn{
        margin-top:10px;
    }

</style>