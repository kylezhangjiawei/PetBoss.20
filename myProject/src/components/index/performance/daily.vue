<template>
    <div class="daily">
      <header>
        <i class="icon-fanhui" @click="goBack()"></i>
        <span>日报</span>
      </header>
      <!-- 内容区域 -->
      <div class="container">
        <!-- 年月日 -->
        <div class="times">
          <span class="icon-jiantouzuo"></span>
          <span>2018年1月22日</span>
          <span class="icon-jiantouyou"></span>
        </div>
        <!-- 饼状图表 -->
        <div class="pieChart">
          <div>
            <span>
              <em @click="changeCharts(0)" :class="[changeChart === 0 ? 'chartActive':'']">收入</em>
              <em @click="changeCharts(1)" :class="[changeChart === 1 ? 'chartActive':'']">营业额</em>
            </span>
          </div>
          <div>
            <div id="pieCharts" style="width: 100%;height: 305px;"></div>
          </div>
          <div>
            <span>收入合计</span>
            <span>3000</span>
          </div>
          <!--<div>
            <div>
              <span>
                <i class="icon-zhuanru"></i>
                <em>扫码</em>
              </span>
              <span>5000</span>
            </div>
            <div>
              <span>
                <i class="icon-zhuanru"></i>
                <em>刷卡</em>
              </span>
              <span>5000</span>
            </div>
            <div>
              <span>
                <i class="icon-zhuanru"></i>
                <em>现金</em>
              </span>
              <span>1500</span>
            </div>
            <div>
              <span>
                <i class="icon-zhuanru"></i>
                <em>退款</em>
              </span>
              <span>1500</span>
            </div>
          </div>-->
          <div>
            <div>
              <span class="icon-zhuanru"></span>
              <span>
                <dl>
                  <dt>扫码</dt>
                  <dd>5000</dd>
                </dl>
              </span>
            </div>
            <div>
              <span class="icon-zhuanru"></span>
              <span>
                <dl>
                  <dt>刷卡</dt>
                  <dd>5000</dd>
                </dl>
              </span>
            </div>
            <div>
              <span class="icon-zhuanru"></span>
              <span>
                <dl>
                  <dt>现金</dt>
                  <dd>5000</dd>
                </dl>
              </span>
            </div>
          </div>
        </div>
        <!-- 当日清单 -->
        <div class="toDayList">
          <p>当日清单</p>
          <!-- 折叠数据区域 -->
          <fold>
            <span slot="headerLeft">售卖商品清单 <yd-badge shape="circle" bgcolor="#FDDCCE" color="#ec652c">2单</yd-badge></span>
            <span slot="headerRight" @click="test"><i class="icon-shouqi" :class="{'activess':indexs}"></i></span>
            <div slot="body" v-if="indexs">
              <div class="foldBodyStyle">
                <p class="foldOne">
                  <span><em>张三</em><em>18000187588</em></span>
                  <span>10:03:23</span>
                </p>
                <p class="foldTwo">
                  <span>
                    <dl>
                      <dt>辛巴(泰迪)</dt>
                      <dd>洗澡</dd>
                    </dl>
                  </span>
                  <span>
                    <em>关小美</em>
                    <em>&yen;180</em>
                  </span>
                </p>
              </div>
              <div class="foldBodyStyle">
                <p class="foldOne">
                  <span><em>张三</em><em>18000187588</em></span>
                  <span>10:03:23</span>
                </p>
                <p class="foldTwo">
                  <span>
                    <dl>
                      <dt>辛巴(泰迪)</dt>
                      <dd>洗澡</dd>
                    </dl>
                  </span>
                  <span>
                    <em>关小美</em>
                    <em>&yen;180</em>
                  </span>
                </p>
                <p class="foldTwo">
                  <span>
                    <dl>
                      <dt>辛巴(泰迪)</dt>
                      <dd>洗澡</dd>
                    </dl>
                  </span>
                  <span>
                    <em>关小美</em>
                    <em>&yen;180</em>
                  </span>
                </p>
              </div>
            </div>
          </fold>
        </div>
        <!-- 当日流水 -->
        <div class="waterLine">
          <p>当日流水</p>
          <div>
            <div>
              <dl>
                <dt>会员消费</dt>
                <dd>50人&nbsp;&nbsp;6580</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>散客消费</dt>
                <dd>50人&nbsp;&nbsp;6580</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>新增储值金额</dt>
                <dd>5810</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>新增计次金额</dt>
                <dd>5430</dd>
              </dl>
            </div>
          </div>
          <div @click="goDailyDetail()">
            <div>
              <dl>
                <dt>
                  <span>任艳</span>
                  <span>现金</span>
                </dt>
                <dd>
                  <span>07:12:21</span>
                  <span>单号 : 5846978223</span>
                </dd>
              </dl>
            </div>
            <div>&yen; 500</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "daily",
      data(){
        return{
          indexs:false,
          changeChart:0,//图表数据切换
        }
      },
      mounted(){
        this.pie();
      },
      methods:{
        test(){
          if(this.indexs === true){
            this.indexs = false
          }else {
            this.indexs=true;
          }

        },
        /* 图表数据切换 */
        changeCharts(num){
          this.changeChart = num;
        },
        /* 饼状图表 */
        pie(){
          this.myChart = this.$echarts.init(document.getElementById('pieCharts'));
          let option = {
            backgroundColor: '#fff',
            color: ['#ffc658', '#54c1be'],
            series: [{
              type: 'pie',
              hoverAnimation: false,
              silent: true,
              clockwise: false,
            },
              {
                type: 'pie',
                radius: ['35%', '60%'],
                hoverAnimation: false,
                data: [{
                  value: 20,
                  name: '预存类',
                  label: {
                    normal: {
                      color: '#333',
                      fontSize: 14,
                      formatter: '{b}  {d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length:5
                    }
                  }
                }, {
                  value: 80,
                  name: '消费类',
                  label: {
                    normal: {
                      color: '#333',
                      fontSize: 14,
                      formatter: '{b}  {d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length:5
                    }
                  }
                }]
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          this.myChart.setOption(option);
          window.onresize = this.myChart.resize;
        },
        /* 返回上一层 */
        goBack(){
          this.$router.go(-1)
        },
        /* 日报流水详情 */
        goDailyDetail(){
          this.$router.push({path:'/dailyDetail'})
        }
      }
    }
</script>

<style scoped lang="scss">
.daily{
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
    .times{
      height: .94rem;
      line-height: .94rem;
      background-color: #8d9099;
      color: #ffffff;
      text-align: center;
      &>span{
        display: inline-block;
      }
      &>span:nth-of-type(1){
        float: left;
        width: 1.12rem;
      }
      &>span:nth-of-type(2){
        font-size: .3rem;
      }
      &>span:nth-of-type(3){
        float: right;
        width: 1.12rem;
      }
    }
    .pieChart{
      background-color: #ffffff;
      &>div:nth-of-type(1){
        text-align: center;
        padding-top: .2rem;
        padding-bottom: .25rem;
        display: flex;
        justify-content: center;
        font-size: .3rem;
        color: #4B5060;
        &>span{
          width: 3.45rem;
          height: .7rem;
          line-height: .7rem;
          border: 1px solid #4B5060;
          border-radius: 5px;
          display: flex;
          justify-content: flex-start;
          &>em{
            display: inline-block;
            box-sizing: border-box;
            width: 50%;
          }
        }
      }
      &>div:nth-of-type(3){
        padding-left: .3rem;
        height: .82rem;
        line-height: .82rem;
        &>span{
          display: inline-block;
        }
        &>span:first-child{
          color: #888888;
          font-size: .28rem;
        }
        &>span:last-child{
          color: #EC652C;
          font-size: .42rem;
        }
      }
      /*&>div:nth-of-type(4){
        border-top: 1px solid #e8e8e8;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 .3rem;
        &>div{
          width: 50%;
          height: .8rem;
          line-height: .8rem;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          &>span:nth-of-type(1){
            display: flex;
            &>i{
              font-size: .46rem;
              color: #888888;
              margin-right: .058rem;
            }
            &>em{
              font-size: .28rem;
              color: #888888;

            }
          }
          &>span:nth-of-type(2){
            font-size: .32rem;
            color: #333333;
          }
        }
        & > div:first-child {
          border-right: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
          &>span:nth-of-type(2){
            padding-right: .3rem;
          }
        }
        & > div:nth-of-type(2) {
          border-bottom: 1px solid #e8e8e8;
          &>span:nth-of-type(1){
            &>i{
              padding-left: .3rem;
            }
          }
        }
        & > div:nth-of-type(3) {
          border-right: 1px solid #e8e8e8;
          &>span:nth-of-type(2){
            padding-right: .3rem;
          }
        }
        &>div:nth-of-type(4){
          &>span:nth-of-type(1){
            &>i{
              padding-left: .3rem;
            }
          }
          &>span:nth-of-type(2){
            color: #2db62d;
          }
        }
      }*/
      &>div:nth-of-type(4){
        border-top: 1px solid #e8e8e8;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 .3rem;
        &>div{
          width: 32%;
          height: 1.27rem;
          display: flex;
          justify-content: flex-start;
          box-sizing: border-box;
          &>span:nth-of-type(1){
            font-size: .46rem;
            color: #888888;
            margin-right: .1rem;
            display: flex;
            justify-content: center;
            flex-direction: column;
          }
          &>span:nth-of-type(2){
            display: flex;
            justify-content: center;
            flex-direction: column;
            font-size: .28rem;
            color: #888888;
              dd{
              color: #333333;
              }
          }
        }
        &>div:nth-of-type(2){
          width: 36%;
          padding-left: .3rem;
          border-left: 1px solid #e8e8e8;
          border-right: 1px solid #e8e8e8;
        }
        &>div:nth-of-type(3){
          padding-left: .3rem;
        }
      }
    }
    .waterLine{
      margin-top: .12rem;
      background-color: #ffffff;
      &>p{
        padding-left: .3rem;
        height: .72rem;
        line-height: .72rem;
        font-size: .28rem;
        color: #333333;
      }
      &>div:nth-of-type(1){
        border-top: 1px solid #e8e8e8;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 .3rem;
        &>div{
          width: 50%;
          box-sizing: border-box;padding-bottom: .22rem;
          &>dl{
            &>dt{
              font-size: .22rem;
              color: #999999;
              height: .62rem;
              line-height: .62rem;
            }
            &>dd{
              font-size: .32rem;
              color: #000000;
            }
          }
        }
        & > div:first-child {
          border-right: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;

        }
        & > div:nth-of-type(2) {
          border-bottom: 1px solid #e8e8e8;
          padding-left: .3rem;
        }
        & > div:nth-of-type(3) {
          border-right: 1px solid #e8e8e8;
        }
        & > div:nth-of-type(4) {
          padding-left: .3rem;
        }
      }
      &>div:nth-of-type(2){
        border-top: 1px solid #e8e8e8;
        display: flex;
        justify-content: space-between;
        &>div:nth-of-type(1){
          padding-bottom: .15rem;
          padding-left: .3rem;
          &>dl{
            &>dt{
              height: .68rem;
              line-height: .68rem;
              &>span:nth-of-type(1){
                font-size: .28rem;
                color: #333333;
              }
              &>span:nth-of-type(2){
                font-size: .24rem;
                color: #666666;
              }
            }
            &>dd{
              font-size: .28rem;
              color: #888888;
              &>span:nth-of-type(1){
                margin-right: .15rem;
              }
            }
          }
        }
        &>div:nth-of-type(2){
          padding-right: .3rem;
          display: flex;
          justify-content: center;
          flex-direction: column;
          font-size: .28rem;
          color: #666666;
        }
      }
    }
    .toDayList{
      margin-top: .12rem;
      background-color: #ffffff;
      &>p{
        padding-left: .3rem;
        height: .72rem;
        line-height: .72rem;
        font-size: .28rem;
        color: #333333;
        border-bottom: 1px solid #e8e8e8;
      }
      .foldBodyStyle{
        border-bottom: 1px solid #e8e8e8;
        padding: 0 .3rem;
        &>P{
          box-sizing: border-box;
        }
        .foldOne{
          display: flex;
          justify-content: space-between;
          font-size: .28rem;
          color: #333333;
          height: .8rem;
          line-height: .8rem;
          &>span:nth-of-type(1){
            &>em:nth-of-type(1){
              margin-right: .15rem;
            }
          }
        }
        .foldTwo{
          display: flex;
          justify-content: space-between;
          padding-bottom: .2rem;
          &>span:nth-of-type(1){
            border-left: 2px solid #f7c1ab;
            padding-left: .15rem;
            &>dl{
              &>dt{
                font-size: .24rem;
                color: #555555;
              }
              &>dd{
                font-size: .24rem;
                color: #999999;
              }
            }
          }
          &>span:nth-of-type(2){
            font-size: .24rem;
            color: #888888;
            text-align: right;
            position: relative;
            &>em:nth-of-type(1){
              display: inline-block;
              width: 1rem;
              position: absolute;
              bottom: 0;
              right: 1.08rem;
            }
            &>em:nth-of-type(2){
              display: inline-block;
              width: 1.08rem;
              position: absolute;
              bottom: 0;
              right: 0;
            }
          }
        }
      }
    }
  }
  .chartActive{
    background-color: #4B5060;
    color: #ffffff;
  }
  .icon-shouqi{
    display: block;
    font-size: .28rem;
    -webkit-transition: width 1s, height 1s, -webkit-transform .5s; /* For Safari 3.1 to 6.0 */
    transition: width 1s, height 1s, transform .5s;
  }
  .activess{
    display: block;
    -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
    transform: rotate(180deg);
  }
}
</style>
<style lang="scss">
.daily{
/*.yd-accordion-head-arrow:after,.yd-accordion-rotated:after{display:none}*/
  .yd-badge{
    border-radius: 10px;
    padding: 0 .12rem;
    font-size: .24rem;
  }
}

</style>
