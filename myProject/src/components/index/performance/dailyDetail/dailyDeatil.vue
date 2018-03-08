<template>
  <div class="dailyDeatil">
    <header>
      <i class="icon-fanhui" @click="goBack()"></i>
      <span>流水详情</span>
    </header>
    <!-- 内容区域 -->
    <div class="container">
      <div class="itemTop">
        <div v-for="item in allDatas.order_item">
          <div>
            <dl>
              <dt>{{item.name}}</dt>
              <dd>&yen; {{item.price}} X {{item.num}}</dd>
            </dl>
          </div>
          <div>&yen; {{item.total_price}}</div>
        </div>
      </div>
      <div class="itemCenter">
        <p><em>{{allDatas.name}}</em><em>{{allDatas.phone}}</em></p>
        <div>
          <div>
            <span>收银员 : </span>
            <span>{{allDatas.author}}</span>
          </div>
          <div>
            <span>收款方式 : </span>
            <span v-if='allDatas.pay_method === "1"'>现金</span>
            <span v-else-if='allDatas.pay_method === "2"'>刷卡</span>
            <span v-else-if='allDatas.pay_method === "3"'>扫码</span>
            <span v-else-if='allDatas.pay_method === "4"'>储值</span>
            <span v-else>混合</span>
          </div>
        </div>
        <div>
          <div>
            <span>优惠方式 : </span>
            <!--<span>金卡会员卡9.0折</span>-->
            <span v-if='allDatas.card_info.Title && allDatas.card_info.Title !== ""'>{{allDatas.card_info.GoodsDiscount !=="" ? allDatas.card_info.Title+allDatas.card_info.GoodsDiscount+'折':''}} {{allDatas.card_info.ServiceDiscount !== "" ? allDatas.card_info.Title+allDatas.card_info.ServiceDiscount+'折':''}}</span>
          </div>
          <div>
            <span>折扣金额 : </span>
            <span>&yen; {{allDatas.discount_goods_price === null ? '0':allDatas.discount_goods_price}}</span>
          </div>
          <div>
            <span>储值支付 : </span>
            <span>&yen; {{allDatas.balance_price === null ? '0' : allDatas.balance_price}}</span>
          </div>
        </div>
      </div>
      <div class="itemBottom">
        <div>
          <div>
            <span>合计金额 : </span>
            <span>&yen; {{allDatas.total_price}}</span>
          </div>
          <div>
            <span>应收金额 : </span>
            <span>&yen; {{allDatas.amount_price}}</span>
          </div>
        </div>
        <p>
          <span>实收金额 : <em> &yen; {{allDatas.actual_price}}</em></span>
        </p>
      </div>
    </div>
    <!-- 商标 -->
    <div class="footer">
      <span>&copy; 2018 用道云 {{copy}}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "daily-deatil",
    data(){
      return{
        allDatas:'',//所有数据
      }
    },
    computed:{
      ...mapGetters([
        'copy'
      ])
    },
    created() {
      console.log(this.$route.query.plan);
      this.allDatas = this.$route.query.plan;
    },
    methods: {
      /* 返回上一层 */
      goBack() {
        this.$router.go(-1)
      },
    }
  }
</script>

<style scoped lang="scss">
  .dailyDeatil {
    height: 100%;
    overflow: auto;
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
      margin-top: 1rem;
      .itemTop{
        padding-left: .3rem;
        background-color: #ffffff;
        &>div{
          border-bottom: 1px solid #e8e8e8;
          display: flex;
          justify-content: space-between;
          padding-top: .25rem;
          &>div:nth-of-type(1){
            width: 70%;
            &>dl{
              &>dt{
                font-size: .26rem;
                color: #333333;
              }
              &>dd{
                height: .68rem;
                line-height: .68rem;
                font-size: .26rem;
                color: #666666;
              }
            }
          }
          &>div:nth-of-type(2){
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding-right: .3rem;
            font-size: .26rem;
            color: #333333;
          }
        }
        &>div:last-child{
          border-bottom: none;
        }
      }
      .itemCenter{
        margin-top: .12rem;
        background-color: #ffffff;
        padding-left: .3rem;
        &>p{
          font-size: .28rem;
          color: #333333;
          height: .84rem;
          line-height: .84rem;
          &>em:nth-of-type(1){
            margin-right: .2rem;
          }
        }
        &>div:nth-of-type(1){
          border-top: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
          padding: .12rem 0;
          &>div{
            height: .58rem;
            line-height: .58rem;
            &>span:nth-of-type(1){
              display: inline-block;
              width: 1.5rem;
              text-align: right;
              font-size: .28rem;
              color: #999999;
            }
            &>span:nth-of-type(2){
              display: inline-block;
              font-size: .28rem;
              color: #666666;
            }
          }
        }
        &>div:nth-of-type(2){
          padding: .12rem 0;
          &>div{
            height: .58rem;
            line-height: .58rem;
            &>span:nth-of-type(1){
              display: inline-block;
              width: 1.5rem;
              text-align: right;
              font-size: .28rem;
              color: #999999;
            }
            &>span:nth-of-type(2){
              display: inline-block;
              font-size: .28rem;
              color: #666666;
            }
          }
        }
      }
      .itemBottom{
        margin-top: .12rem;
        padding-left: .3rem;
        background-color: #ffffff;
        &>div{
          padding: .12rem 0;
          border-bottom: 1px solid #e8e8e8;
          &>div{
            height: .58rem;
            line-height: .58rem;
            &>span:nth-of-type(1){
              display: inline-block;
              width: 1.5rem;
              text-align: right;
              font-size: .28rem;
              color: #999999;
            }
            &>span:nth-of-type(2){
              display: inline-block;
              font-size: .28rem;
              color: #666666;
            }
          }
        }
        &>p{
          height: .84rem;
          line-height: .84rem;
          text-align: right;
          padding-right: .3rem;
          font-size: .3rem;
          &>span{
            color: #333333;
            &>em{
              font-size: .34rem;
              color: #EC652C;
            }
          }
        }
      }
    }
    .footer {
      font-size: .2rem;
      color: #bbbbbb;
      width: 100%;
      position: absolute;
      bottom: .2rem;
      & > span {
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
