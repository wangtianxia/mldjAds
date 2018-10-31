<template>
    <div class="gameRule">
      <img class="gameRuleImg" @click="closeShowGameRule" src="../../static/partImg/GameRules.png" alt="">
    </div>
</template>
<script type="text/javascript">
    export default {
        data (){
            return {}
        },
        mounted(){

        },
      methods:{
        closeShowGameRule(){
          this.$emit('closeShowGameRule')
        }
      }

    }
</script>
<style>
  .gameRule{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    z-index:100;
    background-color:rgba(0,0,0,.7);
    display:flex;
    -webkit-justify-content: center;
    justify-content: center;
    align-items: center;
  }
  .gameRuleImg{
    width:5.23rem;
    height:7.23rem;
    margin-top: -3.9rem;
  }
</style>
