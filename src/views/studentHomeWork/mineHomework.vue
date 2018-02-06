<template>
    <student-allhomework :homeId="workId" :is="boxTab"
                         @togglebox="toggleTab"
                         @togglePage="togglePage"
    ></student-allhomework>

</template>
<script>
    import StudentAllhomework from "../../components/student-homework/student-allhomework.vue";
    import DoHomeWork from "../../components/student-homework/doHomeWork.vue";
    export default {
        components: {
            DoHomeWork,
            StudentAllhomework
        },
        name: 'minehomework',
        data() {
            return {
                boxTab: StudentAllhomework,
                workId:''
            }
        },
        methods: {
            toggleTab(tab) {
                this.boxTab = tab;
            },
            togglePage(prop){
                this.workId = prop.workId;
                this.boxTab = prop.page;
            },
        }
    }
</script>
<style scoped>


</style>