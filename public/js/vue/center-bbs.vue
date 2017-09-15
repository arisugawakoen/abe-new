<template>
<div>
  <article-input></article-input>
  <article-list></article-list>
</div>
</template>

<script>
import Vue from 'vue'

const articleList = Vue.extend(require('./article-list.vue'))
const articleInput = Vue.extend(require('./article-input.vue'))

export default {
  components: {
    articleList,
    articleInput
  }
}
</script>

<style>
</style>
