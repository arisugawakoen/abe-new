import Vue from 'vue'
import App from './vue/main.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const centerBbs = Vue.extend(require('./vue/center-bbs.vue'))
const searchArticle = Vue.extend(require('./vue/search-article.vue'))
const singlePost = Vue.extend(require('./vue/single-post.vue'))

const routes = [
  { path: '/', component: centerBbs },
  { path: '/search', component: searchArticle },
  { path: '/search/:query', component: searchArticle },
  { path: '/post/:id', component: singlePost }
]
const router = new VueRouter({
  routes
})

var main = new Vue({
  el: '#main',
  router,
  render: h => h(App)
})
