import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/PageHome'
import NotFound from '@/pages/PageNotFound'
import SearchResults from '@/pages/SearchResults'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search/:query',
      name: 'SearchResult',
      component: SearchResults,
      props: true
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})
