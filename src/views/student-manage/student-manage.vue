<template>
<div class="student-manage">
	<second-level ref="level"></second-level>
	<div class="box">
		<router-view></router-view>
	</div>
</div>
</template>

<script>
import SecondLevel from '@/components/student-manage/second-level.vue'
export default {
	name: 'student-manage',
	mounted() {
		this.getCurRoute();
	},
	components: {
		'second-level': SecondLevel
	},
	data() {
		return {

		}
	},
	methods: {
		getCurRoute: function(){
			this.$refs.level.curPage = this.$route.name;
		}
	}
}
</script>

<style scoped>
.student-manage .box{
	margin-top: 12px;
}
</style>