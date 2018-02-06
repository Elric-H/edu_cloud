import route from 'vue-router'
let now = new Date(),
	year = now.getFullYear(),
	month = now.getMonth() + 1,
	date = now.getDate();

//加零操作
function addZero(num){
	return num < 10 ? ('0' + num) : num;
}

//获取初始化时间范围（今年一整年）
export let getDateRange = () => {
	let times = now.getTime() - 1000 * 3600 * 24 * 30;
	let nowDate = new Date(times);
	let start = `${nowDate.getFullYear()}-${addZero(nowDate.getMonth() + 1)}-${addZero(nowDate.getDate())} 00:00:00`;
	let end = year + '-' + addZero(month) + '-' + addZero(date + 1) + ' 00:00:00';
	return [start, end];
}

//获取登录用户信息
export let getUserInfo = (param) => {
	let sessionUser = sessionStorage.getItem('user');
	if(sessionUser){
		return JSON.parse(sessionUser)[param];
	} else {
		/*console.log('出错了，请重新登录');
        route.push('/index');*/
	}
}

//获取token
export let getToken = () => {
	let access_token = sessionStorage.getItem('access_token');
	if(access_token) return access_token;
	else{
		console.log('token失效，请重新登录');
		//this.$message.error('登录失效，请重新登录');
        //route.push('/index');
	}
	return '';
}

//时间戳换时间
export let conventDate = (dateNum, isS) => {
	let now = new Date(Number(dateNum)),
		year = now.getFullYear(),
		month = addZero(now.getMonth() + 1),
		date = addZero(now.getDate()),
		hour = addZero(now.getHours()),
		minutes = addZero(now.getMinutes()),
		seconds = addZero(now.getSeconds());
	if(isS) return [year, month, date].join('-');
	return [year, month, date].join('-') + ' ' + [hour, minutes, seconds].join(':');
}

//时间戳转为年龄
export let conventBirthday = (dateNum) => {
	let bir = new Date(Number(dateNum)),
		bir_year = bir.getFullYear(),
		bir_month = bir.getMonth() + 1,
		now = new Date(),
		now_year = now.getFullYear(),
		now_month = now.getMonth() + 1;
	let age = now_year - bir_year;
	return now_month > bir_month ? age : (age - 1);
}

//获取年
export let getYear = (dateNum) => {
	let bir = new Date(Number(dateNum));
	return bir.getFullYear();
}

//时间比较
export let compareDate = (dateNum) => {
	let now = new Date().getTime();
	return now < dateNum
}