<template>
  <section class="alertCotent">
    <div class="alertContentBg">
      <!--<img class="bg" src="static/alertImg/alert6.jpg" alt="">-->
      <section class="alertContentDiv">
        <img class="alert3Png" src="static/alertImg/alert3.png" v-if="isShowBigBox" alt="">
        <img class="alert1Png" src="static/alertImg/alert1.png" v-if="isSecondShow" alt="">
        <img class="alert2Png" src="static/alertImg/alert2.png" v-if="isThirdShow" alt="">
        <img class="alertBottom" v-if="isFourBtnShow" src="static/alertImg/alert4.png"  @click='alertImg()' alt="">
      </section>
    </div>
  </section>

</template>
<script>
  export default {
    data(){
      return {
        isShowBigBox: false,
        isSecondShow: false,
        isThirdShow: false,
        isFourBtnShow: false

      }
    },
    mounted(){
      //大弹窗
     setTimeout(() => {
        this.isShowBigBox = true;
      }, 1000);
      this.timerTemp = null;
      //黑条
       setTimeout(() => {
        this.isSecondShow = true;
      }, 2000);
      this.timerScondTemp = null;
      //小弹窗
      setTimeout(() => {
        this.isThirdShow = true;
      }, 3000);
      this.timerThirdTemp = null;
      //按钮
     setTimeout(() => {
        this.isFourBtnShow = true
      }, 4000);
    },

    methods: {
      alertImg(){
//            this.$emit('isShowAlert');
        this.$router.push('/selectType');
      }
    }
  }
</script>
<style scoped>
  .alertCotent {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;

  }

  .bg {
    width: 7.5rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    height: 100%;
  }

  .alertContentDiv {
    width: 5.69rem;
    height: 6.03rem;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }

  .alert3Png {
    width: 5.69rem;
    height: 6.03rem;
  }

  .alert1Png {
    position: absolute;
    width: 2.51rem;
    height: 1.91rem;
    animation: alert1PngAc .5s ease 3;
    animation-fill-mode: both;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  @keyframes alert1PngAc {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .alert2Png {
    position: absolute;
    width: 2.27rem;
    height: 2.21rem;
    animation: alert2PngAc .5s ease;
    animation-fill-mode: both;
    right: -0.5rem;
    top: 50%;
  }

  @keyframes alert2PngAc {
    from {
      transform: scale(0)
    }
    to {
      transform: scale(1)
    }
  }

  .alertBottom {
    position: absolute;
    width: 5.48rem;
    height: 1.05rem;
    bottom: -1.5rem;
    left: 50%;
    animation: alert4PngAc 2s ease infinite;
    transform: translateX(-50%)
  }

  @keyframes alert4PngAc {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .alertContentBg {
    width: 100%;
    height: 100%;
    /*background-color:#f19ec2;*/
    background-color: rgba(241, 158, 294, .8);
  }
</style>
