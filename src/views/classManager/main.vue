<!--课务管理-->
<template>
    <el-container>
        <el-header class="content-header" style="height:120px">
            <el-row>
                <div class="title-box">
                    <info-box bgcolor="#7bc7eb" iconClass="el-icon-date"
                              @click.native="toggleTab('onlinePreparation')">在线备课</info-box>
                </div>
                <div class="title-box">
                    <info-box bgcolor="#6ec9df" iconClass="fa fa-graduation-cap"
                              @click.native="toggleTab('onlineHomework')">在线作业</info-box>
                </div>
                <div class="title-box">
                    <info-box bgcolor="#81cbc7" iconClass="fa fa-sitemap"
                              @click.native="toggleTab('onlineQuestion')">在线题库</info-box>
                </div>
            </el-row>
        </el-header>
        <el-main class="no-padding-content">
            <keep-alive><!--缓存组件-->
                <online-preparation :is="boxTab"></online-preparation>
            </keep-alive>
        </el-main>
    </el-container>
</template>
<script>
    import onlinePreparation from './onlinePreparation.vue'
    import onlineQuestion from './onlineQuestion.vue'
    import onlineHomework from './onlineHomework.vue'
    import InfoBox from "../../components/classManager/info-box.vue";

    export default {
        data() {
            return {
                boxTab: onlinePreparation,  // boxTab 用于标识当前触发的子组件
            }
        },
        components: {
            InfoBox,
            onlinePreparation,
            onlineQuestion,
            onlineHomework
        },
        methods: {
            toggleTab: function(tab) {
                this.boxTab = tab;  // tab 为当前触发标签页的组件名
            }
        },
        created(){
            //接收个人中心传参，跳转在线作业
            if(this.$route.query.type == 2)
            {
                this.boxTab = 'onlineHomework';
            };
        }
    }
</script>
<style scoped lang="scss">
 .title-box{
     display: inline-block;
     margin-right: 12px;
 }
</style>
