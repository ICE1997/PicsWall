import axios from "axios";
import { SERVER } from '../../config/config.js'

const state = {
    walls: [],
    myWalls: [],
    publicWalls: [],
    followedWalls: [],
    homePage: 0,
    zonePage: 1,
    userInfoPage: 1,
    loading: true,
    toTheEnd: false
}

const actions = {
    loadWalls({ commit, rootState }) {
        let payload = {
            token: rootState.user.userInfo.token,
        }
        commit('getAllWalls', payload);
    },

    loadMyWalls({ commit, rootState }) {
        let payload = {
            token: rootState.user.userInfo.token
        }
        commit("getMyWalls", payload);
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
            commit("updateMylikes", payload);
        })
    }
}

const mutations = {
    getAllWalls(state, payload) {
        if (!state.toTheEnd) {
            console.log(state.walls.length);
            state.loading = true;
            state.homePage++;
            axios({
                method: "post",
                url: SERVER + '/info/userinfo',
                data: {
                    pages: state.homePage
                }
            }).then(function(response) {
                console.log(response);
                let walls = response["data"]["data"];
                if (walls == "") {
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

    getMyWalls(state, payload) {
        axios({
            method: "post",
            url: SERVER + '/info/mywalls',
            data: {
                token: payload.token
            }
        }).then(function(response) {
            console.log(response);
            let walls = response["data"]["data"];
            for (let index in walls) {
                let wall = walls[index];
                let temp = {
                    id: wall._id,
                    author: wall.username,
                    likes: wall.supportnum,
                    liked: false,
                    wallJSON: wall.imgpath,
                };
                state.myWalls.push(temp);
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

                for (let i in state.myWalls) {
                    for (let j in likedIds) {
                        if (state.myWalls[i].id === likedIds[j]) {
                            state.myWalls[i].liked = true;
                        }
                    }
                }

            })
        })
    },
    updatelikes(state, payload) {
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
    updateMylikes(state, payload) {
        let i = -1;
        for (let wall in state.myWalls) {
            let twall = state.myWalls[wall];
            if (twall.id == payload.id) {
                i = wall;
                break;
            }
        }
        if (i != -1) {
            state.myWalls[i].likes = payload.likes;
            state.myWalls[i].liked = !state.myWalls[i].liked;
        } else {
            console.log("赞/取消赞失败...");
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}