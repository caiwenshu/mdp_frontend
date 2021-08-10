import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')),'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')),'manage');
const home = r => require.ensure([], () => r(require('@/page/home')),'home');

const ProjectMain = r => require.ensure([], () => r(require('@/page/project/ProjectMain')),'ProjectMain');
const ProductPackageList = r => require.ensure([], () => r(require('@/page/project/ProductPackageList')),'ProductPackageList');

const SMproduct = r => require.ensure([], () => r(require('@/page/SMproduct')),'SMproduct');

const ProductDownloadList = r => require.ensure([], () => r(require('@/page/project/ProductDownloadList')),'ProductDownloadList');
const ProductEmailList = r => require.ensure([], () => r(require('@/page/project/ProductEmailList')),'ProductEmailList');

const upload = r => require.ensure([], () => r(require('@/page/upload')),'upload');
const udid = r => require.ensure([], () => r(require('@/page/udid')),'udid');
const resign = r => require.ensure([], () => r(require('@/page/resign')),'resign');

const WebPagesMain = r => require.ensure([], () => r(require('@/page/webpages/WebPagesMain')),'WebPages');
const WebPagesList = r => require.ensure([], () => r(require('@/page/webpages/WebPagesList')),'WebPagesList');
// const settings = r => require.ensure([], () => r(require('@/page/settings/Settings')),'settings');

// meta子路由如果想要 可以跳转 则配置meta
const routes = [
    {
        path: '/',
        // redirect: {
        //     path: '/login'
        // },
        redirect: '/dashboard',
        name:'首页',
        meta:{hidden:true,
            menuShow: true,
            menuName: "首页"},
        component: manage,
        children: [
            {path: '/dashboard', component: home, name: 'Dashboard', meta:{menuShow: true, menuName: 'Dashboard'}},
            {path: '/alps', component: ProjectMain ,redirect: '/alps/product' ,name: 'Alps',meta:{hidden:false, menuShow: true, menuName:"Alps",},
                children:[
                    { path: '/alps/product', name: '产品', component: SMproduct, meta:{hidden:false, menuShow: true, menuName: '产品'}},
                    { path: '/alps/product_list/:id', name: '产品列表',component: ProductPackageList, meta:{menuShow: false, menuName: '产品列表'}},
                    { path: '/alps/product_download_list/:id', name: '下载页列表',component: ProductDownloadList, meta:{menuShow: false, menuName: '产品下载页配置'}},
                    { path: '/alps/product_email_list/:id', name: '邮件人员配置',component: ProductEmailList, meta:{menuShow: false, menuName: '产品邮件配置'}},

                    { path: '/alps/upload', component: upload, name: '文件上传', meta: {hidden:false,menuShow: true, menuName: '文件上传'}},
                    { path: '/alps/ios_udid', component: udid, name: 'UDID获取', meta: {hidden:false,menuShow: true, menuName: 'UDID获取'}},
                    { path: '/alps/ios_resign', component: resign, name: 'IPA重签', meta: {hidden:false,menuShow: true, menuName: 'IPA重签'}}

                ]},

            {path: '/webpages', redirect: '/webpages/main', component: WebPagesMain, name: 'WebPages', meta:{hidden:false, menuShow: true, menuName: 'WebPages'},
                children:[
                    {path:'/webpages/main', name:'列表',component: WebPagesList, meta:{menuShow: true, menuName: '列表'}},
                ]},
            // {path: '/settings', component: settings, name: 'Settings', meta:{menuShow: true, menuName: 'Settings'}},

            // {path: '/quality', component: RiftValleyMain, name: 'RiftValley', meta:{menuShow: true, menuName: 'RiftValley'}},
            ]
    },

    {
        name: 'login',
        path: '/login',
        meta:{menuShow: false},
        component: login
    },
    // {
    //     path: '/manage', component: manage, name: '首页', redirect: '/components/buttons',
    //         children: [{path: '', component: home, name: '首页2'},
    //     ]
    // },
    // { path: '/manage', component: manage, name:'首页',
    //     children: [{ path: '', component: home, name:'首页2' },
    //         { path: '/SMproduct', name: '产品', component: SMproduct,
    //             children:[{ path: '/product_list/:id', name: '产品列表', component: productList},
    //                 { path: '/product', name: '产品列表', component: productList}]
    //         },
    //     //     {
    //     //     path: '/downloadList',
    //     //     component: downloadList,
    //     //     meta: [{
    //     //         title:'ALPS',
    //     //         id: '3-1'
    //     //     },{
    //     //         title:'产品',
    //     //         id: '3-2',
    //     //         path:'/SMproduct?flag=/downloadList&isDivide=false'
    //     //     },{
    //     //         title:'邮件配置列表',
    //     //         id: '3-3',
    //     //         path:'/downloadList'
    //     //     }]
    //     // }, {
    //     //     path: '/emailList',
    //     //     component: emailList,
    //     //     meta: [{
    //     //         title:'ALPS',
    //     //         id: '4-1'
    //     //     },{
    //     //         title:'产品',
    //     //         id: '4-2',
    //     //         path:'/SMproduct?flag=/emailList&isDivide=false'
    //     //     },{
    //     //         title:'邮件配置列表',
    //     //         id: '4-3',
    //     //         path:'/emailList'
    //     //     }]
    //     // }, {
    //     //     path: '/upload',
    //     //     component: upload,
    //     //     meta: [{
    //     //         title:'ALPS',
    //     //         id: '5-1'
    //     //     },{
    //     //         title:'文件上传',
    //     //         id: '5-2',
    //     //         path:'/upload'
    //     //     }]
    //     // },{
    //     //     path: '/detail',
    //     //     component: detail,
    //     //     meta: [{
    //     //         title:'ALPS',
    //     //         id: '5-1'
    //     //     },{
    //     //         title:'产品',
    //     //         id: '5-2',
    //     //         path: '/SMproduct?flag=/productList',
    //     //     },{
    //     //         title:'产品列表',
    //     //         id: '5-3',
    //     //         path: '/productList'
    //     //     },{
    //     //         title:'add',
    //     //         id: '5-4',
    //     //         path: '/detail'
    //     //     }]
    //     // }
    //     ]
    // }
]

export default new Router({
    routes,
    strict:process.env.NODE_ENV !== 'production'
})
