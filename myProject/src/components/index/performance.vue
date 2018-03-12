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
           <select v-model="value1" @change="changeYears()">
              <option disabled value="">请选择</option>
              <option v-for="item in optionYear">{{item.value}}</option>
           </select>
          <select v-model="value2" :disabled="itsTrue" @change="changeMonth()">
              <option disabled value="">请选择</option>
              <option v-for="item in options">{{item.value}}</option>
           </select>
        </span>
      </div>
      <!-- 数据宫格 -->
      <div class="dataChunk">
        <div>
          <dl>
            <dt>月收入</dt>
            <dd>{{allData.MonthTurnover}}</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>月营业额</dt>
            <dd>{{allData.MonthIncome}}</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>日均收入</dt>
            <dd>{{allData.DayAvgTurnover}}</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>日均营业额</dt>
            <dd>{{allData.DayAvgIncome}}</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>月商品销售额</dt>
            <dd>{{allData.GoodsIncome}}</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt><span>月可计算毛利销售额</span><span @click="modalsOpen(1)"><em></em></span></dt>
            <dd>{{allData.GoodsProfitIncome}}</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt><span>月商品毛利总额</span><span @click="modalsOpen(2)"><em></em></span></dt>
            <dd>{{allData.GoodsProfit}}</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt><span>月商品毛利率</span><span @click="modalsOpen(3)"><em></em></span></dt>
            <dd>{{allData.GoodsRate}}</dd>
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
          <tr @click="goDaily(item)" v-for="(item,index) in allData.Record">
            <td>{{item.Date}}</td>
            <td>{{item.StoreDayTurnover}}</td>
            <td>{{item.StoreDayIncome}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 提示框组件 -->
    <modal v-if="msgModal">
      <div slot="body" class="modalBodys">
        <p>{{topMsg}}</p>
        <p>{{bottomMsg}}</p>
      </div>
      <div slot="footer" class="modalFooters">
        <span @click="msgModal = false">知道了</span>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: "performance",
    data(){
      return{
        value1:'', //年份选择
        value2:'', //月份儿选择
        allData:'',//数据存放
        itsTrue:true,//月份选择
        startTime:'',//开始月份儿
        StartYear:'',//开始年份儿
        options:[],
        optionYear:[],
        itsYears:0,
        itsMonth:0,
        itsDay:0,
        msgModal:false,
        topMsg:'',//模态框信息
        bottomMsg:'',//模态框信息
      }
    },
    created(){
      this.getAllData();
      this.itsYears = new Date().getFullYear();
      this.itsMonth = new Date().getMonth()+1;
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
            data:  []
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
            data:  []
          },
            {
              name:  '营业额',
              type:  'line',
              smooth:  'true',
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
              data:  []
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
        window.onresize = this.myChart.resize;
      },
      /* 日报 */
      goDaily(data){
        this.$router.push({path:'/daily',query:{plan:data}});
      },
      /* 获取所有数据 */
      getAllData(){
        let months = Date.parse(new Date()).toString().substr(0, 10);
        this.$http.post('https://api.yongdaoyun.com/special/pet/report_operating_data.php', this.sendData({month:months})).then(        res =>{
          console.log(res)
          if(res.data.err_code === "0000"){
            this.allData = res.data.data;
            this.startTime = res.data.data.StartMonth;
            this.StartYear = res.data.data.StartYear;
            let years = JSON.parse(JSON.stringify(this.itsYears));
            if(Number(years) === Number(res.data.data.StartYear)){
              this.optionYear.push({
                value:res.data.data.StartYear,
                label:res.data.data.StartYear
              })
            }else {
              for(let i = res.data.data.StartYear; i<=years; i++){
                this.optionYear.push({
                  value:i,
                  label:i
                })
              }
            }
            /* 图表数据 */
            let date = [];
            let dataStoreDayIncome = [];
            let dataStoreDayTurnover= [];
            for(let i = 0; i<res.data.data.Record.length; i++){
              date.push(res.data.data.Record[i].Date);
              dataStoreDayIncome.push(res.data.data.Record[i].StoreDayIncome);
              dataStoreDayTurnover.push(res.data.data.Record[i].StoreDayTurnover);
            }
            this.myChart.setOption({
              xAxis:  {
                data:date
              },
              series:  [{
                name:  '收入',
                data: dataStoreDayTurnover
              },
                {
                  name:  '营业额',
                  data: dataStoreDayIncome
                }
              ]
            })
          }else {
            this.$store.dispatch('getDatas',{
              states:true,
              msg:res.data.err_msg
            })
          }
        }).catch( err =>{
          console.log(err)
        })
      },
      /* 改变年份儿事件 */
      changeYears(){
        this.value2 = '';
        this.options = [];
        let indexs =  this.optionYear.findIndex(item =>{return Number(item.value) === Number(this.value1)});
        /* 获取当前年份儿 */
        let years = new Date().getFullYear();
        /* 获取当前月份儿 */
        let months = new Date().getMonth()+1;
        if(Number(indexs) === 0 && Number(years) !== Number(this.StartYear)){
          this.itsTrue = false;
          for(let i = Number(this.startTime); i<=12;i++){
            this.options.push({
              value:i,
              label:i
            })
          }
        }else if(Number(indexs) !== -1){
          this.itsTrue = false;
          if(Number(this.value1) === Number(years)){
            for(let x = 1 ; x <= Number(months); x++){
              this.options.push({
                value:x,
                label:x
              })
            }
          }else {
            for (let s=1; s<=12;s++){
              this.options.push({
                value:s,
                label:s
              })
            }
          }
        }else {
          this.itsTrue = true;
        }
      },
      /* 改变月份儿事件 */
      changeMonth(){
        if(this.value1 !== '' && this.value2 !== ''){
          let aaa = Number(this.value1) + '/' + Number(this.value2) + '/' + 1 + ' 00:00:00';
          let choiceDate = Date.parse(new Date(aaa)) / 1000;
          this.$http.post('https://api.yongdaoyun.com/special/pet/report_operating_data.php', this.sendData({month:choiceDate})).then( res =>{
            if(res.data.err_code === "0000"){
              this.allData = res.data.data;
              /* 图表数据 */
              let date = [];
              let dataStoreDayIncome = [];
              let dataStoreDayTurnover= [];
              for(let i = 0; i<res.data.data.Record.length; i++){
                date.push(res.data.data.Record[i].Date);
                dataStoreDayIncome.push(res.data.data.Record[i].StoreDayIncome);
                dataStoreDayTurnover.push(res.data.data.Record[i].StoreDayTurnover);
              }
              this.myChart.setOption({
                xAxis:  {
                  data:date
                },
                series:  [{
                  name:  '收入',
                  data: dataStoreDayTurnover
                },
                  {
                    name:  '营业额',
                    data: dataStoreDayIncome
                  }
                ]
              })
            }else {
              this.$store.dispatch('getDatas',{
                states:true,
                msg:res.data.err_msg
              })
            }
          }).catch( err =>{

          })
        }
      },
      /* 模态框信息 */
      modalsOpen(val){
        this.msgModal = true;
        if(val === 1){
          this.topMsg = "有成本价的商品销售总额";
          this.bottomMsg = "（已经入库填写过单价的商品）";
        }else if (val ===2){
          this.topMsg = "只计算有成本价的商品毛利";
          this.bottomMsg = "（已经入库填写过单价的商品）";
        }else if(val === 3){
          this.topMsg = "商品毛利总额 / 可计算毛利销售总额";
          this.bottomMsg = "";
        }else {
          this.topMsg = "";
          this.bottomMsg = "";
        }
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
        &>div:nth-of-type(5){
          border-right: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
          border-top: 1px solid #e8e8e8;
          &>dl{
            &>dd{
              color: #191818;
            }
          }
        }
        &>div:nth-of-type(6){
          border-bottom: 1px solid #e8e8e8;
          border-top: 1px solid #e8e8e8;
          &>dl{
            &>dt{
              padding-right: .3rem;
              display: flex;
              justify-content: space-between;
              &>span{
                &>em{
                  display: inline-block;
                  background: url("../../assets/question1.png") 50% 50% no-repeat;
                  width: .22rem;
                  height: .22rem;
                  background-size: contain;
                }
              }
            }
            &>dd{
              color: #191818;
            }
          }
        }
        &>div:nth-of-type(7){
          border-right: 1px solid #e8e8e8;
          &>dl{
            &>dt{
              padding-right: .3rem;
              display: flex;
              justify-content: space-between;
              &>span{
                &>em{
                  display: inline-block;
                  background: url("../../assets/question1.png") 50% 50% no-repeat;
                  width: .22rem;
                  height: .22rem;
                  background-size: contain;
                }
              }
            }
            &>dd{
              color: #191818;
            }
          }
        }
        &>div:nth-of-type(8){
          border-right: 1px solid #e8e8e8;
          &>dl{
            &>dt{
              padding-right: .3rem;
              display: flex;
              justify-content: space-between;
              &>span{
                &>em{
                  display: inline-block;
                  background: url("../../assets/question1.png") 50% 50% no-repeat;
                  width: .22rem;
                  height: .22rem;
                  background-size: contain;
                }
              }
            }
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
              border-bottom: 1px solid #e8e8e8;
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
    .modalBodys{
      padding: .3rem;
      font-size: .34rem;
      text-align: center;
      &>p:nth-of-type(1){
        margin-bottom: .1rem;
        color: #333333;
      }
      &>p:nth-of-type(2){
        color: #999999;
      }
    }
    .modalFooters{
      height: .8rem;
      text-align: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: #fa6034;
      color: #ffffff;
      font-size: .34rem;
      border-bottom-left-radius: 0.08rem;
      border-bottom-right-radius: 0.08rem;
    }
  }
</style>

