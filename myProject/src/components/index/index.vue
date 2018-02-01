<template>
    <div class="indexs">
      <router-view></router-view>
      <nav class="routeStyle">
        <router-link v-for="(item,index) in routers"  :to="{name : item.name}" :key = "item.id">
          <div :class="item.icon"></div>
          <span>{{item.msg}}</span>
        </router-link>
      </nav>
    </div>
</template>

<script>
    export default {
        name: "indexs",
        data(){
          return{
            routers:[
              {
                name:"homePage",
                path:'',
                icon:'icon-shouye',
                msg:'首页'
              },
              {
                name:"people",
                path:'/people',
                icon:'icon-renyuanguanli',
                msg:'人员'
              },
              {
                name:"product",
                path:'/product',
                icon:'icon-huowu',
                msg:'货物'
              },
              {
                name:"performance",
                path:'/performance',
                icon:'icon-shuju',
                msg:'业绩'
              }
            ]
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
    &>a{
      display: inline-block;
      width: 25%;
      height: 1rem;
      &>div{
        font-size: .45rem;
        text-align: center;
        margin-top: .15rem;
      }
      &>span{
        display: block;
        text-align: center;
        font-size: .2rem;
      }
    }
  }
}
</style>
