import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import App from "./App.vue";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})