import Vue from 'vue'
import App from './App.vue'
import VuePlayerPlugin from 'vue-youtube-iframe-api'
Vue.use(VuePlayerPlugin)
// simple way
import 'bulma/css/bulma.css'


new Vue({
  render: h => h(App),
}).$mount('#app')

