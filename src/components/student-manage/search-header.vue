<template>
<div class="search-header">
	<el-row>
		<el-col :span="9">
			<div class="label-list">
				<el-date-picker  v-if="showDateRange"
					v-model="dateRange"
					style="width: 270px;"
					type="daterange"
					value-format="yyyy-MM-dd hh:mm:ss"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
			    </el-date-picker>
			</div>
		</el-col>
		<el-col :span="15">
			<div class="clearfix box">
				<div class="pull-right content">
					<!--<el-input placeholder="学号/姓名" v-model="searchText" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click.native="onSubmit"></el-button>
					</el-input> yuyang 20180109-->

					<el-input style="width: auto" v-model="searchText" placeholder="姓名" class="input-with-select"></el-input>
					<el-button slot="append" icon="el-icon-search" @click.native="onSubmit">查询</el-button>

				</div>
				<!--<span class="pull-right">查询学生</span> 2018/01/09 yuyang-->
			</div>
		</el-col>
	</el-row>
</div>
</template>

<script>
import { getDateRange } from '../../common/js/tqt_util.js'
export default {
	name: 'search-header',
	props: {
		showDateRange: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	mounted() {
		this.dateRange = getDateRange();
		this.onSubmit();
	},
	data() {
		return {
			searchText: '',
	        dateRange: [],
		}
	},
	methods: {
		onSubmit: function(){
			let obj = {
				searchText: this.searchText,
				startDate: this.dateRange[0],
				endDate: this.dateRange[1]
			};
			this.$emit('submit-search', obj);
		}
	}
}
</script>

<style scoped>
.search-header{
	background-color: #fff;
	border-bottom: 1px solid #ddd;
}
.search-header .label-list{
	margin-top: 4px;
	height: 16px;
	line-height: 16px;
	padding-left: 15px;
}
.search-header .box{
	height: 40px;
	line-height: 40px;
	padding-right: 30px;
}
.search-header .box .content{
	position: relative;
	padding-left: 10px;
}
</style>