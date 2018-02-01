<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <dialogs v-if="states"></dialogs>
    </transition>
    <router-view/>
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
  body{
    background-color: #efefef;
  }
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* margin-top:-20px; */
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top:20px; */
  height: 100%;
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
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
  }
  .foldBody{
    background-color: #ffffff;
    padding: 0 .3rem;
    border-bottom: 1px solid #e8e8e8;
  }
</style>
