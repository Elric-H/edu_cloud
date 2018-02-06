<template>
    <div id="Canteen" class="canteenManage clearfix">
        <el-menu style="font-size: 15px;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item style="margin-left: 15px;" index="1">供应商管理</el-menu-item>
            <el-menu-item index="2">校产管理</el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name:"Canteen",
        mounted() {
            var currentUrlName=this.$route.name;
            switch (currentUrlName){
                case "supplier":this.activeIndex="1";break;
                case "asset":this.activeIndex="2";break;
            }
        },
        data() {
            return {
                activeIndex: "1",
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                switch (parseInt(key)){
                    case 1:this.$router.push("supplier"); break;
                    case 2:this.$router.push("asset"); break;
                }
            }
        }
    }
</script>

<style scoped>

</style>
