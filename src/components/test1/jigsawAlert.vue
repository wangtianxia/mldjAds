<template>
    <section class="jigsawAlertContent">
        <!--<img class="sucess" src="static/partImg/success.png" alt="">-->
        <transition-group enter-active-class="animated  fadeIn" leave-active-class="animated fadeOut">
            <img v-show="showAlert2" :class="[alert2Class]" :src="alert2" :key="1" alt="">
            <img v-show="showAlert3" :class="[alert3Class]" :src="alert3" :key="2" alt="">
            <img v-show="showAlert4" :class="[alert4Class]" :src="alert4" :key="3" alt="">
        </transition-group>
        <img class="bg" :src="bg" alt="">
        <section class="bottom">
            <img src="static/partImg/success_btn_left.png" @click="click(0)" alt="">
            <img src="static/partImg/success_btn_right.png" @click="click(1)" alt="">
        </section>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                bg: '',
                alert2: '',
                alert3: '',
                alert4: '',
                showAlert2: false,
                showAlert3: false,
                showAlert4: false,


                alert2Class:'',
                alert3Class:'',
                alert4Class:''
            }
        },
        mounted() {
            let type = this.$route.params.type || 0;
            if (type == 0) {
                this.bg = 'static/jigsawAlert/alert1_1.png';
            } else if (type == 1) {
                this.bg = 'static/jigsawAlert/alert2_1.png';
            } else {
                this.bg = 'static/jigsawAlert/alert3_1.png';
            }

            setTimeout(() => {
                this.showAlert2 = true;
                if (type == 0) {
                    this.alert2 = 'static/jigsawAlert/alert1_2.png';
                    this.alert2Class = 'alert1_2'
                } else if (type == 1) {
                    this.alert2 = 'static/jigsawAlert/alert2_2.png';
                    this.alert2Class = 'alert2_2';
                } else {
                    this.alert2 = 'static/jigsawAlert/alert3_2.png';
                    this.alert2Class = 'alert3_2';
                }
            }, 500);


            setTimeout(() => {
                this.showAlert3 = true;
                if (type == 0) {
                    this.alert3 = 'static/jigsawAlert/alert1_3.png';
                    this.alert3Class = 'alert1_3';
                } else if (type == 1) {
                    this.alert3 = 'static/jigsawAlert/alert2_3.png';
                    this.alert3Class = 'alert2_3'
                } else {
                    this.alert3 = 'static/jigsawAlert/alert3_3.png';
                    this.alert3Class = 'alert3_3';
                }
            }, 800);

            setTimeout(() => {
                this.showAlert4 = true;
                if (type == 0) {
                    this.alert4 = 'static/jigsawAlert/alert1_4.png';
                    this.alert4Class = 'alert1_4'
                } else if (type == 1) {
                    this.alert4 = 'static/jigsawAlert/alert2_4.png';
                    this.alert4Class = 'alert2_4';
                } else {
                    this.alert4 = 'static/jigsawAlert/alert3_4.png';
                    this.alert4Class = 'alert3_4';
                }
            }, 1100);
        },
        methods: {
            click(index) {
                if (index == 0) {
                    this.$router.replace('/selectType')
                }
                if (index == 1) {
                    this.$router.replace('/lastPage')
                }
            }
        }
    }
</script>
<style scoped>
    .jigsawAlertContent {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 111;
        left: 0;
        top: 0;
    }

    .bg {
        width: 100%;
        position: absolute;
        top: 0;
    }

    .alert1_2 {
        position: absolute;
        width: 3.18rem;
        left: 0.5rem;
        top: 1rem;
        animation-duration: 0.5s;
        z-index: 2;
    }
    .alert1_3{
        position: absolute;
        width: 3.15rem;
        right: 0.3rem;
        top: 3.3rem;
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        z-index: 2;
    }

    .alert1_4{
        position: absolute;
        width: 2.88rem;
        left: 0.9rem;
        top: 4.6rem;
        animation-duration: 0.5s;
        z-index: 2;
    }



    .alert2_2 {
        position: absolute;
        width: 3.18rem;
        left: .5rem;
        top: 2rem;
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        z-index: 2;
    }
    .alert2_3{
        position: absolute;
        width: 3.15rem;
        right: 0.3rem;
        top: 3.3rem;
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        z-index: 2;
    }

    .alert2_4{
        position: absolute;
        width: 2.88rem;
        left: .7rem;
        top: 5.2rem;
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        z-index: 2;
    }


    .alert3_2 {
        position: absolute;
        width: 3.18rem;
        left: 0.5rem;
        top: 1.5rem;
        animation-duration: 0.5s;
        z-index: 2;
    }
    .alert3_3{
        position: absolute;
        width: 3.15rem;
        right: 0.5rem;
        top: 4.1rem;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        z-index: 2;
    }

    .alert3_4{
        position: absolute;
        width: 2.88rem;
        left: 0.3rem;
        top: 4.5rem;
        animation-duration: 0.5s;
        z-index: 2;
    }


    .alert3 {
        position: absolute;
        width: 3.15rem;
        right: 0.5rem;
        top: 4rem;
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        z-index: 2;
    }


    .alert4 {
        position: absolute;
        width: 2.88rem;
        left: .4rem;
        top: 4.5rem;
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        z-index: 2;
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

    .sucess {
        position: absolute;
        left: 3.4rem;
        top: 1.3rem;
        width: 3.45rem;
        z-index: 1;
    }
</style>
