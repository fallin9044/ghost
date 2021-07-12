import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import video from '@/components/video'
import video1 from '@/components/video1'
import video2 from '@/components/video2'
import video3 from '@/components/video3'
import video4 from '@/components/video4'
import login from '@/components/login'
import answer1 from '@/components/answer1'
import answer2 from '@/components/answer2'
import answer3 from '@/components/answer3'
import answer4 from '@/components/answer4'
import comment from '@/components/comment'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/video1',
      name: 'video1',
      component: video1
    },
    {
      path: '/video2',
      name: 'video2',
      component: video2
    },
    {
      path: '/video3',
      name: 'video3',
      component: video3
    },
    {
      path: '/video4',
      name: 'video4',
      component: video4
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/answer1',
      name: 'answer1',
      component: answer1
    },
    {
      path: '/answer2',
      name: 'answer2',
      component: answer2
    },
    {
      path: '/answer3',
      name: 'answer3',
      component: answer3
    },
    {
      path: '/answer4',
      name: 'answer4',
      component: answer4
    },
    {
      path: '/comment',
      name: 'comment',
      component: comment
    }
  ]
})
