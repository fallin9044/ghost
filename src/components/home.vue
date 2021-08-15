<template>
  <div class="hello">
    <VideoBg :sources="['/static/video/homePage.mp4']" >
        <icon style="position:absolute;margin-left:25%;margin-top:25%" src="n0.svg" hover="n0h.svg" href="/video"/>
        <icon style="position:absolute;margin-left:72%;margin-top:25%" src="n1.svg" hover="n1h.svg" href="/video1"/>
        <icon style="position:absolute;margin-left:33%;margin-top:12%" src="n2.svg" hover="n2h.svg" href="/video2"/>
        <icon style="position:absolute;margin-left:60%;margin-top:36%" src="n3.svg" hover="n3h.svg" href="/video3"/>
        <icon style="position:absolute;margin-left:63%;margin-top:12%" src="n4.svg" hover="n4h.svg" href="/video4"/>
        <a href="https://www.instagram.com/niuqr_ruby/?hl=en" target="_blank"><img style="position:absolute;margin-left:44%;margin-top:48%;height:40px" src="../assets/icon/ins.svg" ></a>
        <a href="https://www.instagram.com/niuqr_ruby/?hl=en"><img style="position:absolute;margin-left:52%;margin-top:48%;height:40px" src="../assets/icon/email.svg" /></a>
    </VideoBg>
  </div>
</template>

<script> 
import VideoBg from 'vue-videobg'
import icon from '@/components/icon'
export default {
  components: { VideoBg,icon},
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
icon {
  text-align: unset;
}
</style>
