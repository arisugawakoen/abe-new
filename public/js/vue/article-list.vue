<template>
  <div>
    <single-article v-for="post in articles" :key="post.id"
     :id="post.id" :text="post.text" :color="post.color"
     :icon="post.icon" :date="post.date" :replyto="post.replyto"
     body-size="0.95rem" v-if="isLoading">
    </single-article>
    <div v-else>
      <p class="button is-fullwidth">
        <i class="fa-circle-o-notch fa-spin"></i>
      </p>
    </div>

    <p class="control">
      <button class="button is-info is-fullwidth" @click="addLimit">
        <i class="fa fa-plus fa-inverse"></i>
      </button>
    </p>

  </div>
</template>

<script>
import Vue from 'vue'
const axios = require("axios");
const singleArticle = Vue.extend(require('./single-article.vue'))

export default {
  components: {
    singleArticle
  },
  data: function() {
    return {
      articles: [],
      offset: 0,
      limit: 20,
      limitAdding: 20,
      isLoading: false
    }
  },
  methods: {
    addLimit: function() {
      this.limit += this.limitAdding
      this.articleLoad(this.offset, this.limit)
    },
    articleLoad: function(off,lim) {
      off = '/' + off || '/0'
      lim = '/' + lim || '/20'
      self = this

      axios.get('./index.json' + off + lim)
      .then(function(response) {
        return JSON.parse(response.data)
      }).then(function(json) {
        self.articles = json
      }).then(function() {
        self.isLoading = true
      })
    }
  },
  computed: {
    isReload () {
      return this.$store.state.reloadTrigger
    },
  },
  watch: {
    isReload: function() {
      this.articleLoad(this.offset, this.limit)
    }
  },
  created: function() {
    this.isLoading = false
    this.articleLoad(this.offset, this.limit)
  },
}

</script>

<style scoped>
.media-content {
  word-wrap: break-word;
  line-height: 1.8;
  font-size: 0.9rem;
  color: rgba(0,0,0,.87);
}

.media-content small {
  color: rgba(0,0,0,.6);
}

.media:nth-last-of-type(1){
  margin-bottom: 1rem;
}

i {
  margin: auto;
}
</style>
