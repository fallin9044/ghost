<template>
  <div class="bg">
        <div class="saba"></div>
    <el-row style="height:15%">
      <el-col :span="2">
        <a href="javascript:void(0)" ><img  @click="close" width="80%" style="margin-top:10%;margin-left:10%" src="/static/img/close.svg" /></a>
      </el-col>
    </el-row>
    <el-row style="margin-top:10%;padding-bottom:10%">
      <el-col :span="10" :offset="7">
        <el-input class="input" v-model="username" placeholder="YOUR ACCOUNT" maxlength="20" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></el-input>
        <el-input class="input" v-model="password" placeholder="YOUR PASSWORD" show-password maxlength="20" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></el-input>
        <el-input class="input" v-model="password2" placeholder="YOUR PASSWORD AGAIN" show-password maxlength="20" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></el-input>

        <a href="javascript:void(0)" ><img style="margin-top:15px" :src="b" @mouseover="changeRe(registryAf)" @click="register"
            @mouseout="changeRe(regis)" /></a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        username: '',
        password: '',
        password2: '',
        loginButton: '',
        regis: require("../assets/icon/registryBe.svg"),
        b: require("../assets/icon/registryBe.svg"),
        registryAf: require("../assets/icon/registryAf.svg"),
      }
    },
    methods: {
      changeRe(str) {
        this.b = str
      },
      close ()  {
        this.$emit('close');
      },
      register() {
        if (this.password !== this.password2) {
          alert("your password doesn't match.")
          return;
        }
        var regex = '/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/'
        if (regex.test) {
          
        }
        let param = new FormData();
        param.append('username',this.username)
        param.append('password',this.password)
        this.$api.post("register", param)
        .then(res =>{
          alert("login successfully")
          this.$emit('close');
        })
        .catch(res=>{
          alert("login failed")
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    background-image: url("/static/img/login-bg.png");
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
    left:0px;
    top:0px;  
    background-color: rgb(202, 197, 197);
    opacity: 0.5;
  }

</style>
