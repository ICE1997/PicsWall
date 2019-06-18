import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import picsWall from './modules/picsWall'
import editor from './modules/editor'
import myzone from './modules/myzone'
import followedWall from './modules/followedWall'
import publicWall from './modules/publicWall'
import myWall from './modules/myWall'
import otherszone from './modules/otherszone'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        picsWall,
        editor,
        myzone,
        followedWall,
        publicWall,
        myWall,
        otherszone
    }
})