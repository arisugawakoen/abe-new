<template>
  <article class="media">

    <figure class="media-left">
      <p class="has-text-right" style="font-size: 1rem">
        <strong>
          <router-link :to="'/post/' + id"
           style="color: rgba(0,0,0,.80)">
            {{ id }}
          </router-link>
        </strong>
      </p>
      <router-link :to="'/post/' + id">
        <div class="button" :style="{ backgroundColor: color }">
          <span class="icon">
            <i class="fa fa-inverse" :class="icon"></i>
          </span>
        </div>
      </router-link>
    </figure>

    <div class="media-content">
      <p :style="{ color: bodyColor, fontSize: bodySize }" 
       v-html="nl2br(text)"></p>
      <small>
        <router-link :to="'/post/' + id"
         style="color: rgba(0,0,0,.6);">
          {{ dateQualify(date) }}
        </router-link>
      </small>
    </div>

    <div class="media-right">
      <p style="font-size: 1rem">
        <span v-if="replyto" class="tag is-info">
          <router-link :to="'/post/' + replyto"
           style="color: rgba(255,255,255,.95)">
            Reply to {{ replyto }}
          </router-link>
        </span>
      </p>
    </div>

  </article>
</template>

<script>
const moment = require('moment')

export default {
  props: [
    'id',
    'text',
    'color',
    'icon',
    'date',
    'replyto',
    'bodyColor',
    'bodySize'
  ],
  data: function() {
    return {
    }
  },
  methods: {
    dateQualify: function(date) {
      return moment(date).format('YYYY-MM-DD ddd HH:mm:ss')
    },
    nl2br: function(text) {
      if(text) {
        text = text.replace(
          /((https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+))/gi,
          function (all, url, normal) {
            if (url) {
              var youtubeCheck = /youtu/.test(url)
              var channelCheck = /channel/.test(url)
              var videoId = /[/?=]([-\w]{11})/.exec(url)
              if (youtubeCheck && videoId && !channelCheck) {
                return '<iframe src="https://www.youtube.com/embed/' + videoId[1] + '?rel=0" frameborder="0" allowfullscreen></iframe>'
              } else {
                return '<a href="' + url + '" target="_blank" style="color: rgba(0,0,0,.75);">' + url + '</a>'
              }
            } else {
              return normal;
            }
          }
        )
        text = text.replace(/\n/g, '<br>')
        text = text.replace(/(\*[a-zA-Z0-9]+)/g,
          '<a href="./index.html#/search/$1" style="color: rgba(0,0,0,.75)">$1</a>')
        return text
      }
    },
  }
}

</script>

<style scoped>
.media-content {
  word-wrap: break-word;
  line-height: 1.8;
  font-size: 1rem;
  color: rgba(0,0,0,.87);
}

.media-content small {
  color: rgba(0,0,0,.6);
}

</style>
