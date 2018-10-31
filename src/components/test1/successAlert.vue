<template>
    <div class="successBox">
      <img class="successImg" @click="closeSuccessInfo" src="../../static/partImg/success.png" alt="">
    </div>
</template>
<script type="text/javascript">
    export default {
        data (){
            return {}
        },
        methods:{
          closeSuccessInfo(){
              this.$emit('closeSuccessInfo')
          }
        }
    }
</script>
<style>
.successBox{
  width:100%;
  height:100%;
  background:rgba(0,0,0,.6);
  position:absolute;
  top:0;
  left:0;
  z-index:100;
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
