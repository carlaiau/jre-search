import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VuePlayerPlugin from 'vue-youtube-iframe-api'
import 'bulma/css/bulma.css'

Vue.use(VuePlayerPlugin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

/*
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})*/
