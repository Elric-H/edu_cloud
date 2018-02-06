<template>
<div class="io-school">
	<search-header @submit-search="submitSearch"></search-header>
	<io-record ref="recordList"></io-record>
</div>
</template>

<script>
import SearchHeader from '../../components/student-manage/search-header.vue'
import IOrecord from '../../components/student-manage/io-record.vue'
export default {
	name: 'io-school',
	components: {
		'search-header': SearchHeader,
		'io-record': IOrecord,
	},
	data() {
		return {

		}
	},
	methods: {
		submitSearch: function(params){
			this.$refs.recordList.getIOrecord(params);
		}
	}
}
</script>

<style scoped>
.io-school{
	background-color: #fff;
	padding-bottom: 20px;
}
</style>