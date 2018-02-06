<template>
    <div class="consume-list">
        <el-table v-loading="loadingList" :data="listInfo" stripe  style="width: 100%">
            <el-table-column prop="studentName" label="学生名字"  width="200" header-align="center" align="center"></el-table-column>
            <el-table-column prop="classFullName" label="班级名称"  width="200" header-align="center" align="center"></el-table-column>
            <el-table-column prop="schoolRollNum" label="学籍号"  width="200" header-align="center" align="center"></el-table-column>
            <el-table-column  label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            handleEdit(index, row) {
                //注册编辑事件
                this.$emit("edit",index,row);
            },
            handleDelete(index, row) {
                //注册删除事件
                this.$emit("delete",index,row);
            }
        }
    }
</script>

<style scoped>
    .consume-list{
        width: 100%;
    }
</style>