import Vue from 'vue'
import Editor from "./components/view/editor/Editor.vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'fabric'

Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    components: { Editor },
    template: '<Editor/>'
})