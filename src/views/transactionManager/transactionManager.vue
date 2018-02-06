<!--**事务管理 **
**name:wp**
**date:2017/12/18*-->
<template>

	<section class="content-tab">
		<el-col :span="24" >
			<info-box v-for="(item,index) in categoryList" class="fl mr12" ref="infobox" :bgcolor="item.bgcolor"
					  :iconClass="item.iconClass"
					  @click.native="toggleTab(index,item)">{{ item.name }}</info-box>
		</el-col>
		<!--缓存组件-->
		 <keep-alive>
			<!-- <leaveManager v-if="activeName == 1" ref="reflevManger"></leaveManager>
			<leaveManager v-if="activeName == 2" ref="refOutlevManger"></leaveManager>
			<scheduleManager v-if="activeName == 3" ref="schelevManger"></scheduleManager> -->
			<leaveManager :is="boxTab"></leaveManager>
		</keep-alive>
	</section>

</template>
<script>
	//出差管理 
	import leaveManager from 'views/leaveManager/leaveManager.vue'
	//请假管理
	import leaveOutManager from 'views/leaveManager/leaveOutManager.vue'
	//日程管理
	import scheduleManager from 'views/leaveManager/scheduleManager.vue'
	import infobox from 'components/classManager/info-box.vue'
	export default {
		components: {
			'info-box': infobox,
			leaveManager,
			leaveOutManager,
			scheduleManager
		},
		data() {
			return {
				activeType:1,
				boxTab:'leaveManager',
				activeName: 1,
				categoryList: [{
						name: '出差管理',
						iconClass:'fa fa-laptop',
						bgcolor:'#7bc7eb',
						id: 1
					},
					{
						name: '请假管理',
						iconClass:'fa fa-graduation-cap',
						bgcolor:'#6ec9df',
						id: 2
					},
					{
						name: '日程管理',
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
					this.boxTab = 'leaveManager'
				}
				if(item.id == 2) {
					this.boxTab = 'leaveOutManager'
				}
				if(item.id == 3) {
					this.boxTab = 'scheduleManager'
				}
				this.$refs.infobox.forEach((item, index) => {
					item.active = 'info-box';
				});
				this.$refs.infobox[index].active = 'info-box active';
			}
		},
		mounted() {
			let q = this.$route.query;
			if(q)
				if(q.type == 2) {
					this.boxTab = 'leaveOutManager'
					this.$refs.infobox[1].active = 'info-box active';
				} else {
					this.$refs.infobox[0].active = 'info-box active';
				}
		}
	};
</script>