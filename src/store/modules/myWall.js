import axios from "axios";
import { SERVER } from '../../config/config.js'

const state = {
    walls: [],
    page: 0,
    loading: true,
    toTheEnd: false
}

const actions = {
    initWalls({ commit }) {
        commit("initWalls");
    },
    loadWalls({ commit, rootState }) {
        let payload = {
            token: rootState.user.userInfo.token,
            username: rootState.user.userInfo.username
        }
        commit('getAllWalls', payload);
    },

    like({ commit, rootState }, data) {
        axios({
            method: "post",
            url: SERVER + "/upload/updatesupport",
            data: {
                token: rootState.user.userInfo.token,
                id: data.id,
            }
        }).then(function(response) {
            let likes = response.data.data.supportnum;
            let payload = {
                id: data.id,
                likes: likes,
            }
            commit("updatelikes", payload);
        })
    }
}

const mutations = {
    initWalls(state) {
        state.walls = [];
        state.loading = true;
        state.toTheEnd = false;
        state.page = 0;
    },
    getAllWalls(state, payload) {
        if (!state.toTheEnd) {
            console.log(state.walls.length);
            state.loading = true;
            state.page++;
            axios({
                method: "post",
                url: SERVER + '/info/userwalls',
                data: {
                    token: payload.token,
                    username: payload.username,
                    pages: state.page
                }
            }).then(function(response) {
                let walls = [];
                if (response["data"]["data"] !== undefined && response["data"]["data"] !== null && response["data"]["data"] instanceof Array && response["data"]["data"].length > 0) {
                    walls = response["data"]["data"];
                } else {
                    state.toTheEnd = true;
                    return;
                }
                for (let index in walls) {
                    let wall = walls[index];
                    let temp = {
                        id: wall._id,
                        author: wall.username,
                        likes: wall.supportnum,
                        liked: false,
                        wallJSON: wall.imgpath,
                    };
                    state.walls.push(temp);
                }
            }).then(function() {
                axios({
                    method: 'post',
                    url: SERVER + "/info/usersupport",
                    data: {
                        token: payload.token
                    }
                }).then(function(response) {
                    let data = response.data.data;
                    let likedIds = [];
                    for (let i in data) {
                        likedIds.push(data[i].id);
                    }

                    for (let i in state.walls) {
                        for (let j in likedIds) {
                            if (state.walls[i].id === likedIds[j]) {
                                state.walls[i].liked = true;
                            }
                        }
                    }

                }).then(function() {
                    state.loading = false;
                })
            })
        }
    },


    updatelikes(state, payload) {
        console.log(payload);
        let i = -1;
        for (let wall in state.walls) {
            let twall = state.walls[wall];
            if (twall.id == payload.id) {
                i = wall;
                break;
            }
        }
        if (i != -1) {
            state.walls[i].likes = payload.likes;
            state.walls[i].liked = !state.walls[i].liked;
        } else {
            console.log("赞/取消赞失败...");
        }
    },

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}