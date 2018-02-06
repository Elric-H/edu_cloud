<!--课务管理-->
<template>
    <div>
        <prelist :is="navTab" @togglebox="toggleTab"></prelist>
    </div>

</template>

<script>
    import Prelist from "../../components/classManager/preparation/preList.vue";
    import PreCreate from "../../components/classManager/preparation/preCreate.vue";

    export default {
        name: 'onlinePreparation',
        components: {
            Prelist,
            PreCreate,
        },
        data() {
            return {
                navTab: Prelist
            }
        },
        methods: {
            toggleTab: function(tab) {
                this.navTab = tab;
            }
        }
    }

</script>
<style scoped>


</style>