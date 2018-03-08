<template>
  <div class="productDetail">
    <header>
      <i class="icon-fanhui" @click="goBack()"></i>
      <span>详情</span>
    </header>
    <div class="container">
      <div>
        <span>{{allDatas.Name}}</span>
      </div>
      <div>
        <span>商品规格 ：</span>
        <span>{{allDatas.Sku | filterSize}}</span>
      </div>
      <div>
        <span>商品价格 ：</span>
        <span>&yen; {{allDatas.Price}}</span>
      </div>
      <div>
        <span>商品条码 ：</span>
        <span>{{allDatas.Barcode}}</span>
      </div>
      <div>
        <span>剩余库存 ：</span>
        <span>
            {{allDatas.Stock}}
            <span v-if="Number(allDatas.StockWarning) === 1">
              <yd-badge shape="circle" bgcolor="#ff9900" color="#ffffff">饱和</yd-badge>
            </span>
            <span v-if="Number(allDatas.StockWarning) === 2">
              <yd-badge shape="circle" bgcolor="#f20202" color="#ffffff">缺货</yd-badge>
            </span>
            <span v-if="Number(allDatas.AdventWarning) === 1">
              <yd-badge shape="circle" bgcolor="#444444" color="#ffffff">临期</yd-badge>
            </span>
          </span>
        <span class="rights" v-if="allDatas.OverTime">{{allDatas.OverTime}}过期</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "product-detail",
      data(){
          return{
            allDatas:'',
          }
      },
      created(){
          this.allDatas = this.$route.query.plan;
      },
      methods:{
        /* 返回上一层 */
        goBack() {
          this.$router.go(-1)
        },
      },
      filters: {
        // 过滤对象类型的字符串
        filterSize(value) {
          if (value === "null") {
            return value.replace(/null/, " ")
          } else {
            return value.replace(/{|}|"/g, '');
          }
        },
        /* 过滤第二种情况 */
        filterSku(value) {
          if (value === "null") {
            return value.toString().replace(/null/, " ")
          } else {
            return value.toString().replace(/\[|\]|"/g, '');
          }
        },
        // 过滤字数过长的限制
        filterStrLen(value) {
          if(value){
            return (value.length >= 5) ? value.substring(0, 5) + '...' : value;
          }
        },
        filterTest(value) {
          if (value) {
            return value;
          } else {
            return value = "非会员";
          }
        },
        //  过滤时间戳
        filterTime(value) {
          if (value) {
            return (value.length >= 10) ? new Date(parseInt(value) * 1000).toLocaleString().replace(/\//g, "-").substr(0, 10) : value;
          } else {
            console.log("nothing")
          }
        }
      },
    }
</script>

<style scoped lang="scss">
.productDetail{
  overflow: hidden;
  height: 100%;
  & > header {
    height: 1rem;
    font-size: .36rem;
    text-align: center;
    line-height: 1rem;
    background-color: #4B5060;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    color: #ffffff;
    & > i:nth-of-type(1) {
      position: absolute;
      font-size: .42rem;
      left: .28rem;
      color: #ffffff;
    }
  }
  .container{
    background-color: #ffffff;
    margin-top: 1rem;
    padding-left: .3rem;
    &>div:nth-of-type(1){
      padding: .25rem 0 .22rem 0;
      font-size: .3rem;
      color: #333333;
      border-bottom: 1px solid #e8e8e8;
    }
    &>div:nth-of-type(2),&>div:nth-of-type(3),&>div:nth-of-type(4),&>div:nth-of-type(5){
      height: .8rem;
      line-height: .8rem;
      border-bottom: 1px solid #e8e8e8;
      font-size: .28rem;
      padding-right: .3rem;
    }
    &>div:nth-of-type(5){
      position: relative;
    }
    .rights{
      position: absolute;
      right: .3rem;
      top: 30%;
        display: inline-block;
        font-size: .24rem;
        color: #999999;
        background-color: #e8e8e8;
        border-radius: 5px;
        padding: 0 .1rem;
        height: .34rem;
        line-height: .34rem;
    }
  }
}
</style>
<style lang="scss">
  .productDetail{
    .yd-badge{
      margin-left: .1rem;
      font-size: .2rem;
      border-radius: 5px;
      padding: 0 .05rem;
    }
  }
</style>
