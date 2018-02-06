<template>
    <div class="consume-list">
        <el-table v-loading="loadingList" :data="listInfo" stripe  style="width: 100%">
            <el-table-column prop="name" label="校产名称"  width="80" header-align="center" align="center"></el-table-column>
            <el-table-column prop="num" label="数量"  width="50" header-align="center" align="center"></el-table-column>
            <el-table-column prop="supplier" label="供应商"  width="60" header-align="center" align="center"></el-table-column>
            <el-table-column prop="leftNum" label="库存量"  width="60" header-align="center" align="center"></el-table-column>
            <el-table-column prop="unitPrice" label="单价"  width="70" header-align="center" align="center"></el-table-column>
            <el-table-column prop="status" label="状态"  width="60" header-align="center" align="center"></el-table-column>
            <el-table-column prop="leader" label="负责人"  width="60" header-align="center" align="center"></el-table-column>
            <el-table-column prop="number" label="使用人编号"  width="100" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useUser" label="使用人"  width="60" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useUserPhone" label="使用人电话"  width="100" header-align="center" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"  width="130" header-align="center" align="center"></el-table-column>
            <el-table-column prop="lastUpdateTime" label="最近修改时间" width="130" header-align="center" align="center"></el-table-column>
            <el-table-column  label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            style="padding: 7px 14px"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            style="padding: 7px 14px"
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
                this.$emit("editSchoolAsset",index,row);
            },
            handleDelete(index, row) {
                //注册删除事件
                this.$emit("deleteSchoolAsset",index,row);
            }
        }
    }
</script>

<style scoped>
    .consume-list{
        width: 100%;
    }
</style>