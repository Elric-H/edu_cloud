<template>
    <div class="funDistribute">
        <div class="topInfo"><span style="margin-left: 35px;">当前的待分配的角色：</span><span style="color:#2898e7;">{{this.seletedRole.nameInfo}}</span></div>
        <div class="content">
            <div  v-loading="loadingTree" class="left">
                <el-tree
                        v-if="!loadingTree"
                        ref="tree"
                        style="margin-left: 35px;"
                        :data="allFun"
                        :props="{
                        label:'name',
                        children:'menuList'
                    }"
                        show-checkbox
                        node-key="id"
                        :default-checked-keys="defaultRole"
                >
                </el-tree>
            </div>
            <div class="right">
                <el-button @click="cancel">返 回</el-button>
                <el-button type="primary" @click="distributeFun">提 交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import httpRequest from "@/api/schoolAffair.js";
    export default {
        name: 'FunDistriute',
        data() {
            return {
                allFun: [],
                defaultProps: {
                    children: 'menuList',
                    lable: 'name'
                },
                loadingTree:false,
                defaultRole:[]
            }
        },
        props:{
            seletedRole:{
                required:true
            }
        },
        mounted() {
            this.loadingTree=true;
            new Promise( (resolve,reject)=>{
                //获取所有的功能信息
                httpRequest.get("/edu-user/common/getAllMenus","",data=>{
                    if(data.data.meta.success){
                        this.allFun=data.data.data;
                        resolve();
                    }else{
                        this.$message.error('获取功能信息失败，请重试');
                    }
                });
            }).then( ()=>{
                //获取的当前角色的功能
                var url="/edu-user/role/getRoleMenu/"+this.seletedRole.id;
                httpRequest.get(url,"",data=>{
                    if(data.data.meta.success){
                        this.defaultRole=data.data.data;
                    }else{
                        this.$message.error('获取当前角色的功能失败，请重试');
                    }
                    this.loadingTree=false;
                });
            });
        },
        methods: {
            //分配功能
            distributeFun(){
                var checkFuns=this.$refs.tree.getCheckedNodes();
                // 处理上交数据
                var menuList=[];
                for(var i=0;i<checkFuns.length;i++){
                    let temp={};
                    temp["id"]=checkFuns[i].id;
                    menuList.push(temp);
                }
                var submitData={
                    roleId:this.seletedRole.id,
                    menuList:menuList
                };
                httpRequest.post("/edu-user/role/setRoleMenu",submitData,data=>{
                    if(data.data.meta.success){
                        this.$message({
                            message: '分配功能成功',
                            type: 'success'
                        });
                    }else{
                        this.$message.error('分配功能失败，请重试');
                    }
                });
            },
            cancel(){
                //取消按钮
                this.$emit("changeToList");
            }
        }
    }
</script>

<style scoped>
    .funDistribute{
        width: 100%;
        min-height:600px ;
        background-color: #ffffff;
        height: auto;
    }
    .topInfo{
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
    }
    .content{
        width: 100%;
        height: auto;
        margin-top: 10px;
        display: flex;
    }
    .left{
        display: flex;
        flex: 1;
        height: auto;
    }
    .right{
        height: 30px;
        display: flex;
        flex: 3;
    }
</style>