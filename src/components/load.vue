<template>
    <section class="loadContent">
        <section class="loadCount">
            <img class="rotaAc" src="static/home/loadImg.png" alt="">
            <section>{{loadNum}}</section>
        </section>
    </section>
</template>

<script>
    export default {
        name: "load",
        props:['loadNum']
    }
</script>

<style scoped>
    .loadContent{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(242,158,194);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100000;
        font-size: 0.5rem;
        font-weight: bold;
        color: white;
    }
    .loadCount{
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        width: 2.32rem;
    }
    .loadCount>img{
        width: 2.32rem;
    }
    .loadCount>section{
        width: 100%;
        text-align: center;
        margin-top: .2rem;
    }
    .rotaAc{
        animation: rotate 3s linear infinite;
        animation-fill-mode: both;

    }
    @keyframes rotate{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
        /*100%{*/
            /*transform: rotate(0deg);*/
        /*}*/
    }
</style>
