<template>
    <div class="consume-list">
        <el-table v-loading="loadingList" :data="listInfo" stripe  style="width: 100%">
            <el-table-column prop="name" label="菜品名称"  width="120" header-align="center" align="center"></el-table-column>
            <el-table-column prop="price" label="单价"  width="100" header-align="center" align="center"></el-table-column>
            <el-table-column prop="classify" label="分类"  width="120" header-align="center" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="lastUpdateTime" label="最新更新时间" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" width="150" header-align="center" align="center"></el-table-column>
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
        name: 'foodList',
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
            handleEdit(index, row) {//编辑按钮
                //注册编辑事件
                this.$emit("editFood",index,row);
            },
            handleDelete(index, row) {//删除按钮
                //注册删除事件
                this.$emit("deleteFood",index,row);
            }
        }
    }
</script>

<style scoped>
    .consume-list{
        width: 100%;
    }
</style>