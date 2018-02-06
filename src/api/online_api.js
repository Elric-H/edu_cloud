import axios from 'axios'
import { getToken, conventDate, compareDate } from '../common/js/tqt_util.js'

let base = '/course/choose';

let new_axios = '';

function createAxios(){
	if(new_axios) return new_axios;
	new_axios = axios.create({
		baseURL: 'http://110.185.106.250:8082',
		//baseURL: 'http://10.126.5.56:8087',
		//headers: {'access_token': '22378d37-368a-4d81-ab11-592a79c8c5df'},	//学生
		headers: {'access_token': getToken()},

		timeout: 5000
	});
	new_axios.defaults.headers.post['Content-Type'] = 'application/json';
	return new_axios;
}

//判断当前学生是否已选课
export let requestIsSelected = (params) => {
	return createAxios().get(`${base}/check`).then(res => {
		if(res.data.meta.success) return 2;		//已选课
		else return 1;							//未选课
	});
};

//预选班级类型列表
export let requestClassifyList = (params) => {
	let { years } = params;
	return createAxios().get(`${base}/list/` + years).then(res => {
		if(res.data.meta.success) return handleClassifyList(res.data.data);
		throw res.data.meta.message;
	});
};

//处理预选班级类型列表
function handleClassifyList(data){
	let arr = [];
	if(data.length == 0) return arr;
	data.forEach(function(one){
		if(one.status != 0){
			let obj = {
				id: one.id,										//班级类型id
				years: one.years,								//年度
				grade: one.gradeName,							//年级名称
				leading: one.leading,							//负责人
				subject: one.classTypeName,						//科目
				maxNum: one.expectNum,							//分班人数
				period: one.period,								//课时
				endDate: conventDate(one.endTime),				//结束时间
				status: one.status == 1 ? '进行中' : '已结束',	//状态
				total: one.actualNum,							//招生人数
				remarks: one.description						//备注
			};
			arr.push(obj);
		}
	});
	return arr;
}

//请求选择课程
export let requestChoiceCourse = (params) => {
	return createAxios().post(`${base}`, JSON.stringify(params)).then(res => {
		if(res.data.meta.success) return res.data.data;
		throw res.data.meta.message;
	});
};

//请求选课结果
export let requestChoiceResult = (params) => {
	return createAxios().get(`${base}/result`).then(res => {
		if(res.data.meta.success) return handleChoiceResult(res.data.data);
		throw res.data.meta.message;
	});
};

function handleChoiceResult(data){
	let obj = {
		subject: data.classTypeName,			//班级类型
		years: data.years,						//年度
		grade: data.gradeName,					//年级
		leading: data.leading,					//负责人
		maxNum: data.expectNum,					//计划人数
		period: data.period,					//课时
		likeOne: '',							//热衷学科一
		likeTwo: '',							//热衷学科二
		remarks: data.remark,					//备注
		isDivide: data.isDivide == 0 ? '未分班' : '已分班'
	};
	if(data.likeSubjects){
		if(data.likeSubjects.indexOf('&') == -1){
			obj.likeOne = data.likeSubjects
		} else {
			let subj = data.likeSubjects.split('&');
			obj.likeOne = subj[0];
			obj.likeTwo = subj[1];
		}
	}
	return obj;
}


//请求分班结果
export let requestDivideResult = (params) => {
	return createAxios().get(`/edu-system/class/getMyClass`).then(res => {
		if(res.data.meta.success) return res.data.data;
		return false;
	});
};
