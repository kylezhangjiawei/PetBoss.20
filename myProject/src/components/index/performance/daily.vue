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
          <span class="icon-jiantouzuo" @click="beforeDay()"></span>
          <span>{{itYear}}年{{itMonth}}月{{itDay}}日</span>
          <span class="icon-jiantouyou" @click="afterDay()"></span>
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
          <div v-if="changeChart === 0">
            <span>收入合计 :</span>
            <span>{{allDatas.StoreDayTurnover}}</span>
          </div>
          <div v-if="changeChart === 1">
            <span>营业额合计 :</span>
            <span>{{allDatas.StoreDayIncome}}</span>
          </div>
          <div class="income" v-if="changeChart === 0">
            <div>
              <span class="icon-zhuanru"></span>
              <span>
                <dl>
                  <dt>扫码</dt>
                  <dd>{{allDatas.CodeTurnover}}</dd>
                </dl>
              </span>
            </div>
            <div>
              <span class="icon-zhuanru"></span>
              <span>
                <dl>
                  <dt>刷卡</dt>
                  <dd>{{allDatas.PosTurnover}}</dd>
                </dl>
              </span>
            </div>
            <div>
              <span class="icon-zhuanru"></span>
              <span>
                <dl>
                  <dt>现金</dt>
                  <dd>{{allDatas.CashTurnover}}</dd>
                </dl>
              </span>
            </div>
          </div>
          <div class="turnover" v-if="changeChart === 1">
            <div>
              <div>
                <span class="icon-zhuanru"></span>
                <span>
                  <dl>
                    <dt>商品营业额</dt>
                    <dd>{{allDatas.GoodsIncome}}</dd>
                  </dl>
                </span>
              </div>
              <div>
                <p>
                  <span>微信</span>
                  <span>{{allDatas.WxCodeTurnover}}</span>
                </p>
                <p>
                  <span>支付宝</span>
                  <span>{{allDatas.AliPayTurnover}}</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <span class="icon-zhuanru"></span>
                <span>
                  <dl>
                    <dt>服务营业额</dt>
                    <dd>{{allDatas.ServiceIncome}} </dd>
                  </dl>
                </span>
              </div>
              <div>
                <span class="icon-zhuanru"></span>
                <span>
                  <dl>
                    <dt>其他</dt>
                    <dd>{{allDatas.StoreOtherIncome}} </dd>
                  </dl>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 当日清单 -->
        <div class="toDayList">
          <p>当日清单</p>
          <!-- 折叠数据区域 -->
          <fold>
            <div slot="itsHeader" class="itsHeaders" @click="choiceList(1)">
              <span slot="headerLeft">售卖商品清单 <yd-badge shape="circle" bgcolor="#FDDCCE" color="#ec652c">{{nums}}件</yd-badge></span>
              <span slot="headerRight"><i class="icon-shouqi" :class="[indexs === 1 ? 'activess' : '']"></i></span>
            </div>
            <div slot="body" v-if="indexs === 1">
              <div class="storeBody" v-for="item in allDatas.GoodsRecord">
                <div>
                  <dl>
                    <dt>{{item.goods_name}}</dt>
                    <dd>{{ item.sku !== "null" && item.sku !=="" && item.sku !== null ? Object.values(JSON.parse(item.sku)) : '' | filterSku}}</dd>
                  </dl>
                </div>
                <div>
                  共{{item.goods_num}}
                </div>
              </div>
            </div>
          </fold>
          <fold>
            <div slot="itsHeader" class="itsHeaders" @click="choiceList(2)">
              <span slot="headerLeft">会员充值清单 <yd-badge shape="circle" bgcolor="#FDDCCE" color="#ec652c">{{allDatas.RechargeRecord ? allDatas.RechargeRecord.length : '0'}}单</yd-badge></span>
              <span slot="headerRight" ><i class="icon-shouqi" :class="[indexs === 2 ? 'activess' : '']"></i></span>
            </div>

            <div slot="body" v-if="indexs === 2">
              <div class="foldBodyStyle" v-for="item in allDatas.RechargeRecord">
                <p class="foldOne">
                  <span><em>{{item.Name}}</em><em>{{item.phone ? item.phone:''}}</em></span>
                  <span>{{item.AddDate}}</span>
                </p>
                <p class="foldTwos">
                  <span>
                    <dl>
                      <dt>{{item.Title}}</dt>
                      <dd v-for="items in item.value_info">
                        <span>{{items.Abstract}}</span>
                        <span>
                          <em>{{item.pay_method}}</em>
                          <em>&yen;{{items.Price}}</em>
                        </span>
                      </dd>
                    </dl>
                  </span>
                </p>
              </div>
            </div>
          </fold>
          <fold>
              <div slot="itsHeader" class="itsHeaders" @click="choiceList(3)">
                <span slot="headerLeft">宠物服务清单 <yd-badge shape="circle" bgcolor="#FDDCCE" color="#ec652c">{{allDatas.ServiceRecord ? allDatas.ServiceRecord.length : '0'}}单</yd-badge></span>
                <span slot="headerRight" ><i class="icon-shouqi" :class="[indexs === 3 ? 'activess' : '']"></i></span>
              </div>
            <div slot="body" v-if="indexs === 3">
              <div class="foldBodyStyle" v-for="item in allDatas.ServiceRecord">
                <p class="foldOne">
                  <span><em>{{item.MemberName ? item.MemberName : '非会员'}}</em><em>{{item.phone ? item.phone:''}}</em></span>
                  <span>{{item.pay_time}}</span>
                </p>
                <p class="foldTwo" v-for="items in item.pet_info">
                  <span>
                    <dl>
                      <dt>{{items.Name}}<!--({{items.}})--></dt>
                      <dd>{{items.ServiceName}}</dd>
                    </dl>
                  </span>
                  <span>
                    <em>{{items.ServiceStaff}}</em>
                    <em>&yen;{{items.ServicePrice}}</em>
                  </span>
                </p>
              </div>
            </div>
          </fold>
          <fold>
            <div slot="itsHeader" class="itsHeaders" @click="choiceList(4)">
              <span slot="headerLeft">疫苗清单 <yd-badge shape="circle" bgcolor="#FDDCCE" color="#ec652c">{{allDatas.VaccineRecord ? allDatas.VaccineRecord.length : '0'}}单</yd-badge></span>
              <span slot="headerRight" ><i class="icon-shouqi" :class="[indexs === 4 ? 'activess' : '']"></i></span>
            </div>
            <div slot="body" v-if="indexs === 4">
              <div class="foldBodyStyle" v-for="item in allDatas.VaccineRecord">
                <p class="foldOne">
                  <span><em>{{item.MemberName ? item.MemberName : '非会员'}}</em><em>{{item.phone ? item.phone:''}}</em></span>
                  <span>{{item.AddDate}}</span>
                </p>
                <p class="foldTwo" v-for="items in item.vaccine">
                  <span>
                    <dl>
                      <dt>{{items.PetName}}({{items.VarietyName}})</dt>
                      <dd>{{items.VaccineProductName}}</dd>
                    </dl>
                  </span>
                  <span>
                    <em>{{items.ServicePersonal}}</em>
                    <em>&yen;{{items.SubTotal}}</em>
                  </span>
                </p>
              </div>
            </div>
          </fold>
          <fold>
            <div slot="itsHeader" class="itsHeaders" @click="choiceList(5)">
              <span slot="headerLeft">寄养清单 <yd-badge shape="circle" bgcolor="#FDDCCE" color="#ec652c">{{allDatas.FosterRecord ? allDatas.FosterRecord.length : '0'}}单</yd-badge></span>
              <span slot="headerRight" ><i class="icon-shouqi" :class="[indexs === 5 ? 'activess' : '']"></i></span>
            </div>
            <div slot="body" v-if="indexs === 5">
              <div class="foldBodyStyle" v-for="item in allDatas.FosterRecord">
                <p class="foldOne">
                  <span><em>{{item.MemberName ? item.MemberName : '非会员'}}</em><em>{{item.phone ? item.phone:''}}</em></span>
                  <span>{{item.AddDate}}</span>
                </p>
                <p class="foldTwo" v-for="items in item.foster_info">
                  <span>
                    <dl>
                      <dt>{{items.PetName}}({{items.VarietyName}})</dt>
                      <dd>单价：&yen;{{items.Price}}</dd>
                    </dl>
                  </span>
                  <span>
                    <em>预存</em>
                    <em>&yen;{{items.DepositAmount}}</em>
                  </span>
                </p>
              </div>
            </div>
          </fold>
          <fold>
            <div slot="itsHeader" class="itsHeaders" @click="choiceList(6)">
              <span slot="headerLeft">退款清单 <yd-badge shape="circle" bgcolor="#FDDCCE" color="#ec652c">{{allDatas.ReturnRecord ? allDatas.ReturnRecord.length : '0'}}单</yd-badge></span>
              <span slot="headerRight" ><i class="icon-shouqi" :class="[indexs === 6 ? 'activess' : '']"></i></span>
            </div>
            <div slot="body" v-if="indexs === 6">
              <div class="foldBodyStyle" v-for="item in allDatas.ReturnRecord">
                <p class="foldOne">
                  <span><em>{{item.Name ? item.Name : '非会员'}}</em><em></em></span>
                  <span>{{item.Date}}</span>
                </p>
                <p class="foldTwo">
                  <span>
                    <dl>
                      <dt>退 &yen; {{item.Price}}</dt>
                      <dd>{{item.Body}}</dd>
                    </dl>
                  </span>
                  <span>
                    <em>{{item.PayMethod}}</em>
                    <em>{{item.Author}}</em>
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
                <dd>{{today.MemConsumeNum}}人&nbsp;&nbsp;{{today.MemConsume}}</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>散客消费</dt>
                <dd>{{today.TouristNum}}人&nbsp;&nbsp;{{today.TouristConsume}}</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>新增储值金额</dt>
                <dd>{{today.StoreDayValue}}</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>新增计次金额</dt>
                <dd>{{today.StoreDayTimes}}</dd>
              </dl>
            </div>
          </div>
          <div @click="goDailyDetail(item)" v-for="(item,index) in today.record" class="record">
            <div>
              <dl>
                <dt>
                  <span>{{item.name}}</span>
                  <span v-if='item.pay_method === "1"'>现金</span>
                  <span v-else-if='item.pay_method === "2"'>刷卡</span>
                  <span v-else-if='item.pay_method === "3"'>扫码</span>
                  <span v-else-if='item.pay_method === "4"'>储值</span>
                  <span v-else>混合</span>
                </dt>
                <dd>
                  <span>{{item.add_date}}</span>
                  <span>单号 : {{item.number}}</span>
                </dd>
              </dl>
            </div>
            <div>&yen; {{item.actual_price}}</div>
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
          indexs:0,
          changeChart:0,//图表数据切换
          routeData:'',//接受前一页面数据
          allDatas:'', //获取数据
          itYear: '',
          itMonth: '',
          itDay: '',
          today:'',//今日流水接口数据
          test:true,
        }
      },
      beforeRouteLeave (to, from , next) {
        console.log(to);
        if(to.path === "/dailyDetail"){
            this.test = false;
        }else if(to.path === "/performance"){
            this.test = true;
        }else {
          console.log('1')
        }
        next();
      },
      mounted(){
        this.pie();
      },
      computed:{
        nums(){
          let allNums = 0;
          if(this.allDatas){
            for(let i = 0 ;i<this.allDatas.GoodsRecord.length;i++){
              allNums += Number(this.allDatas.GoodsRecord[i].goods_num)
            }
          }
          return allNums;
        }
      },
      activated(){
        if(this.test === true){
          this.routeData = this.$route.query.plan;
          this.itYear = JSON.parse(JSON.stringify(this.$route.query.plan.Year));
          this.itMonth = JSON.parse(JSON.stringify(this.$route.query.plan.Month));
          this.itDay = JSON.parse(JSON.stringify(this.$route.query.plan.Day));
          this.getAllData();
          this.toDayData();
        }else {
          console.log('2');
        }

      },
      methods:{
        choiceList(val){
          if(this.indexs === val){
            this.indexs =0;
          }else {
            this.indexs = val;
          }
        },
        /* 图表数据切换 */
        changeCharts(num){
          this.changeChart = num;
          if(num === 0){
            this.myChart.setOption({
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
                    value: this.allDatas.StorageTurnover,
                    name: '预存类',
                    label: {
                      normal: {
                        color: '#333',
                        fontSize: 12,
                        formatter: '{b} \n {d}%'
                      }
                    },
                    labelLine: {
                      normal: {
                        length:5
                      }
                    }
                  }, {
                    value: this.allDatas.ConsumeTurnover,
                    name: '消费类',
                    label: {
                      normal: {
                        color: '#333',
                        fontSize: 12,
                        formatter: '{b} \n {d}%'
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
            })
          }
          if(num === 1){
            this.myChart.setOption({
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
                    value: this.allDatas.StoreDayValueIncome,
                    name: '储值支付',
                    label: {
                      normal: {
                        color: '#333',
                        fontSize: 12,
                        formatter: '{b} \n {d}%'
                      }
                    },
                    labelLine: {
                      normal: {
                        length:5
                      }
                    }
                  }, {
                    value: this.allDatas.OtherPayIncome,
                    name: '其他支付',
                    label: {
                      normal: {
                        color: '#333',
                        fontSize: 12,
                        formatter: '{b} \n {d}%'
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
            })
          }
        },
        /* 饼状图表 */
        pie(){
          this.myChart = this.$echarts.init(document.getElementById('pieCharts'));
          let option = {
            backgroundColor: '#fff',
            color: ['#ffc658', '#54c1be'],
            legend:{
              padding:20
            },
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
        goDailyDetail(data){
          this.$router.push({path:'/dailyDetail',query:{plan:data}});
        },
        /* 获取数据 */
        getAllData(){
          let aaa = Number(this.itYear) + '/' + Number(this.itMonth) + '/' + Number(this.itDay) + ' 00:00:00';
          let choiceDate = Date.parse(new Date(aaa)) / 1000;
          this.$http.post('https://api.yongdaoyun.com/special/pet/report_todaydata.php', this.sendData({time:choiceDate})).then( res =>{
            console.log(res);
            if(res.data.err_code === "0000"){
              this.allDatas = res.data.data;
              if(Number(res.data.data.StorageTurnover) < 0){
                this.allDatas.StorageTurnover = 0;
              }
              if(Number(res.data.data.ConsumeTurnover) < 0){
                this.allDatas.ConsumeTurnover = 0;
              }
              if(Number(res.data.data.StoreDayValueIncome) < 0){
                this.allDatas.StoreDayValueIncome = 0;
              }
              if(Number(res.data.data.OtherPayIncome) < 0){
                this.allDatas.OtherPayIncome = 0;
              }
              this.myChart.setOption({
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
                      value: res.data.data.StorageTurnover,
                      name: '预存类',
                      label: {
                        normal: {
                          color: '#333',
                          fontSize: 12,
                          formatter: "{b} \n {d}%"
                        }
                      },
                      labelLine: {
                        normal: {
                          length:5
                        }
                      }
                    }, {
                      value: res.data.data.ConsumeTurnover,
                      name: '消费类',
                      label: {
                        normal: {
                          color: '#333',
                          fontSize: 12,
                          formatter: '{b} \n {d}%'
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
              })
            }else {
              this.$store.dispatch('getDatas',{
                states:true,
                msg:res.data.err_msg
              })
            }
          }).catch( err =>{

          })
        },
        /* 今日流水接口连接 */
        toDayData(){
          let aaa = Number(this.itYear) + '/' + Number(this.itMonth) + '/' + Number(this.itDay) + ' 00:00:00';
          let beforeMonth = Date.parse(new Date(aaa)) / 1000;
          //  获取本月的总天数
          let days = new Date(Number(this.itYear), Number(this.itMonth), 0).getDate();
          let bbb ='';
          let afterMonth = '';
          if(Number(this.itMonth) === 12 && Number(this.itDay) === Number(days)){
            bbb = (Number(this.itYear)+1) + '/' + 1 + '/' + 1 + ' 00:00:00';
            afterMonth = Date.parse(new Date(bbb)) / 1000;
          }else if(Number(this.itDay) === Number(days)){
            bbb = Number(this.itYear) + '/' + (Number(this.itMonth)+1) + '/' + 1 + ' 00:00:00';
            afterMonth = Date.parse(new Date(bbb)) / 1000;
          }else {
            bbb = Number(this.itYear) + '/' + Number(this.itMonth) + '/' + (Number(this.itDay)+1) + ' 00:00:00';
            afterMonth = Date.parse(new Date(bbb)) / 1000;
          }
          this.$http.post('https://api.yongdaoyun.com/special/pet/store_profit_select.php', this.sendData({
            type:2,
            start_time:beforeMonth,
            end_time:afterMonth,
            operate:"asc"
          })).then(        res =>{
        console.log(res);
            if(res.data.err_code === "0000"){
              this.today = res.data.data;
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
        /* 前一天 */
        beforeDay() {
          let aaa = Number(this.itYear) + '/' + Number(this.itMonth) + '/' + Number(this.itDay) + ' 00:00:00';
          let afterMonth = Date.parse(new Date(aaa)) / 1000;
          if (Number(this.itMonth) === 1 && Number(this.itDay) === 1) {
            this.itYear = Number(this.itYear) - 1;
            this.itMonth = 12;
            this.itDay = 31;
          } else if (Number(this.itDay) === 1) {
            this.itMonth = Number(this.itMonth) - 1;
            //  获取本月的总天数
            let days = new Date(Number(this.itYear), Number(this.itMonth), 0).getDate();
            this.itDay = JSON.parse(JSON.stringify(days));
          } else {
            this.itDay = Number(this.itDay) - 1;
          }
          let bbb = Number(this.itYear) + '/' + Number(this.itMonth) + '/' + Number(this.itDay) + ' 00:00:00';
          let beforeMonth = Date.parse(new Date(bbb)) / 1000;
          this.$http.post('https://api.yongdaoyun.com/special/pet/store_profit_select.php', this.sendData({
            type:2,
            start_time:beforeMonth,
            end_time:afterMonth,
            operate:"asc"
          })).then(res => {
            console.log(res);
            if(res.data.err_code === "0000"){
              this.today = res.data.data;
              this.getAllData();
            }else {
              this.$store.dispatch('getDatas',{
                states:true,
                msg:res.data.err_msg
              })
              this.allDatas = '';
              this.today = '';
            }
          }).catch(err => {
            console.log(err)
          })
        },
        /* 后一天 */
        afterDay() {
          let days = new Date(Number(this.itYear), Number(this.itMonth), 0).getDate();
          if (Number(this.itDay) === Number(days) && Number(this.itMonth) === 12) {
            this.itYear = Number(this.itYear) + 1;
            this.itMonth = 1;
            this.itDay = 1;
          } else if (Number(this.itDay) === Number(days)) {
            this.itMonth = Number(this.itMonth) + 1;
            //  获取本月的总天数
            let day = new Date(Number(this.itYear), Number(this.itMonth), 0).getDate();
            this.itDay = 1;
          } else {
            this.itDay = Number(this.itDay) + 1;
          }
          let aaa = Number(this.itYear) + '/' + Number(this.itMonth) + '/' + Number(this.itDay) + ' 00:00:00';
          let beforeMonth = Date.parse(new Date(aaa)) / 1000;
          let bbb = '';
          let afterMonth = '';
          if (Number(this.itDay) === Number(days)) {
            if (Number(this.itMonth) === 12) {
              bbb = Number(this.itYear) + '/' + 1 + '/' + 1 + ' 00:00:00';
              afterMonth = Date.parse(new Date(bbb)) / 1000;
            } else {
              bbb = Number(this.itYear) + '/' + (Number(this.itMonth) + 1) + '/' + 1 + ' 00:00:00';
              afterMonth = Date.parse(new Date(bbb)) / 1000;
            }
          } else {
            bbb = Number(this.itYear) + '/' + Number(this.itMonth) + '/' + (Number(this.itDay) + 1) + ' 00:00:00';
            afterMonth = Date.parse(new Date(bbb)) / 1000;
          }
          this.$http.post('https://api.yongdaoyun.com/special/pet/store_profit_select.php', this.sendData({
            type: 2,
            start_time: beforeMonth,
            end_time: afterMonth,
            operate:"asc"
          })).then(res => {
            console.log(res);
            if(res.data.err_code === "0000"){
              this.today = res.data.data;
              this.getAllData();
            }else {
              this.$store.dispatch('getDatas',{
                states:true,
                msg:res.data.err_msg
              })
              this.allDatas = '';
              this.today = '';
            }
          }).catch(err => {
            console.log(err)
          })
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
          return (value.length >= 10) ? value.substring(0, 10) + '...' : value;
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
    margin-top: 1.94rem;
    .times{
      position: absolute;
      left: 0;
      right: 0;
      top: 1rem;
      z-index:1;
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
        border-top: 1px solid #e8e8e8;
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
      .income{
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
      .turnover{
        &>div:nth-of-type(1){
          display: flex;
          height: 1.16rem;
          padding-left: .3rem;
          border-top: 1px solid #e8e8e8;
          &>div{
            width: 50%;
            box-sizing: border-box;
          }
          &>div:nth-of-type(1){
            display: flex;
            &>span:nth-of-type(1){
              font-size: .46rem;
              color: #9f9f9f;
              display: flex;
              justify-content: center;
              flex-direction: column;
            }
            &>span:nth-of-type(2){
              margin-left: .2rem;
              &>dl{
                &>dt{
                  height: .58rem;
                  line-height: .58rem;
                  font-size: .26rem;
                  color: #888888;
                }
                &>dd{
                  height: .58rem;
                  line-height: .58rem;
                  font-size: .32rem;
                  color: #333333;
                }
              }
            }
          }
          &>div:nth-of-type(2){
            &>p{
              height: .58rem;
              line-height: .58rem;
              border-bottom: 1px solid #e8e8e8;
              &>span:nth-of-type(1){
                display: inline-block;
                width: .98rem;
                font-size: .26rem;
                color: #888888;
              }
              &>span:nth-of-type(2){
                font-size: .26rem;
                color: #888888;
              }
            }
            &>p:last-child{
              border-bottom: none;
            }
          }
        }
        &>div:nth-of-type(2){
          border-top: 1px solid #e8e8e8;
          height: 1.16rem;
          display: flex;
          padding-left: .3rem;
          &>div{
            width: 50%;
            box-sizing: border-box;
            display: flex;
            &>span:nth-of-type(1){
              font-size: .46rem;
              color: #9f9f9f;
              display: flex;
              justify-content: center;
              flex-direction: column;
            }
            &>span:nth-of-type(2){
              padding-bottom: .22rem;
              margin-left: .2rem;
              &>dl{
                &>dt{
                  font-size: .26rem;
                  color: #888888;
                  height: .62rem;
                  line-height: .62rem;
                }
                &>dd{
                  font-size: .32rem;
                  color: #333333;
                }
              }
            }
          }
          &>div:nth-of-type(2){
            padding-left: .3rem;
            border-left: 1px solid #e8e8e8;
          }
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
      .record{
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
        .foldTwos{
          display: flex;
          padding-bottom: .2rem;
          &>span{
            border-left: 2px solid #f7c1ab;
            padding-left: .15rem;
            width: 100%;
            &>dl{
              &>dt{
                font-size: .24rem;
                color: #555555;
              }
              &>dd{
                font-size: .24rem;
                color: #999999;
                display: flex;
                justify-content: space-between;
                &>span:nth-of-type(1){

                }
              }
            }
          }
        }
      }
      .itsHeaders{
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
      .storeBody{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e8e8e8;
        padding: 0 .3rem;
        &>div:nth-of-type(1){
          padding: .2rem 0;
          font-size: .28rem;
          color: #333333;
          &>dl{
            &>dd{
              font-size: .24rem;
              color: #999999;
            }
          }
        }
        &>div:nth-of-type(2){
          padding: .2rem 0;
          font-size: .28rem;
          color: #333333;
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
