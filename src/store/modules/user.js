const state = {
    logined: true
}

const actions = {
    login({ commit }, userinfo) {
        if (userinfo.username === '1' && userinfo.password === '1') {
            commit('setLogined');
        }
    },

    logout({ commit }) {
        commit('setLogout');
    }
}


const mutations = {
    setLogined(state) {
        state.logined = true;
    },
    setLogout(state) {
        state.logined = false;
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}