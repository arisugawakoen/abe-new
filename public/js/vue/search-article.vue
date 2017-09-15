<template>
<div>
  <div class="field has-addons">
    <p class="control is-expanded">
      <input class="input" type="text"
       v-model="searchQuery" @keyup.enter="searchArticle">
    </p>
    <p class="control">
      <button class="button is-danger"
       :class="isInputEmpty"
       @click="searchArticle">
        <span class="icon">
          <i class="fa fa-search fa-inverse"></i>
        </span>
      </button>
    </p>
  </div>

  <div class="notification is-danger"
   v-if="isResultEmpty">
    No results
  </div>

  <single-article v-for="post in searchArticles" :key="post.id"
   :id="post.id" :text="post.text" :color="post.color"
   :icon="post.icon" :date="post.date" :replyto="post.replyto">
  </single-article>

</div>
</template>

<script>
import Vue from 'vue'
const axios = require('axios')
const singleArticle = Vue.extend(require('./single-article.vue'))

export default {
  components: {
    singleArticle
  },
  data: function() {
    return {
      searchQuery: '',
      searchArticles: [],
      isResultEmpty: false
    }
  },
  computed: {
    isInputEmpty: function() {
      return {
        'is-disabled': !this.searchQuery
      }
    }
  },
  methods: {
    searchArticle: function() {
      if(this.searchQuery.length) {
        self = this
        axios.post('./search.json', {
          query: self.searchQuery
        }).then(function(response) {
          return JSON.parse(response.data)
        }).then(function(json) {
          self.searchArticles = json
        }).then(function() {
          self.isResultEmpty = (self.searchArticles.length) ? false : true
        })
      }
    },
  },
  created: function() {
    if (this.$route.params.query) {
      this.searchQuery = this.$route.params.query
      this.searchArticle()
    }
  }
}
</script>

<style scoped>
.media-content {
  word-wrap: break-word;
  line-height: 1.8;
  font-size: 2.0rem;
  color: rgba(0,0,0,.95);
}

.media-content small {
  color: rgba(0,0,0,.6);
}

i {
  margin: auto;
}
</style>
