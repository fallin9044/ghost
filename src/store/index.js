import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
    state: {
      isShowLogin: false,
      isShowRegister: false,
      isLogin:false
    },
    mutations: {
      show (state) {
        state.isShowLogin = true;
      },
      hide (state) {
        state.isShowLogin = false;
      },
      showR (state) {
        state.isShowRegister = true;
      },
      hideR (state) {
        state.isShowRegister = false;
      },
      setLogin(state, login) {
        state.isLogin = login
      }
    }
  })
