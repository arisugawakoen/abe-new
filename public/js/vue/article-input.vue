<template>
<div style="margin-bottom: 1rem;">
  <textarea class="textarea" v-model="message"></textarea>

  <div class="notification" style="margin-bottom: 0;" v-if="statIconButton">
    <article class="media">
      <figure class="media-left">
        <div class="button" :style="selectedColor">
          <span class="icon" @click="iconInit">
            <i class="fa fa-inverse" :class="selectedIcon"></i>
          </span>
        </div>
      </figure>
      <div class="media-content">
        <p class="control">
          <template v-for="icolor in colors">
            <div style="display: inline-block;
             width: 20px; height: 20px; margin-right: 8px;"
             :style="icolor" :title="icolor.backgroundColor"
             @click="pickColor(icolor)"></div>
          </template>
        </p>
        <p class="control">
          <span v-for="icon in icons" class="icon" style="margin-right: 8px;">
            <i class="fa" :class="icon" @click="pickIcon(icon)"></i>
          </span>
        </p>
      </div>
      <div class="media-right">
        <button class="delete" @click="toggleIconButton"></button>
      </div>
    </article>
  </div>
  <button v-else
   class="button is-success is-fullwidth"
   @click="toggleIconButton">
    <i class="fa fa-id-badge fa-inverse"></i>
  </button>

  <button class="button is-danger is-fullwidth"
   :class="isTextareaEmpty"
   @click="postMessage">
    <i class="fa fa-comment fa-inverse"></i>
  </button>
</div>
</template>

<script>
const axios = require('axios')

export default {
  props: ['replyid'],
  data: function() {
    return {
      message: '',
      colors: [
        { backgroundColor: "red" },
        { backgroundColor: "orange" },
        { backgroundColor: "yellow" },
        { backgroundColor: "olive" },
        { backgroundColor: "green" },
        { backgroundColor: "teal" },
        { backgroundColor: "blue"},
        { backgroundColor: "violet"},
        { backgroundColor: "purple"},
        { backgroundColor: "brown"},
        { backgroundColor: "grey"},
        { backgroundColor: "black"},
        { backgroundColor: "tomato"},
        { backgroundColor: "navy"},
        { backgroundColor: "plum"},
        { backgroundColor: "maroon"},
        { backgroundColor: "khaki"},
        { backgroundColor: "indigo"},
        { backgroundColor: "gray"},
        { backgroundColor: "sienna"},
        { backgroundColor: "tan"},
        { backgroundColor: "crimson"},
        { backgroundColor: "coral"},
      ],
      icons: [
        "fa-user", "fa-male", "fa-female", "fa-vcard", "fa-address-book",
        "fa-bullhorn", "fa-bug", "fa-child", "fa-heart", "fa-street-view",
        "fa-id-badge", "fa-car", "fa-bomb", "fa-tag", "fa-cube",
        "fa-envelope", "fa-hourglass", "fa-plane", "fa-puzzle-piece",
        "fa-bath", "fa-shower", "fa-handshake-o", "fa-archive", "fa-bank",
        "fa-bicycle", "fa-bus", "fa-camera", "fa-camera-retro", "fa-book",
        "fa-desktop", "fa-gavel", "fa-gamepad", "fa-paw", "fa-star",
        "fa-question", "fa-tty", "fa-tree", "fa-terminal", "fa-wrench",
        "fa-train", "fa-ship", "fa-subway", "fa-spinner fa-spin",
        "fa-cog fa-spin", "fa-refresh fa-spin", "fa-circle-o-notch fa-spin",
        "fa-youtube-play", "fa-wikipedia-w", "fa-twitch", "fa-github",
        "fa-amazon", "fa-apple", "fa-google", "fa-globe", "fa-tv",
        "fa-send"
      ],
      selectedColor: {},
      selectedIcon: "",
      statIconButton: false
    }
  },
  computed: {
    isTextareaEmpty: function() {
      return {
        'is-disabled': !this.message
      }
    }
  },
  methods: {
    postMessage: function() {
      if(this.message.length) {
        this.articlePost(
          this.message,
          this.selectedColor.backgroundColor,
          this.selectedIcon,
          this.replyid
        )
        this.message = ''
        this.iconInit()
      }
    },
    pickColor: function(color) {
      this.selectedColor = color
    },
    pickIcon: function(icon) {
      this.selectedIcon = icon
    },
    iconInit: function() {
      this.selectedColor = { backgroundColor: "tomato" }
      this.selectedIcon = ""
    },
    toggleIconButton: function() {
      this.statIconButton = !this.statIconButton
    },
    articlePost: function(text, color, icon, reply) {
      let replyto
      const re = /\d+/
      self = this

      replyto = re.test(reply) ? reply : null

      axios.post('./index.json', {
        text: text,
        color: color,
        icon: icon,
        replyto: replyto
      }).then(function() {
        self.$store.dispatch('reload')
      })
    },
  },
  created: function() {
    this.iconInit()
  }
}
</script>

<style scoped>
i {
  margin: auto;
}

</style>
