<template>
<div class="choice-course-manage">
	<second-level ref="level"></second-level>
	<div class="box">
		<router-view></router-view>
	</div>
</div>
</template>

<script>
import SecondLevel from '@/components/choice-course/second-level.vue';
export default {
	name: 'choice-course-manage',
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
.choice-course-manage{

}
.choice-course-manage .box{
	padding: 15px 10px;
}
</style>