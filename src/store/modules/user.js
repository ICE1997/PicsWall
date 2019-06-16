import axios from "axios";
import { SERVER } from '../../config/config.js'


const state = {
    logined: false,

    userInfo: {
        username: '',
        token: ''
    },

    registerState: {
        succeed: false,
        responseCode: ''
    },

    loginState: {
        succeed: false,
        responseCode: ''
    }
}

const actions = {
    init({ commit }) {
        console.log("Hahfha");
        commit("init");
    },
    login({ commit }, loginInfo) {
        let username = loginInfo.username;
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: SERVER + '/api/check',
                data: {
                    username: loginInfo.username,
                    password: loginInfo.password
                }
            }).then(function(response) {
                let payload = {
                    response: response,
                    username: username
                }
                commit('setLogined', payload);
                resolve();
            }).catch(error => {
                console.log(error);
            })
        })
    },

    logout({ commit }) {
        commit('setLogout');
    },

    register({ commit }, newUser) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: SERVER + '/api/reg',
                data: {
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password
                }
            }).then(function(response) {
                commit('newRegister', response);
                resolve();
            })
        })
    }
}


const mutations = {
    setLogined(state, payload) {
        console.log(payload);
        let response = payload.response;
        let username = payload.username;
        let status = response.data.status;
        if (!status) {
            switch (response.data.msg) {
                case "no user!":
                    state.loginState.responseCode = "410"
                    break;
                default:
                    state.loginState.responseCode = "400"
            }
        } else {
            let token = "";
            if (response.data.token) {
                token = response.data.token;
                state.loginState.succeed = true;
                state.loginState.responseCode = "200";
                state.userInfo.username = username;
                state.userInfo.token = token;
                state.logined = true;
                localStorage.setItem("usrToken", token);
                localStorage.setItem("logined", true);
                localStorage.setItem("usrName", username);
                localStorage.setItem("expireTime", new Date().getTime() + 1 * 3600 * 1000);
            } else {
                state.loginState.responseCode = "400";
            }
        }
    },
    setLogout(state) {
        state.logined = false;
        state.userInfo.username = "";
        state.userInfo.token = "";
        state.loginState.succeed = false;
        state.loginState.responseCode = "";
        localStorage.removeItem("usrToken");
        localStorage.removeItem("logined");
        localStorage.removeItem("usrName");
        localStorage.removeItem("expireTime");
    },
    newRegister(state, response) {
        let status = response.data.status;
        let info = response.data.msg;
        if (!status) { //注册失败
            state.registerState.succeed = false;
            switch (info) {
                case "用户名已存在！":
                    state.registerState.responseCode = "110";
                    break;
                case "邮箱已注册！":
                    state.registerState.responseCode = "111";
                    break;
                case "提交信息不符合要求！":
                    state.registerState.responseCode = "112";
                    break;
                default:
                    state.registerState.responseCode = "100";
            }
        } else {
            state.registerState.succeed = true;
            state.registerState.respsonseCode = "200";
        }
    },
    init(state) {
        let expireTime = localStorage.getItem("expireTime");
        if (expireTime != null && expireTime != undefined && expireTime != '' && expireTime > new Date().getTime()) {
            let logined = localStorage.getItem("logined");
            let usrName = localStorage.getItem("usrName");
            let token = localStorage.getItem("usrToken");
            console.log(expireTime);
            if (logined) {
                state.logined = true;
                state.userInfo.username = usrName;
                state.userInfo.token = token;
            } else {
                state.logined = false;
                state.userInfo.username = "";
                state.userInfo.token = "";
            }
        }
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}