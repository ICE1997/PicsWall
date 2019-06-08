import axios from "axios";
import { SERVER } from '../../config/config.js'

const state = {
    publishers: []
}

const actions = {
    loadPublishers({ commit }) {
        commit('getAllPublishers');
    }
}

const mutations = {
    getAllPublishers(state) {
        axios.post(SERVER + '/info/userinfo').then(function(response) {
            console.log(response);
            let imgPaths = response["data"]["data"]["0"]["imgpath"];
            for (let imgPath in imgPaths) {
                console.log(imgPaths[imgPath]);
                let temp = {
                    id: state.publishers.length,
                    author: "你才",
                    likes: "66333",
                    bcp: SERVER + "/" + imgPaths[imgPath],
                    name: "背景图"
                };
                state.publishers.push(temp);
            }
            console.log(state.publishers);
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}