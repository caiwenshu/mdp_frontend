import { baseUrl } from './env'
import {getStore} from './mUtils'
/**
 * 处理formData 请求数据格式
 * @param {*} data
 */
function handleFormData(data = {}) {
	let MyForm = new FormData();
	for (let key in data) {
		MyForm.append(key,data[key]);
	}

	return MyForm
}

export default async({url = '', data = {}, type = 'GET', method = 'fetch',contentType=''}) => {
	let _adminInfo = getStore('adminInfo');
	let token = '';
	if(url.indexOf('api-token-auth') == -1) {
		token = _adminInfo && _adminInfo.token;
	}
	type = type.toUpperCase();
	url = baseUrl + url;


	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': token? ('Token '+ token) : null,
			},
			mode: "cors",
			// cache: "force-cache",
		}

		if (type == 'POST') {
			if(contentType == 'formData') {
				// 如果是form数据
				Object.assign(requestConfig, {'body': handleFormData(data)});
				delete requestConfig.headers['Content-Type']
			} else {
				Object.defineProperty(requestConfig, 'body', {
					value: JSON.stringify(data)
				})
			}
		}

		console.log('请求发出=================',requestConfig);

		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			console.log('请求返回=================',responseJson);
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
