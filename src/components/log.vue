<template>
  <div>
            <a v-if="!$store.state.isLogin" href="javascript:void(0)" @click="login"><p class="top">Sign In</p></a>
        <a v-else href="javascript:void(0)" @click="logout"><p class="top">Sign Out</p></a>
  </div>
</template>

<script> 
export default {
  name: 'log',
  data () {
    return {
    }
  },
  methods: {
          login() {
        this.$store.commit('show');
      },
      logout(){
        this.$api.get("logout")
        this.$store.commit('setLogin', false);
        this.$router.go(0);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top {
    font-size: x-large;
    font-weight: 570;
    color: #ffffff;
    -webkit-transition: all .5s; 
    -moz-transition: all .5s; 
    -ms-transition: all .5s; 
    -o-transition: all .5s; 
    transition: all .5s;
    margin-top: 7%;
    margin-left: 27%;
  }

  .top:hover {
    color: #afaaaa;
  }
</style>
