<template>
    <div class="gameOver">
        <section>
            <img class="over" src="static/gameOver.png"/>
        </section>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .gameOver{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        background-color: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .over{
        width:5.11rem;
    }
</style>
