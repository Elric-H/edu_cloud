<template>
<div class="ICcard-record">
	<search-header @submit-search="submitSearch"></search-header>
	<consume-list ref="recordList"></consume-list>
</div>
</template>

<script>
import SearchHeader from '../../components/student-manage/search-header.vue'
import ConsumeList from '../../components/student-manage/consume-list.vue'
export default {
	name: 'ICcard-record',
	components: {
		'search-header': SearchHeader,
		'consume-list': ConsumeList,
	},
	data() {
		return {
			
		}
	},
	methods: {
		submitSearch: function(params){
			this.$refs.recordList.getConsumeList(params);
		}
	}
}
</script>

<style scoped>
.ICcard-record{
	background-color: #fff;
	padding-bottom: 20px;
}
</style>