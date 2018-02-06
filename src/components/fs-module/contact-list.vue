<template>
<div class="contact-list">
	<!--<h5>所有联系人</h5> 20180109 yuyang-->
	<div>
		<a style="font-weight:bold;font-size:16px;">所有联系人</a>
	</div>

	<el-tree :data="data" :props="defaultProps"
			 :default-expand-all="true"
			 @node-click="handleNodeClick" style="background-color: #F2F6F9;"></el-tree>
</div>
</template>

<script>
import axios from 'axios';
import { requestContactGroup, requestContactList } from '../../api/fs_api.js';
export default {
	name: 'contact-list',
	mounted() {
//		this.getContactGroup();
		this.getContactGroup();
	},

	data() {
		return {
			data: [],
	        defaultProps: {
	          	children: 'children',
	          	label: 'label'
	        }
		}
	},
	methods: {
		handleNodeClick: function(obj){
			if(obj.type == 'group'){
				requestContactList(obj.classId).then(data => {
					obj.children = data;
				});
			}
			if(obj.type == 'list'){
				this.$emit('show-address-info', obj.studentId);
			}
		},
		getContactGroup: function(){
			return new Promise((resolve, reject) => {
				requestContactGroup().then(data => {
					this.data = data;
					if(this.data.length > 0){
						this.addData(this.data[0]);
					}
					resolve();
				});
			}).catch(error => {
				reject(error);
			})
		},
		addData: function(obj){
			if(obj.type == 'group'){
				requestContactList(obj.classId).then(data => {
					obj.children = data;
					if(obj.children.length>0){
						this.handleNodeClick(obj.children[0]);
					}
				});
			}

		}

	}
}
</script>

<style scoped>
.contact-list{
	padding: 5px 0px;
	background-color: #F2F6F9;
	height: 600px;
	overflow-y: scroll;
}
.contact-list h5{
	margin: 0px;
	color: #aaa;
	font-size: 10px;
	padding: 4px 20px;
	font-weight: 300;
	letter-spacing: 1px;
}
.contact-list div{
	color: #444;
	font-size: 13px;
	padding: 4px 20px;
	font-weight: 300;
	letter-spacing: 1px;
	cursor: default;
}

</style>