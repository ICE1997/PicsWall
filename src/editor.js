import Vue from 'vue'
import Editor from "./components/view/editor/Editor.vue";

new Vue({
    el: '#app',
    components: { Editor },
    template: '<Editor/>'
})