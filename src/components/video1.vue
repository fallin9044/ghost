<template>

  <div style="width:100%;height:100%">
    <el-row class="borderDiv" style="padding:19px;height:9%">
      <el-col :span="1">
        <icon src="back.svg" hover="backh.svg" href="/home" />
      </el-col>
      <el-col :span="2" :offset="21">
        <log></log>
      </el-col>
    </el-row>

    <el-row class="borderDiv" style="width:100%;height:91%">
      <el-col :span="22" class="el-wrapper" style="height:100%;overflow:auto;">
        <img src="/static/img/n1-word.svg" style="margin-top:-10%" />
        <el-col :span="10" :offset="7">
          <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
            :options="playerOptions" />
          <el-col :span="8" :offset="8" style="padding-top:20px;padding-bottom:20px">
            <a href="javascript:void(0)"><img @click="showUpload" src="/static/img/uploadAnswer.svg" /></a>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="2" style="height:100%">
        <el-row class="tab">
          <el-col :span="16" :offset="4">
            <router-link to="/video"><img src="../assets/icon/n0.svg" /></router-link>
          </el-col>
        </el-row>
        <el-row class="tab">
          <el-col :span="16" :offset="4">
            <img src="../assets/icon/n1h.svg" />
          </el-col>
        </el-row>
        <el-row class="tab">
          <el-col :span="16" :offset="4">
            <router-link to="/video2"><img src="../assets/icon/n2.svg" /></router-link>
          </el-col>
        </el-row>
        <el-row class="tab">
          <el-col :span="16" :offset="4">
            <router-link to="/video3"><img src="../assets/icon/n3.svg" /></router-link>
          </el-col>
        </el-row>
        <el-row class="tab">
          <el-col :span="16" :offset="4">
            <router-link to="/video4"><img src="../assets/icon/n4.svg" /></router-link>
          </el-col>
        </el-row>
        <el-row class="tab" style="height:62%">
          <el-col :span="22" :offset="2" style="height:100%">
            <router-link to="/answer1"><VideoBg :sources="['/static/video/check_answer.mp4']" ></VideoBg></router-link>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
    <el-col :span="10" :offset="7" v-show="isShowUpload" style="position:absolute;left:0px;top:30%;z-index:2">
      <upload @close="hidenUpload" video="v1"></upload>
    </el-col>

  </div>
</template>

<script>
  import icon from '@/components/icon'
  import upload from '@/components/upload'
  import VideoBg from '@/components/VideoBg'
  import {
    videoPlayer
  } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  import log from '@/components/log'

  export default {
    components: {
      icon,
      videoPlayer,
      upload,
      log,
      VideoBg
    },
    name: 'HelloWorld',

    data() {
      return {
        playerOptions: {
          playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
          autoplay: false, // 如果为true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 是否视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4", // 类型
            src: '/static/video/n1.mp4' // url地址
          }],
          poster: '/static/video/n1-bg.PNG', // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
          }
        },
        isShowUpload: false

      }
    },
    methods: {
      showUpload() {
        this.$api.me().then(res =>{
          if(res.result == -1) this.$store.commit('show');
          else this.isShowUpload = true;
        })
      },
      hidenUpload() {
        this.isShowUpload = false;
      },
      login() {
        this.$store.commit('show');
      },
      logout(){
        this.$api.get("logout")
        this.$store.commit('setLogin', false);
      }

    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .borderDiv {
    background-color: black;
    border-width: 3px;
    border-color: white;
    border-style: solid;
    border-radius: 10px;
    box-sizing: border-box;
    border-top: unset;
  }

  .tab {
    margin-top: -3px;
    margin-right: -3px;
    padding-top: 6%;
    padding-bottom: 4%;
    border-width: 3px;
    border-color: white;
    border-style: solid;
    border-radius: 10px;
    box-sizing: border-box;
    height: 8%;
  }

  .el-wrapper::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*宽度竖滚动条的尺寸*/
    height: 5px;
    /*高度横滚动条的尺寸*/
  }

  .el-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面的条*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #6b797e;
  }

  .el-wrapper::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 5px;
    background: #ffffff;
  }

</style>
