<template>
  <div class="people">
    <header>
      <span>绩效统计</span>
      <i>员工管理</i>
    </header>
    <div class="container">
      <!-- 查询，自定义 -->
      <div class="choiceYourSelf">
        <div>
          <span>全部</span>
          <span>本月</span>
          <span>上月</span>
          <span>自定义</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "people",
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="scss">

  .people {
    height: 100%;
    overflow: auto;
    margin-bottom: 1rem;
    &>header {
      height: 1rem;
      font-size: .36rem;
      border-bottom: 1px solid #e8e8e8;
      text-align: center;
      line-height: 1rem;
      background-color: #4B5060;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      color: #ffffff;
    &>i:nth-of-type(1) {
      position: absolute;
      font-size: .3rem;
      right: .28rem;
      color: #ffffff;
    }
    }
    .container{
      margin-top: 1rem;
      .choiceYourSelf{
        &>div{
          background-color: #ffffff;
          padding: .12rem 0;
          &>span{
            display: inline-block;
            text-align: center;
            width: 1.5rem;
            height: .7rem;
            background-color: #f0f0f0;
            /*border: 1px solid #4b5060;*/
            box-sizing: border-box;
            margin-left: .3rem;
            border-radius: .08rem;
            line-height: .7rem;
            font-size: .28rem;
          }
        }
      }
    }
  }
</style>
