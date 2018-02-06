<!--**请假申请 **
**name:wp**
**date:2017/12/20*-->
<template>
    <aside>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="申请人姓名" prop="apply_name">
        <el-input v-model="ruleForm.apply_name" placeholder="请输入请假人名称"></el-input>
      </el-form-item>
      <el-form-item label="请假时间" prop="dateSt">
         <el-date-picker
              class="datetimerange_w100"
              v-model="ruleForm.dateSt"
              type="datetimerange"
              range-separator="至"
              start-placeholder="请假开始时间"
              end-placeholder="请假开始结束">
            </el-date-picker>
      </el-form-item>
     <el-form-item label="请假时长" prop="days">
        <el-input type="text"  v-model="ruleForm.days" placeholder="请输入时长"></el-input>
      </el-form-item>
      <el-form-item label="请假类型" prop="type">
       <el-select v-model="ruleForm.type" placeholder="请选择请假类型" class="w100">
            <el-option
              v-for="item in leaveTypeList"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="请假原因" prop="reason">
        <el-input type="textarea" placeholder="请说明请假原因" v-model="ruleForm.reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="addloading">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
</aside>
</template>
<script>
import util from '../../common/js/util';
import { addLeaveTask } from '../../api/wp_api';
  export default {
    data() {
    	var checkDate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择日期'));
        } else {
          callback();
        }
      }
      return {
        leaveTypeList:[
            {
              value: 1,
              label: '病假'
            }, {
              value: 2,
              label: '事假'
            }, {
              value: 3,
              label: '丧假'
            }, {
              value: 4,
              label: '产假'
            }, {
              value: 5,
              label: '婚假'
            }
        ],
        ruleForm: {
          apply_user_id:1,
          apply_name: '',
          dateSt: '',
          days: '',
          type:'',
          reason:''
        },
        addloading:false,
        rules: {
          apply_name: [
            { required: true, message: '请输入请假人', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          dateSt:{required: true, validator: checkDate,  message: '请选择日期',trigger: 'blur'},
          days:[{ required: true, message: '请输入时长', trigger: 'blur' }],
          type:[{ required: true, message: '请选择请假类型', trigger: 'change' }],
          reason: [
            { required: true, message: '请输入请假原因', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        //提交请假申请
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {
              apply_user_id:1,
              apply_name:this.ruleForm.apply_name,
              startTime: this.ruleForm.dateSt ? (this.ruleForm.dateSt[0] ? util.formatDate.format(new Date(this.ruleForm.dateSt[0]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
              endTime: this.ruleForm.dateSt ? (this.ruleForm.dateSt[1] ? util.formatDate.format(new Date(this.ruleForm.dateSt[1]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
              days: this.ruleForm.days,
              type: this.ruleForm.type,
              reason:this.ruleForm.reason
            }
            this.addloading = true;
            addLeaveTask(para).then((res)=>{
              this.addloading = false;
              this.$emit('closeDialog');
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>