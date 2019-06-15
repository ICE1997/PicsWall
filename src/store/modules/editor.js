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
    bcgSource: [{
        id: "bcg0",
        s: "/dist/img/brink.jpg"
    }],
    borderSource: [{
            id: "bs0",
            s: "/dist/img/brink.jpg"
        },
        {
            id: "bs1",
            s: "/dist/img/green.jpg"
        },
        {
            id: "bs2",
            s: "/dist/img/chalkboard.jpg"
        }
    ],
    hangingSource: [{
            id: "hs0",
            s: "/dist/img/brink.jpg"
        },
        {
            id: "hs1",
            s: "/dist/img/green.jpg"
        },
        {
            id: "hs2",
            s: "/dist/img/chalkboard.jpg"
        }
    ],
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
            return (response.data.data)[0];
        }).then(function(payload) {
            console.log(payload);
            commit('updateBcgSource', payload.bcg);
            // commit('updateBorderSource', payload.border);
            // commit('updateHangingSource', payload.hanging);
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
        console.log(payload);
    },
    updateBorderSource(state, payload) {
        console.log(payload);
    },
    updateBcgSource(state, payload) {
        let bcg = payload;
        for (let b in bcg) {
            let bcgPath = bcg[b];
            let temp = {
                id: 'bcg' + state.bcgSource.length,
                s: MaterialPath + "/" + bcgPath
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