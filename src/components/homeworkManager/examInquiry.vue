<!--题库查询-->
<template>
    <div class="choose-div" v-loading="listLoading">
        <!--<el-transfer class="big-transfer"
                     filterable
                     filter-placeholder="请输入题目标题"
                     v-model="value"
                     :titles="['题库列表', '已选题目']"
                     :props="{
                        key:'id',
                        label:'name'
                        }"
                     @change="changeQuestion"
                     :data="data">
        </el-transfer>-->
        <el-col style="padding:10px" :span="10">
            <div>
                <h3>题库列表</h3>
                <el-input placeholder="请输入题干" v-model="search1" maxlength="20" class="input-with-select">
                    <el-button slot="append" @click="searchList1" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="drag-select">
                <draggable class="list-group" element="ul" v-model="data" :options="dragOptions" :move="onMove"
                           @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item" v-if="!element.hidden" v-for="element in data" :key="element.id">
                            <el-popover
                                    placement="top-start"
                                    width="200"
                                    trigger="hover"
                                    :content="element.name">
                                <el-button style="border: none;font-size:14px;padding:0px;margin: 0px;
                                    background-color: inherit" slot="reference">{{ element.name }}
                                </el-button>
                            </el-popover>

                        </li>
                    </transition-group>
                </draggable>
            </div>
        </el-col>
        <el-col style="padding:10px" :span="10">
            <div>
                <h3>已选题目</h3>
                <el-input placeholder="请输入题干" v-model="search2" maxlength="20" class="input-with-select">
                    <el-button slot="append" @click="searchList2" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="drag-select">
                <draggable element="span" v-model="value" :options="dragOptions" :move="onMove">
                    <transition-group name="no" class="list-group" tag="ul">
                        <li class="list-group-item" v-if="!element.hidden" v-for="element in value" :key="element.id">
                            <el-popover
                                    placement="top-start"
                                    width="200"
                                    trigger="hover"
                                    :content="element.name">
                                <el-button style="border: none;font-size:14px;padding:0px;margin: 0px;
                                    background-color: inherit" slot="reference">{{ element.name }}
                                </el-button>
                            </el-popover>
                        </li>
                    </transition-group>
                </draggable>
            </div>

        </el-col>
    </div>
</template>
<script>
    import { getExamInquiry } from '@/api/class_api'
    import draggable from 'vuedraggable'
    import moment from 'moment'
    export default {
        name: 'examInquiry',
        components: {
            draggable,
        },
        data() {
            return {
                listLoading: true,
                isDragging: false,
                delayedDragging:false,
                data: [],
                value: [],
                ques: {},
                search1: '',
                search2: '',
            };
        },
        props:{
            question: {
                required: true
            },
            subjectName: {
                default: ''
            }
        },
        computed: {
            dragOptions () {
                return  {
                    animation: 0,
                    group: 'description',
                    disabled: false,
                    ghostClass: 'ghost'
                };
            }
        },
        methods: {
            //获取题库
            getDataList() {
                this.listLoading = true;
                let prop = {
                    subjectName : this.subjectName
                }
                getExamInquiry(prop).then((res) => {
                    this.data = res.data.data;
                    this.value = [];
                    //解析question 添加进value里
                    if((this.question!= {}) && (this.question != null)){
                        let queList = Object.keys(this.question);
                        for(let num of queList){
                            this.getQuestion(this.question[num]);
                        }
                    }
                    this.listLoading = false;
                });
            },

            //自定义题库查询
            searchList1() {
                let newList = this.data;
                newList.forEach(exam => {
                    if( exam.name.indexOf(this.search1) > -1){
                        exam.hidden = false;
                    }else{
                        exam.hidden = true;
                    }
                })
                this.data = [];//设置为空，强制触发重新渲染
                this.data = newList;
            },
            //自定义已选题目查询
            searchList2() {
                let newList = this.value;
                newList.forEach(exam => {
                    if( exam.name.indexOf(this.search2) > -1){
                        exam.hidden = false;
                    }else{
                        exam.hidden = true;
                    }
                })
                this.value = [];//设置为空，强制触发重新渲染
                this.value = newList;
            },
            onMove ({relatedContext, draggedContext}) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            },
            //通过id获取试题
            getQuestion( num ){
                let exam = {};
                for(let i = 0; i < this.data.length; i++) {
                    if(this.data[i]){
                        if( this.data[i].id == num ){
                            exam = this.data[i];
                            this.data.splice( i, 1);//已选试题需从题库中删除
                            this.value.push(exam);
                        }
                    }
                }
            },
        },
        created() {
            //如果未传入科目，则不查询
            if(this.subjectName){
                this.getDataList();
            }

        },
        watch: {
            subjectName() {
                this.getDataList();
            },
            isDragging(newValue) {
                if (newValue){
                    this.delayedDragging= true
                    return
                }
                this.$nextTick( () =>{
                    this.delayedDragging =false
                })
            },
            value() {
                let i = 1;
                for(let num of this.value){
                    this.ques[i++] = num.id;
                }
                this.$emit('setQuestion', this.ques);
            }
        }
    }
</script>
<style scoped>
    .drag-select{
        height: calc( 100vh - 400px );
        background-color: #efeeee;
        padding: 10px 25px 10px 10px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .choose-div{
        padding:0px 20px 20px 20px;
    }
    .el-transfer-panel{
        width: 400px;
    }
    .flip-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }

    .ghost {
        opacity: .5;
        background: #C8EBFB;
    }

    .list-group {
        min-height: 100%;
    }

    .list-group-item {
        cursor: move;
        position: relative;
        display: block;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
        overflow: hidden;
        white-space: nowrap;
        width: 95%;
    }

    .list-group-item i{
        cursor: pointer;
    }
</style>