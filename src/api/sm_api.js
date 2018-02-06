// import axios from 'axios'
// import { getUserInfo, conventDate, conventBirthday, getToken } from '@/common/js/tqt_util.js'

// const base = '/stud-manage';

// let new_axios = '';

// function createAxios(){
// 	if(new_axios) return new_axios;
// 	new_axios = axios.create({
// 		/*baseURL: 'http://39.108.53.141:8082', 记得改回来*/
//         baseURL: 'http://110.185.106.250:8082',
// 		headers: {'access_token': getToken()},
// 		timeout: 60000
// 	});
// 	return new_axios;
// }

import { getUserInfo, conventDate, conventBirthday } from '@/common/js/tqt_util.js'

import { createAxios } from '@/common/js/new_axios.js';

const base = '/stud-manage';

const teacherID = getUserInfo('id');

//请求一卡通消费(teacherID)
export const getOneCardData = params => {
	let {startDate, endDate, pageSize, currentPage, searchText} = params;
	if(searchText){
		return createAxios().get(`${base}/edu-cost/CostSearch/${searchText}&${startDate}&${endDate}&${pageSize}&${currentPage}`).then(res => {
			if(res.data.meta.success) return handleConsumeList(res.data.data);
			throw res.data.meta.message;
		});
	} else {
		return createAxios().get(`${base}/edu-cost/Cost/${teacherID}&${startDate}&${endDate}&${pageSize}&${currentPage}`).then(res => {
			if(res.data.meta.success) return handleConsumeList(res.data.data);
			throw res.data.meta.message;
		});
	}
};

//处理消费列表数据
function handleConsumeList(data){
	let pageInfo = data[data.length - 1];
	let arr = [];
	if(data.length > 1){
		data.slice(0, data.length - 1).forEach(function(one){
			let obj = {
				studentId: one.studentId,
				number: one.schoolRollNum,
				name: one.studentName,
				gender: one.sex == '0' ? '男' : '女',
				className: one.classFullName,
				consumeTime: conventDate(one.consumeData),
				consumeWhere: one.consumePlace + ' ( ' + one.costDetails + ' ) ',
				consumeType: one.costType,
				consumeSum: one.costValue + '元'
			};
			arr.push(obj);
		});
	}
	console.log({list: arr, info: pageInfo});
	return {list: arr, info: pageInfo};
}

//请求校园出入
export const getSchoolIOData = params => {
	let {startDate, endDate, pageSize, currentPage, searchText} = params;
	if(searchText){
		return createAxios().get(`${base}/edu-timelog/searchresult/${searchText}&${startDate}&${endDate}&${pageSize}&${currentPage}`).then(res => {
			if(res.data.meta.success) return handleSchoolIOData(res.data.data);
			throw res.data.meta.message;
		});
	} else {
		return createAxios().get(`${base}/edu-timelog/timelogs/${teacherID}&${startDate}&${endDate}&${pageSize}&${currentPage}`).then(res => {
			if(res.data.meta.success) return handleSchoolIOData(res.data.data);
			throw res.data.meta.message;
		});
	}
};

//处理校园出入数据
function handleSchoolIOData(data){
	let pageInfo = data[data.length - 1];
	let arr = [];
	if(data.length > 1){
		data.slice(0, data.length - 1).forEach(function(one){
			let obj = {
				studentId: one.studentId,
				number: one.schoolRollNum,
				name: one.studentName,
				gender: one.gender == '0' ? '男' : '女',
				className: one.classFullName,
				posTime: one.time ? conventDate(one.time) : '—— ——',
				cardNum: one.cardId,
				place: one.place,
				remarks: '--'
			};
			arr.push(obj);
		});
	}
	return {list: arr, info: pageInfo};
}

//请求健康列表
export const getHealthList = params => {
	let {startDate, endDate, pageSize, currentPage, searchText} = params;
	if(searchText){
		return createAxios().get(`${base}/edu-Studenthealth/search/${searchText}&${startDate}&${endDate}&${pageSize}&${currentPage}`).then(res => {
			if(res.data.meta.success) return handleHealthList(res.data.data);
			throw res.data.meta.message;
		});
	} else {
		return createAxios().get(`${base}/edu-Studenthealth/get/${teacherID}&${startDate}&${endDate}&${pageSize}&${currentPage}`).then(res => {
			if(res.data.meta.success) return handleHealthList(res.data.data);
			throw res.data.meta.message;
		});
	}
};

//处理健康列表数据
function handleHealthList(data){
	let pageInfo = data[data.length - 1];
	let arr = [];
	if(data.length > 1){
		data.slice(0, data.length - 1).forEach(function(one){
			let obj = {
				studentId: one.studentId,
				number: one.schoolRollNum,
				name: one.studentName,
				gender: one.sex == '0' ? '男' : '女',
				age: one.age || '/',
				healthN: '— —',
				className: one.classFullName,
				idCard: one.credentialNum,
				healthC: one.healthStatus == '0' ? '健康' : one.healthStatus == '1' ? '亚健康' : '患病',
				examT: one.testTime.slice(0, 10)
			};
			arr.push(obj);
		});
	}
	return {list: arr, info: pageInfo};
}

