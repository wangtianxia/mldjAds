<template>
    <div class="home" style="width: 100%;height: 100%">
        <div class="loading" v-show="loading">
            <div class="loadigWord">
                <p>{{loadNum}}/100%</p>
                <p>加载中...</p>
            </div>
        </div>
        <img class="logo" src="static/logo.png" alt="">
        <img class="diamond" src="static/img2.png"/>
        <img class="magicWand" src="static/img1.png" alt="">
        <section class="cutDownTime" v-text="cutDownTime">
        </section>
        <canvas id="myCanvas" style="width: 100%;height: 100%" @click="clickCanvas()"></canvas>
        <ready @closeReady="closeReady" v-show="readyShow"></ready>
        <GameOver v-show="gameOver"></GameOver>
    </div>
</template>

<script>
    import ready from '../components/ready.vue';
    import GameOver from '../components/test1/gameOver.vue';
    export default {
        data () {
            return {
                loadNum:"0",
                fps:0,
                containerArr:[],
                isCanClick:true,
                paperIndex:0,
                readyShow:false,
                cutDownTime:10,
                gameOver:false,
                loading:true
            }
        },
        mounted(){
            this.init();
        },
        components:{
            ready,GameOver
        },
        methods:{
            closeReady(){
                this.readyShow = false;
                this.homeTime = setInterval(()=>{
                    this.cutDownTime--;
                    if(this.cutDownTime<=0){
                         this.isCanClick = false;
                        clearInterval(this.homeTime);
                        this.homeTime= null;
                        this.gameOver = true;
                    }
                },1000)
            },
            init(){
                this.manifest = [
                    {id:"stamp",src:'static/stamp.png'},
                    {id:"paper",src:'static/paper.png'},
                    {id:"paper_1",src:'static/paper_1.png'},
                    {id:"paper_2",src:'static/paper_2.png'},
                    {id:"paper_3",src:'static/paper_3.png'},
                    {id:"paper_4",src:'static/paper_4.png'},
                    {id:"paper_5",src:'static/paper_5.png'},
                    {id:"paper_6",src:'static/paper_6.png'},
                    {id:'stamp_1',src:'static/stamp_1.png'}
                ];
                var self = this;
                this.preLoad(function(){
                    self.startGame();
                });
            },
            preLoad(preLoadSuccess){
                var self = this;
                //舞台初始化
                self.setStage();
                //预加载资源
                self.loadImg(self.manifest,preLoadSuccess);
            },
            startGame(){
                this.readyShow = true;
                this.loading = false;

                this.createPaper('paper',0,0,this.stage);
                this.createContainer(0,0,this.stage);
                this.stamp = this.bitmap('stamp');
                this.stamp.x=570;
                this.stamp.y=800;
                this.stage.addChild(this.stamp);
                this.stamp.regX=this.stamp.width>>1;
                this.stamp.regY=this.stamp.height>>1;

            },
            // 创建纸张
            createPaper(str,px,py,father){
                var paw_gun = this.bitmap(str);
                paw_gun.x=px;
                paw_gun.y=py;
                father.addChild(paw_gun);
            },
            // 创建container
            createContainer(px,py,father){
                var layer = new createjs.Container();
                layer.x=px;
                layer.y=py;
                father.addChildAt(layer,1);
                if(this.paperIndex>=6){
                    this.paperIndex=0;
                }
                this.paperIndex++;
                let paperName = `paper_${this.paperIndex}`
                this.createPaper(paperName,0,0,layer);
                this.containerArr.push(layer);
            },
            // 设置舞台
            setStage(){
                var canvasId = document.getElementById('myCanvas');
                var scale = canvasId.offsetWidth/canvasId.offsetHeight;
                canvasId.width=750;
                canvasId.height=750/scale;

                var stage = this.stage = new createjs.Stage(canvasId);
                createjs.Touch.enable(stage);
                createjs.Ticker.setFPS(60);
                createjs.Ticker.timingMode = createjs.Ticker.RAF;
                createjs.Ticker.addEventListener("tick", stage);
                // createjs.Ticker.addEventListener("tick", this.showFps);
                // 舞台点击
                stage.addEventListener('click',this.clickCanvas);
            },

            loadImg(manifest,cb){
                var queue = this.queue = new createjs.LoadQueue(false);
                queue.on("complete", handleComplete, this);
                queue.on('progress',handleProgress,this);
                queue.loadManifest(manifest);
                function handleComplete() {
                    console.log('图片加载成功');
                    cb();
                }
                function handleProgress(e){
                    this.loadNum = parseInt(parseFloat(e.loaded).toFixed(2)*100)+'%';
                }
            },

            bitmap(id){
                var bitmap = new createjs.Bitmap(this.queue.getResult(id));
                bitmap.width=bitmap.image.width;
                bitmap.height=bitmap.image.height;
                return bitmap;
            },

            clickCanvas(){
                if(this.isCanClick){
                    this.isCanClick = false;
                    this.moveTween(this.stamp,1000,300,800,300,()=>{
                        let len = this.containerArr.length;
                        this.createPaper('stamp_1',360,850,this.containerArr[len-1]);
                        this.createContainer(0,0,this.stage);
                    },()=>{
                        this.paperMoveTween(this.containerArr[0],-750,500,0);
                        if(this.cutDownTime<=0){
                            this.isCanClick = false;
                        }else{
                            this.isCanClick = true;
                        }
                    });
                }
            },

            moveTween(target,y,time,y2,time2,cb,cb2){
                this.tween=createjs.Tween.get(target)
                    .to({y:y,scaleX:0.7,scaleY:0.7},time)
                    .call(function(){
                        if(cb)cb();
                    }).to({y:y2,scaleX:1,scaleY:1},time2).call(function(){
                        if(cb2){
                            cb2();
                        }
                    })
            },

            paperMoveTween(target,x,time,cb,index){
                createjs.Tween.get(target)
                    .to({x:x},time)
                    .call(()=>{
                       if(target.parent){
                            target.parent.removeChild(target);
                            this.containerArr.splice(0,1);
                       }
                    })
            }
        },
        beforeDestroy(){
            if(this.homeTime){
                clearInterval(this.homeTime);
                this.homeTime = null;
            }
            if(this.stage)
            {
                createjs.Tween.removeAllTweens();
                this.stage.removeEventListener('click',this.clickCanvas);
                this.stage.removeChild();
            }
        }
    }
