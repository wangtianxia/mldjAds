<template>
    <section class="resetGame">
        <img class="bg1" src="static/jigsawAlert/restatGame.png" alt="">
        <section class="restartGame" @click="restartGame"></section>
    </section>
</template>

<script>
    export default {
        name: "resetGame",
        methods:{
            restartGame(){
                this.$emit('resetGame')
            }
        }
    }
</script>

<style scoped>
    .resetGame{
        position: absolute;
        z-index: 111;
        background-color: rgba(0,0,0,.5);
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .bg1{
        width: 3.48rem;
    }
    .restartGame{
        position: absolute;
        left: 3rem;
        top: 7rem;
        z-index: 13;
        width: 1.5rem;
        height: 1.5rem;
    }
</style>