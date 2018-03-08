<template>
    <div class="indexs">
      <router-view></router-view>
      <nav class="routeStyle">
        <router-link v-for="(item,index) in routers"  :to="{name : item.name}" :key = "item.id" @click.native="choice(index)">
          <div  :class="[indexs === index ? item.icon+'-' : item.icon]"></div>
          <span :class="[indexs === index ? 'fontActive' : '']">{{item.msg}}</span>
        </router-link>
      </nav>
    </div>
</template>

<script>
  export default {
    name: "indexs",
    data() {
      return {
        routers: [
          {
            name: "homePage",
            path: '',
            icon: 'icon-shouye',
            msg: '首页'
          },
          {
            name: "people",
            path: '/people',
            icon: 'icon-renyuanguanli',
            msg: '人员'
          },
          {
            name: "product",
            path: '/product',
            icon: 'icon-huowu',
            msg: '货物'
          },
          {
            name: "performance",
            path: '/performance',
            icon: 'icon-shuju',
            msg: '业绩'
          }
        ],
        indexs: 0
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.indexs = this.routers.findIndex(item => to.name === item.name)

      next()
    },
    created() {
      this.indexs = this.routers.findIndex(item => this.$route.name === item.name)
//      console.log(this.$route.fullPath)
    },
    methods: {
      choice(index) {
        this.indexs = index;
      }
    }
  }
</script>

<style scoped lang="scss">
.indexs{
  height: 100%;
  .routeStyle{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-start;
    background-color: #ffffff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 0 6px #e8e8e8;
    &>a{
      display: inline-block;
      width: 25%;
      height: 1rem;
      &>div{
        font-size: .45rem;
        text-align: center;
        margin-top: .15rem;
        color: #999999;
      }
      &>span{
        display: block;
        text-align: center;
        font-size: .2rem;
        color: #999999;
      }
    }
  }
  .icon-shouye-,.icon-shuju-,.icon-renyuanguanli-,.icon-huowu-{
    font-size: .45rem;
    color: #ff6633 !important;
  }
  .fontActive{
    color: #ff6633 !important;
  }
}
</style>
