<template>
  <div class="peopleManagementDetail">
    <header>
      <i class="icon-fanhui" @click="goBack()"></i>
      <span>{{peopleData.StaffName}}</span>
    </header>
    <!-- 内容区域 -->
    <div class="container">
      <!-- 人员基础信息 -->
      <div class="headerMsg">
        <div>
            <span>
              <img :src=peopleData.StaffUrl alt="" v-if="peopleData.StaffUrl" style="width: 100%;height: 100%">
              <i class="icon-meirongshi" v-if='peopleData.StaffUrl === "" '></i>
            </span>
          <span>
              <dl>
                <dt>{{peopleData.StaffName}}</dt>
                <dd>{{peopleData.StaffPhone}}</dd>
              </dl>
            </span>
        </div>
        <div>
          <span>{{peopleData.JobName}}</span>
        </div>
      </div>
      <!-- 本月绩效统计 -->
      <!--<div class="performance">
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
      </div>-->
      <!-- 创建日期，当前状态，备注 -->
      <div class="item">
        <p>
          <span>创建日期</span>
          <span>{{peopleData.CreateDate}}</span>
        </p>
        <p>
          <span>当前状态</span>
          <span v-if="Number(peopleData.State) === 1">已启用</span>
          <span v-else-if="Number(peopleData.State) === 2">未激活</span>
          <span v-else-if="Number(peopleData.State) === 3">已停用</span>
          <span v-else>已删除</span>
        </p>
        <p v-if="peopleData.Note">
          <span>备注</span>
          <span>{{peopleData.Note}}</span>
        </p>
      </div>
      <!-- 页脚按钮 -->
      <div class="footerButton" v-if="Number(peopleData.State) === 1">
        <button type="button" @click="goChangePeople">修改资料</button>
        <button type="button" @click="resetPassWord">重置密码</button>
        <button type="button" @click="turnOnOrTurnOff(1)">停用</button>
      </div>
      <div class="footerButton" v-if="Number(peopleData.State) === 2">
        <button type="button" @click="goChangePeople">修改资料</button>
        <button type="button" @click="delPeopel">删除</button>
        <button type="button" @click="sendMessageAgain">重发短信</button>
      </div>
      <div class="footerButtonTwo" v-if="Number(peopleData.State) === 3">
        <button type="button" @click="delPeopel">删除</button>
        <button type="button" @click="turnOnOrTurnOff(2)">启用</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.rem/dialog';
  export default {
    name: "peopleManagementDetail",
    data() {
      return {
        allDatas: '',//获取人员详细数据
        states:true,
      }
    },
    // beforeRouteLeave (to, from , next) {
    //   //console.log(to);
    //   if(to.path === "/addPeople"){
    //     this.states = false;
    //   }else if(to.path === "/peopleManagement"){
    //     this.states = true;
    //   }else {
    //     console.log('1')
    //   }
    //   next();
    // },
    computed:{
      ...mapGetters([
        'peopleData'
      ])
    },
  /*  created() {
      this.allDatas = this.$route.query.plan;
    },*/
    // activated(){
    //  // console.log(this.allDatas)
    //   if(this.states === true){
    //     this.allDatas = this.$route.query.plan;
    //   }else {
    //     console.log('2');
    //   }
    // },
    methods: {
      /* 返回上一层 */
      goBack() {
        this.$router.go(-1)
      },
      /* test */
      test() {
        // Confirm({
        //   title: `我有一个<span style="color: #ff6633;">小毛驴</span>我从来也不骑！`,
        //   opts: () => {
        //     Toast({mes: '你点了确定', timeout: 1000});
        //   }
        // });
        // Toast({
        //   mes: '已停用123456！',
        //   timeout: 2000
        // });
        /*Alert({mes: `初始密码已发送至手机<span style="color: #ff6633;">15950616615</span> ,请此用户及时登录系统激活账号。`});*/
      },
      /* 删除人员 */
      delPeopel() {
        Confirm({
          title: `确定删除<span style="color: #ff6633;">${this.peopleData.StaffName}</span>账号 ? `,
          opts: () => {
            this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_del.php', this.sendData({
              staff_number: this.peopleData.StaffNumber
            })).then(res => {
              console.log(res)
              if (res.data.err_code === "0000") {
                /*this.$router.push({path:'/peopleManagement'});*/
                this.$router.go(-1);
                Toast({mes: '已删除', timeout: 1000});
              } else {
                Toast({mes: res.data.err_msg, timeout: 1000});
              }
            }).catch(err => {
              console.log(err)
            })
          }
        });
      },
      /* 开启，关闭人员 */
      turnOnOrTurnOff(val){
        let aaa ='';
        let bbb = 0;
        if(Number(val) ===1){
          aaa="停用";
          bbb=3;
        }else if(Number(val) ===2){
          aaa="启用";
          bbb=1;
        }else {
          aaa='未知操作'
        }
        Confirm({
          title: `确定${aaa}<span style="color: #ff6633;">${this.peopleData.StaffName}</span>账号 ? `,
          opts: () => {
            this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_stop_open.php', this.sendData({
              staff_number: this.peopleData.StaffNumber,
              state:bbb
            })).then(res => {
              console.log(res)
              if (res.data.err_code === "0000") {
                /*this.$router.push({path:'/peopleManagement'});*/
                this.$router.go(-1);
                Toast({mes: '已'+aaa, timeout: 1000});
              } else {
                Toast({mes: res.data.err_msg, timeout: 1000});
              }
            }).catch(err => {
              console.log(err)
            })
          }
        });
      },
      /* 重置密码 */
      resetPassWord(){
        this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_double.php', this.sendData({
          staff_number:this.peopleData.StaffNumber,
          staff_phone:this.peopleData.StaffPhone,
          staff_name:this.peopleData.StaffName
        })).then(res => {
          console.log(res)
          if(res.data.err_code === "0000"){
            /*Alert({mes: `初始密码已发送至手机<span style="color: #ff6633;">${this.peopleData.StaffPhone}</span> ,请此用户及时登录系统激活账号。`});*/
            Toast({mes: '已重新发送密码', timeout: 2000});
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
      /* 重发短信 */
      sendMessageAgain(){
        this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_double.php', this.sendData({
          staff_number:this.peopleData.StaffNumber,
          staff_phone:this.peopleData.StaffPhone,
          staff_name:this.peopleData.StaffName
        })).then(res => {
          console.log(res)
          if(res.data.err_code === "0000"){
            Toast({
              mes: '短信已发送！',
              timeout: 2000
            });
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
      /* 跳转到修改页面 */
      goChangePeople(){
        this.$router.push({path:'/addPeople',query:{plan:this.allDatas}})
      }
    }
  }
</script>

<style scoped lang="scss">
.peopleManagementDetail{
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
          overflow: hidden;
          border-radius: 10px;
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
    /*.performance{
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
    }*/
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
    .footerButton{
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
    }
  }
}
</style>

