<!--课务管理-->
<template>
    <el-container>
        <el-header class="content-header" style="height:130px">
            <el-row :gutter="30">
                <el-col :span="5" >
                    <info-box bgcolor="#7bc7eb" iconClass="el-icon-date"
                              @click.native="toggleTab('achievementImport')">成绩导入</info-box>
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
    import achievementImport from './achievementImport.vue'
    import InfoBox from "../../components/classManager/info-box.vue";

    export default {
        data() {
            return {
                boxTab: achievementImport,  // boxTab 用于标识当前触发的子组件
            }
        },
        components: {
            InfoBox,
            achievementImport
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
