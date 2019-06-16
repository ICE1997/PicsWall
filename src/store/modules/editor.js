import Axios from "axios";
import { SERVER, MaterialPath } from '../../config/config.js'

const state = {
    mt: [{
            id: "bcgsBox",
            type: "背景"
        },
        {
            id: "picsBox",
            type: "素材"
        },
        {
            id: "bordersBox",
            type: "边框"
        },
        {
            id: "hangingsBox",
            type: "悬挂"
        }
    ],
    picSource: [],
    bcgSource: [],
    borderSource: [],
    hangingSource: [],
}


const actions = {
    addToPicSource({ commit }, pic) {
        commit("updatePicSource", pic);
    },
    save({ rootState }, payload) {
        let logined = rootState.user.logined;
        if (logined) {
            let reqbody = {
                token: rootState.user.userInfo.token,
                wall: payload
            }
            Axios({
                method: "POST",
                url: SERVER + '/upload/img',
                data: {
                    token: reqbody.token,
                    wall: reqbody.wall
                }
            }).then(function(response) {
                console.log(response);
            })
            console.log(reqbody);
        } else {
            console.log("请登录!");
        }
    },
    loadMaterial({ commit }) {
        Axios({
            method: "GET",
            url: SERVER + "/static/loadimgs"
        }).then(function(response) {
            return (response.data.data);
        }).then(function(payload) {
            commit('updateBcgSource', payload.bcg);
            commit('updateBorderSource', payload.border);
            commit('updateHangingSource', payload.hanging);
        })
    }
}

const mutations = {
    updatePicSource(state, pic) {
        let temp = {
            id: pic.id,
            s: pic.s
        }
        state.picSource.push(temp);
    },
    updateHangingSource(state, payload) {
        let paths = payload;
        for (let i in paths) {
            let path = paths[i];
            let temp = {
                id: 'bcg' + state.hangingSource.length,
                s: MaterialPath + "/" + path
            }
            state.hangingSource.push(temp);
        }
    },
    updateBorderSource(state, payload) {
        let paths = payload;
        for (let i in paths) {
            let path = paths[i];
            let temp = {
                id: 'bs' + state.borderSource.length,
                s: MaterialPath + "/" + path
            }
            state.borderSource.push(temp);
        }
    },
    updateBcgSource(state, payload) {
        let paths = payload;
        for (let i in paths) {
            let path = paths[i];
            let temp = {
                id: 'hs' + state.bcgSource.length,
                s: MaterialPath + "/" + path
            }
            state.bcgSource.push(temp);
        }
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}