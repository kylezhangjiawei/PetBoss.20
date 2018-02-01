<template>
  <div class="errMsg">
    {{messages}}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
    export default {
        name: "dialogs",
      data(){
          return{
          }
      },
      computed:{
        ...mapGetters([
          'messages'
        ])
      },
    }
</script>

<style scoped lang="scss">
  .errMsg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    line-height: .28rem;
    padding: .3rem .24rem;
    /*opacity: 0;*/
    /*-webkit-animation:  .2s linear forwards;*/
    /*animation:  .2s linear forwards;*/
    word-break: break-all;
    text-align: center;
    z-index: 2000;
    font-size: .3rem;
    background-color: #cc2200;
    color: #ffffff;
  }
</style>
