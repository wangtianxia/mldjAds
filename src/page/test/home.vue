<template>
    <div class="home">
        <img class="homeBg" :src="homeImg" alt="">
        <img v-if="home1.length!=0" class="home1" :src="home1" alt="">
        <img class="home_logo" :src="home_logo" alt="">
        <section class="home11 animated bounceInLeft">
            <img v-if="home5.length!=0" class="home11Img" :src="home5" alt="">
            <img class="home13" v-if="home6" :src="home6" alt="">
        </section>

        <section v-if="home2.length!=0" class="home2  animated fadeInRight">
            <img class="home2Img" :src="home2" alt="">
            <img v-if="wordsGift.length!=0" class="home2Img2" :src="wordsGift" alt="">
        </section>
        <section v-if="computer.length!=0" class="home3 animated fadeInRight">
            <img class="computer" :src="computer" alt="">
            <img class="computer1 animated flash" :src="computer1" alt="">
        </section>
        <img class="moveAc" v-if="moveAc.length!=''" :src="moveAc" alt="">

        <transition enter-active-class="animated fadeIn" -active-class leave-active-class="animated fadeOut">
            <load class="loadCss" :loadNum="loadNum" v-if="showLoad"></load>
        </transition>

    </div>
</template>
<script type="text/javascript">
    import allHomeImg from '../../config/img';
    import load from '../../components/load';

    export default {
        data() {
            return {
                homeImg: '',
                home1: '',
                home5: "",
                home2: '',
                count: 0,
                computer: '',
                computer1: "",
                home6: '',
                wordsGift: '',
                moveAc: "",
                countIndex:0,
                showLoad:true,
                loadNum:''
            }
        },

        mounted() {
            let totalImg = allHomeImg.home;
            for(let i in totalImg){
                let img = new Image();
                img.src = totalImg[i];
                img.onload =  ()=> {
                    this.countIndex+=1;
                    console.log(this.countIndex,totalImg.length)
                    this.loadNum = parseInt((this.countIndex/totalImg.length)*100)+'%';
                    if(this.countIndex == totalImg.length-1){
                        this.start();
                        this.showLoad = false
                    }
                }
            }
        },

        methods: {
            start(){
                this.homeImg = 'static/home/bg.jpg';
                this.home1 = `static/home/home1.png`;
                this.home_logo =`static/home/mldjLog.png`;
                setTimeout(() => {
                    this.home5 = `static/home/home5.png`;
                }, 800);
                //邮件
                setTimeout(() => {
                    this.home2 = `static/home/home2.png`;
                    this.home6 = `static/home/home6.png`;
                    this.computer = `static/home/home3.png`;
                    this.computer1 = `static/home/home4.png`;
                }, 900);

                // //数字移动
                setTimeout(() => {
                    this.wordsGift = 'static/home/font.gif'
                }, 1000);

                setTimeout(() => {
                    this.home6 = `static/home/home6.png`;
                }, 2000);

                setTimeout(() => {
                    this.wordsGift = 'static/home/font1.png'
                }, 7000);

                setTimeout(() => {
                    this.moveAc = 'static/home/move.gif'
                }, 7000);

                setTimeout(() => {
                    this.moveAc = 'static/home/move2.png';
                }, 11550);
                setTimeout(() => {
                    this.$router.replace('/home2');
                }, 13800);
            }

        },

        components:{
            load
        },

        destroyed() {
            clearInterval(this.interval);
            this.interval = null;
        },
    }
</script>
<style scoped>
    .home {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: rgb(254,144,169);
    }

    .homeBg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1;
    }

    .home1 {
        width: 2.51rem;
        height: 2.51rem;
        position: absolute;
        right: 0.2rem;
        top: 0.5rem;
        z-index: 2;
        animation: home1Ac 0.5s ease;
        animation-fill-mode: both;
    }

    @keyframes home1Ac {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }

    .home11 {
        position: absolute;
        left: 0;
        top: 3.5rem;
        width: 3.42rem;
        height: 5.73rem;
        z-index: 2;
        animation-duration: 2s
    }

    .home11Img {
        width: 3.42rem;
        height: 5.73rem;
    }

    .home2 {
        position: absolute;
        right: 0;
        top: 2rem;
        width: 4.56rem;
        z-index: 1;
    }

    .home2Img {
        width: 4.56rem;
    }

    .home2Img2 {
        width: 3.98rem;
        position: absolute;
        top: 0;
        left: 0.5rem;
    }

    .home3 {
        position: absolute;
        right: 0.2rem;
        top: 50%;
        z-index: 3;
        width: 3.04rem;
        height: 3.59rem;
    }

    .computer {
        position: absolute;
        width: 3.04rem;
        left: 0;
        top: 0;
        height: 3.59rem;
    }

    .computer1 {
        position: absolute;
        left: 1rem;
        top: 0.9rem;
        width: 0.99rem;
        animation: computer1Ac .5s infinite;
    }

    @keyframes computer1Ac {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .home13 {
        position: absolute;
        width: 0.88rem;
        z-index: 5;
        left: 1.4rem;
        top: 1.1rem;
        animation: home13Ac .5s infinite;
    }

    @keyframes home13Ac {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .newImgAc {
        position: absolute;
        width: 100%;
        bottom: -5rem;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        /*transition: 0.1s all;*/
        /*transform: skewX(-30deg);*/
        /*transform: skewY(-30deg);*/
    }

    .newImgAc > section {
        width: 100%;
        text-align: center;
    }

    .home5 {
        width: 4.26rem;
    }

    .home6 {
        width: 4.82rem;
    }

    .home7, .home8 {
        width: 4.33rem;
    }

    .home9 {
        width: 6.69rem;
    }

    .fontActionContainer {
        width: 0;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 33;
        text-align: center;
        perspective: 500px;

    }

    .fontActionContainer img {
        text-align: center;
    }

    .imgShow1 {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        width: 4.26rem;
        height: .94rem;
        animation: imgShow1 2s;
    }

    .imgShow2 {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        width: 4.26rem;
        height: .94rem;
        animation: imgShow1 2s;
    }

    .imgShow3 {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        width: 4.26rem;
        height: .94rem;
        animation: imgShow1 2s;
    }

    .imgShow4 {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        width: 4.26rem;
        height: .94rem;
        animation: imgShow1 2s;
    }

    .imgShow5 {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        width: 4.26rem;
        height: .94rem;
        animation: imgShow1 2s;
    }

    .imgShow6 {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        width: 4.26rem;
        height: .94rem;
        animation: imgShow1 2s;
    }

    @keyframes imgShow1 {
        0% {
            opacity: 1;
            transform: translate(0px, 0px) rotateZ(3deg) scale(1.5) skew(1deg, 2deg);
        }
        100% {
            opacity: 0.5;
            transform: translate(0px, -200px) rotateZ(3deg) scale(.5) skew(1deg, 2deg);
        }
    }

    .moveAc {
        width: 100%;
        height: 4.28rem;
        position: absolute;
        left: 0;
        bottom: 1.5rem;
        z-index: 100;
    }
    .loadCss{
        animation-duration: 0.5s;
    }
  .home_logo{
    width:2.97rem;
    /*height:.97rem;*/
    position:absolute;
    top:.3rem;
    left:.25rem;
    z-index: 1;
  }

</style>
