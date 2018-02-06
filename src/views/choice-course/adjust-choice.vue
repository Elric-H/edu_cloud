<template>
<div class="adjust-choice">
	<adject-student-list></adject-student-list>
</div>
</template>

<script>
import AdjectStudentList from '@/components/choice-course/adject-student-list.vue';
export default {
	name: 'adjust-choice',
	components: {
		'adject-student-list': AdjectStudentList
	},
	data() {
		return {

		}
	},
}
</script>

<style scoped>
.adjust-choice{

}

</style>