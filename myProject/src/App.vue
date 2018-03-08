<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <dialogs v-if="states"></dialogs>
    </transition>
    <keep-alive :include="['daily']">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import dialogs from './components/dialog'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  computed:{
    ...mapGetters([
      'states'
    ])
  },
  components: {
    dialogs:dialogs
  },
}
</script>

<style>
 /* !* 公共变量 *!
  !* 文字颜色 *!
  $txtC1:#333333;
  $txtC2:#666666;
  $txtC3:#888888;
  $txtC4:#999999;
  !* border颜色 *!
  $borC1:#e8e8e8;
  !* 背景颜色 *!
  $bacC1:#fff;*/
  body{
    background-color: #efefef;
    -webkit-touch-callout: none;                /* prevent callout to copy image, etc when tap to hold */
    -webkit-text-size-adjust: none;             /* prevent webkit from resizing text to fit */
    -webkit-user-select: none;                  /* prevent copy paste, to allow, change 'none' to 'text' */
  }
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* margin-top:-20px; */
  /* text-align: center; */
  color: #333333;
  /* margin-top:20px; */
  height: 100%;
}
 /* IOS下手机点击出现灰色背景解决方法*/
 *{
   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
   -webkit-tap-highlight-color: transparent;
   outline: none;
   background: none;
   text-decoration: none;
 }
#app input,#app button,#app select{
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  /* placeholder颜色 */
  ::-webkit-input-placeholder { color:#cccccc; } /* chrome */
  ::-moz-placeholder { color:#cccccc; } /* firefox 19+ */
  :-ms-input-placeholder { color:#cccccc; } /* ie */

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
  }
  /* 折叠面板样式 */
  .foldHeader{
    height: .8rem;
    font-size: .3rem;
    color: #333333;
    background: linear-gradient(to bottom, #fff, #f2f2f2);
    line-height: .8rem;
    padding: 0 .3rem;
    display: flex;
    border-bottom: 1px solid #e8e8e8;
  }

  .foldBody{
    background-color: #ffffff;
    /*border-bottom: 1px solid #e8e8e8;*/
  }
  /* 提示弹层样式 */
 .yd-confirm{
   border-radius: 8px;
   overflow: hidden;
 }
 .yd-alert{
   border-radius: 8px;
   overflow: hidden;
 }
 .yd-confirm-ft{
   line-height: .8rem;
   font-size: .3rem;
 }
 .yd-confirm-ft>a.default{
   color: #333333;
 }
 .yd-alert .yd-confirm-bd{
   padding:.6rem .6rem .3rem;
   font-size: .3rem;
   line-height: normal;
 }

 .yd-confirm-ft>a.primary{
   background-color: #ff6633;
   color: #ffffff !important;
 }
 .yd-confirm-hd{
   padding-top: .9rem;
   padding-bottom: .5rem;
   text-align: center;
   font-size: .32rem;
 }
  /* toast样式 */
 .yd-toast{
   border-radius: 50px;
 }
 .yd-toast-none-icon .yd-toast-content{
   font-size: .32rem;
   padding: 0 .2rem .2rem .25rem;
   padding-top: .1rem;
   text-align: center;
 }
</style>
