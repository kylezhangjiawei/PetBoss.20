<template>
  <div class="performance">
    <header>
      <span>经营数据</span>
    </header>
    <!-- 内容 -->
    <div class="container">
      <!-- 筛选 -->
      <div class="screen">
        <span>筛选</span>
        <span>
           <select v-model="selectedYear">
              <option disabled value="">请选择</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
           </select>
          <select v-model="selectedMonth">
              <option disabled value="">请选择</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
           </select>
        </span>
      </div>
      <!-- 数据宫格 -->
      <div class="dataChunk">
        <div>
          <dl>
            <dt>月收入</dt>
            <dd>686580</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>月营业额</dt>
            <dd>385620</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>日均收入</dt>
            <dd>265810</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>日均营业额</dt>
            <dd>165430</dd>
          </dl>
        </div>
      </div>
      <!-- 月交易额图表 -->
      <div class="dealStatement">
        <div id="dealMonth" style="width: 100%;height: 305px"></div>
      </div>
      <!-- 详细数据 -->
      <div class="memProportion">
        <span>详细数据</span><span><!--会员总数 : 10000人--></span>
      </div>
      <!-- 表单 -->
      <div class="tables">
        <table>
          <thead>
          <tr>
            <td>日期</td>
            <td>收入</td>
            <td>营业额</td>
          </tr>
          </thead>
          <tbody>
          <tr @click="goDaily()">
            <td>01.01</td>
            <td>12635</td>
            <td>9854%</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "performance",
    data(){
      return{
        selectedYear:'', //年份选择
        selectedMonth:'', //
      }
    },
    mounted(){
      this.dealStatements();
    },
    methods: {
      /* 交易走势图表 */
      dealStatements(){
        this.myChart = this.$echarts.init(document.getElementById('dealMonth'));
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
      },
      /* 日报 */
      goDaily(){
        this.$router.push({path:'/daily'})
      }
    }
  }
</script>

<style scoped lang="scss">
  .performance {
    height: 100%;
    overflow: auto;
    padding-bottom: 1rem;
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
      z-index: 1;
      color: #ffffff;
    }
    .container{
      margin-top: 1rem;
      .screen{
        background-color: #ffffff;
        height: .94rem;
        line-height: .94rem;
        font-size: .28rem;
        color: #666666;
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        &>span:nth-of-type(2){
          &>select:nth-of-type(1){
            width: 1.75rem;
            height: .7rem;
            border-radius: 8px;
            background-color: #f0f0f0;
            border: none;
            padding-left: .15rem;
            box-sizing: border-box;
            color: #666666;
          }
          &>select:nth-of-type(2){
            width: 1.25rem;
            height: .7rem;
            border-radius: 8px;
            background-color: #f0f0f0;
            border: none;
            padding-left: .15rem;
            box-sizing: border-box;
            color: #666666;
          }
        }
      }
      .dataChunk{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-top: .12rem;
        background-color: #ffffff;
        &>div{
          width: 50%;
          box-sizing: border-box;
          padding: 0 0 .22rem .3rem;
          background: linear-gradient(to bottom, #fff, #f9f9f9);
          &>dl{
            &>dt{
              height: .62rem;
              line-height: .62rem;
              font-size: .22rem;
              color: #999999;
            }
            &>dd{
              font-size: .32rem;
              color: #EC652C;
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
          &>dl{
            &>dd{
              color: #191818;
            }
          }
        }
        & > div:nth-of-type(4) {
          &>dl{
            &>dd{
              color: #191818;
            }
          }
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

