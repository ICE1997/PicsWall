import Vue from 'vue';
import App from "./components/view/index/App.vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'fabric'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Wall from './components/view/index/Wall.vue'
import FollowedWalls from './components/view/index/walls/FollowedWalls.vue'
import PublicWalls from './components/view/index/walls/PublicWalls.vue'
import MyWalls from './components/view/index/walls/MyWalls.vue'

import axios from 'axios'
import qs from 'qs'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs


import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import store from './store'


const routes = [
    { path: '/', component: Wall },
    { path: '/followed', component: FollowedWalls },
    { path: '/public', component: PublicWalls },
    { path: '/my', component: MyWalls }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})


library.add(faHeart);
Vue.use(BootstrapVue);


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;



new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});