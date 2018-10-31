<template>
  <div class="resultPage" @click="stop" v-disabletouchmove>
      <img class="resultImg"  :src="result_bg" alt="" @click="imgClick">
      <img class="logoImg"  :src="logo_img" alt="" @click="imgClick">
      <section class="topInfoBox" v-show="isInfoBox">
          <img :src="top_info" alt="" @click="imgClick">
      </section>
      <section class="findContainer" v-show="isfindImgBox">
          <img class="find" :src="find_img" @click="Lookrankings" alt="">  <!--查看排行-->
          <div class="gradeNumBox">
            <!--分数-->
            <section v-for="(item,index) in numArr" :key="index">
              <img class="leftInfoBox" :src="`static/result/${item}.png`" alt="" @click="imgClick">
            </section>
          </div>
      </section>
    <!--查看排行弹窗-->
      <section class="LookrankingsBox" v-show="isShow"> <!--@touchmove.prevent-->
          <div class="alertContent">
              <img class="alertContentBg" :src="alert_bg" alt="">
              <!--BETTER SCROLL-->
                  <div class="touchmoveList">
                    <div class="wrapper" ref="wrapper">
                    <ul class="content">
                      <li v-for="(item,index) in arrList" :key="index">
                        <section>
                          <span>{{item.index | type}}</span>
                          <span>{{item.user_name | htmlDecode}}</span>
                        </section>
                        <p>{{item.score}}</p>
                      </li>
                    </ul>
                  </div>
              </div>
              <div class="closeAlert" @click="closeAlert">
              </div>
          </div>
      </section>
      <div class="imgContent">
            <img class="girlImg" :src="girl_img" v-show="isShowGirlBg" alt="">
            <img class="position_1" :src="product_1" v-show="isShowProduct_1" alt="">
            <img class="position_2" :src="product_2" v-show="isShowProduct_2" alt="">
            <img class="position_3" :src="product_3" v-show="isShowProduct_3" alt="">
            <section class="toClickBox">
              <img class="giveReard" :src="ReceiveBtn" v-show="isShowReceiveBtn" @click="giveReardActive" alt="">
              <section class="footer" v-show="isAginPlay">
                <img class="aginImg" :src="agin_img"  @click="toAgain" alt="">
              </section>
            </section>
       </div>
  </div>
