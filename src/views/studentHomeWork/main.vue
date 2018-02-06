<!--学生在线作业课务管理-->
<template>
    <el-container>
        <el-header class="content-header" style="height:130px">
            <el-row :gutter="30">
                <el-col :span="4" >
                    <info-box bgcolor="#7bc7eb" iconClass="fa fa-laptop"
                              @click.native="toggleTab('mineHomework')">我的作业</info-box>
                </el-col>
                <el-col :span="4">
                    <info-box bgcolor="#81cbc7" iconClass="fa fa-sitemap"
                              >作业情况统计</info-box>
                </el-col>
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
    import mineHomework from './mineHomework.vue'
    import countHomework from './countHomework.vue'
    import InfoBox from "../../components/classManager/info-box.vue";

    export default {
        data() {
            return {
                boxTab: mineHomework,  // boxTab 用于标识当前触发的子组件
            }
        },
        components: {
            InfoBox,
            mineHomework,
            countHomework
        },
        methods: {
            toggleTab: function(tab) {
                this.boxTab = tab;  // tab 为当前触发标签页的组件名
            }
        }
    }
</script>
<style scoped lang="scss">

</style>
