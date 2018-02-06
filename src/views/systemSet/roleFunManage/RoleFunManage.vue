<template>
    <div class="store">
        <!--使用动态组件-->
        <component
                :is="currentTab"
                :seletedRole="seletedRole"
                @changeToList="changeToList"
                @changeToFunDistribute="changeToFunDistribute">
        </component>
    </div>
</template>
<script>
    import List from "./List.vue";
    import FunDistribute from "./FunDistribute.vue";
    export default {
        name:"roleFunManage",//角色权限管理
        mounted(){},
        data(){
            return {
                currentTab:List,//进入页面某人为list列表显示
                seletedRole:{}//选中待分配的角色信息
            }
        },
        components:{
            "List":List,
            "FunDistribute":FunDistribute
        },
        methods: {
            changeToList(){//显示列表组件
                this.currentTab=List;
            },
            changeToFunDistribute(index,row){//显示功能分配页面
                this.seletedRole=row;
                this.currentTab=FunDistribute;
            }
        }
    }
</script>

<style scoped>
    .store{
        height: auto;
        min-height: 600px;
        background-color: #FFFFFF;
    }
</style>