//请求健康信息
export const getHealthInfo = params => {
	let {studentId} = params;
	return createAxios().get(`${base}/edu-Studenthealth/healthrecords/${studentId}`).then(res => {
		if(res.data.meta.success) return handleHealthInfo(res.data.data);
		throw res.data.meta.message;
	});
};

//处理健康信息数据
function handleHealthInfo(data){
	let obj = {
		name: data.name,				
		gender: data.sex == '0' ? '男' : '女',
		age: data.age || '/',
		img: data.headImg || './static/user-s.png',
		height: data.height || '/',					//身高
		weight: data.weight || '/',					//体重
		vital: data.pulmonary || '/',				//肺活量
		blood: data.bloodPress || '/',				//血压
		heatRate: data.heartRate || '/',			//心率
		leftEye: data.leftEyeVision || '/',			//左眼视力
		rightEye: data.rightEyeVision || '/',		//右眼视力
		healthC: data.healthStatus == '0' ? '健康' : data.healthStatus == '1' ? '亚健康' : '患病',	//健康状态
		familyH: data.familyMedicalHistory || '无',	//家族病史
		inherH: data.heredityHistory || '无',		//遗传病史
		prevH: data.medicalHistory || '无'			//既往病史
	}
	return obj;
}

//请求成绩档案选项
export const getScoreType = () => {
	return createAxios().get(`${base}/edu-score/allschedule`).then(res => {
		console.log(res);
		if(res.data.meta.success) return handleScoreSelect(res.data.data);
		throw res.data.meta.message;
	});
};

//处理考试选项
function handleScoreSelect(data){
	let result = {
		arr: [],
		years: []
	};
	if(data.length > 0){
		data.forEach(function(one){
			let obj = {
				examId: one.id,
				examName: one.examName,
				examTime: conventDate(one.examStartDate),
				examType: one.examTypeName,
				schoolYear: one.schoolYear,
				term: one.term
			};
			result.arr.push({label: one.examTypeName, value: JSON.stringify(obj), years: one.schoolYear, term: one.term});
			if(result.years.indexOf(one.schoolYear) == -1){
				result.years.push(one.schoolYear);
			}
		});
	}
	return result;
}

//请求成绩档案查询
export const getScoreList = params => {
	let {examId, pageSize, currentPage, searchText, examType} = params;
	if(searchText){
		return createAxios().get(`${base}/edu-score/search/${searchText}&${examId}&${pageSize}&${currentPage}`).then(res => {
			if(res.data.meta.success) return handleScoreList(res.data.data, examType);
			throw res.data.meta.message;
		});
	} else {
		return createAxios().get(`${base}/edu-score/${teacherID}&${examId}&${pageSize}&${currentPage}`).then(res => {
			if(res.data.meta.success) return handleScoreList(res.data.data, examType);
			throw res.data.meta.message;
		});
	}
};

//处理成绩档案数据
function handleScoreList(data, examType){
	let pageInfo = data[data.length - 1];
	let arr = [];
	if(data.length > 1){
		data.slice(0, data.length - 1).forEach(function(one){
			let obj = {
				number: one.schoolRollNum,		    //学籍号
				name: one.studentName,				//姓名
				className: one.classFullName,		//班级
				examType: examType,					//考试类别
				scorelist: {},						//科目
				total: 0,							//总分
			};
			let score = {
				chinese: '— —',		//语文
				math: '— —',		//数学
				english: '— —',		//英语
				chemistry: '— —',	//化学
				physical: '— —',	//物理
				biology: '— —',		//生物
				geography: '— —',	//地理
				history: '— —',		//历史
				polity: '— —',		//政治
			};
			if(one.scoreList.length > 0){
				one.scoreList.forEach(function(scoreObj){
					let status = scoreObj.examStatus == '1' ? scoreObj.subjectScore : scoreObj.examStatus == '2' ? '缺考' : '作弊';
					if(scoreObj.examStatus == '1') obj.total += Number(status);
					switch(scoreObj.subjectName){
						case '语文':
							score.chinese = status;
							break;
						case '数学':
							score.math = status;
							break;
						case '英语':
							score.english = status;
							break;
						case '化学':
							score.chemistry = status;
							break;
						case '物理':
							score.physical = status;
							break;
						case '生物':
							score.biology = status;
							break;
						case '地理':
							score.geography = status;
							break;
						case '历史':
							score.history = status;
							break;
						case '政治':
							score.polity = status;
							break;
						default: 
							break;
					}
				});
			}
			obj.scorelist = score;
			arr.push(obj);
		});
	}
	return {list: arr, info: pageInfo};
}

//请求学籍列表
export const getEnrollList = params => {
	let {pageSize, currentPage, searchText} = params;
	if(searchText){
		return createAxios().get(`${base}/edu-schoolroll/search/${searchText}&${pageSize}&${currentPage}`).then(res => {
			if(res.data.meta.success) return handleEnrollList(res.data.data);
			throw res.data.meta.message;
		});
	} else {
		return createAxios().get(`${base}/edu-schoolroll/class/${teacherID}&${pageSize}&${currentPage}`).then(res => {
			console.log(res);
			if(res.data.meta.success) return handleEnrollList(res.data.data);
			throw res.data.meta.message;
		});
	}
};

