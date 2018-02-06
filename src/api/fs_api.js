//import axios from 'axios'
//import { getToken, conventBirthday } from '../common/js/tqt_util.js'

//let base = '/edu-address-list/edu-jxt';

// let new_axios = '';

// function createAxios(){
// 	if(new_axios) return new_axios;
// 	new_axios = axios.create({
// 		baseURL: 'http://110.185.106.250:8082',
// 		headers: {'access_token': getToken()},
// 		timeout: 60000
// 	});
// 	return new_axios;
// }

import { conventBirthday } from '../common/js/tqt_util.js'
import { createAxios } from '@/common/js/new_axios.js';
import { getUserInfo } from '@/common/js/tqt_util.js';

let base = '/edu-address-list/edu-jxt';



//请求分组
export const requestContactGroup = () => {
	return createAxios().get(`${base}/` + getUserInfo('id')).then(res => {
		if(res.data.meta.success) return handleContactGroup(res.data);
		throw res.data.meta.message;
	});
};

//处理分组数据
function handleContactGroup(data){
	let arr = [];
	data.data.forEach(function(group){
		group.type = 'group';
		group.label = group.classFullName;
		group.children = [];
		arr.push(group);
	});
	return arr;
}

//获取联系列表
export const requestContactList = params => {
	return createAxios().get(`${base}/classes/` + params).then(res => {
		if(res.data.meta.success) return handleContactList(res.data);
		throw res.data.meta.message;
	});
};

//处理列表数据
function handleContactList(data){
	let arr = [];
	data.data.forEach(function(list){
		list.type = 'list';
		list.label = list.studentName;
		arr.push(list);
	});
	return arr;
}

//获取联系人信息
export const requestContactInfo = params => {
	return createAxios().get(`${base}/students/` + params).then(res => {
		console.log(res);
		if(res.data.meta.success) return handleContactInfo(res.data.data);
		throw res.data.meta.message;
	});
};

//处理信息数据
function handleContactInfo(data){
	console.log(data);
	let student = data[0];
	let infoObj = {
		//headImg: student.headImage || './static/headimg-max.png',			//头像
		headImg: './static/user-s.png',										//头像
		number: student.schoolRollNum,
		name: student.name,													//姓名
		className: student.classFullName,
		gender: student.gender == '0' ? '男' : '女',						//性别
		age: student.birthDay ? conventBirthday(student.birthDay) : '/',	//年龄
		nation: student.nation,												//民族
		currentAddress: student.nativePlace,								//当前地址
		parents: []
	};
	console.log(infoObj);
	if(data.length > 1){
		console.log(1);
		for(let i = 1; i < data.length; i++){
			let parent = data[i];
			console.log(parent);
			let obj = {
				name: parent.name,												//名字
				relation: parent.relationshipName,								//关系
				nation: parent.nation || '/',											//民族
				occupation: parent.occupation || '/',									//职务
				jobTitle: parent.jobTitle || '/',										//职业
				phone: parent.phone || '/',											//电话
				qq: parent.qq || '/',													//qq
				email: parent.email	 || '/'											//email
			};
			infoObj.parents.push(obj);
		}
	}
	console.log(infoObj);
	return infoObj;
}

//获取查询结果
export const requestSearchText = params => {
	return createAxios().get(`${base}/search/` + params).then(res => {
		if(res.data.meta.success) return handleSearchResult(res.data.data);
		throw res.data.meta.message;
	});
};

//处理信息数据
function handleSearchResult(data){
	let arr = [];
	if(data.length == 0) return arr;
	data.forEach(function(one){
		arr.push(handleContactInfo(one));
	});
	return arr;
}