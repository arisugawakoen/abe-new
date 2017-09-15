<template>
<div class="columns">
  <div class="column is-3">
    <left-side></left-side>
  </div>

  <div class="column is-6">
    <div class="tabs" style="margin-bottom: 1rem;">
      <ul>
        <li><a href="http://aliceriverpark.pw/">Top</a></li>
        <li><router-link to="/">Post</router-link></li>
        <li><router-link to="/search">Search</router-link></li>
        <li><a href="http://aliceriverpark.pw/pripa/">pripa</a></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>

  <div class="column">
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store'

const leftSide = Vue.extend(require('./left-side.vue'))

export default {
  components: {
    leftSide,
  },
  store,
}
</script>

<style>
</style>
