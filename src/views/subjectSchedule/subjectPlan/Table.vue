<template>
    <div class="subjectTable">
        <div class="classHint">
            <span style="margin-left: 35px">当前设置的班级：</span><span>{{row.fullName}}</span>
        </div>
        <div class="table">
            <div class="weekNav">
                <div class="common"></div>
                <div class="common ">课时</div>
                <div class="week" v-for="item in week">{{item}}</div>
            </div>
            <div class="content">
                <div class="dateNav">
                    <div class="am">上午</div>
                    <div class="pm">下午</div>
                    <div class="night clearBottomBorder">晚上</div>
                </div>
                <div class="timeNav">
                    <div v-for="item in time" class="time">{{item}}</div>
                </div>
                <div class="data">
                    <div v-for="col,colKey in timeInfo" class="infoCol">
                        <div v-for="row,rowKey in weekInfo" class="infoRow">
                            {{tableInfo[rowKey][colKey].name}}
                            <span @click="setSubject(rowKey,colKey)" class="set">设置</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submitWrap">
            <el-button @click="cancel"  style="margin-right:10px;">取 消</el-button>
            <el-button @click="submit" type="primary" style="margin-right: 58px;">提 交</el-button>
        </div>
        <!--安排课程对话框-->
        <el-dialog
                title="安排课程"
                :visible.sync="selectSubjectDialog"
                width="30%"
                :modal-append-to-body="false"
        >
            <el-form label-width="80px">
                <el-form-item label="选择课程">
                    <el-select :clearable="true" v-model="selectInfo.subject" style="width: 70%;" class="floatLeft" placeholder="请选择">
                        <el-option
                                v-for="item in subjects"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="selectSubjectDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureSelect">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
	import httpRequest from "@/api/schoolAffair.js";
    export default {
	    name:"subjectTable",//课程表
	    props:{
	    	row:{
	    		required:true
            }
        },
	    mounted(){
            console.log("--rowInfo---");
            console.log(this.row);
            //处理首次数据显示
            if(this.row.classTimetables.length!=0){
            	for(var i=0;i<this.row.classTimetables.length;i++){
                    var subjectName=this.row.classTimetables[i].subjectName; //获取学科名
		            var subjectId=this.row.classTimetables[i].subjectId; //获取学科名
                    //处理学科排课时间
                    for(var j=0;j<7;j++){
                    	var temp=j+1+"";  //处理对象的字面量
                    	for(var t=0;t<this.row.classTimetables[i].content[temp].length;t++){
                    		this.tableInfo[j][this.row.classTimetables[i].content[temp][t]-1].name=subjectName;
		                    this.tableInfo[j][this.row.classTimetables[i].content[temp][t]-1].id=subjectId;
                        }
                    }
                }
            }
	    	//获取所有的学科
            httpRequest.get("/edu-system/common/getSubjects","",data=>{
            	console.log("所有的学科");
            	console.log(data.data);
            	if(data.data.meta.success){
            		this.subjects=data.data.data;
                }else{
            		console.log("get subjects fail");
                    this.$message.error('获取学科信息失败，请重试');
                }
            });

	    },
        data(){
	        var tableInfo=new Array(7);
	        for(var i=0;i<tableInfo.length;i++){
		        tableInfo[i]=new Array(11);
	        }
            for(var i=0;i<tableInfo.length;i++){
	        	for(var j=0;j<tableInfo[i].length;j++){
			        tableInfo[i][j]={name:"",id:""};
                }
            }
	    	return{
	    		time:[1,2,3,4,5,6,7,8,9,10,11],
                week:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                weekInfo:[0,0,0,0,0,0,0],
			    timeInfo:[0,0,0,0,0,0,0,0,0,0,0],
                subjects:[],
                tableInfo:tableInfo,
                selectInfo:{
	    			subject:""
                },
                selectObject:{},
                selectSubjectDialog:false,//安排课程对话框
            }
        },
	    methods: {
		    setSubject(week,time) {
			    this.selectObject={week,time};//记录选择的时间点
			    this.selectSubjectDialog=true;//显示选择对话框
		    },
		    sureSelect(){//确定排课
                console.log("sure select");
                console.log(this.selectObject);
                if(this.selectInfo.subject){
                	console.log(this.selectInfo.subject);
                	//获取科目名
	                var info={};
                    for(var i=0;i<this.subjects.length;i++){
                    	if(this.selectInfo.subject==this.subjects[i].id) {
		                    info["id"] = this.selectInfo.subject;
		                    info["name"] = this.subjects[i].name;
		                    break;
	                    }
                    }
                    this.tableInfo[this.selectObject.week][this.selectObject.time]=info;//利用二维数组记录数据
                }else{
                    var infoVacant={
                        name:'',
                        id:''
                    };
                    this.tableInfo[this.selectObject.week][this.selectObject.time]=infoVacant;
                }
                this.selectSubjectDialog=false;//关闭对话框
            },
		    cancel(){
		    	this.$emit("changeToPlan");
            },
		    submit(){
		    	console.log("submit---");
		    	console.log(this.tableInfo);
		    	var oneLength=this.tableInfo.length;
                var classTimetables=[]; 	//定义一个接受学科排课的数组
		    	for(var i=0;i<oneLength;i++){
		    		for(var j=0;j<this.tableInfo[i].length;j++){
                        if(this.tableInfo[i][j].id){  //过滤没有信息的课程安排
	                        var queryResult=handleSimpleSubject( this.tableInfo[i][j] );
	                        if(queryResult.isSubject){	//已有课程了
		                        //定义字面量
		                        var weekInfo=i+1+"";//星期几的信息
		                        var timeInfo=parseInt(j+1);//第几节的信息
		                        classTimetables[queryResult.index].content[weekInfo].push(timeInfo);//将相应的信息添加到课程表的数据结构中
	                        }else{
		                        //还未添加该课程
		                        var subjectArrange={};
		                        subjectArrange["subjectId"]=this.tableInfo[i][j].id;
		                        subjectArrange["subjectName"]=this.tableInfo[i][j].name;
		                        subjectArrange["content"]={
			                        "1":[], "2":[],"3":[], "4":[], "5":[], "6":[], "7":[],
		                        };
		                        //定义字面量
		                        var weekInfo=i+1+"";//星期几的信息
		                        var timeInfo=parseInt(j+1);//第几节的信息
		                        subjectArrange["content"][weekInfo].push(timeInfo);//将相应的信息添加到课程表的数据结构中
		                        //添加到待提交的数据中
		                        classTimetables.push(subjectArrange);
	                        };
                        }
                    }
                }
                var submitData={
                	id:this.row.id,
                    fullName:this.row.fullName,
	                classTimetables:classTimetables
                };
			    console.log("submitData info-------");
                console.log(submitData);
                //发送请求
                httpRequest.post("/edu-syllabus/class/timetable/set",submitData,data=>{
                	if(data.data.meta.success){
                		console.log("设置成功");
                		console.log(data);
		                this.cancel();//设置成功跳转回列表页面
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        });
                    }else{
                		console.log("设置失败");
                        this.$message.error('设置失败，请重试');
                    }
                });
                //判断是有相同
                function handleSimpleSubject(data){
		    		for(var i=0;i<classTimetables.length;i++){
		    			if(data.id==classTimetables[i].subjectId){
		    				//有相同的学科
                            return {
                            	isSubject:true,
                            	index:i
                            };
                        }
                    }
                    return {
	                    isSubject:false
                    }
                }
            }
	    }

    }
