<template>
  <!--<div>-->
     <div  class="page1Container">
       <img class="ball" src="../../static/home/home2_ball.png" alt="">
       <img class="logo" src="../../static/home/mldjLog.png" alt="">
       <div class="headInfoImg">
         <img class="first_img"  v-show="firstImg"  src="../../static/home/H5_2_Info_img1.png" alt="">
         <img class="second_img" v-show="secondImg"  src="../../static/home/H5_2_Info_img2.png" alt="">
         <img class="third_img"  v-show="thirdImg" src="../../static/home/H5_2_Info_img3.png" alt="">
       </div>
       <div class="contentBox">
          <div class="home2_btn_box" v-show="fiveImg" >
            <img  src="../../static/home/h5_2_btn1.png" @click="toShowAlert" alt="">
            <img   src="../../static/home/h5_2_btn2.png" @click="toPlay" alt="">
          </div>
         <homeAlert v-if="homeAlert" @isShowAlert="isShowAlert"></homeAlert> <!---->
          <div class="head_img">
            <img src="../../static/home/h5_2_people.png" alt="">
          </div>
         <img v-show="leftImg" class="bottomQuestion" src="../../static/home/h5_2_question.png" alt="">
         <img v-show="rightImg" class="bottomRight" src="../../static/home/h5_2_botton.png" alt="">
       </div>
     </div>
  <!--</div>-->
</template>

<script>
    import homeAlert from '../../components/test1/alert.vue'
    export default {
        data(){
            return{
              firstImg:false,
              secondImg:false,
              thirdImg:false,
              fiveImg:false,
              leftImg:false,
              rightImg:false,
              homeAlert:false,  //弹窗
          }
        },
      components:{
        homeAlert
      },
      mounted(){

        tempTimer1 = null;
        tempTimer2 = null;
        tempTimer3 = null;
        tempTimer4 = null;
        tempTimer5 = null;
        tempTimer6 = null;

        let tempTimer1 = setTimeout(()=>{
          this.firstImg = true;
        },500);
        let tempTimer2 = setTimeout(()=>{
          this.secondImg = true;
        },1500);
        let tempTimer3 = setTimeout(()=>{
          this.thirdImg = true;
        },2500);


        let tempTimer4 = setTimeout(()=>{
          this.rightImg = true
        },3500);
        let tempTimer5 = setTimeout(()=>{
          this.leftImg = true
        },4000);

        let tempTimer6 = setTimeout(()=>{
            this.fiveImg = true
        },4000);

        clearInterval(this.tempTimer1);
        clearInterval(this.tempTimer2);
        clearInterval(this.tempTimer3);
        clearInterval(this.tempTimer4);
        clearInterval(this.tempTimer5);
        clearInterval(this.tempTimer6)
      },
      methods:{
        toPlay(){
          this.$router.push('/selectType')
        },
        toShowAlert(){
          this.homeAlert =true;
        },
        isShowAlert(){
          this.homeAlert = false;
          this.fiveImg = false;
        },

      }
    }
</script>

