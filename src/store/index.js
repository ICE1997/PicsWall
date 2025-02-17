import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import picsWall from './modules/picsWall'
import editor from './modules/editor'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        picsWall,
        editor
    }
})