</script>
<style scoped>
    div{
        box-sizing: border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        color:#333333;
    }
    .subjectTable{
        height: auto;
        background-color: #ffffff;
        padding-bottom: 20px;
    }
    .weekNav{
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom:1px solid #e7e7e7;
        border-right:1px solid #e7e7e7;
    }
    .common{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        border-left:1px solid #e7e7e7;
        border-top:1px solid #e7e7e7;
        box-sizing: border-box;
    }
    .week{
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        border-left:1px solid #e7e7e7;
        border-top:1px solid #e7e7e7;
    }
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dateNav{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 880px;
        border-bottom:1px solid #e7e7e7;
        flex-direction:column;
    }
    .timeNav{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 880px;
        border-left:1px solid #e7e7e7;
        flex-direction: column;
    }
    .data{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 14;
        height: 880px;
        border-left:1px solid #e7e7e7;
        flex-direction: column;
    }
    .am,.pm{
        height:320px;
        justify-content: center;
        display: flex;
        align-items: center;
        border-bottom:1px solid #e7e7e7;
        border-left:1px solid #e7e7e7;
        width: 100%;
    }
    .night{
        height:240px;
        justify-content: center;
        display: flex;
        align-items: center;
        border-bottom:1px solid #e7e7e7;
        width: 100%;
        border-left:1px solid #e7e7e7;
    }
    .clearBottomBorder{
        border-bottom:none;
    }
    .clearLeftBorder{
        border-left:none;
    }
    .timeNav .time{
        height: 80px;
        border-bottom:1px solid #e7e7e7;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .table{
        width: 90%;
        margin-left: 5%;
        height: auto;
    }
    .infoCol{
        height: 80px;
        border-bottom:1px solid #e7e7e7;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .infoRow{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        border-right:1px solid #e7e7e7;
        width: 100%;
        height: 80px;
        flex-direction: column;
        font-size: 16px;
    }
    .set{
        color:#409eff; cursor: pointer;
        font-size: 14px;
    }
    .set:hover{
        color: #1065ff;
    }
    .submitWrap{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 10px;
    }
    .classHint{
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
    }
</style>