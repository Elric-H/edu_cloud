<template>
    <div class="studentInfo">
        <div class="buttons">
            <el-button @click.native="downloadModule" size="medium" type="primary">下载模板<i class="el-icon-download el-icon--right"></i></el-button>
            <el-upload
                    class="upload"
                    ref="upload"
                    :action="uploadUrl"
                    :file-list="fileList"
                    :limit="1"
                    :on-exceed="fileExceed"
                    :on-error="fileUploadError"
                    :http-request="ownUploadFun"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>
                <div slot="tip" class="el-upload__tip">只能上传下载的模板类型的文件</div>
            </el-upload>

            <form style="display: none;" target="_self" id="downLoad" method="get" action="http://39.108.53.141:8082/edu-system/template/download/4" >
            </form>
        </div>
    </div>
</template>
<script>
    import userInfo from "../awardUserInfo";
    import httpRequest from "@/api/schoolAffair.js";
    export default {
        name:"studentInfo",
        mounted(){
        },
        data(){
            return {
                fileList:[],
                uploadUrl:""
            }
        },
        methods: {
            downloadModule(){//文件下载
                document.getElementById("downLoad").submit();
            },
            submitUpload() {  //文件上传
                this.$refs.upload.submit();
            },
            fileExceed(){
                this.$message.warning(`只能上传一个文件`);
            },
            fileUploadError(err, file, fileList){
                this.$message.error(`上传失败，请重试`);
            },
            //自定义文件上传函数
            ownUploadFun(){
                //获取选中/将要上传的文件
                var uploadFile=this.$refs.upload.uploadFiles[0].raw;
                var form = new FormData();
                form.append("file", uploadFile);//格式：文件
                var userId=JSON.parse(userInfo().userInfo).id;
                //上传的url地址
                this.uploadUrl="/stud-manage/importdata/parent/"+userId;
                httpRequest.uploadFile(this.uploadUrl,form,data=>{
                    if(data.data.meta.success){
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error(`上传失败，请重试`);
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .studentInfo{
        width: 100%;
        height: auto;
        min-height: 400px;
        background-color: #FFFFFF;
        display: flex;
        justify-content: center;
    }
    .buttons{
        height: 200px;
        width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .upload{
        margin-top: 5px;
    }
</style>