//处理学籍列表数据
function handleEnrollList(data){
	let pageInfo = data[data.length - 1];
	let arr = [];
	if(data.length > 1){
		data.slice(0, data.length - 1).forEach(function(one){
			let obj = {
				studentId: one.studentId,										//学生id
				enroll: one.schoolRollNum,										//学籍号
				name: one.name,													//姓名	
				gender: one.gender == '0' ? '男' : '女',						//性别
				nation: one.nation || '/',										//民族
				className: one.classFullName,									//班级
				IDcard: one.credentialNum || '/',								//身份证号
				enterDate: one.ssinfo ? conventDate(one.ssinfo.admissionTime).slice(0, 10) : '— —',	//入学时间
				status: one.ssinfo ? one.ssinfo.schoolRollStateName	: '— —'						//状态
			};
			arr.push(obj);
		});
	}
	return {list: arr, info: pageInfo};
}

//请求学籍详情
export const getEnrollInfo = params => {
	let {studentId} = params;
	return createAxios().get(`${base}/edu-schoolroll/Students/${studentId}`).then(res => {
		if(res.data.meta.success) return handleEnrollInfo(res.data.data);
		throw res.data.meta.message;
	});
};

//处理学籍详情
function handleEnrollInfo(data){
	console.log(data);
	let infoObj = {};
	let parentArr = [];
	let schoolArr = [];
	let otherObj = {};
	let remarkArr = [];
	if(data.length > 0){
		data.forEach(function(one){
			switch(one.tableName){
				case 'UserInfo':
					infoObj = one;
					break;
				case 'FamilyRelationShip':
					parentArr.push(one);
					break;
				case 'StudyResume':
					schoolArr.push(one);
					break;
				case 'StudentSchoolInfo':
					otherObj = one;
					break;
				case 'TeacherComments':
					remarkArr.push(one);
					break;
				default:
				 	break;
			}
		})
	}
	let obj = {
		infoObj: handleStudentInfo(infoObj, otherObj),
		parentArr: parentArr.length !== 0 ? handleParentInfo(parentArr) : [],
		schoolArr: schoolArr.length !== 0 ? handleSchoolInfo(schoolArr) : [],
		remarkArr: remarkArr.length !== 0 ? handleRemarkInfo(remarkArr) : [],
	};
	return obj;
}

//学籍基本信息处理
function handleStudentInfo(infoObj, otherObj){
	let obj = {
		//img: infoObj.headImage,											//头像
		img: './static/user-s.png',
		name: infoObj.name,													//姓名
		gender: infoObj.gender == '0' ? '男' : '女',						//性别
		age: infoObj.birthDay ? conventBirthday(infoObj.birthDay) : '/',	//年龄
		enroll: infoObj.schoolRollNum,										//学籍号
		nation: infoObj.nation || '/',										//民族
		birthday: infoObj.birthDay ? conventDate(infoObj.birthDay).slice(0, 10) : '/',		//出生日期
		idCard: infoObj.credentialNum || '/',								//身份证
		beforeName: infoObj.beforeName || '/',								//曾用名
		politicalStatusName: infoObj.politicalStatusName || '/',			//政治面貌
		currentAddress: infoObj.currentAddress || '/',						//户口所在地
		birthPlace: infoObj.birthPlace || '/',								//出生地
		nativePlace: infoObj.nativePlace || '/',							//籍贯
		className: infoObj.classFullName,									//班级
		enterDate: conventDate(otherObj.admissionTime).slice(0, 10),		//入学时间
		status: otherObj.schoolRollStateName								//目前状态
	};
	return obj;
}

//学籍家庭关系
function handleParentInfo(data){
	let arr = [];
	data.forEach(function(one){
		let obj = {
			relationshipName: one.relationshipName,				//关系
			name: one.name,										//姓名
			age: one.age,										//年龄
			politicalStatusName: one.politicalStatusName,		//政治面貌
			workAddress: one.workAddress,						//工作单位职务及地址
			phone: one.phone									//电话
		};
		arr.push(obj);
	});
	return arr;
}

//学籍历史学校
function handleSchoolInfo(data){
	let arr = [];
	data.forEach(function(one){
		let obj = {
			address: one.address,			//地址
			start_end: conventDate(one.start).slice(0, 10) + '-' + conventDate(one.end).slice(0, 10)	//时间
		};
		arr.push(obj);
	});
	return arr;
}


//学籍评价
function handleRemarkInfo(data){
	let arr = [];
	data.forEach(function(one){
		let obj = {
			commentDetails: one.commentDetails,			//评语
			duties: one.duties,			//职务
			rewardData: one.rewardData,		//奖惩及日期
			teacherName: one.teacherName,	//教师
		};
		arr.push(obj);
	});
	return arr;
}



