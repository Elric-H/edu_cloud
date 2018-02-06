<template>
    <div class="consume-list">
        <el-table v-loading="loadingList" :data="listInfo" stripe  style="width: 100%">
            <el-table-column prop="name" label="名称"  width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"  width="150" header-align="center" align="center"></el-table-column>
            <el-table-column  label="操作" header-align="center" align="center">
                <template slot-scope="scope">
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
        name: 'foodTypeList',
        data() {
            return {
                loadingList: false
            }
        },
        props:{
            'listInfo':Array
        },
        methods: {
            handleEdit(index, row) {
                this.$emit("editFoodType",index,row);//注册编辑事件
            },
            handleDelete(index, row) {
                this.$emit("deleteFoodType",index,row);//注册删除事件
            }
        }
    }
</script>

<style scoped>
    .consume-list{
        width: 100%;
    }
</style>