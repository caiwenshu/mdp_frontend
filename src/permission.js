
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from '@/config/mUtils'


NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach((to,from,next) => {
    console.log('router beforeEach',to,'oooo',from,'pppppp',next);

    NProgress.start() 
    
    if(getToken()) {

        next();
        
    } else { 
        // no token 
        if(whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login');
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})