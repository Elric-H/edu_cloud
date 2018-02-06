<template>
<div class="family-school">
	<el-row>
		<el-col :span="5">
			<contact-list @show-address-info="showAddressInfo"></contact-list>
		</el-col>
		<el-col :span="19">
			<div class="content">
				<contact-search @search-fun="searchFun"></contact-search>
				<div v-show="showResult">
					<search-result :search-text="searchText" @cur-parent="curParent"></search-result>
				</div>
				<div v-show="showInfo">
					<contact-info ref="info" :cur-student-id="curStudentId" @hide-info="hideInfo"></contact-info>
				</div>
			</div>
		</el-col>
	</el-row>
</div>
</template>

<script>
import ContactList from '../../components/fs-module/contact-list.vue'
import ContactSearch from '../../components/fs-module/contact-search.vue'
import SearchResult from '../../components/fs-module/search-result.vue'
import ContactInfo from '../../components/fs-module/contact-info.vue'
export default {
	name: 'family-school',
	components: {
		'contact-list': ContactList,
		'contact-search': ContactSearch,
		'search-result': SearchResult,
		'contact-info': ContactInfo,
	},
	data() {
		return {
			curStudentId: '0',
			showResult: false,
			showInfo: false,
			searchText: '',
		}
	},
	methods: {
		showAddressInfo: function(studentId){
			this.showInfo = true;
			this.showResult = false;
			this.$refs.info.getStudentInfo(studentId);
		},
		searchFun: function(text){
			this.showResult = true;
			this.searchText = text + '';
		},
		curParent: function(contact){
			this.showInfo = true;
			this.$refs.info.student = contact;
		},
		hideInfo: function(){
			this.showInfo = false;
		}
	}
}
</script>

<style scoped>
.family-school .content{
	border-left: 1px solid #ddd;
	min-height: 600px;
	background-color: #fff;
}
</style>