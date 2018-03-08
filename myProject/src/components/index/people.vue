<template>
  <div class="people">
    <header>
      <span>绩效统计</span>
      <i @click="goPeopleManagement()">员工管理</i>
    </header>
    <div class="container">
      <!-- 查询，自定义 -->
      <div class="choiceYourSelf">
        <div>
          <span :class="[topIndex === 1 ? 'topActive':'']" @click="choiceTimes(1)">全部</span>
          <span :class="[topIndex === 2 ? 'topActive':'']" @click="choiceTimes(2)">本月</span>
          <span :class="[topIndex === 3 ? 'topActive':'']" @click="choiceTimes(3)">上月</span>
          <span :class="[topIndex === 4 ? 'topActive':'']" @click="choiceTimes(4)">自定义</span>
        </div>
        <div v-if="topIndex === 4">
          <yd-datetime v-model="datetime1" type="date" slot="right" value="[2008/08/08]" :init-emit=false
                       placeholder="开始时间"></yd-datetime>
          <span>至</span>
          <yd-datetime v-model="datetime2" type="date" slot="right" value="[2008/08/08]" :init-emit=false
                       placeholder="开始时间"></yd-datetime>
          <button type="button" @click="yourSelfChoiceTime">查询</button>
        </div>
      </div>
      <!-- 排名 -->
      <div class="ranking">
        <p>
          <span class="icon-paiming"></span>
          <span>
            <span>排名</span>
            <span>总销售额</span>
          </span>
        </p>
        <div @click="goPeopleDetail(item,index)" v-for="(item,index) in allDatas">
          <span>{{Number(index)+1}}</span>
          <span>
            <span>{{item.StaffName}}</span>
            <span>&yen;{{item.AllPrice}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "people",
    data() {
      return {
        topIndex: 1,//全部本月上月自定义
        datetime1: '',//开始时间
        datetime2: '',//结束时间
        allDatas: '',//绩效统计数据
      }
    },
    created(){
      this.getAllData();
    },
    methods: {
      /* 进入详情页面 */
      goPeopleDetail(data,index) {
        let aaa = {
          indexs:index
        }
        Object.assign(data, aaa);
        this.$router.push({path: '/detail',query:{plan:data}});
      },
      /* 员工管理 */
      goPeopleManagement() {
        this.$router.push({path: '/peopleManagement'});
      },
      /* 绩效统计 */
      getAllData() {
        this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_performance.php', this.sendData({
          TimeStart:'',
          TimeEnd:''
        })).then(res => {
          console.log(res)
          if(res.data.err_code === "0000"){
            this.allDatas = res.data.data;
          }else {
            this.$store.dispatch('getDatas',{
              states:true,
              msg:res.data.err_msg
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /* 根据时间展示数据  选择展示方式*/
      choiceTimes(val){
        this.topIndex = val;
        let beforeTime = '';
        let afterTime = '';
        let itsMonth = new Date().getMonth()+1;
        let itsYears = new Date().getFullYear();
        if(Number(val) === 2){
          let days = new Date(Number(itsYears), Number(itsMonth), 0).getDate();
          //let aaa = Number(itsYears) + '/' + Number(itsMonth) + '/' + 1 + ' 00:00:00';
           beforeTime = Date.parse(new Date(Number(itsYears) + '/' + Number(itsMonth) + '/' + 1 + ' 00:00:00')) / 1000;
           afterTime = Date.parse(new Date(Number(itsYears) + '/' + Number(itsMonth) + '/' + Number(days) + ' 00:00:00')) / 1000;
        }else if(Number(val) === 3){
          if(Number(itsMonth) === 1){
            let days = new Date((Number(itsYears)-1), 12, 0).getDate();
             beforeTime = Date.parse(new Date((Number(itsYears)-1) + '/' + 12 + '/' + 1 + ' 00:00:00')) / 1000;
             afterTime = Date.parse(new Date((Number(itsYears)-1) + '/' + 12 + '/' + Number(days) + ' 00:00:00')) / 1000;
          }else {
            let days = new Date(Number(itsYears), (Number(itsMonth)-1), 0).getDate();
             beforeTime = Date.parse(new Date(Number(itsYears) + '/' + (Number(itsMonth)-1) + '/' + 1 + ' 00:00:00')) / 1000;
             afterTime = Date.parse(new Date(Number(itsYears) + '/' + (Number(itsMonth)-1) + '/' + Number(days) + ' 00:00:00')) / 1000;
          }
        }else if(Number(val) === 4){
          return false;
        }else {
          console.log('全部')
        }
        this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_performance.php', this.sendData({
          TimeStart:beforeTime,
          TimeEnd:afterTime
        })).then(res => {
          console.log(res)
          if(res.data.err_code === "0000"){
            this.allDatas = res.data.data;
          }else {
            this.$store.dispatch('getDatas',{
              states:true,
              msg:res.data.err_msg
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /* 自定义时间查询 */
      yourSelfChoiceTime(){
        if(this.datetime1 === '' && this.datetime2 === ''){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'开始时间与结束时间不能为空！'
          })
          return false;
        }
        let beforeTime = Date.parse(new Date(this.datetime1 + ' 00:00:00')) / 1000;
        let afterTime = Date.parse(new Date(this.datetime2 + ' 00:00:00')) / 1000;
        this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_performance.php', this.sendData({
          TimeStart:beforeTime,
          TimeEnd:afterTime
        })).then(res => {
          console.log(res)
          if(res.data.err_code === "0000"){
            this.allDatas = res.data.data;
          }else {
            this.$store.dispatch('getDatas',{
              states:true,
              msg:res.data.err_msg
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }

  }
</script>

<style scoped lang="scss">
  .people {
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
      & > i:nth-of-type(1) {
        position: absolute;
        font-size: .3rem;
        right: .28rem;
        color: #ffffff;
      }
    }
    .container {
      margin-top: 1rem;
      .choiceYourSelf {
        background-color: #ffffff;
        & > div:nth-of-type(1) {
          padding: .12rem 0;
          display: flex;
          & > span {
            display: inline-block;
            text-align: center;
            width: 1.5rem;
            height: .7rem;
            background-color: #f0f0f0;
            /*border: 1px solid #4b5060;*/
            box-sizing: border-box;
            margin-left: .3rem;
            border-radius: .08rem;
            line-height: .7rem;
            font-size: .28rem;
            color: #666666;
          }
          .topActive {
            background-color: #4b5060;
            color: #ffffff;
          }
        }
        & > div:nth-of-type(2) {
          display: flex;
          justify-content: flex-start;
          padding-left: .3rem;
          padding-bottom: .12rem;
          & > span {
            display: flex;
            justify-content: center;
            flex-direction: column;
            font-size: .28rem;
            color: #666666;
            margin: 0 .12rem;
          }
          & > button {
            width: 1.4rem;
            height: .7rem;
            border: 1px solid #e8e8e8;
            border-radius: 8px;
            font-size: .28rem;
            color: #666666;
            margin-left: .2rem;
          }
        }
      }
      .ranking {
        margin-top: .15rem;
        & > P {
          background-color: #f6f6f6;
          height: .52rem;
          line-height: .52rem;
          color: #999999;
          font-size: .24rem;
          display: flex;
          border-bottom: 1px solid #e8e8e8;
          & > span:nth-of-type(1) {
            font-size: .28rem;
            width: .6rem;
            display: inline-block;
            text-align: center;
          }
          & > span:nth-of-type(2) {
            display: flex;
            justify-content: space-between;
            width: calc(100% - 0.6rem);
            & > span:nth-of-type(1) {
              margin-left: .25rem;
            }
            & > span:nth-of-type(2) {
              margin-right: .3rem;
            }
          }
        }
        & > div {
          background-color: #ffffff;
          height: .9rem;
          line-height: .9rem;
          color: #999999;
          font-size: .24rem;
          display: flex;
          border-bottom: 1px solid #e8e8e8;
          & > span:nth-of-type(1) {
            font-size: .28rem;
            width: .6rem;
            display: inline-block;
            text-align: center;
            background-color: #f6f6f6;
          }
          & > span:nth-of-type(2) {
            display: flex;
            justify-content: space-between;
            width: calc(100% - 0.6rem);
            & > span:nth-of-type(1) {
              margin-left: .25rem;
              font-size: .3rem;
              color: #333333;
            }
            & > span:nth-of-type(2) {
              margin-right: .3rem;
              font-size: .32rem;
              color: #333333;
              color: #333333;
            }
          }
        }
        & > div:nth-of-type(1) {
          & > span:nth-of-type(1) {
            color: #ff6633;
            background-color: #ffefee;
          }
        }
        & > div:nth-of-type(2) {
          & > span:nth-of-type(1) {
            color: #ff6633;
            background-color: #ffefee;
          }
        }
        & > div:nth-of-type(3) {
          & > span:nth-of-type(1) {
            color: #ff6633;
            background-color: #ffefee;
          }
        }
        & > div:last-child {
          border-bottom: none;
        }
      }
    }

  }
</style>
<style lang="scss">
  .people {
    .yd-datetime-input {
      width: 2.1rem;
      height: .7rem;
      line-height: .7rem;
      border-radius: 8px;
      border: 1px solid #e8e8e8;
      text-align: center;
      font-size: .28rem;
      color: #666666;
    }
  }
</style>
