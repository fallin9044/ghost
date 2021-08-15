<template>
  <section class="VideoBg2" style="height:100%">
    <video autoplay loop muted ref="video" style="width:100%">
      <source v-for="source in sources" v-bind:key="source" :src="source" :type="getMediaType(source)" style="height:100%">
    </video>
    <div class="VideoBg__content">
      <slot></slot>
    </div>
  </section>
</template>


<script>
  export default {
    props: {
      sources: {
        type: Array,
        required: true
      },
      img: {
        type: String
      }
    },

    data () {
      return {
        videoRatio: null
      }
    },

    mounted () {
      this.setImageUrl()
      this.setContainerHeight()

      if (this.videoCanPlay()) {
        this.$refs.video.oncanplay = () => {
          if (!this.$refs.video) return

          this.videoRatio = this.$refs.video.videoWidth / this.$refs.video.videoHeight
          this.setVideoSize()
          this.$refs.video.style.visibility = 'visible'
        }
      }

      window.addEventListener('resize', this.resize)
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.resize)
    },

    methods: {
      resize () {
        this.setContainerHeight()

        if (this.videoCanPlay()) {
          this.setVideoSize()
        }
      },

      videoCanPlay () {
        return !!this.$refs.video.canPlayType
      },

      setImageUrl () {
        if (this.img) {
          this.$el.style.backgroundImage = `url(${this.img})`
        }
      },

      setContainerHeight () {
        
      },

      setVideoSize () {
        var width, height, containerRatio = this.$el.offsetWidth / this.$el.offsetHeight

        if (containerRatio > this.videoRatio) {
          width = this.$el.offsetWidth
        } else {
          height = this.$el.offsetHeight
        }

        this.$refs.video.style.width = '100%'
        this.$refs.video.style.height = height ? `${height}px` : 'auto'
      },

      getMediaType (src) {
        return 'video/' + src.split('.').pop()
      }
    }
  }
</script>


<style>
  .VideoBg2 {
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  .VideoBg2 video {
    top: 50%;
    left: 50%;

    transform: translate(0%, 0%);
  }

  .VideoBg__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
