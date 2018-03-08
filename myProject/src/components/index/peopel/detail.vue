<template>
    <div class="detail">
      <header>
        <i class="icon-fanhui" @click="goBack()"></i>
        <span>{{allDatas.StaffName}}</span>
      </header>
      <!-- 内容区域 -->
      <div class="container">
        <!-- 人员基础信息 -->
        <div class="headerMsg">
          <div>
            <span>
              <img :src=allDatas.StaffUrl alt="" v-if="allDatas.StaffUrl">
              <i class="icon-meirongshi" v-if='allDatas.StaffUrl === ""'></i>
            </span>
            <span>
              <dl>
                <dt>{{allDatas.StaffName}}</dt>
                <dd>{{allDatas.JobNumber}}</dd>
              </dl>
            </span>
          </div>
          <div>
          <span>{{allDatas.JobName}}</span>
          </div>
        </div>
        <!-- 本月绩效统计 -->
        <div class="performance">
          <p>
            <span>
              <span>本月绩效统计</span>
              <span>本月总销售额排名</span>
            </span>
            <span>
              {{Number(allDatas.indexs)+1}}
            </span>
          </p>
          <div>
            <div>
              <dl>
                <dt>商品销售额</dt>
                <dd>{{allDatas.AllPriceGoods}}</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>服务销售额</dt>
                <dd>{{allDatas.AllPriceService}}</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>总销售额</dt>
                <dd>{{allDatas.AllPrice}}</dd>
              </dl>
            </div>
          </div>
          <!--<p>-->
            <!--<span>-->
              <!--<span>历史绩效统计</span>-->
              <!--<span>历史总销售额排名</span>-->
            <!--</span>-->
            <!--<span>-->
              <!--3-->
            <!--</span>-->
          <!--</p>-->
          <!--<div>-->
            <!--<div>-->
              <!--<dl>-->
                <!--<dt>商品销售额</dt>-->
                <!--<dd>1075.2</dd>-->
              <!--</dl>-->
            <!--</div>-->
            <!--<div>-->
              <!--<dl>-->
                <!--<dt>服务销售额</dt>-->
                <!--<dd>1075.2</dd>-->
              <!--</dl>-->
            <!--</div>-->
            <!--<div>-->
              <!--<dl>-->
                <!--<dt>总销售额</dt>-->
                <!--<dd>1075.2</dd>-->
              <!--</dl>-->
            <!--</div>-->
          <!--</div>-->
        </div>
        <!-- 创建日期，当前状态，备注 -->
        <div class="item">
          <p>
            <span>创建日期</span>
            <span>{{allDatas.CreateDate}}</span>
          </p>
          <p>
            <span>当前状态</span>
            <span v-if="Number(allDatas.State) === 1">已启用</span>
            <span v-else-if="Number(allDatas.State) === 2">未激活</span>
            <span v-else-if="Number(allDatas.State) === 3">已停用</span>
            <span v-else>已删除</span>
          </p>
          <p v-if="allDatas.Note">
            <span>备注</span>
            <span>{{allDatas.Note}}</span>
          </p>
        </div>
        <!-- 页脚按钮 -->
        <!--<div class="footerButton">
          <button type="button">修改资料</button>
          <button type="button">重置密码</button>
          <button type="button">停用</button>
        </div>-->
        <!--<div class="footerButtonTwo">-->
          <!--<button type="button">删除</button>-->
          <!--<button type="button">启用</button>-->
        <!--</div>-->
      </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
      data(){
          return{
            allDatas:'',//所有数据
          }
      },
      created(){
          this.allDatas = this.$route.query.plan;
      },
      methods:{
        /* 返回上一层 */
        goBack(){
          this.$router.go(-1)
        },
      }
    }
</script>

