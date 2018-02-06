/*学生-在线作业*/
import { createAxios } from '@/common/js/new_axios.js'


//获取当前学生所有作业
export const getAllStudentWork = params => { return createAxios().get(`/edu-course/work/getAllStudentWork`, { params: params }); };

//根据ID获取作业
export const getStudentWork = params => { return createAxios().get(`/edu-course/work/studentWork/${params}`); };

//保存作业
export const saveStuHomeWork = params => { return createAxios().post(`/edu-course/work/doWork`, params).then(res => res.data); };

//提交作业
export const subStuHomeWork = params => { return createAxios().post(`/edu-course/work/commitWork`, params).then(res => res.data); };
