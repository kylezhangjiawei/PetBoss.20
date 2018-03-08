<template>
  <div class="resetPassword">
    <header>
      <i class="icon-fanhui" @click="goBack()"></i>
      <span>重置密码</span>
    </header>
    <!-- 内容主体 -->
    <div class="container">
      <div>
        <ul>
          <li>
            <span>手机号</span>
            <input type="tel" placeholder="请输入11位手机号" oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="11" v-model="user.phone">
          </li>
          <li>
            <span>验证码</span>
            <input type="tel" placeholder="请输入验证码" oninput="this.value = this.value.replace(/[^0-9]/g, '')" v-model="user.code">
            <em v-if="getCode" @click="getMyCode()">获取验证码</em>
            <em v-else>{{time + '秒后获取'}}</em>
          </li>
          <li>
            <span>密码</span>
            <input type="password" placeholder="请输入密码" v-model="user.password">
          </li>
          <li>
            <span>确认密码</span>
            <input type="password" placeholder="请确认密码" v-model="user.passwordTwo">
          </li>
        </ul>
      </div>
      <!-- 重置密码按钮 -->
      <div>
        <button type="button" @click="finish()">完成</button>
      </div>
    </div>
    <div class="footer">
      <span>&copy; 2018 用道云 {{copy}}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.rem/dialog';
  export default {
    name: "reset-password",
    data() {
      return {
        user:{
          phone:'',
          code:'',
          password:'',
          passwordTwo:''
        },
        time:60, //验证码倒计时
        getCode:true, //验证码转换
      }
    },
    computed:{
      ...mapGetters([
        'copy'
      ])
    },
    created() {

    },
    methods: {
      /* 返回 */
      goBack() {
        this.$router.go(-1);
      },
      /* 获取验证码 */
      getMyCode(){
        if(this.user.phone === ''){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'请输入手机号！'
          })
          return false;
        }
        let time = Date.parse(new Date()).toString().substring(0, 10);
        let strA = {
          method: 'send_sms_code',
          system_id: 85916832,
          timestamp: time,
          phone: this.user.phone,
          type: 2
        };
        this.$http({
          method: 'post',
          url: 'https://api.yongdaoyun.com/pub/entrance',
          data: {
            sign: this.objKeySort(strA),
            method: 'send_sms_code',
            system_id: 85916832,
            timestamp: time,
            phone: this.user.phone,
            type: 2
          }
        }).then( respone => {
          console.log(respone);
          if (respone.data.err_code === "0000") {
            this.getCode = false;
            Toast({
              mes: '已发送验证码！',
              timeout: 2000
            });
            let clock = setInterval(() => {
              if ((this.time--) <= 0) {
                this.time = 60;
                this.getCode = true;
                clearInterval(clock)
              }
            }, 1000)
          } else if (respone.data.err_code === "0002") {
            this.$store.dispatch('getDatas',{
              states:true,
              msg:respone.data.err_msg
            })
          } else {
            this.$store.dispatch('getDatas',{
              states:true,
              msg:respone.data.err_msg
            })
          }

        }).catch( err => {
          console.log(err)
        })
      },
      /* 完成按钮 */
      finish(){
        if(this.user.phone === ''){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'请输入手机号！'
          })
          return false;
        }else if(this.user.code === ''){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'请输入验证码！'
          })
          return false;
        }else if(this.user.password === ''){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'请输入密码！'
          })
          return false;
        }else if(this.user.passwordTwo === ''){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'请输入确认密码！'
          })
          return false;
        }
        if(this.user.password !== this.user.passwordTwo){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'两次密码输入不一致！'
          })
          return false;
        }
        let time = Date.parse(new Date()).toString().substring(0,10);
        let obj = {
          method: 'retrieve_password',
          system_id:85916832,
          timestamp:time,
          code:this.user.code,
          phone:this.user.phone,
          password:this.user.password,
          password_two:this.user.passwordTwo
        };
        this.$http({
          method:'post',
          url:'https://api.yongdaoyun.com/pub/entrance',
          data:{
            sign:this.objKeySort(obj),
            method: 'retrieve_password',
            system_id:85916832,
            timestamp:time,
            code:this.user.code,
            phone:this.user.phone,
            password:this.user.password,
            password_two:this.user.passwordTwo
          }
        }).then( res  =>{
          console.log(res)
          if (res.data.err_code == "0000"){
            this.$router.push({path:'/'})
          }else{
            this.$store.dispatch('getDatas',{
              states:true,
              msg:res.data.err_msg
            })
          }
        }).catch( err =>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .resetPassword {
    & > header {
      height: 1rem;
      font-size: .36rem;
      color: #ffffff;
      border-bottom: 1px solid #e8e8e8;
      text-align: center;
      line-height: 1rem;
      background-color: #4B5060;
      position: relative;
      & > i {
        position: absolute;
        font-size: .3rem;
        left: .3rem;
      }
    }
    .container{
     /* margin-top: .32rem;*/
      & > div:nth-of-type(1) {
        background-color: #ffffff;
        font-size: 0.3rem;
        color: #333333;
        & > ul {
          padding-left: .3rem;
          & > li {
            display: flex;
            height: .91rem;
            line-height: .91rem;
            box-sizing: border-box;
            border-bottom: 1px solid #e8e8e8;
            & > span {
              display: inline-block;
              width: 1.9rem;
            }
            & > input {
              border: none;
            }
          }
          & > li:nth-of-type(2) {
            em {
              display: inline-block;
              width: 1.8rem;
              height: 100%;
              border-left: 1px solid #e8e8e8;
              text-align: center;
              color: #ff6633;
            }
          }
          & > li:last-child {
            border-bottom: none;
          }
        }
      }
      & > div:nth-of-type(2) {
        margin-top: .42rem;
        text-align: center;
        & > button {
          width: 6.3rem;
          height: .88rem;
          border-radius: 5px;
          background-color: #ff6633;
          color: #ffffff;
          border: none;
          font-size: .34rem;
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
