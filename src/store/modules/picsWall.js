import axios from "axios";
import { SERVER } from '../../config/config.js'

const state = {
    walls: []
}

const actions = {
    loadWalls({ commit }) {
        commit('getAllWalls');
    },
    like({ commit,rootState }, wallid) {
        axios({
            method: "post",
            url: SERVER + "/upload/updatesupport",
            data: {
                token:rootState.user.userInfo.token,
                id: wallid,
            }
        }).then(function(response) {
            console.log(response);
            let likes = response.data.data.supportnum;
            let payload = {
                id: wallid,
                likes: likes
            }
            commit("updatelikes", payload);
        })
    }
}

const mutations = {
    getAllWalls(state) {
        axios.post(SERVER + '/info/userinfo').then(function(response) {
            let walls = response["data"]["data"];
            for (let index in walls) {
                let wall = walls[index];
                let temp = {
                    id: wall._id,
                    author: wall.username,
                    likes: wall.supportnum,
                    wallJSON: wall.imgpath,
                };
                state.walls.push(temp);
            }
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