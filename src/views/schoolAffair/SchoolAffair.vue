<template>
    <div id="SchoolAffair">
        <SecondNav></SecondNav>
        <div class="second_nav_box">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import SecondNav from './SecondNav.vue'
    export default {
        name:"SchoolAffair",
        components: {
            'SecondNav': SecondNav
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