<template>
    <div id="Canteen" class="canteenManage clearfix">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item style="margin-left: 15px;font-size: 15px;" index="1">学生信息导入</el-menu-item>
            <el-menu-item style="font-size: 15px;" index="2">老师信息导入</el-menu-item>
            <el-menu-item style="font-size: 15px;" index="3">家长信息导入</el-menu-item>
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
                case "studentInfo":this.activeIndex="1";break;
                case "teacherInfo":this.activeIndex="2";break;
                case "parentInfo":this.activeIndex="3";break;
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
                    case 1:this.$router.push("studentInfo"); break;
                    case 2:this.$router.push("teacherInfo"); break;
                    case 3:this.$router.push("parentInfo"); break;
                }
            }
        }
    }
</script>

<style scoped>

</style>
