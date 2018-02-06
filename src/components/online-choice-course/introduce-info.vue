<template>
<div class="introduce-info">
	<div v-if="showExplain">
		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>选课说明</span>
		    	<!-- <el-button style="float: right; padding: 3px 0" @click="showExplain=false" type="text">关闭</el-button> -->
		  	</div>
		  	<div>
		  		<div class="text item">
			  		<div style="font-size: 15px;">
			  			1. 关于普通高中的性质和任务
			  		</div>
			  		<p>普通高中的性质：普通高中教育是在九年义务教育基础上进一步提高国民素质、面向大众的基础教育......</p>
			  	</div>
			  	<div class="text item">
			  		<div style="font-size: 15px;">
			  			2. 关于普通高中新课程结构
			  		</div>
			  		<p>⑴ 学习领域：共设置了语言与文学、数学、人文与社会、科学、技术、体育与健康、艺术、综合实践活动八个学习领域.....</p>
			  	</div>
			  	<div class="text item">
			  		<div style="font-size: 15px;">
			  			3. 关于普通高中课程设置
			  		</div>
			  		<p>普通高中新课程由必修和选修两部分构成。必修部分是所有学生都必须学习的内容，称之为共同必修，是学生获得基本知识和技能的保证，重在为学生的发展打好共同基础.....</p>
			  	</div>
		  	</div>
		</el-card>
	</div>
	<div v-if="showNotice">
		<el-card class="box-card">
	  	<div slot="header" class="clearfix">
	    	<span>注意事项</span>
	    	<!-- <el-button style="float: right; padding: 3px 0" @click="showNotice=false" type="text">关闭</el-button> -->
	  	</div>
	  	<div>
	  		<div class="text item">
		  		<div style="font-size: 15px;">
		  			1. 关于普通高中的性质和任务
		  		</div>
		  		<p>普通高中的性质：普通高中教育是在九年义务教育基础上进一步提高国民素质、面向大众的基础教育......</p>
		  	</div>
		  	<div class="text item">
		  		<div style="font-size: 15px;">
		  			2. 关于普通高中新课程结构
		  		</div>
		  		<p>⑴ 学习领域：共设置了语言与文学、数学、人文与社会、科学、技术、体育与健康、艺术、综合实践活动八个学习领域.....</p>
		  	</div>
		  	<div class="text item">
		  		<div style="font-size: 15px;">
		  			3. 关于普通高中课程设置
		  		</div>
		  		<p>普通高中新课程由必修和选修两部分构成。必修部分是所有学生都必须学习的内容，称之为共同必修，是学生获得基本知识和技能的保证，重在为学生的发展打好共同基础.....</p>
		  	</div>
	  	</div>
	</el-card>
	</div>
</div>
</template>

<script>
export default {
	name: 'introduce-info',
	data() {
		return {
			showExplain: true,
			showNotice: true
		}
	}
}
</script>

<style scoped>
.introduce-info{
	background-color: #fff;
}
.introduce-info .box-card{
	margin-bottom: 10px;
}
.introduce-info .box-card .text{
	line-height: 35px;
}
</style>