<template>
    <div class="consume-list">
        <el-table v-loading="loadingList" :data="listInfo" stripe  style="width: 100%">
            <el-table-column prop="fullName" label="班级名称"  width="200" header-align="center" align="center"></el-table-column>
            <el-table-column prop="set" label="是否设置课程"  width="300" header-align="center" align="center"></el-table-column>
            <el-table-column  label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                          
                            @click="set(scope.$index, scope.row)">设置</el-button>
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
			set(index, row) {
				//注册删除事件
				this.$emit("set",index,row);
			}
		}
	}
</script>

<style scoped>
    .consume-list{
        width: 100%;
    }
</style>