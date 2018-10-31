<template>
    <div class="playGamePage" :style="{backgroundColor:bgColor}" v-disabletouchmove>
        <canvas id="myCanvas" style="width: 100%;height: 100%"></canvas>
        <section class="loadStage" v-if="showLoad">
            <img src="static/play/loading0.gif" alt="">
            <p>{{loadNum}}</p>
        </section>
    </div>
</template>
<script type="text/javascript">
    import playData from './game/data'
    import gift from './game/item';
    import miss from './game/missnice';
    import score from './game/score';
    import Ajax from '../config/ajax';
    import env from '../config/env';
    import DataManager from '../dataManager/data';
    import MD5 from '../config/md5'

    let tool = require('./game/tools');

    export default {
        data() {
            return {
                score: 0,
                tempIndex: 0,
                time: 1,

                g1_count: 0,
                g2_count: 0,
                g3_count: 0,

                count1: 0,
                count2: 0,
                count3: 0,
                type: 1,

                temp1Se: 0,
                temp2Se: 0,
                temp3Se: 0,
                index: 0,

                bar: '',
                bar1: '',
                bar2: "",
                loadNum: 0,
                showLoad: true,
                bgColor: 'rgb(18,4,56)'
            }
        },
        mounted() {
            this.type = this.$route.params.type;
            this.init();
        },
        methods: {
            init() {
                this.preLoad(() => {
                    let width = this.stage.canvas.width;
                    let height = this.stage.canvas.height;
                    let tools = this.tools = new tool();
                    let gameBg = tools.getImageFromDatas('play_bg', 'game', 1, this.queue);
                    gameBg.x = (width - 1136) / 2;
                    gameBg.y = 0;
                    this.stage.addChild(gameBg);  //背景图片

//                   let logo = this.bitmap('logo', -20, 0, 667, 178);
//                   this.stage.addChild(logo);  //背景
                    this.bar = tools.getImageFromDatas('bar_01', 'game', 1, this.queue);
                    this.bar.x = 40;
                    this.bar.y = 0;
                    this.bar.alpha = 0.7;
                    this.stage.addChild(this.bar);

                    this.bar1 = tools.getImageFromDatas('bar_02', 'game', 1, this.queue);
                    this.bar1.x = 298;
                    this.bar1.y = 0;
                    this.bar1.alpha = 0.7;
                    this.stage.addChild(this.bar1);  //背景

                    this.bar2 = tools.getImageFromDatas('bar_03', 'game', 1, this.queue);
                    this.bar2.x = 553;
                    this.bar2.y = 0;
                    this.bar2.alpha = 0.7;
                    this.stage.addChild(this.bar2);  //背景


                    var container = this.container = new createjs.Container();
                    this.stage.addChild(container);
                    let cricle_01 = tools.getImageFromDatas('cricle_01', 'game', 1, this.queue);
                    cricle_01.x = -10;
                    cricle_01.y = 1030;
                    let cricle_02 = tools.getImageFromDatas('cricle_02', 'game', 1, this.queue);
                    cricle_02.x = 246;
                    cricle_02.y = 1030;
                    let cricle_03 = tools.getImageFromDatas('cricle_03', 'game', 1, this.queue);
                    cricle_03.x = 500;
                    cricle_03.y = 1030;
                    container.addChild(cricle_01);
                    container.addChild(cricle_02);
                    container.addChild(cricle_03);

                    let tempScore = this.tempScore = new score();
                    tempScore.createScore('0', 'number', this.queue, this.container);

                    if (this.type == 1) {
                        this.count1 = 40;
                        this.count2 = 30;
                        this.count3 = 20;
                    } else if (this.type == 2) {
                        this.count1 = 30;
                        this.count2 = 40;
                        this.count3 = 20;
                    } else if (this.type == 3) {
                        this.count1 = 20;
                        this.count2 = 30;
                        this.count3 = 40;
                    }
                    if (this.time > 0) {
                        this.temp1Se = parseInt((60 / this.count1) * 1000);
                        this.temp2Se = parseInt((60 / this.count2) * 1000);
                        this.temp3Se = parseInt((60 / this.count3) * 1000);
                        this.createItem();
                    }


                    this.timeInterval = setInterval(() => {
                        this.time += 1;
                        if (this.type == 1) {
                            this.count1 = 40;
                            this.count2 = 30;
                            this.count3 = 20;
                        } else if (this.type == 2) {
                            this.count1 = 30;
                            this.count2 = 40;
                            this.count3 = 20;
                        } else if (this.type == 3) {
                            this.count1 = 20;
                            this.count2 = 30;
                            this.count3 = 40;
                        }
                        if (this.time > 0 && this.time <= 19) {
                            this.temp1Se = parseInt((60 / this.count1) * 1000);
                            this.temp2Se = parseInt((60 / this.count2) * 1000);
                            this.temp3Se = parseInt((60 / this.count3) * 1000);
                        } else if (this.time > 19 && this.time <= 39) {
                            this.temp1Se = parseInt((60 / this.count1) * 1000);
                            this.temp2Se = parseInt((60 / this.count2) * 1000);
                            this.temp3Se = parseInt((60 / this.count3) * 1000);

                            this.temp1Se = this.temp1Se - this.temp1Se * 0.25;
                            this.temp2Se = this.temp2Se - this.temp2Se * 0.25;
                            this.temp3Se = this.temp3Se - this.temp3Se * 0.25;
                        } else if (this.time > 39) {
                            this.temp1Se = parseInt((60 / this.count1) * 1000);
                            this.temp2Se = parseInt((60 / this.count2) * 1000);
                            this.temp3Se = parseInt((60 / this.count3) * 1000);
                            this.temp1Se = this.temp1Se - this.temp1Se * 0.5;
                            this.temp2Se = this.temp2Se - this.temp2Se * 0.5;
                            this.temp3Se = this.temp3Se - this.temp3Se * 0.5;
                        }
                        if (this.time == 20) {
                            this.createItem();
                        }
                        if (this.time == 40) {
                            this.createItem();
                        }
                        if (this.time >= 60) {
                            clearInterval(this.timeInterval);
                            this.timeInterval = null;

                            clearInterval(this.interval1);
                            this.interval1 = null;
                            clearInterval(this.interval2);
                            this.interval2 = null;
                            clearInterval(this.interval3);
                            this.interval3 = null;

                            let conplete = tools.getImageFromDatas('conplete', 'game', 1, this.queue);
                            conplete.regX = conplete.width >> 1;
                            conplete.regY = conplete.height >> 1;
                            conplete.x = (width - conplete.width) / 2 + conplete.width / 2 - this.stage.x;  //+conplete.width/2
                            conplete.y = (height - conplete.height) / 2 - 200;
                            conplete.scaleX = 0;
                            conplete.scaleY = 0;
                            container.addChild(conplete);
                            createjs.Tween.get(conplete).wait(4000)
                                .to({scaleX: 1, scaleY: 1}, 1000).call(() => {
                                new Ajax().sendJSON('http://123.206.205.184:3001' + '/mldjRecordScore', {
                                    user_id: DataManager.user_id,
                                    score: this.score,
                                    sign: MD5.makeSign({
                                        score: this.score,
                                        user_id: DataManager.user_id,
                                    })
                                }, (res) => {
                                    setTimeout(() => {
                                    this.$router.push(`/result/${this.type}/${this.score}`)
                                    }, 1000);
                                });
                                createjs.Tween.get(conplete, {loop: true})
                                    .to({alpha: .3}, 500)
                                    .to({alpha: 1}, 500);

                            });
                        }
                    }, 1000);


                    let get_btn = tools.getImageFromDatas('get_btn', 'game', 1, this.queue);
                    get_btn.x = 750 - 386;
                    get_btn.y = height - 141;
                    get_btn.addEventListener('click', function () {
                        new Ajax().sendJSON('http://123.206.205.184:3001' + '/auBehavior', {
                            user_id: DataManager.user_id,
                            bid: DataManager.bid,
                            group_openid: DataManager.group_openid,
                            type: 11,
                            ad_id: DataManager.ad_id,
                            sign: MD5.makeSign({
                                user_id: DataManager.user_id,
                                bid: DataManager.bid,
                                group_openid: DataManager.group_openid,
                                type: 11,
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

                    });
                    container.addChild(get_btn);
                    let ncs_info = tools.getImageFromDatas('ncs_info', 'game', 1, this.queue);
                    ncs_info.x = 0;
                    ncs_info.y = height - 100;
                    container.addChild(ncs_info);
                })
            },

            createItem() {
                clearInterval(this.interval1);
                this.interval1 = null;

                clearInterval(this.interval2);
                this.interval2 = null;

                clearInterval(this.interval3);
                this.interval3 = null;

                if (!this.interval1) {
                    this.interval1 = setInterval(() => {
                        this.index += 1;
                        let item = new gift();
                        item.createItem('bar_01_gift', this.queue, 120, 0, this.container, (state) => {
                            if (state) {
                                this.tempIndex += 1;
                                this.tempScore.updateScore(this.score += this.tempIndex);

                                new miss().createItem('nice', this.queue, this.container, this.tempIndex);
                                this.changeBg();
                            } else {
                                this.tempIndex = 0;
                                new miss().createItem('miss', this.queue, this.container);
                            }
                            this.bar.alpha = 1;
                            setTimeout(() => {
                                this.bar.alpha = 0.7;
                            }, 200);

                        });
                    }, this.temp1Se);
                }
                if (!this.interval2) {
                    this.interval2 = setInterval(() => {
                        let item = new gift();
                        item.createItem('bar_02_gift', this.queue, 376, 0, this.container, (state) => {
                            if (state) {
                                this.tempIndex += 1;
                                this.tempScore.updateScore(this.score += this.tempIndex)

                                new miss().createItem('nice', this.queue, this.container, this.tempIndex);
                                this.changeBg();
                            } else {
                                this.tempIndex = 0;
                                new miss().createItem('miss', this.queue, this.container);
                            }
                            this.bar1.alpha = 1;
                            setTimeout(() => {
                                this.bar1.alpha = 0.7;
                            }, 200)

                        });
                    }, this.temp2Se);
                }

                if (!this.interval3) {
                    this.interval3 = setInterval(() => {
                        let item = new gift();
                        item.createItem('bar_03_gift', this.queue, 630, 0, this.container, (state) => {
                            if (state) {
                                this.tempIndex += 1;
                                this.tempScore.updateScore(this.score += this.tempIndex);

                                new miss().createItem('nice', this.queue, this.container, this.tempIndex);
                                this.changeBg();
                            } else {
                                this.tempIndex = 0;
                                new miss().createItem('miss', this.queue, this.container);
                            }
                            this.bar2.alpha = 1;
                            setTimeout(() => {
                                this.bar2.alpha = 0.7;
                            }, 200);
                        });
                    }, this.temp3Se)
                }
            },

            changeBg() {
                if (this.type == 2 && this.score >= 50) {
                    if (this.stage.children[0]['alpha'] == 1) {
                        this.removeBg('play_bg_01','#f4c0c8')
                    }
                } else if (this.type == 1 && this.score >= 50) {
                    if (this.stage.children[0]['alpha'] == 1) {
                        this.removeBg('play_bg_02','#a32533')
                    }
                } else if (this.type == 3 && this.score >= 50) {
                    if (this.stage.children[0]['alpha'] == 1) {
                        this.removeBg('play_bg_03','#00abab')
                    }
                }
            },

            removeBg(id,color){
                createjs.Tween.get(this.stage.children['0'])
                    .to({alpha: 0}, 1000).call(() => {
                    this.stage.removeChild(this.stage.children['0']);
                    let bg1 = this.tools.getImageFromDatas(id, 'game', 1, this.queue);
                    bg1.x = 0;
                    bg1.y = 0;
                    bg1.alpha = 0;
                    this.bgColor = color;
                    createjs.Tween.get(bg1)
                        .to({alpha: 0.99}, 1500).call(() => {
                    });
                    this.stage.addChildAt(bg1, 0);
                })
            },



            preLoad(preLoadSuccess) {
                var self = this;
                //舞台初始化；
                self.setStage();
                self.loadImg(playData, preLoadSuccess);
            },
            //设置舞台
            setStage() {
                let canvasId = document.getElementById('myCanvas');
                let scale = canvasId.offsetWidth / canvasId.offsetHeight;
                canvasId.width = 1460 * scale;
                canvasId.height = 1460;
                let stage = this.stage = new createjs.Stage(canvasId);
                stage.x = (canvasId.width - 750) / 2;
                createjs.Touch.enable(stage);
                createjs.Ticker.setFPS(60);
                createjs.Ticker.timingMode = createjs.Ticker.RAF;
                createjs.Ticker.addEventListener("tick", stage);

            },

            loadImg(manifest, cb) {
                var queue = this.queue = new createjs.LoadQueue(false);

                queue.installPlugin(createjs.Sound);
                if (this.type == 1) {
                    queue.loadFile({id: "sound", src: "static/music/music1.mp3"});
                } else if (this.type == 2) {
                    queue.loadFile({id: "sound", src: "static/music/music2.mp3"});
                } else {
                    queue.loadFile({id: "sound", src: "static/music/music3.mp3"});
                }

                queue.loadManifest(manifest);
                queue.on("complete", handleComplete, this);
                queue.on('progress', handleProgress, this);

                function handleComplete() {
                    this.showLoad = false;
                    var myInstance = createjs.Sound.play("sound");
                    myInstance.on("complete", () => {
//                         this.$router.push(`/result/${this.type}/${this.score}`)
                    });
                    console.log('图片加载成功');
                    cb();
                }

                function handleProgress(e) {
                    this.loadNum = parseInt(parseFloat(e.loaded).toFixed(2) * 100) + '%';
                }
            },
            bitmap(id, x, y, w, h) {
                let getId = this.queue.getResult(id);
                let bitmap = new createjs.Bitmap(getId);
                bitmap.width = w;
                bitmap.height = h;
                bitmap.x = x;
                bitmap.y = y;
                return bitmap;
            },
        },

        beforeDestroy() {
            if (this.stage) {
                createjs.Tween.removeAllTweens();
                this.stage.removeAllChildren();
                this.stage.removeAllEventListeners();
            }

            if (this.timeInterval) {
                clearInterval(this.timeInterval)
                this.timeInterval = null;
            }
            createjs.Sound.stop();
            if (this.type == 1) {
                createjs.Sound.removeAllSounds('static/music/music1.mp3');
            } else if (this.type == 2) {
                createjs.Sound.removeAllSounds('static/music/music2.mp3');
            } else {
                createjs.Sound.removeAllSounds('static/music/music3.mp3');
            }

            clearInterval(this.interval1);
            this.interval1 = null;

            clearInterval(this.interval2);
            this.interval2 = null;

            clearInterval(this.interval3);
            this.interval3 = null;

            this.queue = null;
        }
    }
</script>
<style>
    .playGamePage {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        /*background-color: rgb(18,4,56);*/
    }

    .test {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loadStage {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        background-color: #fbfbfb;
        flex-wrap: wrap;
        align-content: center;
    }
    .loadStage>p{
        color: #6646ee;
        width: 100%;
        text-align: center;
    }
    .loadStage>img{
        width: 2.9rem;
    }
</style>