<style scoped>
  .page1Container{
     width:100%;
     height:100%;
     background-color: rgb(191,177,202);
     background:url('../../static/home/h5_2_bg2.jpg') no-repeat;
     background-size:100% 100%;
     position:relative;
     overflow-y: scroll;
  }
  .ball{
    width:2.80rem;
    height:1.83rem;
    position:absolute;
    top:.5rem;
    right:0;
  }
  .logo{
    width:2.97rem;
    /*height:.97rem;*/
    position:absolute;
    top:.3rem;
    left:.25rem;
    z-index: 1;

  }
  .headInfoImg{
    width:100%;
    padding-top:2.8rem;
    text-align:left;
    font-size:0;
    height: 5rem;
  }
  .headInfoImg .first_img{
    width:5.6rem;
    position:absolute;
    top:3rem;
    left:1rem;
    animation: toShow 2s;
  }
  .headInfoImg .second_img{
    width:5.6rem;
    display:block;
    left:1rem;
    animation: toShow 2s;
    position:absolute;
    top:3.6rem;

  }
  .headInfoImg .third_img{
    width:5.6rem;
    animation: toShow 2s;
    position:absolute;
    top:4.2rem;
    left:1rem;
  }
  .home2_btn_box{
    width:100%;
    text-align:center;
    position:absolute;
    top:5.2rem;
    left:0;
    animation: flash_btn 1s;
    display:flex;
    -webkit-justify-content: center;
    justify-content: center;
    align-items: center;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .home2_btn_box img{
    width:5.5rem;
    height:1.05rem;
    margin-top:.3rem;
  }
  /*进入动画按钮*/
  @keyframes toShowBtn{
    0%{
      left:-3rem;
    }
    100%{
      left:0;
    }
  }
  /*进入动画*/
  @keyframes toShow{
    0%{
      left:-3rem;
    }
    100%{
      left:1rem;
    }
  }

  /*人物头像*/
  .head_img{
    width:100%;
    text-align:center;
    /*height:4.40rem;*/
    position:absolute;
    top:9rem;
    right:0;
    animation: toshowUp 4s;

  }
  .head_img img{
    width: 4.2rem;
    height:4.08rem;
  }
  @keyframes toshowUp{
    0%{
      right:-8rem;
    }
    100%{
      right:0;
    }
  }


  /*？？？动画*/
  .bottomQuestion{
    width: 1.75rem;
    height: 1.25rem;
    position: absolute;
    top: 9rem;
    left: 1.5rem;
    animation:flash 2s infinite;
  }
  @keyframes sunshine_show_left {
    0%{
      transform: scale(2);
      -moz-transform:scale(-1,-1);
      -webkit-transform:scale(-1,-1);
      -o-transform:scale(-1,-1);
    }
    100%{
      transform: scale(.8);
      -moz-transform:scale(1,1);
      -webkit-transform:scale(1,1);
      -o-transform:scale(1,1);
    }
  }


 /*平移动画*/
  @keyframes translateAction {
     0%{
       left:-4rem;
     }
    100%{
      left:1.5rem;
    }
  }
  @keyframes sunshineShow{
    0%{
      right:-8rem;
    }
    100%{
      right:0;
    }
  }


  /*右边条动画*/
  .bottomRight{
    width: 3.34rem;
    position: absolute;
    top: 9rem;
    right: 0.1rem;
    animation: flash 2s infinite;
  }

  @keyframes home1Ac {
    0%{
      transform: scale(.8);
    }
    50%{
      transform: scale(1);
    }
    100%{
      transform: scale(.8);
    }
  }

  /*闪烁1*/
  @-webkit-keyframes flash_btn{
    0%{opacity:.3;}
   100%{opacity:1;}
  }
  @-moz-keyframes flash_btn{
    0%{opacity:.3;}
    100%{opacity:1;}
  }
  @-ms-keyframes flash_btn{
    0%{opacity:.3;}
    100%{opacity:1;}
  }
  @keyframes flash_btn{
    0%{opacity:.3;}
    100%{opacity:1;}
  }

/*闪烁*/

  @-webkit-keyframes flash{
    0%,50%,100%{opacity:1;}
    25%,75%{opacity:0.3;}
  }
  @-moz-keyframes flash{
    0%,50%,100%{opacity:1;}
    25%,75%{opacity:0.3;}
  }
  @-ms-keyframes flash{
    0%,50%,100%{opacity:1;}
    25%,75%{opacity:0.3;}
  }
  @keyframes flash{
    0%,50%,100%{opacity:1;}
    25%,75%{opacity:0.3;}
  }

  .selectPlayBox{
    position:absolute;
    top:6rem;
    left:1rem;
    text-align:center;
    width:5.5rem;
    display:flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
  }
  /*开起游戏*/
  .selectPalyGame1{
    width:1.53rem;
    height:1.49rem;
  }
  .selectPalyGame2{
    width:1.53rem;
    height:1.49rem;
  }
  .selectPalyGame3{
    width:1.53rem;
    height:1.49rem;
  }
</style>
