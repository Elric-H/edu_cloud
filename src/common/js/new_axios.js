import axios from 'axios'
import { getToken } from '@/common/js/tqt_util.js'
import { dealResponse, dealError } from '@/common/js/interceptor.js'

const host = 'http://110.185.103.202:8082';
//const host = 'http://192.168.6.85:8082';

let new_axios = '';

export let createAxios = (isLogin) => {
	if(isLogin){
		let login_axios = axios.create({
			baseURL: host,
			timeout: 5000
		});
		login_axios.defaults.headers.post['Content-Type'] = 'application/json';
		return login_axios;
	} else {
		if(new_axios) return new_axios;
		new_axios = axios.create({
			baseURL: host,
			headers: {'access_token': getToken()},
			timeout: 5000
		});
		new_axios.defaults.headers.post['Content-Type'] = 'application/json';
		new_axios.defaults.headers.put['Content-Type'] = 'application/json';
        new_axios.interceptors.response.use(dealResponse, dealError);
		return new_axios;
	}
}

export let clearAxios = () => {
	new_axios = '';
}