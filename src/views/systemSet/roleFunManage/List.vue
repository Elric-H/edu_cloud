<template>
    <div class="consume-list">
        <el-table v-loading="loadingList" :data="listInfo" stripe  style="width: 100%">
            <el-table-column prop="nameInfo" label="角色名称"  width="230" header-align="center" align="center"></el-table-column>
            <el-table-column prop="description" label="备注"  width="230" header-align="center" align="center"></el-table-column>
            <el-table-column  label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="distributeFun(scope.$index, scope.row)">分配功能</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import httpRequest from "@/api/schoolAffair.js";
    export default {
        name: 'List',
        mounted() {
            //获取所有的角色
            this.loadingList=true;
            httpRequest.get("/edu-user/role/getRoles","",data=>{
                if(data.data.meta.success){
                    this.listInfo=data.data.data;
                }else{
                    this.$message.error('获取角色信息失败，请重试');
                }
                this.loadingList=false;
            });
        },
        data() {
            return {
                listInfo:[],
                loadingList: false,
            }
        },
        methods: {
            distributeFun(index, row) {
                //注册删除事件
                this.$emit("changeToFunDistribute",index,row);
            }
        }
    }
</script>

<style scoped>
    .consume-list{
        width: 100%;
    }
</style>