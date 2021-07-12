<template>

  <div style="width:100%;height:100%">
    <el-row class="borderDiv" style="padding:15px;height:9%">
      <el-col :span="1">
        <icon src="back.svg" hover="backh.svg" href="/home" />
      </el-col>
      <el-col :span="1" :offset="22">
        <icon src="head.svg" href="/home" />
      </el-col>
    </el-row>

    <el-row class="borderDiv" style="width:100%;min-height:91%">
      <el-col :span="9" :offset="6" class="el-wrapper" style="height:100%;overflow:auto;">>
        <video-player style="margin-top:15%" class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
          :options="playerOptions" />
        <el-col :span="18" :offset="3">
          <p>
            I define ghosts as human’s contradictory exploration of the unknown, which is stim-lated by our curiosity
            and limited by our fears.
          </p>
          <p>
            This exploration and the development of technology promote each other. The increase of technology makes it
            easier to explore and visualize the unknown. On the one hand, because machine vision restores the original
            appearances of things (such as adapting the dark environment by cameras and correcting the distorted
            images), we can obvi-ously eliminate parts of fears of the unknown in terms of vision and perception. On the
            other hand, technology extends human’s vision. As a result, invisible objects that arouse our curiosity are
            greatly reduced. Therefore technology is to some extent elimi-nating the existing ghosts.
          </p>
          <p>
            During this course, however, are there any unprecedented ghosts transferred to tech-nology? What kind of
            unknowns can technology produce?
          </p>
          <br>
          <p>
            我将幽灵定义为人类对未知的矛盾性探索。这种探索被我们的好奇心所激发并被我们的恐惧所限制，并且跟技术的发展相互促进。技术使得我们更加容易去探索和可视化未知的存在。更具体地说，一方面因为更加先进的机器视觉对事物原貌的还原（比如说对相机昏暗环境的补光，对被人眼所扭曲的图像的矫正），我们可以在观感和认知上明显消除对未知的部分恐惧；另一方面，因为技术扩展了人眼可视的范围，能引起我们好奇的不可见物也大大减少。所以技术在一定程度上在消减已有的幽灵。但是，在这一过程中，是否有新的幽灵转移到了技术上？技术能产生什么样的与以往不同的未知呢？
          </p>
        </el-col>
      </el-col>
      <el-col :span="2" :offset="7">
        <el-row class="tab">
          <el-col :span="16" :offset="4">
            <img src="../assets/icon/n0h.svg" />
          </el-col>
        </el-row>
        <el-row class="tab">
          <el-col :span="16" :offset="4">
            <router-link to="/video1"><img src="../assets/icon/n1.svg" /></router-link>
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
      </el-col>

    </el-row>

  </div>
</template>

<script>
  import icon from '@/components/icon'
  import {
    videoPlayer
  } from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  export default {
    components: {
      icon,
      videoPlayer
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
            src: '/static/video/n0.mp4' // url地址
          }],
          poster: '/static/video/n0-bg.PNG', // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
          }
        }
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
  }

  p {
    font-size: x-small;
    color: #ddd;
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
