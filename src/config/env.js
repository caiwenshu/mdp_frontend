/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = 'history';
let baseImgPath;

console.log("*******");
console.log("process.env:" + process.env);
console.log("process.env.NODE_ENV:" + process.env.NODE_ENV);
console.log("process.env.env_config:" + process.env.env_config);

// nodejs 下
if (process.env.NODE_ENV == 'development') {
	//   baseUrl = 'http://192.168.29.249:8003';
	// baseImgPath = 'http://192.168.29.249:8003';

	baseUrl = 'http://localhost:8003';
    baseImgPath = 'http://localhost:8003';
}else if(process.env.NODE_ENV == 'production'){

	if(process.env.env_config == 'sit') {

		baseUrl = 'http://localhost:8000';
		baseImgPath = 'http://localhost:8000';

	} else if(process.env.env_config == 'prod') {

        baseUrl = 'http://mdp.yeego.com';
        baseImgPath = 'http://mdp.yeego.com';
	}
} else {
    baseUrl = 'http://mdp.yeego.com';
    baseImgPath = 'http://mdp.yeego.com';
}
// let _orgin = location.origin;

// baseUrl = _orgin;
// baseImgPath = _orgin;


export {
	baseUrl,
	routerMode,
	baseImgPath
}
