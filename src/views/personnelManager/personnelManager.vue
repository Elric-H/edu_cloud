<!--**人事管理 **
**name:wp**
**date:2017/12/18*-->
<template>

	<section class="content-tab">
			<el-col :span="24">
				<info-box ref="infobox" v-for="(item,index) in categoryList" class="fl mr12" :bgcolor="item.bgcolor" :iconClass="item.iconClass" @click.native="toggleTab(index,item)">{{ item.name }}</info-box>
			</el-col>
        <keep-alive><!--缓存组件-->
			<personnelManager :is="boxTab"></personnelManager>
		</keep-alive>
	</section>

</template>
<script>
	//档案管理
	import personnelManager from 'components/personnelManager/personnelManager.vue'
	//薪资管理
	import certifyManger from 'components/personnelManager/certifyManger.vue'
	//考勤管理
	import attendanceManger from 'components/personnelManager/attendanceManger.vue'
	import infobox from 'components/classManager/info-box.vue'
	export default {
		components: {
			'info-box': infobox,
			personnelManager,
			certifyManger,
			attendanceManger
		},
		data() {
			return {
				boxTab: personnelManager,
				activeName: 1,
				categoryList: [{
						name: '档案管理',
						iconClass:'fa fa-laptop',
						bgcolor:'#7bc7eb',
						id: 1
					},
					{
						name: '薪资管理',
						iconClass:'fa fa-graduation-cap',
						bgcolor:'#6ec9df',
						id: 2
					},
					{
						name: '考勤管理',
						iconClass:'fa fa-sitemap',
						bgcolor:'#81cbc7',
						id: 3
					}
				]
			};
		},
		methods: {
			//切换信息 管理分类
			toggleTab(index, item) {
				if(item.id == 1) {
					this.boxTab = 'personnelManager'
				}
				if(item.id == 2) {
					this.boxTab = 'certifyManger'
				}
				if(item.id == 3) {
					this.boxTab = 'attendanceManger'
				}
				this.$refs.infobox.forEach((item, index) => {
					item.active = 'info-box';
				});
				this.activeName = item.id;
				
				
				this.$refs.infobox[index].active = 'info-box active';
			}
		},
		mounted() {
			this.$refs.infobox[0].active = 'info-box active';
		}
	};
</script>