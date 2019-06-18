import axios from "axios";
import { SERVER } from '../../config/config.js'

const state = {
    walls: [],
    info: {
        briefIntro: "",
        qq: "",
        email: ""
    },
    followedFans: 0,
    page: 0,
    loading: true,
    toTheEnd: false
}

const actions = {
    loadwalls({ commit, rootState, state }) {
        if (rootState.user.logined) {
            let payload = {
                token: rootState.user.userInfo.token,
                username: rootState.user.userInfo.username
            }
            commit("getwalls", payload);
            console.log(payload);
        } else {
            console.log("需要登录喔~~~");
            state.walls = [];
            state.page = 0;
        }
    },
    loadinfo({ commit, rootState }) {
        if (rootState.user.logined) {
            axios({
                method: "post",
                url: SERVER + "/info/detailinfo",
                data: {
                    username: rootState.user.userInfo.username
                }
            }).then(function(response) {
                console.log(response);
                let payload = {
                    briefIntro: response.data.data.briefIntro,
                    email: response.data.data.email,
                    qq: response.data.data.qq
                }
                commit("updateinfo", payload);
            })
        } else {
            console.log("亲，请先登录～");
            let payload = {
                briefIntro: "",
                email: "",
                qq: ""
            }
            commit("updateinfo", payload);
        }
    },
    getFollowersNum({ commit, rootState }) {
        axios({
            method: 'post',
            url: SERVER + '/follow/follownum',
            data: {
                username: rootState.user.userInfo.username
            }
        }).then(response => {
            console.log(">>>>>>")
            console.log(response);
            if (response.data.data != null && response.data.data != undefined) {
                let payload = {
                    followedFans: response.data.data.fans
                }
                commit("updateFollowersNum", payload);
            }
        })
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
    },
    save({ state, rootState }) {
        axios({
            method: "post",
            url: SERVER + "/info/updatedetailinfo",
            data: {
                token: rootState.user.userInfo.token,
                briefIntro: state.info.briefIntro,
                qq: state.info.qq,
                email: state.info.email
            }
        }).then(function(response) {})
    }
}

const mutations = {
    getwalls(state, payload) {
        if (!state.toTheEnd) {
            state.loading = true;
            state.page++;
            axios({
                method: "post",
                url: SERVER + '/info/userwalls',
                data: {
                    username: payload.username,
                    pages: state.page
                }
            }).then(function(response) {
                // console.log(response);
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
                    console.log(state.walls);
                }
            }).then(function() {
                axios({
                    method: 'post',
                    url: SERVER + "/info/usersupport",
                    data: {
                        token: payload.token
                    }
                }).then(function(response) {
                    console.log(response);
                    let data = response.data.data;
                    if (response.data.data != null && response.data.data instanceof Array && response.data.data.length > 0) {
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
                    }
                }).then(function() {
                    state.loading = false;
                })
            })
        }
    },
    updateMylikes(state, payload) {
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
    updateinfo(state, payload) {
        state.info.briefIntro = payload.briefIntro;
        state.info.qq = payload.qq;
        state.info.email = payload.email;
    },
    updateFollowersNum(state, payload) {
        state.followedFans = payload.followedFans;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
};