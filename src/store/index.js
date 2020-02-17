import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'

import getters from './getters'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        product,
    },
    getters
})

export default store