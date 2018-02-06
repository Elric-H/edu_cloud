/*课务管理*/
import { createAxios } from '@/common/js/new_axios.js'
import url from '@/api/imgLoad.js'

//导入题库地址
export const importUrl = `${url.base}/edu-course/question-bank/importQuestions`;
//导入成绩地址
export const importScoresUrl = `${url.base}/edu-mark/exam/importStudentScores`;

//提交备课信息
export const postClassFrom = params => { return createAxios().post(`/edu-course/pre-lesson/lesson`, params).then(res => res.data); };

//获取备课信息
export const getPreList = params => { return createAxios().get(`/edu-course/pre-lesson/getAllLesson`, { params: params }); };

//删除备课信息
export const delPreList = params => { return createAxios().delete(`/edu-course/pre-lesson/lesson/${params}`); };

//获取科目、班级信息
export const getClassInfo = params => { return createAxios().get(`/edu-system/class/getClassByTeacher`, { params: params }); };

//获取题库
export const getExamInquiry = params => { return createAxios().get(`/edu-course/question-bank/getQuestions`, { params: params }); };

//获取作业
export const getHomeworkList = params => { return createAxios().get(`/edu-course/work/getAllWork`, { params: params }); };

//删除作业记录
export const delHomeworkList = params => { return createAxios().delete(`/edu-course/work/work/${params}`); };

//保存布置作业记录
export const saveAssignment = params => { return createAxios().post(`/edu-course/work/save`, params).then(res => res.data); };

//提交布置作业记录
export const subAssignment = params => { return createAxios().post(`/edu-course/work/assignment`, params).then(res => res.data); };

//教师根据作业号获取作业
export const getHomework = params => { return createAxios().get(`/edu-course/work/work/${params}`); };

//教师根据作业号获取学生作业
export const getStudentHomework = params => { return createAxios().get(`/edu-course/work/studentWork/${params}`); };

//教师提交批改作业
export const postCorrectWork = params => { return createAxios().post(`/edu-course/work/correctWork`, params).then(res => res.data); };

//教师退回作业
export const backCorrectWork = params => { return createAxios().post(`/edu-course/work/returnStudentWork`, params).then(res => res.data); };

//教师撤回提交作业
export const revokeAssignment = params => { return createAxios().post(`/edu-course/work/revokeAssignment`, params).then(res => res.data); };

//查询所题库
export const getAllExam = params => { return createAxios().get(`/edu-course/question-bank/getAllQuestion`, { params: params }); };

//通过试题唯一编号查询试题
export const getExam = params => { return createAxios().get(`/edu-course/question-bank/question/${params}`, { params: params }); };

//通过编码类型获取码表
export const getTypeCodes = params => { return createAxios().get(`/edu-system/code/getTypeCodes`, { params: params }); };

//更新题目
export const updateExam = params => { return createAxios().put(`/edu-course/question-bank/question`, params).then(res => res.data); };