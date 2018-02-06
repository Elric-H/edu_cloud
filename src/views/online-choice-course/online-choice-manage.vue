<template>
<div class="online-choice-manage">
	<second-level ref="level"></second-level>
	<div class="box">
		<router-view></router-view>
	</div>
</div>
</template>

<script>
import SecondLevel from '@/components/online-choice-course/second-level.vue';
export default {
	name: 'online-choice-manage',
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
.online-choice-manage{

}
.online-choice-manage .box{
	padding: 15px 10px;
}
</style>