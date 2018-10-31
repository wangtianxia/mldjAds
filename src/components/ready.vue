<template>
    <section class="readyContent"  @click="startGame">
        <section>
            <img :style="ImgStyle" :src="strPath"/>
        </section>
    </section>
</template>

<script>
export default {
    data(){
        return {
            time:4,
            strPath:"static/starGame.png",
            ImgStyle:{
                width:"5.28rem"  
            },
            isCanClick:true
        }
    },
    methods:{
        startGame(){
            if(this.isCanClick){
                this.isCanClick = false;
                this.time-=1;
                this.ImgStyle = {
                    width:"1.33rem"
                }
                this.strPath = `static/starGame_${this.time}.png`;
                this.timeOut = setInterval(()=>{
                    this.time-=1;
                    if(this.time==0){
                        clearInterval(this.timeOut);
                        this.timeOut = null;
                        this.$emit("closeReady");
                        this.isCanClick = true;
                    }else{
                        this.ImgStyle = {
                        width:"1.33rem"
                    },
                    this.strPath = `static/starGame_${this.time}.png`;
                    }
                },1000)
            }
        }
    }
}
</script>

<style scoped>
    .readyContent{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
    }
    .img_start{
        width: 5.28rem;
    }
</style>