</template>
<script type="text/javascript">
  import allHomeImg from '../config/img';
  import Ajax from '../config/ajax';
  import env from '../config/env';
  import DataManager from '../dataManager/data';
  import MD5 from '../config/md5'
  import load from '../components/load.vue';
  import BScroll from "better-scroll";
  export default {
    data (){
      return {
        result_bg: `static/result/play_bg.jpg`,
        logo_img: `static/seven/logo.png`,
        top_info: `static/result/top_info.png`,
        find_img: `static/result/find.png`,
        gradeNum: '',  //分数
        typeNum: '',   //类型
        girl_img: '',  //女孩图片
        product_1: '', //左上（产品）
        product_2: '',  //右（产品）
        product_3: '', //右（产品）
        ReceiveBtn: `static/result/give_rewards.png`,
        agin_img: `static/result/again.png`,
        right_img: `static/result/play_pao.png`,
        alert_bg: `static/result/rank_list.png`,
        isShow: false,
        numArr: [],
        arrList: [],
        isResultBg: false,
        isInfoBox: false,
        isfindImgBox: false,
        isShowGirlBg: false,
        isShowProduct_1: false,
        isShowProduct_2: false,
        isShowProduct_3: false,
        isShowReceiveBtn: false,
        isAginPlay: false,
        isShowRight: false,
        scoreNum: 0

      }
    },
    filters:{
      type:function(index){
        if(index == '0'){
          return '①'
        }else if(index == '1'){
          return '②'
        }else if(index == '2'){
          return '③'
        }else if(index == '3'){
          return '④'
        }else if(index == '4'){
          return '⑤'
        }else if(index == '5'){
          return '⑥'
        }else if(index == '6'){
          return '⑦'
        }else if(index == '7'){
          return '⑧'
        }else if(index == '8'){
          return '⑨'
        }else if(index == '9'){
          return '⑩'
        }
      },
      htmlDecode(str){
        let s = "";
        if (str.length == 0) return s;
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
      }
    },

    mounted(){

      setTimeout(() => {
        this.isInfoBox = true;
      }, 1000);
      setTimeout(() => {
        this.isfindImgBox = true;
      }, 2000);
      setTimeout(() => {
        this.isShowGirlBg = true
      }, 3000);
      setTimeout(() => {
        this.isShowProduct_1 = true;
      }, 4000);
      setTimeout(() => {
        this.isShowProduct_2 = true;
      }, 4500);
      setTimeout(() => {
        this.isShowProduct_3 = true;
      }, 5000);
      setTimeout(() => {
        this.isShowReceiveBtn = true;
      }, 5500);
      setTimeout(() => {
        this.isAginPlay = true;
      }, 6000);

      setTimeout(() => {
        this.isShowRight = true
      }, 6500);

      this.init();
    },
    methods: {
      InitTabScroll(){
        this.aScroll = new BScroll('.wrapper',{
          scrollY:true,   //当设置为 true 的时候，可以开启纵向滚动
          preventDefault:true,   //是否阻止浏览器默认行为
          freeScroll:true  //如果想横向和纵向都能滑动，就设置它为true
        });
        setTimeout(()=>{
          this.aScroll.refresh()
        },200)

      },
      init(){
        //图片
        this.indexNum = this.$route.params.type;
        if (this.indexNum == 1) {
          this.girl_img = `static/result/play_people1.png`;
          this.product_1 = `static/result/product1_1.png`;
          this.product_2 = `static/result/product1_2.png`;
          this.product_3 = `static/result/product1_3.png`;
        } else if (this.indexNum == 2) {
          this.girl_img = `static/result/play_people2.png`;
          this.product_1 = `static/result/product2_1.png`;
          this.product_2 = `static/result/product2_2.png`;
          this.product_3 = `static/result/product2_3.png`;

        } else if (this.indexNum == 3) {
          this.girl_img = `static/result/play_people3.png`;
          this.product_1 = `static/result/product3_1.png`;
          this.product_2 = `static/result/product3_2.png`;
          this.product_3 = `static/result/product3_3.png`;
        }
        //分数
        this.gradeNum = this.$route.params.score + '';
        for (let i = 0; i < this.gradeNum.length; i++) {
          this.numArr.push(this.gradeNum[i]);
        }
      },
      //查看排行
      Lookrankings(e){
        this.isShow = true;
        this.InitTabScroll();
        e.stopPropagation();
        e.preventDefault();
        new Ajax().sendJSON('http://123.206.205.184:3001' + '/mldjScoreList', {
            user_id: DataManager.user_id,
            sign: MD5.makeSign({
              user_id: DataManager.user_id
            })
        }, (res) => {
          if (res['st'] == 1) {
            this.arrList = res['data']['list'];
          }
        });
      },
      //弹出层禁止滑动
      stop(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
      },
      /***取消滑动限制***/
      move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      },
    closeAlert(e){
      e.stopPropagation();
      e.preventDefault();
      this.isShow = false;
      this.aScroll.destroy();
    },
    //领取电跑装备
    giveReardActive(e){
      e.stopPropagation();
      new Ajax().sendJSON('http://123.206.205.184:3001' + '/auBehavior', {
        user_id: DataManager.user_id,
        bid: DataManager.bid,
        group_openid: DataManager.group_openid,
        type: 12,
        ad_id: DataManager.ad_id,
        sign: MD5.makeSign({
          user_id: DataManager.user_id,
          bid: DataManager.bid,
          group_openid: DataManager.group_openid,
          type: 12,
          ad_id: DataManager.ad_id
        })
      }, (res) => {
        new Ajax().sendJSON('http://123.206.205.184:3001' + '/mldjGetLuckyStar', {   //领取幸运星
          user_id: DataManager.user_id,
          bid: DataManager.bid,
          group_openid: DataManager.group_openid,
          sign: MD5.makeSign({
            user_id: DataManager.user_id,
            bid: DataManager.bid,
            group_openid: DataManager.group_openid
          })
        }, (res) => {
            console.log(res)

        });
        window.location.href = 'https://shop.m.jd.com/?shopId=1000002502';
      })
    },
    //再来一次
    toAgain(){
      this.$router.push('/selectType')
    },
    //参与电跑
//      toAddRun(e){
//          e.stopPropagation();
//          new Ajax().sendJSON('http://123.206.205.184:3001' + '/auBehavior', {
//            user_id: DataManager.user_id,
//            bid: DataManager.bid,
//            group_openid: DataManager.group_openid,
//            type: 13,
//            ad_id: DataManager.ad_id,
//            sign: MD5.makeSign({
//              user_id: DataManager.user_id,
//              bid: DataManager.bid,
//              group_openid: DataManager.group_openid,
//              type: 13,
//              ad_id: DataManager.ad_id
//            })
//          }, (res) => {
//            window.location.href = 'http://www.qq.com';
//          })
//      },
      imgClick(e){
        e.stopPropagation();
        e.preventDefault();
      }
   }
  }
