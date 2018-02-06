<template>
    <el-container class="context-create">
        <el-aside class="left-div" width="20%">
            <div class="title-header">
                <el-button type="text" style="color:inherit" @click="back">关闭</el-button>
            </div>
            <h4 style="padding-left: 20px;font-weight: 500">{{title}}</h4>
            <el-tree v-loading="listLoading" :data="data" :props="defaultProps"
                     node-key="id"
                     @node-click="handleNodeClick"
                     :render-content="renderContent"
            ></el-tree>
        </el-aside>
        <el-main class="right-div">
            <div class="title-header">
                批改作业
            </div>
            <mark-list :studentId="studentId" @updateMenu="getdataList"></mark-list>
        </el-main>
    </el-container>
</template>
<script>
    import { getHomework } from '@/api/class_api'
    import MarkList from "./markList.vue";
    export default {
        components: {MarkList},
        name: 'markManager',
        props: {
            homeFrom:{
                required: true
            }
        },
        data() {
            return {
                data: [],
                title:'',
                studentId:'',
                listLoading: false,
                defaultProps: {
                    label: 'studentName'
                }
            };
        },
        methods: {
            back() {
                this.$emit('togglebox', 'HomeworkList');
            },
            handleNodeClick(data) {
                this.studentId = data.id;
            },
            getCorrectStatus( num ) {
                if( num == '1'){
                    return '批改完成';
                }else if( num == '0'){
                    return '未批改';
                }else if (num == '2'){
                    return '部分批改';
                }else if (num == '3'){
                    return '退回';
                }
            },
            getCommitStatus(num ){
                //未提交标红
                //return num==0?'red':'normal';
                return num==0?false:true;
            },
            renderContent(h, { node, data, store }){
                return ( <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                            <span>
                                <span>{node.label}</span>
                            </span>
                            <span style="font-size: 12px;">
                                <span type="text" >{ this.getCorrectStatus( data.correctStatus ) }</span>
                            </span>
                        </span> );
            },
            getdataList(){
                getHomework(this.homeFrom.id ).then(res => {
                    if(res.data.meta.success == true){

                        this.data = res.data.data.studentWorks.filter(
                        	item => this.getCommitStatus(item.isCommit));
                        this.title = res.data.data.title;

                    }else{
                        this.$message({
                            type: 'info',
                            message: res.data.meta.message
                        });
                    }
                    this.listLoading = false;

                }).catch(res => {
                    this.$message({
                        type: 'info',
                        message: '获取数据错误，请联系管理员'
                    });
                })
            }
        },
        mounted() {
            this.listLoading = true;
            this.getdataList();
        }

    }
</script>
<style scoped>
    .context-create{
        margin: 10px;
        background-color: #fff;
        height: calc(100vh - 230px);
    }
    .title-header{
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        border-bottom:1px solid #d2d2d2;
    }
    .left-div{
        border-right:1px solid #d2d2d2;
    }
    .right-div{
        padding:0px;
    }

</style>