import {login,getProductType} from '@/api/getData'

import {setStore} from '../../config/mUtils'

const product = {
    // namespaced: true, // 命名空间
    state: {
        adminInfo:{}, // 用户信息
        group: [], // 产品组
        applicationId:'', // 用户选择产品对应的ios or android id
        appList:[], // app产品列表
        
    },
    mutations: {
        GET_ADMININFO: (state,adminInfo) => {  // 登陆 获取用户信息
            state.adminInfo = adminInfo;
            // 将anminInfo 缓存起来
            setStore('adminInfo',adminInfo);
        },
        GET_ADMIN_GROUP:(state,group) => {  // 获取对应产品组
            state.group = group;
        },
        SELECT_IOS_ANDROID:(state,applicationId) => {  // 获取 当前选择产品 ios android  
            state.applicationId = applicationId;
        },
        GET_APP_LIST: (state,appList) => {  // 获取 对应产品列表
            state.appList = appList;
        },
        
    },
    actions: {
        // 登陆
        async submitLogin({commit},data,callback) {
            const res = await login(data);
            if(res.code == 200) {
                ElementUI.Message({
                    type: 'success',
                    message: '登录成功'
                });

                commit('GET_ADMININFO',res.data);

                typeof callback == 'function' && callback(res.data)
            } else {
                ElementUI.Message({
                    type: 'error',
                    message: res.message || '登陆失败'
                })
            }
            
        },
        // 获取产品组
        async getAdminGroup({commit,state}) {
            console.log('state--',state);
            console.log('state--',state.adminInfo.token);
            const res = await getProductType();
            console.log('产品种类',res);
            if(res.code == 200) {
                commit('GET_ADMIN_GROUP',res.data);
            }else {
                throw('请求app列表失败')
            }
            
        },
        
    }

};

export default product;