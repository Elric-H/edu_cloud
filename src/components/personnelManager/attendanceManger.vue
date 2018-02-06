<!--**人事管理 公用组件模板 **
**name:wp**
**date:2017/12/18*-->
<template>
    <section class="tab_content-wrapper">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  v-on:click="handleQuery" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :max-height="maxHeight" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="40" align="center" label="#">
            </el-table-column>
            <!--<el-table-column prop="" label="头像" align="center" width="80">
                <template scope="scope">
                    <div class="brod" v-if="scope.row.user">
                        <img :src="scope.row.user.icon" class="avatar">
                    </div>
                </template>
            </el-table-column>-->
            <el-table-column prop="user.name" label="姓名" width="100" align="center">
            </el-table-column>
            <el-table-column prop="createdate" label="开始时间" align="center" :formatter="createdateFormart">
            </el-table-column>
            <el-table-column prop="attdTime" label="结束时间" align="center" :formatter="attdTimeFormart">
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar ipmt5">
            <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<style type="text/css" scoped>
    
    div.brod {
        border-radius: 100%;
        width: 35px;
        height: 35px;
        overflow: hidden;
        margin: 2px auto;
    }
    
    div.brod img {
        width: 100%;
        height: 100%;
    }
    
    .el-upload--picture-card {
        overflow: hidden;
    }
</style>

<script>
    import util from '../../common/js/util';
    import { getAttendanceList } from '../../api/wp_api';
    export default {
        data() {
            return {
                maxHeight:0,
                filters: {
                    name:''
                },
                listData: [],
                total: 0,
                currentPage: 1,
                pageSize: 15,
                listLoading: false,
            }
        },
        methods: {
        	//切换当前页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.handleQuery();
            },
            //切换每页显示数量
            handleSizeChange(val) {
                this.pageSize = val;
                this.handleQuery();
            },
        	createdateFormart(row,i,d){
        		return util.formatDate.format(new Date(row.createdate), 'yyyy-MM-dd');
        	},
        	attdTimeFormart(row,i,d){
        		return util.formatDate.format(new Date(row.attdTime), 'yyyy-MM-dd');
        	},
            handleQuery() {
                let para = {
                    name:this.filters.name
                    // currentPage: this.currentPage,
                    // pageCount: this.pageSize,
                    // title:this.filters.title
                };
                this.listLoading = true;
                getAttendanceList(para).then((res) => {
                	if(res.data.result.code == 0){
	                    this.total = res.data.data.total;
	                    this.listData = res.data.data.content;
	                   }
                    this.listLoading = false;
                });
            },
        },
        activated(){
			this.handleQuery();
		},
        created() {
            let wobj = util.getWindowWH();
            this.maxHeight = wobj.height - 240;
        }
    }
</script>