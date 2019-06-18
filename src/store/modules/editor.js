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
    editingMode: false,
    editingData: {
        wallID: "",
        canvasData: ""
    }
}


const actions = {
    init({ commit }) {
        if (!state.editingMode) {
            editingData.wallID = "";
            editingData.canvasData = ""
        }
    },
    addToPicSource({ commit }, pic) {
        commit("updatePicSource", pic);
    },
    save({ rootState, state }, payload) {
        let logined = rootState.user.logined;
        if (logined) {
            if (state.editingMode) {
                Axios({
                    method: "post",
                    url: SERVER + "/info/updatepublicwalls",
                    data: {
                        token: rootState.user.userInfo.token,
                        wall: payload.wall,
                        id: payload.id
                    }
                }).then(response => {
                    console.log(response);
                })
            } else {
                let reqbody = {
                    token: rootState.user.userInfo.token,
                    wall: payload.wall
                }
                Axios({
                    method: "POST",
                    url: SERVER + '/upload/img',
                    data: {
                        token: reqbody.token,
                        public: 1,
                        wall: reqbody.wall
                    }
                }).then(function(response) {
                    console.log(response);
                })
                console.log(reqbody);
            }
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
    },
    reqEdit({ commit }, payload) {
        return new Promise((resolve, rejects) => {
            Axios({
                method: "post",
                url: SERVER + "/info/checkpublicwalls",
                data: {
                    id: payload.id
                }
            }).then(response => {
                console.log(response);
                if (response.data.data == null) {
                    resolve(false);
                }
                if (response.data.data !== null) {
                    let payload = {
                        wallID: response.data.data._id,
                        canvasData: response.data.data.imgpath
                    }
                    commit("updateEditingMode");
                    commit("updateEditingData", payload);
                    resolve(true);
                }
            })
        })
    },
    setEditalbe({ commit }) {
        commit("updateEditingMode");
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
    },
    updateEditingMode(state) {
        state.editingMode = true;
    },
    updateEditingData(state, payload) {
        state.editingData.wallID = payload.wallID;
        state.editingData.canvasData = payload.canvasData;
        console.log("啦啦啦~~~")
        console.log(state.editingData);
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}