</script>
<style>
  .resultPage {
    position: relative;
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  .resultImg {
    height: 100%;
    position: fixed;
    top: 0;
    /*left: 0;*/
  }

  @keyframes sunshineShow3 {
    0% {
      left: 10rem;
    }
    100% {
      left: 0;
    }
  }

  .logoImg {
    width: 100%;
    height: 1.3rem;
    position: fixed;
    top: 0;
    left: 0;
  }

  .topInfoBox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 1.5rem;
    text-align: center;
  }



  .topInfoBox > img {
    height: .91rem;
  }

  .findContainer{
      width:100%;
      justify-content: flex-start;
      align-items: flex-start;
      display:flex;
      position:fixed;
      top: 2.5rem;
      left: 0;
      animation: blink 1s;
  }

  @keyframes blink {
    0% {
      opacity: .2;
    }
    100% {
      opacity: 1;
    }
  }
  .find{
    width: 2.25rem;
    height: 1.31rem;
  }

  .gradeNumBox {
    width:calc(100% - 2.25rem);
    margin-top:.2rem;
    margin-left:-.9rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }

  .gradeNumBox > section> img {
    width: .9rem;
    margin-right: -0.19rem;
  }
  .imgContent {
    position: relative;
    top:4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .girlImg {
    height: 6.25rem;
    position: absolute;
    top: 0;
    animation: shiness 1s;
  }

  @keyframes shiness{
    0% {
    opacity: .3;
    }
    100% {
    opacity: 1;
    }
  }

  .position_1 {
    height: 2.34rem;
    position: absolute;
    top: -.5rem;
    right: 1rem;
    animation: shiness 1s;
  }

  .position_2 {
    height: 2.89rem;
    position: absolute;
    left: 1.5rem;
    top: 1rem;
    animation: shiness 1s;
  }

  .position_3 {
    height: 2.53rem;
    position: absolute;
    top: 3rem;
    right: 1.5rem;
    animation: shiness 1s;
  }

  .toClickBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .giveReard {
    height: 1.02rem;
    position: absolute;
    top: 6.7rem;
    animation: shiness 1s;
  }

  .footer {
    position: absolute;
    top: 8.2rem;
    animation: shiness 1s;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  /*.aginImg{*/
    /*position:absolute;*/
    /*top: 0rem;*/
    /*right:1rem;*/
  /*}*/

  .rightImg{
    position:absolute;
    top: 0rem;
    left:1rem;
  }

  .footer img {
    height: .29rem;
  }

  /*查看排行*/
  .LookrankingsBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .alertContent {
    height: 9.65rem;
    position: relative;
  }
  .alertContentBg{
      height: 9.65rem;
      display:flex;
      justify-content: center;
      align-items: center;
  }

  .closeAlert{
    width: 1rem;
    height: 1rem;
    position: absolute;
    z-index: 9;
    top: 0;
    right: 0;
  }

  .touchmoveList {
    position: absolute;
    top: 1.85rem;
    left: .3rem;
    display:flex;
    justify-content: space-between;
    z-index:2;
    height: 2.5rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
  }

  .touchmoveList ul{
    width:5.35rem;
  }

  .touchmoveList ul li{
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    font-size: .3rem;
    color: #fff;
    padding-left:.2rem;
    padding-right:.2rem;
    margin-top:.1rem;
    margin-bottom:.2rem;

  }

  .wrapper{
    width: 100%;
    height: 2.5rem;
    overflow: hidden;
  }
</style>
