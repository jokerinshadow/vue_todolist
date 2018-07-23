

import Vue from 'vue';
import Vuex from 'vuex';
import commons from './commons';

Vue.use(Vuex);



const store = new Vuex.Store({
    modules:{
        commons
    }

}) 

export default store;