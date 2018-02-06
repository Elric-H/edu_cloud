<template>
<div class="search-result">
	<div class="label">搜索结果 (共<span v-text="contactList.length"></span>个)</div>
	<div class="clearfix" style="max-height: 150px; overflow: auto;">
		<div class="pull-left list-box" v-for="contact in contactList">
			<div class="list" :class="{'active': contact.active}" @click="clickParent(contact)">
				<img :src="contact.headImg">
				<div class="info">
					<div class="name over-ell"  v-text="contact.name"></div>
					<div class="other over-ell" v-text="'学籍号：' + contact.number"></div>
					<div class="other over-ell" v-text="'性别：' + contact.gender"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { requestSearchText } from '../../api/fs_api.js';
export default {
	name: 'search-result',
	props: {
		searchText: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			contactList: []
		}
	},
	methods: {
		getSearchResult: function(newVal){
			requestSearchText(newVal).then(data => {
				this.contactList = data;
			});
		},
		clickParent: function(contact){
			this.contactList.forEach(function(contact){
				contact.active = false;
			});
			contact.active = true;
			this.$emit('cur-parent', contact);
		}
	},
	watch: {
		'searchText': 'getSearchResult'
	}
}
</script>

<style scoped>
.search-result{
	background-color: #fff;
	padding: 5px 20px;
	border-bottom: 1px solid #ddd;
}
.search-result .label{
	padding-top: 3px;
	padding-bottom: 3px;
}
.search-result .list{
	position: relative;
	padding: 10px 5px;
	padding-left: 70px;
	height: 60px;
}
.search-result .list-box{
	box-sizing: border-box;
	width: 20%;
	cursor: pointer;
	border: 1px solid #fff;

}
.search-result .list-box:hover{
	border: 1px solid #B6D8F4;
	box-shadow: 0 0 2px #B6D8F4;
}
.search-result .active{
	border: 1px solid #B6D8F4;
	box-shadow: 0 0 2px #B6D8F4;
}
.search-result .list img{
	position: absolute;
	top: 9px;
	left: 5px;
	width: 60px;
	height: 60px;
}
.search-result .list .name{
	font-size: 18px;
	color: #555;
	font-weight: bold;
}
.search-result .list .other{
	line-height: 18px;
	color: #888;
	font-size: 9px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
</style>