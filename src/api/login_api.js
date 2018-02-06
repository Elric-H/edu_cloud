import axios from 'axios';
import imgUrl from '@/api/imgLoad.js';
import route from '@/router/index.js';
import { createAxios } from '@/common/js/new_axios.js';

const base = '/edu-user';
let _imgUrl = imgUrl;

let new_axios = '';

//登录 
export let requestLogin = params => {
	return createAxios(true).post(`${base}/user/login`, JSON.stringify(params)).then(res => {
		if(res.data.meta.success) return hanldLoginResult(res.data.data);
		throw res.data.meta.message;
	});
}

//处理登录后的数据
function hanldLoginResult(data){
	let menus = [];
	data.menuList.forEach((item) => {
		menus.push(item.id);
	})

	let curMenus = handleMenus(menus);

	return {
		access_token: data.access_token,
		menuList: curMenus,
		userInfo: handleInfo(data.userInfo)
	};
}

//处理菜单
function handleMenus(arr){
	let menus = [];

	if(arr.length > 0 && route.length > 0){
		arr.forEach(function(men){
			for(let item of route ){
				if(men == item.menuId){
                    menus.push(item);
				}
			}
		});
	}
	return menus;
}

//处理信息
function handleInfo(one){
	let user = {
		id: one.id,
		img: one.headImage? _imgUrl.url+one.headImage : './static/user-t.png',
		name: one.name,
		logurl: one.userType == '1' ? './static/top-text-t.png' : './static/top-text-s.png',
		group: '— —'
	};
	return user;
}

//退出请求
export let requestLoginOut = params => {
	return createAxios().post(`${base}/user/logout`, JSON.stringify(params)).then(res => {
		return res.data;
	});
}
