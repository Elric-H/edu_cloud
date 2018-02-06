<!--**信息管理 **
**name:wp**
**date:2017/12/18*-->
<template>

	<section class="content-tab">
			<el-col :span="24" >
				<info-box ref="infobox" v-for="(item,index) in categoryList" class="fl mr12" :bgcolor="item.bgcolor" :iconClass="item.iconClass" @click.native="toggleTab(index,item)">{{ item.name }}</info-box>
			</el-col>
		<articleManagement ref="refArticleManagement"></articleManagement>
	</section>

</template>
<script>
	//分类管理
	// import classificationManagement from 'components/contentManger/classificationManagement.vue'
	//文章管理
	import articleManagement from 'components/contentManger/articleManagement.vue'
	import infobox from 'components/classManager/info-box.vue'
	export default {
		components: {
			'info-box': infobox,
			articleManagement
		},
		data() {
			return {
				activeName: '1',
				categoryList: [{
						name: '公文公告',
						iconClass: 'fa fa-laptop',
						bgcolor: '#7bc7eb',
						id: 1
					},
					{
						name: '规章制度',
						iconClass: 'fa fa-graduation-cap',
						bgcolor: '#6ec9df',
						id: 2
					},
					{
						name: '通知公告',
						iconClass: 'fa fa-sitemap',
						bgcolor: '#81cbc7',
						id: 3
					},
					{
						name: '会议纪要',
						iconClass: 'fa fa-envelope-open-o',
						bgcolor: '#F1927C',
						id: 4
					},
//					{
//						name: '留言列表',
//						iconClass: 'fa fa-envelope-open-o',
//						bgcolor: '#F2D780',
//						id: 4
//					}
				]
			};
		},
		methods: {
			//切换信息 管理分类
			toggleTab(index, item) {
				this.$refs.infobox.forEach((item, index) => {
					item.active = 'info-box';
				});

				this.$refs.infobox[index].active = 'info-box active';
				this.$refs.refArticleManagement.categoryType = item.id;
				this.$refs.refArticleManagement.handleQuery();
			}
		},
		mounted() {
			this.$refs.infobox[0].active = 'info-box active';
		}
	};
</script>