<style scoped lang="scss">
.detail{
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
    .headerMsg{
      display: flex;
      justify-content: space-between;
      background-color: #ffffff;
      padding: .2rem .3rem;
      height: 1.4rem;
      &>div:nth-of-type(1){
        display: flex;
        &>span:nth-of-type(1){
          width: 1rem;
          height: 1rem;
          border: 1px solid #e8e8e8;
          background-color: #ffefee;
          display: flex;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          border-radius: 8px;
          overflow: hidden;
          &>img{
            width: 100%;
            height: 100%;
          }
          &>i{
            font-size: .66rem;
            color: #F0BDA8;
          }
        }
        &>span:nth-of-type(2){
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-left: .2rem;
          &>dl{
            &>dt{
              font-size: .32rem;
              color: #333333;
              margin-bottom: .15rem;
            }
            &>dd{
              font-size: .3rem;
              color: #666666;
            }
          }
        }
      }
      &>div:nth-of-type(2){
        font-size: .26rem;
        color: #ff6633;
        display: flex;
        justify-content: center;
        flex-direction: column;
        &>span{
          border: 1px dashed #ff6633;
          padding: 0 .15rem;
          border-radius: 10px;
          height: .48rem;
          line-height: .48rem;
        }
      }
    }
    .performance{
      background-color: #ffffff;
      margin-top: .15rem;
      &>p{
        height:.72rem;
        line-height: .72rem;
        padding-left: .3rem;
        border-bottom: 1px solid #e8e8e8;
        display:flex;
        &>span:nth-of-type(1){
          display: flex;
          justify-content:space-between;
          width: calc(100% - .92rem);
          &>span:first-child{
            font-size: .28rem;
            color: #333333;
          }
          &>span:last-child{
            font-size: .26rem;
            color: #999999;
          }
        }
        &>span:nth-of-type(2){
          display: flex;
          width: .92rem;
          justify-content: center;
          font-size: .3rem;
          color: #ff6633;
          background-color: #ffefee;
        }
      }
      &>div{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        &>div{
          padding-bottom: .22rem;
          box-sizing: border-box;
          padding-left: .3rem;
          width: 33%;
          &>dl{
            &>dt{
              height: .62rem;
              line-height: .62rem;
              font-size: .26rem;
              color: #999999;
            }
            &>dd{
              font-size: .32rem;
              color: #333333;
            }
          }
        }
        &>div:nth-of-type(2){
          border-left: 1px solid #e8e8e8;
          border-right: 1px solid #e8e8e8;
        }
        &>div:nth-of-type(3){
          &>dl{
            &>dd{
              color: #ff6633;
            }
          }
        }
      }
      &>div:last-child{
        border-bottom: none;
      }
    }
    .item{
      margin-top: .15rem;
      margin-bottom: 1.18rem;
      background-color: #ffffff;
      padding-left: .3rem;
      &>p{
        display: flex;
        justify-content: space-between;
        height: .9rem;
        line-height: .9rem;
        border-bottom: 1px solid #e8e8e8;
        &>span:nth-of-type(1){
          font-size: .3rem;
          color: #333333;
        }
        &>span:nth-of-type(2){
          font-size: .3rem;
          color: #666666;
          padding-right: .3rem;
        }
      }
      &>p:nth-of-type(2){
        &>span:nth-of-type(2){
          color: #009900;
        }
      }
      &>p:last-child{
        border-bottom: none;
      }
    }
   /* .footerButton{
      height: 1.18rem;
      line-height: 1.18rem;
      background-color: #ffffff;
      display: flex;
      padding-top: .2rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      &>button{
        width: 2.1rem;
        margin-left: .3rem;
        height: .78rem;
        font-size: .34rem;
        color: #333333;
        border-radius: 8px;
        border: 1px solid #999999;
      }
    }
    .footerButtonTwo{
      height: 1.18rem;
      line-height: 1.18rem;
      background-color: #ffffff;
      display: flex;
      padding-top: .2rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      &>button{
        width: 3.3rem;
        height: .78rem;
        margin-left: .3rem;
        font-size: .34rem;
        color: #333333;
        border-radius: 8px;
        border: 1px solid #999999;
      }
    }*/
  }
}
</style>
