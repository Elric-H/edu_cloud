<template>
    <homework-list :is="boxTab" @togglebox="toggleTab" @togglePage="togglePage" :homeFrom="assHomework">

    </homework-list>
</template>
<script>
    import HomeworkList from "../../components/homeworkManager/homeworkList.vue";
    import AssignmentHomework from "../../components/homeworkManager/assignmentHomework.vue";
    import MarkManager from "../../components/homeworkManager/markManager.vue";

    export default {
        components: {
            MarkManager,
            AssignmentHomework,
            HomeworkList
        },
        name: 'onlinehomework',
        data() {
            return {
                boxTab: HomeworkList,
                assHomework:{}
            }
        },
        methods: {
            toggleTab(tab) {
                this.boxTab = tab;
            },
            togglePage(prop){
                this.assHomework = prop.from;
                this.boxTab = prop.page;
            },
        }

    }
</script>
<style scoped>


</style>