<template>
  <section class="canvasBox">
    <img class="canvasBoxBg" :src="bg" v-show="canStart" alt="">
    <gameRule v-if="isShowRule" @closeShowGameRule="closeShowGameRule"></gameRule>
    <!--<successAlert  @closeSuccessInfo="closeSuccessInfo"></successAlert>-->
    <div class="successBox" v-if="isShowSuccess">
      <img class="successImg" src="../../static/partImg/success.png" alt="">
    </div>
    <!--<img class="successImg" @click="closeSuccessInfo" src="../../static/partImg/success.png" alt="">-->
    <div class="canvasPlayBox" v-show="canStart">
      <canvas id="myCanvas" style="width: 100%;"></canvas>
    </div>
    <!--<section>{{loadNum}}</section>-->
    <!--<section class="cutDownTimeBox">{{cutDownTime}}s</section>-->
    <img class="borderImg" src="static/partImg/boder.png" alt="">
    <img class="headImg_01" :src="headImg_01" alt="">
    <section class="bottom">
      <img src="static/partImg/js_btn.png" alt="">
      <img src="static/partImg/toLocation_btn.png" alt="">
    </section>
    <jigsawAlert v-if="isShowJigsawAlert"></jigsawAlert>
    <restartGame v-if="showResetGame" @resetGame="resetGame"></restartGame>
  </section>
</template>

