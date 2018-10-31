<template>
  <div class="firstPage" v-disabletouchmove>
    <img class="firstBg" :src="homeImg" alt="" @click="imgClick">
    <div class="active_bg_btn" @click="active_bg_btn"></div>
    <section class="btn_box" @click="goPlayGame">
      <img class="goImgBtn" :src="go_img" alt="">
    </section>
    <div class="info_alert" v-show="isShowAlert">
      <div class="info_content">
        <img class="alert_img_bg" :src="alert_img" alt="">
        <div class="know_btn" @click="close_alert"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import allHomeImg from '../config/img';
  import load from '../components/load';
  export default {
    data (){
      return {
        homeImg: `static/seven/active_bg.jpg`,
        go_img: `static/seven/go.png`,
        alert_img:`static/seven/active_alert.png`,
        isShowAlert:false
      }
    },
    methods: {
      active_bg_btn(){
          this.isShowAlert = true;
      },
      close_alert(){
        this.isShowAlert = false;
      },
      goPlayGame(){
        this.$router.push('/selectType')
      },
      imgClick(e){
          e.stopPropagation();
         e.preventDefault();
      }
    }
  }
</script>
<style>
  .firstPage {
    width: 100%;
    position: relative;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  .firstBg {
    height: 100%;
    position: fixed;
    top: 0;
    /*left: -20%;*/
  }

  .btn_box {
    position: absolute;
    top: 10rem;
    left: 15%;
    z-index: 2;
  }

  .goImgBtn {
    text-align: center;
    display: block;
    width: 5.19rem;
  }

  .active_bg_btn {
    width: 2rem;
    height: 1rem;
    background: dodgerblue;
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    z-index: 2;
    opacity: 0;
  }

  .info_alert {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    display:flex;
    justify-content:center;
    align-items: center;
  }

  .alert_img_bg{
    width:5.1rem;
    height:6.68rem;
  }

  .info_content{
    width:5.1rem;
    height:6.68rem;
    position:relative;
  }
  .know_btn {
    width:4.2rem;
    height:1.2rem;
    position:absolute;
    bottom:0.3rem;
    left:.5rem;
  }
</style>
