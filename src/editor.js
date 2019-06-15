import Vue from 'vue'
import Editor from "./components/view/editor/Editor.vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'fabric'

Vue.use(BootstrapVue);

import store from './store'

new Vue({
    el: '#app',
    store,
    render: h => h(Editor)
})