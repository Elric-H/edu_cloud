<template>
    <div class="consume-list">
        <el-table v-loading="loadingList" :data="listInfo" stripe  style="width: 100%">
            <el-table-column prop="name" label="老师姓名"  width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="teacherJodNum" label="工号"  width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="loginId" label="账号"  width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="phone" label="电话号码"  width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别"  width="150" header-align="center" align="center"></el-table-column>
            <el-table-column  label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="distributeRole(scope.$index, scope.row)">分配角色</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'List',
        mounted() {
        },
        data() {
            return {
                loadingList: false,
            }
        },
        props:{
            'listInfo':Array
        },
        methods: {
            distributeRole(index, row) {
                //注册删除事件
                this.$emit("distributeRole",index,row);
            }
        }
    }
</script>

<style scoped>
    .consume-list{
        width: 100%;
    }
</style>