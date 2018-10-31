import Vue from "vue";
import Router from "vue-router";
// import Home from '@/page/home'
// import Page2 from '@/page/home2'
// import Game from '@/page/game'
// import Jigsaw from '@/page/Jigsaw'
// import lastPage from '@/page/lastPage'
// import Ready from '../components/ready.vue'
import firstPage from "@/page/firstPage.vue";
import selectType from "@/page/selectType.vue";
import playGame  from  "@/page/playGame.vue";
import result  from  "@/page/result.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'firstPage',
      component: firstPage,
    },

    {
      path: '/selectType',
      name: 'selectType',
      component: selectType
    },
    {
      path:'/playGame/:type',
      name:'playGame',
      component:playGame
    },

    {
      path:'/result/:type/:score',
      name:'result',
      component: result
    }
  ]
})