</script>

<style scoped>
    .home{
        background-color: rgb(255,103,66);
        position:absolute;
        display: flex;
        top:0;
        left: 0;
        width:100%;
        height: 100%;
        flex-wrap: wrap;
    }
    .homeLoading{
        position: absolute;
        z-index: 100;
        left:0;
        top: 0;
    }
    .cutDownTime{
        width: 1.22rem;
        height: 1.22rem;
        background-color: rgb(242,206,0);
        border: 3px solid rgb(59,48,45);
        border-radius: 50%;
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.7rem;
        color: rbg(76,45,28);
    }
    .fps{
        position: absolute;
        right: 0;
        top: 0;
        width: 100px;
        height: 80px;
        text-align: center;
        font-size: 30px;
        background-color: white;
        z-index: 50;
    }
    .logo{
        position: absolute;
        width: 1.11rem;
        left: 0.2rem;
        top: 0.2rem;
    }
    .diamond{
        position: absolute;
        width: 1.24rem;
        left: 2rem;
        top: 0.5rem;
    }
    .magicWand{
        position: absolute;
        width: 0.87rem;
        right: 0rem;
        top: 4em;
    }
    .loading{
        width: 100%;
        height: 100%;
        font-size: 0.5rem;
        color: black;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 101;
        background-color: #ff6843;
    }
    .loadigWord{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
    }
</style>
