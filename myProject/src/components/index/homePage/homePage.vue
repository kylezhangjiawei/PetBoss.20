<template>
  <div class="homePage">
    <header>
      <i class="icon-fenlei"></i>
      <span>{{shopName}}</span>
      <i class="icon-pinglun"></i>
    </header>
    <div class="container">
      <!-- 页头数据块儿 -->
      <div class="dataChunk">
        <div>
          <dl>
            <dt>今日收入</dt>
            <dd>100125.85</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>营业额</dt>
            <dd>120313.5</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>销售占比</dt>
            <dd>63%</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>会员消费占比</dt>
            <dd>25%</dd>
          </dl>
        </div>
      </div>
      <!-- 交易额图表 -->
      <div class="dealStatement">
        <div id="deal" style="width: 100%;height: 305px"></div>
      </div>
      <!-- 会员占比 -->
      <div class="memProportion">
        <span>会员占比</span><span>会员总数 : 10000人</span>
      </div>
      <!-- 表单 -->
      <div class="tables">
        <table>
          <thead>
          <tr>
            <td>类型</td>
            <td>人数</td>
            <td>占比</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>普通卡</td>
            <td>400</td>
            <td>40%</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "homePage",
    data() {
      return {
        shopName: '',//店铺名称
      }
    },
    created() {
      this.shopName = localStorage.getItem('Name');
    },
    mounted(){
      this.dealStatements();
    },
    methods: {
      /* 交易走势图表 */
      dealStatements(){
        this.myChart = this.$echarts.init(document.getElementById('deal'));
        let option  =  {
          backgroundColor:  '#fff',
          color:  ['#5aabc0'],

          tooltip:  {
            trigger:  'axis'
          },
          legend:  {
            bottom:  0,
            left:  'center',
            data:  ['收入',  '营业额']
          },
          grid:  {
            top:  '10',
            left:  '18',
            right:  '18',
            bottom:  '35',
            containLabel:  true
          },

          xAxis:  {
            type:  'category',
            boundaryGap:  false,
            data:  ['01-11',  '01-12',  '01-13',  '01-14',  '01-15',  '01-16',  '01-17']
          },
          yAxis:  {
            type:  'value',
            axisTick:  {
              inside:  true
            },
            splitLine:  {
              show:  false
            },
            axisLabel:  {
              inside:  true,
            },
            z:  1000
          },
          series:  [{
            name:  '收入',
            type:  'line',
            smooth:  'true',
            stack:  '总量',
            label:  {
              normal:  {
                show:  false,
                position:  'top'
              }
            },
            areaStyle:  {
              normal:  {
                color:  new  this.$echarts.graphic.LinearGradient(0,  0,  0,  1,  [{
                  offset:  0,
                  color:  '#5aabc0'
                },  {
                  offset:  1,
                  color:  '#fff'
                }])
              }
            },
            data:  [120,  132,  101,  134,  90,  230,  210]
          },
            {
              name:  '营业额',
              type:  'line',
              smooth:  'true',
              stack:  '总量',
              label:  {
                normal:  {
                  show:  false,
                  position:  'top'
                }
              },
              itemStyle:  {
                normal:  {
                  color:  '#ec652c'
                }
              },
              areaStyle:  {
                normal:  {
                  color:  new  this.$echarts.graphic.LinearGradient(0,  0,  0,  1,  [{
                    offset:  0,
                    color:  '#ec652c'
                  },  {
                    offset:  1,
                    color:  '#fff'
                  }])
                }
              },
              data:  [220,  182,  191,  234,  290,  330,  310]
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
        window.onresize = this.myChart.resize;
      }
    }
  }
</script>

<style scoped lang="scss">
  .homePage {
    height: 100%;
    padding-bottom: 1rem;
    box-sizing: border-box;
    overflow: auto;
    & > header {
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
      color: #ffffff;
      & > i:nth-of-type(1) {
        position: absolute;
        font-size: .42rem;
        left: .28rem;
        color: #ffffff;
      }
      & > i:nth-of-type(2) {
        position: absolute;
        font-size: .36rem;
        right: .28rem;
        color: #ffffff;
      }
    }
    .container {
      margin-top: 1rem;
      .dataChunk {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        background-color: #ffffff;
        & > div {
          width: 50%;
          box-sizing: border-box;
          padding: 0 0 .2rem .3rem;
          background: linear-gradient(to bottom, #fff, #f9f9f9);
          & > dl {
            & > dt {
              font-size: .24rem;
              height: .75rem;
              line-height: .75rem;
              color: #999999;
            }
            & > dd {
              font-size: .34rem;
              color: #555555;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        & > div:first-child {
          border-right: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
        }
        & > div:nth-of-type(2) {
          border-bottom: 1px solid #e8e8e8;
        }
        & > div:nth-of-type(3) {
          border-right: 1px solid #e8e8e8;
        }
      }
      .dealStatement {
        height: 305px;
        margin-top: 0.12rem;
        background-color: #ffffff;
      }
      .memProportion{
        display: flex;
        justify-content: space-between;
        padding: 0 0.3rem;
        margin-top: .12rem;
        background-color: #ffffff;
        font-size: .26rem;
        color: #333333;
        height: .72rem;
        line-height: .72rem;
        &>span:nth-of-type(1){
          font-weight: bold;
        }
      }
      .tables{
        &>table{
          width: 100%;
          border-collapse:collapse;
          &>thead{
            &>tr{
              height: .52rem;
              background-color: #f6f6f6;
              font-size: .24rem;
              color: #999999;
              &>td{
                width: 25%;
              }
              &>td:first-child{
                padding-left: .3rem;
                width: 50%;
              }
              &>td:last-child{
                text-align: right;
                padding-right: .3rem;
              }
            }
          }
          &>tbody{
            background-color: #ffffff;
            &>tr{
              height: .75rem;
              font-size: .26rem;
              color: #333333;
              &>td{
                width: 25%;
              }
              &>td:first-child{
                padding-left: .3rem;
                width: 50%;
                color: #666666;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              &>td:last-child{
                text-align: right;
                padding-right: .3rem;
              }
            }
          }
        }
      }
    }
  }
</style>
