import axios from "axios";
import { SERVER } from '../../config/config.js'

const state = {
    walls: [],

    username: "",

    followed: false,

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
    init({ commit }) {
        commit("initUser");
    },
    checkoutAuthor({ commit }, payload) {
        commit("updateSelectedUser", payload);
    },
    getFollowersNum({ commit, state }) {
        axios({
            method: 'post',
            url: SERVER + '/follow/follownum',
            data: {
                username: state.username
            }
        }).then(response => {
            console.log(response);
            if (response.data.data != null && response.data.data != undefined) {
                let payload = {
                    followedFans: response.data.data.fans
                }
                commit("updateFollowersNum", payload);
            }
        })
    },
    checkFollowed({ rootState, commit, state }) {
        axios({
            method: "post",
            url: SERVER + "/follow/followstatus",
            data: {
                token: rootState.user.userInfo.token,
                followedperson: state.username
            }
        }).then(response => {
            console.log(response);
            if (response.data.data != null && response.data.data != undefined) {
                let payload = {
                    followed: response.data.data.followed
                };
                commit("updateFollowed", payload);
            } else {
                console.log("肯定没关注~~~");
            }
        })
    },
    loadInfo({ commit }) {
        axios({
            method: "post",
            url: SERVER + "/info/detailinfo",
            data: {
                username: state.username
            }
        }).then(function(response) {
            let payload = {
                briefIntro: response.data.data.briefIntro,
                email: response.data.data.email,
                qq: response.data.data.qq
            }
            commit("updateInfo", payload);
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
            commit("updateLikes", payload);
        })
    },
    loadWalls({ commit, rootState, state }) {
        let payload = {
            token: rootState.user.userInfo.token,
            username: state.username
        }
        commit("getWalls", payload);
    },
    follow({ commit, dispatch, rootState, state }) {
        axios({
            method: "post",
            url: SERVER + "/follow/changefollow",
            data: {
                token: rootState.user.userInfo.token,
                followedperson: state.username
            }
        }).then(response => {
            if (response.data.data != null && response.data.data != undefined) {
                let payload = {
                    followed: response.data.data.followed
                }
                commit("updateFollowed", payload);
                dispatch("getFollowersNum");

            } else {
                console.log(response);
            }
        })
    }
}


const mutations = {
    initUser(state) {
        if (sessionStorage.getItem("selectedUser") !== null) {
            state.username = sessionStorage.getItem("selectedUser");
        } else {
            state.username = ''
        }
    },
    updateSelectedUser(state, payload) {
        if (payload.user !== '' || payload.user !== null) {
            state.username = payload.user;
            sessionStorage.setItem("selectedUser", payload.user);
        }
    },
    updateInfo(state, payload) {
        state.info.briefIntro = payload.briefIntro;
        state.info.qq = payload.qq;
        state.info.email = payload.email;
    },
    getWalls(state, payload) {
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
                if (payload.token === '' || payload.token === undefined || payload.token === null) {
                    console.log("无token~~~");
                    state.loading = false;
                    return;
                }
                axios({
                    method: 'post',
                    url: SERVER + "/info/usersupport",
                    data: {
                        token: payload.token
                    }
                }).then(function(response) {
                    if (response.data.data !== null && response.data.data instanceof Array && response.data.data.length > 0) {
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
                    } else {
                        console.log("不能点赞~~~");
                    }
                }).then(function() {
                    state.loading = false;
                })
            })
        }
    },
    updateLikes(state, payload) {
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
    updateFollowed(state, payload) {
        if (payload.followed === 1) {
            state.followed = true;
        } else {
            state.followed = false;
        }
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
}