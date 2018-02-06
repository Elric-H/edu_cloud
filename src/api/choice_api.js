// import axios from 'axios'
// import { getToken, conventDate, compareDate } from '../common/js/tqt_util.js'

// let base = '/course/release';

// let new_axios = '';

// function createAxios(){
// 	if(new_axios) return new_axios;
// 	new_axios = axios.create({
// 		baseURL: 'http://110.185.106.250:8082',

// 		//baseURL: 'http://10.126.5.56:8087',
// 		//headers: {'access_token': '22378d37-368a-4d81-ab11-592a79c8c5de'},	//老师
// 		headers: {'access_token': getToken()},
// 		timeout: 5000
// 	});
// 	new_axios.defaults.headers.post['Content-Type'] = 'application/json';
// 	new_axios.defaults.headers.put['Content-Type'] = 'application/json';
// 	return new_axios;
// }

import { conventDate, compareDate } from '../common/js/tqt_util.js'
import { createAxios } from '@/common/js/new_axios.js';

let base = '/course/release';

//请求年级列表
export let requestGradeList = (params) => {
	let { years } = params;
	return createAxios().get(`${base}/grade/list/` + years).then(res => {
		if(res.data.meta.success) return res.data.data;
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
};

//请求科目列表
export let requestCourseList = () => {
	return createAxios().get(`${base}/couse/list`).then(res => {
		if(res.data.meta.success) return handleCourseList(res.data.data);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
};

//筛选出语数外
function handleCourseList(data){
	let arr = data.filter((one) => {
		return one.name !== '语文' && one.name !== '数学' && one.name !== '英语';
	});
	return arr;
}

//新增班级类型
export let requestAddClassify = (params) => {
	return createAxios().post(`${base}/classify/add`, JSON.stringify(params)).then(res => {
		if(res.data.meta.success) return "";
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
};

//编辑班级类型
export let requestEditorClassify = (params) => {
	return createAxios().put(`${base}/classify/update`, JSON.stringify(params)).then(res => {
		if(res.data.meta.success) return "";
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
};

//删除班级类型
export let requestDeleteClassify = (params) => {
	let { classifyId } = params;
	return createAxios().delete(`${base}/classify/remove/` + classifyId).then(res => {
		if(res.data.meta.success) return "";
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
};

//请求班级类型列表
export let requestClassifyList = (params) => {
	return createAxios().get(`${base}/classify/list`, {params}).then(res => {
		console.log(res);
		if(res.data.meta.success) return handleClasstypeList(res.data.data);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//处理班级类型列表
function handleClasstypeList(data){
	let result = {
		list: [],
		info: {
			currentPage: data.pageNum,
			totalSize: data.totalSize
		}
	};
	if(data.beanList.length == 0) return result;
	data.beanList.forEach(function(one) {
		if(one.status == 0){
			let obj = {
				id: one.id,					//班级类型id
				years: one.years,			//年度
				gradeId: one.gradeId,		//年级id
				grade: one.gradeName,		//年级名称
				leading: one.leading,		//负责人
				subject: one.classTypeName,	//科目
				maxNum: one.expectNum,		//分班人数
				period: one.period,			//课时
				status: '未开始',			//状态
				remarks: one.description	//备注
			};
			result.list.push(obj);
		} else {
			result.info.totalSize--;
		}
	});
	return result;
}

//发起选课
export let requestLaunchChoice = (params) => {
	return createAxios().post(`${base}/classify/publish`, JSON.stringify(params)).then(res => {
		if(res.data.meta.success) return "";
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//根据年度请求班级类型列表
export let requestClassifyListByYears = (years) => {
	return createAxios().get(`${base}/choose/list/` + years).then(res => {
		console.log(res);
		if(res.data.meta.success) return handleClasstypeListByYears(res.data.data);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//处理年度请求班级类型列表
function handleClasstypeListByYears(data){
	let arr = [];
	if(data.length == 0) return arr;
	data.forEach(function(one) {
		if(one.status != 0){
			let obj = {
				id: one.id,					//班级类型id
				years: one.years,			//年度
				gradeId: one.gradeId,		//年级id
				grade: one.gradeName,		//年级名称
				leading: one.leading,		//负责人
				subject: one.classTypeName,	//科目
				maxNum: one.expectNum,		//分班人数
				period: one.period,			//课时
				endDate: conventDate(one.endTime, true) + '  23:59:59',//结束时间
				status: one.status == 1 ? '进行中' : '已结束',	//状态
				total: one.actualNum,		//招生人数
				remarks: one.description	//备注
			};
			arr.push(obj);
		}
	});
	return arr;
}

//查看指定班级类型下的学生
export let requestStudentByClassify = (params) => {
	return createAxios().get(`${base}/choose/stu/list`, {params}).then(res => {
		if(res.data.meta.success) return handleStudentByClassify(res.data.data);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//处理指定班级类型下的学生
function handleStudentByClassify(data){
	console.log(data);
	let result = {
		list: [],
		info: {
			currentPage: data.pageNum,
			totalSize: data.totalSize
		}
	};
	if(data.beanList.length == 0) return result;
	data.beanList.forEach(function(one){
		let obj = {
			number: one.schoolRollNum,		//学籍号
			name: one.studentName,			//姓名
			id: one.studentId,				//id
			upScore: one.upScore,			//源成绩
			beforeSchool: one.beforeSchool,	//源学校
			remarks: one.remark,			//备注
			likeSubjects: one.likeSubjects	//热衷学科
		};
		result.list.push(obj);
	});
	return result;
}

//查看某年度未选课的学生列表
export let requestUnselectStudentListByYears = (params) => {
	return createAxios().get(`${base}/unchoose/stu`, {params}).then(res => {
		if(res.data.meta.success) return handleStudentByClassify(res.data.data);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//查看未通过学生列表
export let requestUnpassStudentListByYears = (params) => {
	return createAxios().get(`${base}/choose/change/list`, {params}).then(res => {
		if(res.data.meta.success) return handleStudentByClassify(res.data.data);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//学生加入待调整队列
export let requestAddStudentUnpass = (params) => {
	return createAxios().post(`${base}/choose/add`, JSON.stringify(params)).then(res => {
		if(res.data.meta.success) return "";
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//获取所有带调整学生列表（包括未选课）
export let requestAllUnpassStudent = (params) => {
	return createAxios().get(`${base}/choose/change/all`, {params}).then(res => {
		if(res.data.meta.success) return handleAllUnpassStudent(res.data.data);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//处理所有带调整学生列表（包括未选课）
function handleAllUnpassStudent(data){
	let result = {
		list: [],
		info: {
			currentPage: data.pageNum,
			totalSize: data.totalSize
		}
	};
	if(data.beanList.length == 0) return result;
	data.beanList.forEach(function(one){
		let obj = {
			number: one.schoolRollNum,				//学籍号
			name: one.studentName,					//姓名
			id: one.studentId,						//id
			upScore: one.upScore,					//源成绩
			beforeSchool: one.beforeSchool || '/',	//源学校
			remarks: one.remark,					//备注
			isSelect: one.isSelect,					//是否选课
			status: one.isSelect == 0 ? '未选课' : '已选课',	//状态
			likeOne: '/',							//热衷学科一
			likeTwo: '/'							//热衷学科二
		};
		if(one.likeSubjects){
			if(one.likeSubjects.indexOf('&') == -1){
				obj.likeOne = one.likeSubjects;
			} else {
				let arr = one.likeSubjects.split('&');
				obj.likeOne = arr[0];
				obj.likeTwo = arr[1];
			}
		}
		result.list.push(obj);
	});
	return result;
}

//获取班级类型列表
export let requestClassifyOptions = (years, isDivide) => {
	return createAxios().get(`${base}/choose/list/` + years).then(res => {
		if(res.data.meta.success) return handleClassifyOptions(res.data.data, isDivide);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//处理班级类型列表
function handleClassifyOptions(data, isDivide){
	if(data.length == 0) return [];
	let arr = data.map(function(one){
		let val = {
			gradeId: one.gradeId,
			gradeName: one.gradeName,
			classId: one.id,
			className: one.classTypeName,
			subjects: '语文&数学&英语&' + one.classTypeName
		};
		return {
            value: JSON.stringify(val),
            label: `${one.gradeName} - ${one.classTypeName} - 共有 ${one.actualNum} 人`
        };
	});
	return arr;
}

//获取最终指定班级类型下的还未分班学生
export let requestLastStudentByClassify = (params) => {
	return createAxios().get(`${base}/choose/final`, {params}).then(res => {
		if(res.data.meta.success) return handleLastStudentByClassify(res.data.data);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//处理指定班级类型下的还未分班学生
function handleLastStudentByClassify(data){
	let result = {
		list: [],
		info: {
			currentPage: data.pageNum,
			totalSize: data.totalSize
		}
	};
	if(data.beanList.length == 0) return result;
	data.beanList.forEach(function(one){
		let obj = {
			number: one.schoolRollNum,				//学籍号
			name: one.studentName,					//姓名
			id: one.studentId,						//id
			upScore: one.upScore || '/',			//源成绩
			beforeSchool: one.beforeSchool || '/',	//源学校
			remarks: one.remark || '/',				//备注
			likeSubjects: one.likeSubjects || '/',	//热衷学科
			isShow: one.isDivide == 0 ? '未分班' : '已分班', //是否分班
			isDivide: one.isDivide					//是否分班
		};
		result.list.push(obj);
		// if(one.isDivide !== 1){
		// 	result.list.push(obj);
		// } else {
		// 	result.info.totalSize--;
		// }
	});
	result.list.sort(function(one, two){
		return one.isDivide > two.isDivide;
	});
	return result;
}

//将选中学生调到某个班级类型
export let requestAdjectStudent = (params) => {
	return createAxios().post(`${base}/choose/newClass`, JSON.stringify(params)).then(res => {
		if(res.data.meta.success) return res.data.data;
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

//获取教师列表
export let requestTeacherList = (params) => {
	return createAxios().get(`/edu-user/user/getAllTeacher`).then(res => {
		if(res.data.meta.success) return handleTeacherList(res.data.data);
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}

function handleTeacherList(data){
	if(data.length == 0) return [];
	let arr = data.map(function(one){
		let obj = {
			value: JSON.stringify({teacherId: one.id, teacherName: one.name}),
			label: one.name
		};
		return obj;
	});
	return arr;
}

//创建分班
export let requestCreateClass = (params) => {
	return createAxios().post(`/edu-system/class/addClassWithStudent`, JSON.stringify(params)).then(res => {
		if(res.data.meta.success) return res.data.data;
		throw '请求出错，请重试';
		throw res.data.meta.message;
	});
}
