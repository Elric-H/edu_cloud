<template>
    <div class="consume-list">
        <el-table v-loading="loadingList" :data="listInfo" stripe  style="width: 100%">
            <el-table-column prop="name" label="学科"  width="100" header-align="center" align="center"></el-table-column>
            <el-table-column prop="shorthand" label="简称"  width="100" header-align="center" align="center"></el-table-column>
            <el-table-column prop="typeName" label="学科类型"  width="100" header-align="center" align="center"></el-table-column>
            <el-table-column prop="categoryName" label="学科类别"  width="100" header-align="center" align="center"></el-table-column>
            <el-table-column prop="fullScore" label="总分"  width="100" header-align="center" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"  width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="最近修改时间" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="description" label="备注" width="100" header-align="center" align="center"></el-table-column>
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