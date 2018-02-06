/*开发小组：梁伟
*开发人：wp
*开发日期：2017/12/20
*/
import { createAxios } from '@/common/js/new_axios.js'
import Qs from 'qs';
let base = 'http://110.185.106.250:8082';
//获取请假任务列表
export const getLeaveTaskList = params => { return createAxios().get(`/edu-act/process/p/tasks`, {params : params} ); };
//请假申请
export const addLeaveTask = params => { return createAxios().post(`/edu-act/process/start/hrl`, params ); };
//出差申请
export const addLeaveTrip = params => { return createAxios().post(`/edu-act/process/start/hrt`, params ); };
//查看请假 出差相关流程  详情
export const showDetailVariables = params => { return createAxios().get(`/edu-act/process/`+params.executionId+`/vars`, params ); };


//审核
export const addPassTogo = params => { return createAxios().post(`/edu-act/process/submit/`+params.taskid, params.vars ); };

//获取所有老师
export const getAllTeacher = params => { return createAxios().get(`/edu-user/user/getAllTeacher` ); };

//添加请假任务
export const addLeaveApplic = params => { return createAxios().post(`/edu-act/runtime/process-instances`, params ); };


//获取列表
export const getArtcileList = params => { return createAxios().get(`/edu-act/api/v1/cms/artcile`, {params : params} ); };
//添加
export const addArtcile = params => { return createAxios().post(`/edu-act/api/v1/cms/artcile`, params ); };
//修改
export const modifyArtcile = params => { return createAxios().put(`/edu-act/api/v1/cms/artcile`, params ); };
//删除
export const removeArtcile = params => { return createAxios().delete(`/edu-act/api/v1/cms/artcile/`+params.id,params ); };


//获取分类
export const getArtcileCategoryList = params => { return createAxios().get(`/edu-act/api/v1/cms/artcilecategory`,{params : params} ); };



//获取教师档案信息
export const getTeacherArchives = params => { return createAxios().get(`/edu-act/api/v1/hr/teacherArchives`,{params : params} ); };
//添加教师档案
export const addTeacherArchives= params => { return createAxios().post(`/edu-act/api/v1/hr/teacherArchives`, params ); };
//修改教师档案
export const modifyTeacherArchives = params => { return createAxios().put(`/edu-act/api/v1/hr/teacherArchives`, params ); };
//删除教师档案
export const removeTeacherArchives = params => { return createAxios().delete(`/edu-act/api/v1/hr/teacherArchives/`+params.id,params ); };



//获取薪资列表
export const getSalaryList = params => { return createAxios().get(`/edu-act/api/v1/hr/salary`,{params : params} ); };
//添加薪资档案
export const addSalary= params => { return createAxios().post(`/edu-act/api/v1/hr/salary`, params ); };
//修改薪资档案
export const modifySalary = params => { return createAxios().put(`/edu-act/api/v1/hr/salary`, params ); };
//删除薪资档案
export const removeSalary = params => { return createAxios().delete(`/edu-act/api/v1/hr/salary/`+params.id,params ); };



//获取考勤列表
export const getAttendanceList = params => { return createAxios().get(`/edu-act/api/v1/hr/attendance`,{params : params} ); };


//获取日程列表
export const getScheduleList = params => { return createAxios().get(`/edu-act/api/v1/hr/schedule`,{params : params} ); };
//添加日程
export const addScheduley = params => { return createAxios().post(`/edu-act/api/v1/hr/schedule`, params ); };
//修改日程
export const modifySchedule = params => { return createAxios().put(`/edu-act/api/v1/hr/schedule`, params ); };
//删除日程
export const removeSchedule = params => { return createAxios().delete(`/edu-act/api/v1/hr/schedule/`+params.id,params ); };


//添加互动信息
export const addInfoInteract = params => { return createAxios().post(`/edu-act/api/v1/cms/infoInteract`, params ); };

//获取已办事宜
export const getHistasks = params => { return createAxios().get(`/edu-act/process/histasks`,{params : params} ); };

//获取老师课务信息
export const getTeacherTimetable = params => { return createAxios().get(`/edu-syllabus/class/timetable/getTeacherTimetable`, params ); };

//获取学生课务信息
export const getStudentTimetable = params => { return createAxios().get(`/edu-syllabus/class/timetable/getStudentTimetable`, params ); };

//获取个人中心数字
export const getUserPending = params => { return createAxios().get(`/edu-course/work/getUserPending`,{params : params} ); };

