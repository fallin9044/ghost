<template>

  <div style="width:100%;height:100%;z-index:3;">
    <el-row class="borderDiv" style="padding:19px;height:9%">
      <el-col :span="1">
        <icon src="back.svg" hover="backh.svg" href="/video3" />
      </el-col>
      <el-col :span="2" :offset="21">
        <log></log>
      </el-col>
    </el-row>

    <el-row class="borderDiv" style="width:100%;height:91%">


      <el-col :span="6" style="height:100%">
        <el-row class="tab_left" style="height:35%">
          <el-col :span="22" :offset="1" style="height:100%">
            <VideoBg :sources="['/static/video/n3.mp4']" ></VideoBg>
          </el-col>
        </el-row>
        <el-row class="tab_left" style="height:31%">
          <el-col :span="22" :offset="1" style="height:100%">
            <VideoBg :sources="['/static/video/tianping.mp4']" ></VideoBg>
          </el-col>
        </el-row>
        <el-row class="tab_left" style="height:35%">
          <el-col :span="22" :offset="1">
            <img src="/static/img/wordleft.svg">
          </el-col>
        </el-row>
      </el-col>


      <el-col :span="16" class="el-wrapper" style="height:100%;background-color:white">

        <paint ref="paint" style="height:92%;width:100%" :answers="answers"></paint>
        <el-row style="height:8%;width:100%" class="borderDiv">
          <el-col :span="8" :offset="8" style="margin-top:1%">
          <ticon src="findAnswer.svg" hover="findAnswerEnd.svg"  @method="findAnswer"></ticon>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2" style="height:100%">
        <el-row class="tab" style="height:8%">
          <el-col :span="16" :offset="4">
           <router-link to="/video"><img src="../assets/icon/n0.svg" /></router-link>
          </el-col>
        </el-row>
        <el-row class="tab" style="height:8%">
          <el-col :span="16" :offset="4">
           <router-link to="/answer1"><img src="../assets/icon/n1.svg" /></router-link>
          </el-col>
        </el-row>
        <el-row class="tab" style="height:8%">
          <el-col :span="16" :offset="4">
            <router-link to="/answer2"><img src="../assets/icon/n2.svg" /></router-link>
          </el-col>
        </el-row>
        <el-row class="tab" style="height:8%">
          <el-col :span="16" :offset="4">
            <img src="../assets/icon/n3h.svg" />
          </el-col>
        </el-row>
        <el-row class="tab" style="height:8%">
          <el-col :span="16" :offset="4">
            <router-link to="/answer4"><img src="../assets/icon/n4.svg" /></router-link>
          </el-col>
        </el-row>
        <el-row class="tab" style="height:62%">
          <el-col :span="12" :offset="6" style="margin-top:30px">
            <a href="#"><img src="../assets/icon/ins.svg" /></a>
          </el-col>
          <el-col :span="12" :offset="6" style="margin-top:30px">
            <a href="#"><img src="../assets/icon/email.svg" /></a>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
    <el-col :span="12" :offset="6" v-show="isShowComment" v-if="answer != null" style="position:absolute;left:0px;top:25%;height:49.2%;z-index:2">
      <comment @close="hidenComment" :answer="answer"></comment>
    </el-col> 
  </div>
</template>

<script>
  import icon from '@/components/icon'
    import ticon from '@/components/ticon'
  import login from '@/components/login'
  import paint from '@/components/paint'
  import comment from '@/components/comment'
  import VideoBg from '@/components/VideoBg2'
import log from '@/components/log.vue'

  export default {
    components: {
      icon,ticon,
      login,
      paint,
      comment,
    VideoBg,
        log},
    name: 'HelloWorld',

    data() {
      return {
        playerOptions: {
          playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
          autoplay: true, // 如果为true,浏览器准备好时开始回放。
          muted: true, // 默认情况下将会消除任何音频。
          loop: false, // 是否视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4", // 类型
            src: '/static/video/n3.mp4' // url地址
          }],
          poster: '/static/video/n3-bg.PNG', // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
          }
        },
        tpOptions: {
          autoplay: true, // 如果为true,浏览器准备好时开始回放。
          muted: true, // 默认情况下将会消除任何音频。
          loop: true, // 是否视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4", // 类型
            src: '/static/video/tianping.mp4' // url地址
          }],
          //poster: '/static/video/n1-bg.PNG', // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: false, // 当前时间和持续时间的分隔符
            durationDisplay: false, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: false // 是否显示全屏按钮
          }
        },
        answers : [],
        isShowComment:false
      }
    },
    methods: {
      findAnswer() {
          this.$refs.paint.setTarget();
      },
      hidenComment(){
          this.isShowComment = false
      },
      showComment(index){
        this.answer = this.answers[index]
        this.isShowComment = true
      }

    },
    mounted () {
      this.$api.get("getAnswer?video=v3").then(res=>{
        if (res.result == -1) {
            this.$router.push('/video3')
            return
        }
        for(let a of res.data) {
          a.picture = this.$api.globalPath + "/v3/" + a.username + "/picture.jpg"
          a.reasonPic = []
          for(let i=1;i<=a.reasons;i++){
            a.reasonPic.push(this.$api.globalPath + "/v4/" + a.username + `/reason${i}.jpg`);
          }
          a.x = (Math.random() - 0.5) * 1000;
          a.y = (Math.random() - 0.5) * 1000;
        }
        this.answers = res.data
      })
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

  .tab_left {
    margin-top: -3px;
    margin-left: -3px;
    padding-top: 6%;
    padding-bottom: 4%;
    border-width: 3px;
    border-color: white;
    border-style: solid;
    border-radius: 10px;
    box-sizing: border-box;
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
