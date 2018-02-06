<template>
    <div class="subjectPlan">
        <component :is="currentTab" :row="row" @changeToPlan="changeToPlan" @changeToTable="changeToTable"></component>
    </div>
</template>
<script>
    import SubjectPlanHandle from "./SubjectPlanHandle.vue";
    import Table from "./Table.vue";
	export default {
		data() {
			return {
				currentTab:SubjectPlanHandle,
                row:{}
			}
		},
		components: {
			"SubjectPlanHandle":SubjectPlanHandle,
            "Table":Table
		},
		methods: {
			changeToTable(row){//切换组件
                console.log("change tab");
                console.log(row);
                this.currentTab=Table;
                this.row=row;
            },
            changeToPlan(){
	            this.currentTab=SubjectPlanHandle;
            }
		}
	}
</script>

<style scoped>
</style>