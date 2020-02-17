 import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import './permission'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;

Vue.use(ElementUI);

import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

 import VueClipboard from 'vue-clipboard2'

 VueClipboard.config.autoSetContainer = true // add this line
 Vue.use(VueClipboard)

window.ElementUI= ElementUI;

new Vue({
    el:'#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})

