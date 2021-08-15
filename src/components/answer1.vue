<template>

  <div style="width:100%;height:100%;z-index:3;">
    <el-row class="borderDiv" style="padding:19px;height:9%">
      <el-col :span="1">
        <icon src="back.svg" hover="backh.svg" href="/video1" />
      </el-col>
      <el-col :span="2" :offset="21">
        <log></log>
      </el-col>
    </el-row>

    <el-row class="borderDiv" style="width:100%;height:91%">


      <el-col :span="6" style="height:100%">
        <el-row class="tab_left" style="height:35%">
          <el-col :span="22" :offset="1" style="height:100%">
            <VideoBg :sources="['/static/video/n1.mp4']" ></VideoBg>
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

        <paint ref="paint" style="height:92%;width:100%" :answers="answers" @checkComment="showComment"></paint>
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
            <img src="../assets/icon/n1h.svg" />
          </el-col>
        </el-row>
        <el-row class="tab" style="height:8%">
          <el-col :span="16" :offset="4">
            <router-link to="/answer2"><img src="../assets/icon/n2.svg" /></router-link>
          </el-col>
        </el-row>
        <el-row class="tab" style="height:8%">
          <el-col :span="16" :offset="4">
            <router-link to="/answer3"><img src="../assets/icon/n3.svg" /></router-link>
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
        answers : [],
        answer: null,
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
      this.$api.get("getAnswer?video=v1").then(res=>{
        if (res.result == -1) {
            this.$router.push('/video1')
            return
        }
        for(let a of res.data) {
          a.picture = this.$api.globalPath + "/v1/" + a.username + "/picture.jpg"
          a.reasonPic = []
          for(let i=1;i<=a.reasons;i++){
            a.reasonPic.push(this.$api.globalPath + "/v1/" + a.username + `/reason${i}.jpg`);
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
