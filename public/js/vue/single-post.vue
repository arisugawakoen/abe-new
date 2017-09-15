<template>
<div>

  <single-article v-if="singlePost.replyto"
   :id="parentPost.id" :text="parentPost.text" :color="parentPost.color"
   :icon="parentPost.icon" :date="parentPost.date"
   :replyto="parentPost.replyto"
   body-size="0.9rem" body-color="rgba(0,0,0,.60)">
  </single-article>

  <single-article
   :id="singlePost.id" :text="singlePost.text" :color="singlePost.color"
   :icon="singlePost.icon" :date="singlePost.date"
   :replyto="singlePost.replyto">
  </single-article>

  <single-article v-for="post in replyPosts" :key="post.id"
   :id="post.id" :text="post.text" :color="post.color"
   :icon="post.icon" :date="post.date"
   :replyto="post.replyto"
   body-size="0.9rem" body-color="rgba(0,0,0,.60)">
  </single-article>

  <article-input :replyid="$route.params.id"></article-input>

</div>
</template>

<script>
import Vue from 'vue'
const axios = require('axios')
const articleInput = Vue.extend(require('./article-input.vue'))
const singleArticle = Vue.extend(require('./single-article.vue'))

export default {
  components: {
    articleInput,
    singleArticle
  },
  data: function() {
    return {
      singlePost: {},
      parentPost: {},
      replyPosts: []
    }
  },
  methods: {
    singlePostLoad: function(id) {
      self = this
      axios.get('./id.json/' + id)
      .then(function(response) {
        return JSON.parse(response.data)
      }).then(function(json) {
        self.singlePost = json
      })
    },
    parentPostLoad: function(id) {
      self = this
      axios.get('./id.json/' + id)
      .then(function(response) {
        return JSON.parse(response.data)
      }).then(function(json) {
        self.parentPost = json
      })
    },
    replyPostsLoad: function(id) {
      self = this
      axios.get('./reply.json/' + id)
      .then(function(response) {
        return JSON.parse(response.data)
      }).then(function(json) {
        self.replyPosts = json
      })
    },
  },
  computed: {
    parentId() {
      return this.singlePost.replyto
    },
    isReload () {
      return this.$store.state.reloadTrigger
    }
  },
  watch: {
    '$route' (to, from) {
      this.singlePostLoad(this.$route.params.id)
      this.replyPostsLoad(this.$route.params.id)
    },
    parentId: function() {
      if (this.singlePost.replyto) {
        this.parentPostLoad(this.singlePost.replyto)
      }
    },
    isReload: function() {
      this.replyPostsLoad(this.$route.params.id)
    }
  },
  created: function() {
    this.singlePostLoad(this.$route.params.id)
    this.replyPostsLoad(this.$route.params.id)
  },
}
</script>

<style scoped>
.media-content {
  word-wrap: break-word;
  line-height: 1.8;
  font-size: 1.05rem;
  color: rgba(0,0,0,.80);
}

.media-content small {
  color: rgba(0,0,0,.6);
}

.media:nth-last-of-type(1) {
  margin-bottom: 1rem;
}


i {
  margin: auto;
}
</style>
