<template>
  <div class="selectTypeContainer" v-disabletouchmove>
    <img class="select_bg" :src="selectBg" alt="" @click="imgClick">
    <img class="logo" :src="logoSrc" alt="" @click="imgClick">
    <section class="set_content">
      <img :src="img_btn_1" class="list_img1" v-show="isShow1" @click="click_list1(1)" alt="">
      <img :src="img_btn_2" class="list_img2" v-show="isShow2" @click="click_list1(2)" alt="">
      <img :src="img_btn_3" class="list_img3" v-show="isShow3" @click="click_list1(3)" alt="">
    </section>
        <img :src="clickImg" class="click_img" v-show="isShowClick" alt="">
        <img class="to_start_game" :src="to_start_game" @click="toStartGame" alt="">
  </div>
</template>

<script>
  import allHomeImg from '../config/img';
  export default {
    data(){
      return {
        selectBg: `static/seven/select_bg.jpg`,
        logoSrc: `static/seven/logo.png`,
        img_btn_1: `static/seven/black_01.png`,
        img_btn_2: `static/seven/black_02.png`,
        img_btn_3: `static/seven/black_03.png`,
        to_start_game: `static/seven/start_play.png`,
        isShow1: false,
        isShow2: false,
        isShow3: false,
        clickImg:'',
        isShowClick:false,
        isHideClick:false,
        liftImg:'',
        type:''
      }
    },
    mounted(){
      setTimeout(() => {
        this.isShow1 = true;
      }, 1000);
      setTimeout(() => {
        this.isShow2 = true;
      }, 2000);
      setTimeout(() => {
        this.isShow3 = true;
      }, 3000);
      setTimeout(()=>{
        this.isShowClick = true
          setInterval(()=>{
            this.setTimer();
          },1000)
      },3000);
    },
    methods: {
      setTimer(){
        setInterval(()=>{
          setTimeout(()=>{
            this.clickImg =`static/seven/click.png`;
          },500);
           this.clickImg =`static/seven/lift.png`;
        },1000);

      },
      //选择妆容
      click_list1(index){
        this.isShowClick = false;
        this.type = index;
        if (index == 1) {
          this.img_btn_1 = `static/seven/hover_01.png`;
          this.img_btn_2 = `static/seven/black_02.png`;
          this.img_btn_3 = `static/seven/black_03.png`;
        } else if (index == 2) {
          this.img_btn_1 = `static/seven/black_01.png`;
          this.img_btn_2 = `static/seven/hover_02.png`;
          this.img_btn_3 = `static/seven/black_03.png`;
        } else if (index == 3) {
          this.img_btn_1 = `static/seven/black_01.png`;
          this.img_btn_2 = `static/seven/black_02.png`;
          this.img_btn_3 = `static/seven/hover_03.png`;
        }
      },
      //点击跳转
      toStartGame(){

          if(this.type!=''){

            this.$router.push('/playGame/' + this.type);
          }
      },
      imgClick(e){
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
</script>

<style scoped>
  .selectTypeContainer {
    width: 100%;
    position: relative;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  .select_bg {
    height:100%;
    position: fixed;
    top: 0;
  }

  .logo {
    width: 100%;
    height: 1.3rem;
    position: fixed;
    top: 0;
    left: 0;
  }

  .set_content {
    width: 100%;
    position: absolute;
    top: 4rem;
    /*display: flex;*/
    /*left:1.35rem;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*flex-wrap: wrap;*/
  }

  .set_content > img {
    width: 5.47rem;
  }

  .list_img1 {
    position: absolute;
    top: 0;
    right:1rem;
    animation: sunshineShow1 1s;
  }

  .list_img2 {
    position: absolute;
    top: 2rem;
    right:1rem;
    animation: sunshineShow2 1s;
  }

  .list_img3 {
    position: absolute;
    top: 4rem;
    right:1rem;
    animation: sunshineShow3 1s;
  }

  @keyframes sunshineShow1 {
    0% {
      right: -10rem;
    }
    100% {
      right:1rem;
    }
  }

  @keyframes sunshineShow2 {
    0% {
      right: -10rem;
    }
    100% {
      right:1rem;
    }
  }

  @keyframes sunshineShow3 {
    0% {
      right: -10rem;
    }
    100% {
      right:1rem;
    }
  }

  .to_start_game {
    width: 4.72rem;
    height: 1.77rem;
    position: fixed;
    top: 10.5rem;
    right: 0;
    z-index: 99;
  }

  .click_box{
    position:absolute;
    top:9rem;
    right:0;
  }
  .click_img{
    /*width:1.46rem;*/
    height:1.46rem;
    position:absolute;
    top:9rem;
    right:.5rem;
    border:none;
    animation: fingerHandle 1s ease infinite both;
  }


  @keyframes fingerHandle {
    0% {
      transform: none;
    }
    70% {
      transform: scale3d(.8, .8, .8);
    }
    100% {
      transform: none;
    }
  }

  .lift_img{
    width:1.46rem;
    height:1.46rem;
    position:absolute;
    top:9rem;
    right:.5rem;
    animation: fingerHandle 1s ease infinite both;
  }

  /*@keyframes circleHide {*/
    /*0% {*/
      /*opacity: 0;*/
      /*transform: scale3d(0, 0, 0);*/
    /*}*/
    /*70% {*/
      /*opacity: 1;*/
      /*transform: scale3d(1.2, 1.2, 1.2);*/
    /*}*/
    /*100% {*/
      /*opacity: 0;*/
      /*transform: scale3d(0, 0, 0);*/
    /*}*/
  /*}*/


  /*.headInfoImg {*/
  /*width: 100%;*/
  /*padding-top: 2.8rem;*/
  /*text-align: left;*/
  /*font-size: 0;*/
  /*height: 5rem;*/
  /*}*/

  /*.headInfoImg .first_img {*/
  /*width: 5.6rem;*/
  /*position: absolute;*/
  /*top: 3rem;*/
  /*left: 1rem;*/
  /*}*/

  /*.headInfoImg .second_img {*/
  /*width: 5.6rem;*/
  /*display: block;*/
  /*left: 1rem;*/
  /*position: absolute;*/
  /*top: 3.6rem;*/

  /*}*/

  /*.headInfoImg .third_img {*/
  /*width: 5.6rem;*/
  /*position: absolute;*/
  /*top: 4.2rem;*/
  /*left: 1rem;*/
  /*}*/

  /*.home2_btn_box {*/
  /*width: 100%;*/
  /*height: 1.15rem;*/
  /*text-align: center;*/
  /*position: absolute;*/
  /*top: 5.2rem;*/
  /*left: 0;*/
  /*animation: flash_btn 1s;*/
  /*}*/

  /*.home2_btn_box img {*/
  /*width: 5.5rem;*/
  /*height: 1.05rem;*/

  /*}*/

  /*!*进入动画按钮*!*/
  /*@keyframes toShowBtn {*/
  /*0% {*/
  /*left: -3rem;*/
  /*}*/
  /*100% {*/
  /*left: 0;*/
  /*}*/
  /*}*/

  /*!*进入动画*!*/
  /*@keyframes toShow {*/
  /*0% {*/
  /*left: -3rem;*/
  /*}*/
  /*100% {*/
  /*left: 1rem;*/
  /*}*/
  /*}*/

  /*.home2_btn_box img {*/
  /*width: 5.5rem;*/
  /*height: 1.15rem;*/
  /*}*/

  /*!*人物头像*!*/
  /*.head_img {*/
  /*width: 100%;*/
  /*text-align: center;*/
  /*!*height:4.40rem;*!*/
  /*position: absolute;*/
  /*top: 9rem;*/
  /*right: 0;*/
  /*}*/

  /*.head_img img {*/
  /*width: 4.2rem;*/
  /*height: 4.08rem;*/
  /*}*/

  /*@keyframes toshowUp {*/
  /*0% {*/
  /*right: -8rem;*/
  /*}*/
  /*100% {*/
  /*right: 0;*/
  /*}*/
  /*}*/

  /*!*？？？动画*!*/
  /*.bottomQuestion {*/
  /*width: 1.75rem;*/
  /*height: 1.25rem;*/
  /*position: absolute;*/
  /*top: 9rem;*/
  /*left: 1.5rem;*/
  /*animation: flash 2s infinite;*/
  /*}*/

  /*@keyframes sunshine_show_left {*/
  /*0% {*/
  /*transform: scale(2);*/
  /*-moz-transform: scale(-1, -1);*/
  /*-webkit-transform: scale(-1, -1);*/
  /*-o-transform: scale(-1, -1);*/
  /*}*/
  /*100% {*/
  /*transform: scale(.8);*/
  /*-moz-transform: scale(1, 1);*/
  /*-webkit-transform: scale(1, 1);*/
  /*-o-transform: scale(1, 1);*/
  /*}*/
  /*}*/

  /*!*平移动画*!*/
  /*@keyframes translateAction {*/
  /*0% {*/
  /*left: -4rem;*/
  /*}*/
  /*100% {*/
  /*left: 1.5rem;*/
  /*}*/
  /*}*/

  /*!*右边条动画*!*/
  /*.bottomRight {*/
  /*width: 3.34rem;*/
  /*position: absolute;*/
  /*top: 9rem;*/
  /*right: 0.1rem;*/
  /*animation: flash 2s infinite;*/
  /*}*/

  /*@keyframes home1Ac {*/
  /*0% {*/
  /*transform: scale(.8);*/
  /*}*/
  /*50% {*/
  /*transform: scale(1);*/
  /*}*/
  /*100% {*/
  /*transform: scale(.8);*/
  /*}*/
  /*}*/

  /*!*闪烁1*!*/
  /*@-webkit-keyframes flash_btn {*/
  /*0% {*/
  /*opacity: .3;*/
  /*}*/
  /*100% {*/
  /*opacity: 1;*/
  /*}*/
  /*}*/

  /*@-moz-keyframes flash_btn {*/
  /*0% {*/
  /*opacity: .3;*/
  /*}*/
  /*100% {*/
  /*opacity: 1;*/
  /*}*/
  /*}*/

  /*@-ms-keyframes flash_btn {*/
  /*0% {*/
  /*opacity: .3;*/
  /*}*/
  /*100% {*/
  /*opacity: 1;*/
  /*}*/
  /*}*/

  /*@keyframes flash_btn {*/
  /*0% {*/
  /*opacity: .3;*/
  /*}*/
  /*100% {*/
  /*opacity: 1;*/
  /*}*/
  /*}*/

  /*!*闪烁*!*/

  /*@-webkit-keyframes flash {*/
  /*0%, 50%, 100% {*/
  /*opacity: 1;*/
  /*}*/
  /*25%, 75% {*/
  /*opacity: 0.3;*/
  /*}*/
  /*}*/

  /*@-moz-keyframes flash {*/
  /*0%, 50%, 100% {*/
  /*opacity: 1;*/
  /*}*/
  /*25%, 75% {*/
  /*opacity: 0.3;*/
  /*}*/
  /*}*/

  /*@-ms-keyframes flash {*/
  /*0%, 50%, 100% {*/
  /*opacity: 1;*/
  /*}*/
  /*25%, 75% {*/
  /*opacity: 0.3;*/
  /*}*/
  /*}*/

  /*@keyframes flash {*/
  /*0%, 50%, 100% {*/
  /*opacity: 1;*/
  /*}*/
  /*25%, 75% {*/
  /*opacity: 0.3;*/
  /*}*/
  /*}*/

  /*.toNextShow {*/
  /*width: 100%;*/
  /*height: 1.49rem;*/
  /*}*/

  /*.toNextShow img {*/
  /*width: 5.3rem;*/
  /*height: 1.49rem;*/
  /*position: absolute;*/
  /*top: 6rem;*/
  /*left: 1.1rem;*/
  /*}*/

  /*.selectPlayBox {*/
  /*position: absolute;*/
  /*top: 6rem;*/
  /*left: 1rem;*/
  /*text-align: center;*/
  /*width: 5.5rem;*/
  /*display: flex;*/
  /*-webkit-justify-content: space-around;*/
  /*justify-content: space-around;*/
  /*}*/

  /*!*开起游戏*!*/
  /*.selectPalyGame1 {*/
  /*width: 1.53rem;*/
  /*height: 1.49rem;*/
  /*}*/

  /*.selectPalyGame2 {*/
  /*width: 1.53rem;*/
  /*height: 1.49rem;*/
  /*}*/

  /*.selectPalyGame3 {*/
  /*width: 1.53rem;*/
  /*height: 1.49rem;*/
  /*}*/
</style>
