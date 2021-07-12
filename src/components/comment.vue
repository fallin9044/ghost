<template>
  <div class="bg">
    <div class="saba" @click="close"></div>
    <el-row style="height:100%">
      <el-col :span="15" style="height:100%">
        <el-row style="height:14%">
          <el-col :span="2">
            <p>{{answer.username}}</p>
          </el-col>
        </el-row>
        <el-row style="height:20%;margin-top:7%">
          <el-col :span="8" :offset="8" style="height:100%">
            <img style="height:100%;width:100%" :src="answer.picture" />
          </el-col>
        </el-row>
        <el-row style="height:15%;margin-top:7%">
          <template v-for="(pic,i) in answer.answerPic">
            <el-col v-bind:key="i" :span="5" :offset="1" style="height:100%">
              <img style="height:100%;width:100%" :src="pic" />
            </el-col>
          </template>
        </el-row>
        <el-row style="height:16%;margin-top:7%">
          <el-col :span="5" :offset="1" style="height:100%">
            <p>{{answer.description}}</p>
          </el-col>
        </el-row>
        <el-row style="height:15%;margin-top:1%">
          <el-col :span="2" :offset="1" style="height:100%">
            <a href="javascript:void(0)"><img  width="80%" style="margin-top:10%;margin-left:10%" @click="changeGreat"
                ref="great" src="/static/icon/greatb.svg" /></a>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="9">
        <el-row style="margin-top:10%;padding-bottom:10%">
          <el-col :span="10" :offset="7">
            <el-input class="input" v-model="username" placeholder="YOUR ACCOUNT"></el-input>
            <el-input class="input" v-model="password" placeholder="YOUR PASSWORD" show-password></el-input>

            <a href="javascript:void(0)"><img style="margin-top:10px" :src="a" @mouseover="changeLogin(loginAfter)"
                @mouseout="changeLogin(login)" /></a>
            <a href="javascript:void(0)"><img style="margin-top:5px" :src="b" @mouseover="changeRe(registryAf)"
                @mouseout="changeRe(regis)" /></a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'HelloWorld',
    props: {
      answer: Object
    },
    data() {
      return {
        username: '',
        password: '',
        isGreat: false,
        comments: []
      }
    },
    methods: {
      changeGreat() {
        
      },
      changeRe(str) {
        this.b = str
      },
      close() {
        this.$emit('close');
      }

    },
    watch: {
      isGreat: {
        handler(n, o) {
          this.$refs.great.src = n ? "/static/icon/greatb.svg" : "/static/icon/greate.svg";
        }
      }
    },
    mounted (){
      this.$api.get("isGreat",{username:this.$api.user,answerId:this.answer.id}).then(res=>{
        if (res.data.isGreat) {
          this.isGreat = true;
        }
        this.isGreat = false;
      })
      this.$api.get(`comments`,{answerId:this.answer.id}).then(res=>{
        this.comments = res.data;
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    background-image: url("/static/img/comment-bg.svg");
    background-size: cover;
    height: 100%;
  }

  .input {
    margin-top: 5%;
    border-width: 3px;
    border-color: rgb(0, 0, 0);
    border-style: solid;
    border-radius: 7px;
  }

  .saba {
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color: rgb(202, 197, 197);
    opacity: 0.5;
  }

</style>
