<template>
<div class="tracked-choice">
	<tracked-info></tracked-info>
</div>
</template>

<script>
import TrackedInfo from '@/components/online-choice-course/tracked-info.vue';
export default {
	name: 'tracked-choice',
	components: {
		'tracked-info': TrackedInfo
	},	
	data() {
		return {

		}
	}
}
</script>

<style scoped>
.tracked-choice{
	
}
</style>