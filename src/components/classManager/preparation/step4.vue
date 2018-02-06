<template>
    <el-container>
        <el-header class="form-header" style="height: 30px">
            {{preFrom.subjectName}} {{preFrom.classFullName}} {{preFrom.term==1?'第一学期':'第二学期'}} {{preFrom.bookEdition}}
        </el-header>
        <el-main>
            <div class="preview-box">
                <div class="preview-title">课时：{{preFrom.classHour}}</div>
            </div>
            <div class="preview-box" v-for="(list, index) in preFrom.prepareLessonDetail" :key="index">
                <div class="preview-title">{{list.itemName}}：</div>
                <div>{{list.textValue}}</div>
                <div><img v-if="list.mediaValue" class='showPic' :src="picUrl+list.mediaValue"/></div>
            </div>

            <div class="text-center" style="margin-top: 20px">
                <el-button class="step-button" size="medium"  @click="back()">
                    <i class="el-icon-arrow-left el-icon--left"></i>
                    上一步
                </el-button>
                <el-button class="step-button" size="medium"  @click="submitForm()">
                    提交
                </el-button>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    import { postClassFrom } from '../../../api/class_api'
    import url from '@/api/imgLoad.js'

    let _url = url;
    export default {
        name: 'step4',
        props: {
            preFrom: {
                required: true
            }
        },
        data() {
            return {
                msg: '',
                picUrl: ''
            }
        },
        methods: {
            submitForm() {
                this.$confirm('正在提交备课信息,是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) =>{
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '提交中...';

                            postClassFrom(this.preFrom).then(res => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.msg = res.meta.message;
                                if (res.meta.success === true) {
                                    this.$emit("submitJump");
                                }
                            }).catch(res => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.msg = '连接超时，请检查网络';
                            })
                        } else {
                            done();
                        }
                    }
                }).then( action => {
                    this.$message({
                        type: 'info',
                        message: this.msg
                    });
                });

            },
            back() {
                this.$emit('backStep','step3');
            }
        },
        created() {
            this.picUrl = _url.url;
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
    .preview-box{
        padding: 10px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .preview-title{
        font-size:15px;
        font-weight: 700;
        margin-bottom:5px;
    }
    .showPic{
        max-height: 50vh;
    }
</style>