<script>
  import tools from '../../config/tools';
  import JigsawItem from '../../components/test1/jigsaw';
  import jigsawAlert from '../../components/test1/jigsawAlert';
  import restartGame from '../../components/test1/resetGame'
  import gameRule from '../../components/test1/gameRule.vue';
  import successAlert from '../../components/test1/successAlert.vue'


  export default {
    name: "Jigsaw",
    data() {
      return {
        loadNum: '',
        correctArr: [],
        jigsawItemArr: [],
        beforeIndex: null,
        currentIndex: null,
        isCanClick: true,
        cutDownTime: 30,
        type: 0,
        setInterval: null,
        headImg_01: '',
        isShowJigsawAlert: false,
        showResetGame: false,
        isSuccessBol: false,
        bg: '',
        canStart: false,
        isShowRule: true,
        isShowSuccess: false,
        timerTmd:''
      }
    },
    components: {
      jigsawAlert, restartGame, gameRule, successAlert
    },
    mounted() {
      this.type = this.$route.params.type;
      this.init();
    },
    methods: {
      closeShowGameRule(){
        this.isShowRule = false;
        this.startCutDown();
//      this.startGame();
      },

      //解锁成功弹窗
//      closeSuccessInfo(){
//        this.isShowSuccess = false;
//        this.isShowJigsawAlert = true;  //成功弹窗
//
//      },
      resetGame() {
        this.resetAllData();
        this.setStage();
        this.startGame();
        this.showResetGame = false;
        this.startCutDown();
      },


      init() {
        for (let i = 1; i <= 9; i++) {
          this.correctArr.push({
            id: i
          })
        }

        let img = new Image();
        img.src = 'static/partImg/pu_bg.jpg';
        img.onload = () => {
          this.bg = 'static/partImg/pu_bg.jpg';
        };


        if (this.type == 0) {
          this.headImg_01 = 'static/partImg/headImg_01.png'
          this.manifest = [
            {id: 'num', src: "static/partImg/num.png"},
//          {id: "all", src: 'static/ptImg/0.png'},
            {id: "1", src: 'static/ptImg/1.jpg'},
            {id: "2", src: 'static/ptImg/2.jpg'},
            {id: "3", src: 'static/ptImg/3.jpg'},
            {id: "4", src: 'static/ptImg/4.jpg'},
            {id: "5", src: 'static/ptImg/5.jpg'},
            {id: "6", src: 'static/ptImg/6.jpg'},
            {id: "7", src: 'static/ptImg/7.jpg'},
            {id: "8", src: 'static/ptImg/8.jpg'},
            {id: "9", src: 'static/ptImg/9.jpg'}
          ];
        } else if (this.type == 1) {
          this.headImg_01 = 'static/partImg/headImg_02.png'
          this.manifest = [
            {id: 'num', src: "static/partImg/num.png"},
//                        {id: "all", src: 'static/ptImg/0.png'},
            {id: "1", src: 'static/ptImg/pingtu2_1.jpg'},
            {id: "2", src: 'static/ptImg/pingtu2_2.jpg'},
            {id: "3", src: 'static/ptImg/pingtu2_3.jpg'},
            {id: "4", src: 'static/ptImg/pingtu2_4.jpg'},
            {id: "5", src: 'static/ptImg/pingtu2_5.jpg'},
            {id: "6", src: 'static/ptImg/pingtu2_6.jpg'},
            {id: "7", src: 'static/ptImg/pingtu2_7.jpg'},
            {id: "8", src: 'static/ptImg/pingtu2_8.jpg'},
            {id: "9", src: 'static/ptImg/pingtu2_9.jpg'}
          ];
        } else if (this.type == 2) {
          this.headImg_01 = 'static/partImg/headImg_03.png'
          this.manifest = [
            {id: 'num', src: "static/partImg/num.png"},
//                        {id: "all", src: 'static/ptImg/0.png'},
            {id: "1", src: 'static/ptImg/pingtu3_1.jpg'},
            {id: "2", src: 'static/ptImg/pingtu3_2.jpg'},
            {id: "3", src: 'static/ptImg/pingtu3_3.jpg'},
            {id: "4", src: 'static/ptImg/pingtu3_4.jpg'},
            {id: "5", src: 'static/ptImg/pingtu3_5.jpg'},
            {id: "6", src: 'static/ptImg/pingtu3_6.jpg'},
            {id: "7", src: 'static/ptImg/pingtu3_7.jpg'},
            {id: "8", src: 'static/ptImg/pingtu3_8.jpg'},
            {id: "9", src: 'static/ptImg/pingtu3_9.jpg'}
          ];
        }

        let self = this;
        this.preLoad(() => {
          self.startGame();
        });
      },

      preLoad(preLoadSuccess) {
        let self = this;
        //舞台初始化
        self.setStage();
        //预加载资源
        self.loadImg(self.manifest, preLoadSuccess);
      },

      setStage() {
        let canvasId = document.getElementById('myCanvas');
        canvasId.width = 750;
        canvasId.height = 1000;
        let stage = this.stage = new createjs.Stage(canvasId);


        createjs.Touch.enable(stage);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", stage);


        let layer = this.layer = new createjs.Container();
        layer.x = 75;
        layer.y = 300;
        layer.width = 600;
        layer.height = 1000;
        stage.addChild(layer);


        let scopeContanier = this.scopeContanier = new createjs.Container();
        scopeContanier.x = 550;
        scopeContanier.y = 50;
        scopeContanier.width = 50;
        scopeContanier.height = 95;
        stage.addChild(scopeContanier);

      },

      loadImg(manifest, cb) {
        let queue = this.queue = new createjs.LoadQueue(false);
        queue.on("complete", handleComplete, this);
        queue.on('progress', handleProgress, this);
        queue.loadManifest(manifest);

        function handleComplete() {
          cb();
        }

        function handleProgress(e) {
          this.loadNum = parseInt(parseFloat(e.loaded).toFixed(2) * 100) + '%';
        }
      },

      // 创建Item
      createItem(str, px, py, father) {
        let paw_gun = this.bitmap(str);
        paw_gun.x = px;
        paw_gun.y = py;
        father.addChild(paw_gun);
      },

      bitmap(id) {
        let bitmap = new createjs.Bitmap(this.queue.getResult(id));
        bitmap.width = bitmap.image.width;
        bitmap.height = bitmap.image.height;
        return bitmap;
      },

      fatherClick(id) {

        if (!this.isCanClick) {
          return
        }
        let isHas = true;
        if (this.currentIndex != null) {
          this.beforeIndex = this.currentIndex;
        }
        for (let j in this.jigsawItemArr) {
          let tempJi = this.jigsawItemArr[j]['item'];
          //点同一个元素
          if (tempJi['shape'] && tempJi['itemName'] == id) {
            tempJi.smallItemContainer.removeChild(tempJi['shape']);
            tempJi['shape'] = null;
            isHas = false;
            break;
          }
          //点不同元素
          if (tempJi['shape']) {
            tempJi.smallItemContainer.removeChild(tempJi['shape']);
            tempJi['shape'] = null;
            break;
          }
        }

        if (isHas) {
          for (let i in this.jigsawItemArr) {
            let tempItem = this.jigsawItemArr[i]['item'];
            if (tempItem['itemName'] == id) {
              tempItem.createShapeSelect();
              this.currentIndex = parseInt(i);

              if (this.beforeIndex != null && this.currentIndex != null && this.beforeIndex != this.currentIndex) {
                // if(Math.abs(this.beforeIndex - this.currentIndex) == 3 || Math.abs(this.beforeIndex - this.currentIndex)==1){
                //     console.log('可以旋转了哦');
                //     this.resetSelect();
                //     let beforeIndex = this.beforeIndex;
                //     let currentIndex = this.currentIndex;
                //     let currentContainer = tempItem['smallItemContainer'];
                //
                //     let beforeContainerX = this.jigsawItemArr[beforeIndex]['item']['posX'];
                //     let beforeContainerY = this.jigsawItemArr[beforeIndex]['item']['posY'];
                //     this.jigsawItemArr[currentIndex]['item'].exChangeTween(currentContainer,beforeContainerX,beforeContainerY,100);
                //
                //     let beforeContainer = this.jigsawItemArr[beforeIndex]['item']['smallItemContainer'];
                //     let currentContainerX = this.jigsawItemArr[currentIndex]['item']['posX'];
                //     let currentContainerY = this.jigsawItemArr[currentIndex]['item']['posY'];
                //
                //     //交换位置，视图
                //     this.jigsawItemArr[beforeIndex]['item'].exChangeTween(beforeContainer,currentContainerX,currentContainerY,100,()=>{
                //
                //         this.jigsawItemArr[currentIndex]['item']['posX'] = beforeContainerX;
                //         this.jigsawItemArr[currentIndex]['item']['posY'] = beforeContainerY;
                //         this.jigsawItemArr[beforeIndex]['item']['posX'] = currentContainerX;
                //         this.jigsawItemArr[beforeIndex]['item']['posY'] = currentContainerY;
                //
                //         //交换元素位置
                //         let tempItem = this.jigsawItemArr[currentIndex];
                //         this.jigsawItemArr[currentIndex] = this.jigsawItemArr[beforeIndex];
                //         this.jigsawItemArr[beforeIndex] = tempItem;
                //
                //         this.beforeIndex = null;
                //         this.currentIndex = null;
                //
                //         this.isSuccess();
                //         this.isCanClick = true;
                //     });
                //     break;
                // }else{
                //     //不同元素之间要还原
                //     this.isCanClick = true;
                //     this.resetSelect();
                //     this.beforeIndex = null;
                //     this.currentIndex = null;
                // }


                this.resetSelect();
                let beforeIndex = this.beforeIndex;
                let currentIndex = this.currentIndex;
                let currentContainer = tempItem['smallItemContainer'];
                let beforeContainerX = this.jigsawItemArr[beforeIndex]['item']['posX'];
                let beforeContainerY = this.jigsawItemArr[beforeIndex]['item']['posY'];
                this.jigsawItemArr[currentIndex]['item'].exChangeTween(currentContainer, beforeContainerX, beforeContainerY, 100);

                let beforeContainer = this.jigsawItemArr[beforeIndex]['item']['smallItemContainer'];
                let currentContainerX = this.jigsawItemArr[currentIndex]['item']['posX'];
                let currentContainerY = this.jigsawItemArr[currentIndex]['item']['posY'];

                //交换位置，视图
                this.jigsawItemArr[beforeIndex]['item'].exChangeTween(beforeContainer, currentContainerX, currentContainerY, 100, () => {

                  this.jigsawItemArr[currentIndex]['item']['posX'] = beforeContainerX;
                  this.jigsawItemArr[currentIndex]['item']['posY'] = beforeContainerY;
                  this.jigsawItemArr[beforeIndex]['item']['posX'] = currentContainerX;
                  this.jigsawItemArr[beforeIndex]['item']['posY'] = currentContainerY;

                  //交换元素位置
                  let tempItem = this.jigsawItemArr[currentIndex];
                  this.jigsawItemArr[currentIndex] = this.jigsawItemArr[beforeIndex];
                  this.jigsawItemArr[beforeIndex] = tempItem;

                  this.beforeIndex = null;
                  this.currentIndex = null;

                  this.isSuccess();
                });
                break;
              }
            } else {
              // this.isCanClick = true;
            }
          }
        } else {
          // this.isCanClick = true;
          this.beforeIndex = null;
          this.currentIndex = null;
        }
      },


      resetSelect() {
        for (let j in this.jigsawItemArr) {
          let tempJi = this.jigsawItemArr[j]['item'];
          if (tempJi['shape']) {
            tempJi.smallItemContainer.removeChild(tempJi['shape']);
            tempJi['shape'] = null;
            break;
          }

        }
      },

      // 是否成功
      isSuccess() {
        let tempArr = this.jigsawItemArr;
        let tempArr2 = this.correctArr;
        if (tempArr[0]['id'] == tempArr2[0]['id'] && tempArr[1]['id'] == tempArr2[1]['id'] &&
          tempArr[2]['id'] == tempArr2[2]['id'] && tempArr[3]['id'] == tempArr2[3]['id'] &&
          tempArr[4]['id'] == tempArr2[4]['id'] && tempArr[5]['id'] == tempArr2[5]['id'] &&
          tempArr[6]['id'] == tempArr2[6]['id'] && tempArr[7]['id'] == tempArr2[7]['id'] &&
          tempArr[8]['id'] == tempArr2[8]['id']) {
          this.isCanClick = false;
          clearInterval(this.setInterval);
          this.setInterval = null;
          this.isSuccessBol = true;
          this.isShowSuccess = true; //解锁成功四个字
//        this.isShowJigsawAlert = true;

          let timerTmd = setTimeout(()=>{
            this.isShowJigsawAlert = true;  //成功弹窗
          },500);
         clearTimeout(this.timerTmd)
        } else {
          this.isSuccessBol = false;
        }
      },


      startGame() {
        console.log('starGame')
        let tempArr = this.randNum([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let index = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let Jigsaw = new JigsawItem();
            Jigsaw.createItem(tempArr[index] + '', j * 200, i * 200, this.layer, this.queue, this.fatherClick);
            this.jigsawItemArr.push({item: Jigsaw, id: tempArr[index]});
            index += 1;
          }
        }

        this.canStart = true;
      },

      //开始倒计时
      startCutDown() {
        // 倒计时
        this.setCutDown('30s');
        if (!this.setInterval) {
          this.setInterval = setInterval(() => {
            this.cutDownTime -= 1;
            this.setCutDown(this.cutDownTime + 's');
            if (this.cutDownTime <= 0) {
              clearInterval(this.setInterval);
              this.setInterval = null;
              this.isCanClick = false;
              if (!this.isSuccessBol) {
                this.showResetGame = true;
              }
            }
          }, 1000)
        }
      },

      //设置倒计时
      setCutDown(time) {
        this.scopeContanier.removeAllChildren();
        let num = tools.getBitmapText(time, 'num', this.queue);
        this.scopeContanier.addChild(num);
      },

      /**
       * 随机一串不重复的数字
       * @param arr
       * @returns {Array}
       */
      randNum(arr) {
        let temp = [];
        let count = arr.length;
        for (let i = 0; i < count; i++) {
          let num = Math.floor(Math.random() * arr.length);
          temp.push(arr[num]);
          arr.splice(num, 1);
        }
        return temp;
      },
      //重置所有数据
      resetAllData() {
        if (this.layer) {
          this.layer.removeAllChildren();
          this.layer.removeAllEventListeners();
        }
        if (this.stage) {
          this.stage.removeAllChildren();
          this.stage.removeEventListener("tick", this.stage);
          this.stage.removeAllEventListeners();
        }
        createjs.Tween.removeAllTweens();
        clearInterval(this.setInterval);
        this.setInterval = null;


        this.jigsawItemArr = [];
        this.beforeIndex = null;
        this.currentIndex = null;
        this.isCanClick = true;
        this.cutDownTime = 30;

        this.isShowJigsawAlert = false;
        this.showResetGame = false;
        this.isSuccessBol = false;

      },
    },


    // 消除元素
    destroyed() {
      this.resetAllData();
    }
  }
</script>

<style scoped>
  .canvasBox {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgb(254, 144, 169);
    overflow-y: scroll;
  }

  .canvasBoxBg {
    width: 100%;
    height: 12.05rem;
  }

  .canvasPlayBox {
    width: 100%;
    height: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 33;
  }

  .borderImg {
    width: 6.10rem;
    height: 6.07rem;
    position: absolute;
    left: 0.7rem;
    top: 2.923rem;
    z-index: 10;
  }

  .headImg_01 {
    position: absolute;
    left: 0.8rem;
    top: 2.2rem;
    z-index: 11;
    width: 5.53rem;
  }

  .bottom {
    position: absolute;
    left: 0;
    top: 9.5rem;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .bottom > img {
    width: 3.06rem;
  }


  .successBox{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.6);
    position:absolute;
    top:0;
    left:0;
    z-index:101;
    display:flex;
    -webkit-justify-content: center;
    justify-content: center;
    align-items: center;
  }
  .successImg{
    width:3.45rem;
    height:.99rem;
  }
</style>
