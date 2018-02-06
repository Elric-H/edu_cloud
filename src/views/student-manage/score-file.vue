<template>
<div class="score-file">
	<score-header @submit-search="submitSearch"></score-header>
	<score-list ref="scoreList"></score-list>
</div>
</template>

<script>
import ScoreHeader from '../../components/student-manage/score-header.vue'
import ScoreList from '../../components/student-manage/score-list.vue'
export default {
	name: 'score-file',
	components: {
		'score-header': ScoreHeader,
		'score-list': ScoreList
	},
	data() {
		return {
			
		}
	},
	methods: {
		submitSearch: function(params){
			this.$refs.scoreList.getScoreList(params);
		}
	}
}
</script>

<style scoped>
.score-file{
	
}
</style>