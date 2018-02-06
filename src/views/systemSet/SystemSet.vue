<template>
    <div id="SchoolAffair">
        <SystemSetNav></SystemSetNav>
        <div class="second_nav_box">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import SystemSetNav from './SystemSetNav.vue'
    export default {
        name:"SystemSet",
        components: {
            'SystemSetNav': SystemSetNav
        },
        data(){
            return {

            }
        }
    }
</script>

<style scoped>
    #SchoolAffair{
        width: 100%;
        height:auto;
    }
    #SchoolAffair .second_nav_box{
        margin-top: 8px;
    }

</style>