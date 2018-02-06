<template>
<div class="result-choice">
	<result-info></result-info>
</div>
</template>

<script>
import ResultInfo from '@/components/online-choice-course/result-info.vue';
export default {
	name: 'result-choice',
	components: {
		'result-info': ResultInfo
	},
	data() {
		return {

		}
	}
}
</script>

<style scoped>
.result-choice{
	
}
</style>