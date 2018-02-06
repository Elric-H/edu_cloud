/*教师-成绩管理*/
import { createAxios } from '@/common/js/new_axios.js'

//获取考次信息
export const getTestTimes = params => { return createAxios().get(`/stud-manage/edu-score/schedule`, {params : params}); };

//获取成绩信息
export const getAchieveInfo = params => { return createAxios().post(`/stud-manage/edu-score/appscoremange`, params).then(res => res.data); };
