<template>
    <div id="Canteen" class="canteenManage clearfix">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item style="margin-left: 15px;" index="1">菜品管理</el-menu-item>
            <el-menu-item index="2">菜品类型</el-menu-item>
            <el-menu-item index="3">场地管理</el-menu-item>
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
                case "food":this.activeIndex="1";break;
                case "foodType":this.activeIndex="2";break;
                case "field":this.activeIndex="3";break;
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
                    case 1:this.$router.push("food"); break;
                    case 2:this.$router.push("foodType"); break;
                    case 3:this.$router.push("field"); break;
                }
            }
        }
    }
</script>

<style scoped>

</style>
