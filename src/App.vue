<template>
  <div id="app" style="height:100%;position:absolute;width:100%;z-index:1">
    <router-view style="z-index:1" />
    <el-col :span="10" :offset="7" v-show="isShowLogin" style="position:absolute;left:0px;top:30%;z-index:2">
      <login @close="hidenLogin" @register="showRegister" video="v1"></login>
    </el-col> 
    <el-col :span="10" :offset="7" v-show="isShowRegister" style="position:absolute;left:0px;top:30%;z-index:2">
      <register @close="hidenRegister" video="v1"></register>
    </el-col> 
  </div>

</template>

<script>
  import login from '@/components/login'
  import register from '@/components/register'
  export default {
    components: {
      login,register
    },
    name: 'App',
    data() {
      return {
      }
    },
    methods: {
      hidenLogin() {
          this.$store.commit('hide')
      },
      showRegister() {
          this.$store.commit('hide')
          this.$store.commit('showR')
      },
      hidenRegister() {
          this.$store.commit('hideR')
      }
    },
    computed: {
      isShowLogin () {
        return this.$store.state.isShowLogin
      },
      isShowRegister() {
        return this.$store.state.isShowRegister
      }
    },
    mounted () {
      this.$api.me().then(res =>{
          if(res.result == 0) this.$store.commit('setLogin', true);
        })
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  body {
    margin: 0px
  }

  img {
    -webkit-user-drag: none;
  }

a {text-decoration:none ;}
</style>
