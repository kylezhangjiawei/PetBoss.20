<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
