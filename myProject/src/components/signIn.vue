<template>
  <div class="logoIn">
    <!-- 标题 -->
    <header>
      <span>登录</span>
    </header>
    <!-- 内容主体 -->
    <div class="container">
      <!-- logo -->
      <div>
        <img :src="logo" alt="logo">
      </div>
      <!-- 登录 -->
      <div>
        <div><img :src="phoneIcon" alt="手机号"><input type="tel" maxlength="11"
                                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                                                placeholder="手机号" v-model="phones"></div>
        <div><img :src="passwordIcon" alt="密码"><input type="password" placeholder="密码" v-model="passwords"></div>
      </div>
      <!-- 登录按钮 -->
      <div>
        <button type="button" @click="sign()">登录</button>
      </div>
      <!-- 注册 忘记密码 -->
      <div>
        <span @click="goSignUp()">立即注册</span>
        <hr size="20" width="1" color="#cccccc" style="display: inline-block">
        <span @click="goResetPassword()">忘记密码</span>
      </div>
      <!-- 商标 -->
      <div class="footer">
        <span>&copy;2018 用道云 {{copy}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'logoIn',
    data() {
      return {
        logo: require('../../src/assets/logo2_03.png'), //登录页面logo
        phoneIcon: require('../../src/assets/icon_03.png'), //登录页面手机
        passwordIcon: require('../../src/assets/icon_06.png'), //登录页面密码
        copy: '',//版本号
        phones:'',//手机号
        passwords:'',//密码
      }
    },
    created() {
      this.copy = copy;
    },
    methods: {
      /* 注册 */
      goSignUp() {
        this.$router.push({path: '/signUp'})
      },
      /* 忘记密码 */
      goResetPassword() {
        this.$router.push({path: '/resetPassword'})
      },
      /* 登陆 */
      sign(){
        if(this.phones === '' && this.passwords === ''){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'请输入手机号与密码哦！'
          })
          return false;
        }else if(this.phones === ''){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'请输入手机号！'
          })
          return false;
        }else if(this.passwords === ''){
          this.$store.dispatch('getDatas',{
            states:true,
            msg:'请输入密码！'
          })
          return false;
        }
        console.log(this.phones,this.passwords)
        let time = Date.parse(new Date()).toString().substring(0,10);
        let obj = {
          method: 'login',
          system_id:85916832,
          timestamp:time,
          phone:this.phones,
          password:this.passwords
        };
        this.$store.dispatch('getSign',{
          phone:this.phones,
          password:this.passwords,
          timestamp:time,
          method:'login',
          system_id:85916832,
          sign:this.objKeySort(obj)
        }).then(() => {
          this.$router.push({path:'/index'})
        })
      }
    }
  }
</script>


<style scoped lang="scss">
  .logoIn {
    height: 100%;
    background-color: #ffffff;
    & > header {
      height: 1rem;
      font-size: .36rem;
      color: #333333;
      border-bottom: 1px solid #e8e8e8;
      text-align: center;
      line-height: 1rem;
    }
    .container {
      & > div:first-child {
        width: 100%;
        margin-top: .32rem;
        text-align: center;
        & > img {
          width: 1.85rem;
          height: 2.26rem;
          margin: 0 auto;
        }
      }
      & > div:nth-of-type(2) {
        margin-top: 1.12rem;
        & > div {
          & > input {
            font-size: .3rem;
            height: .6rem;
            width: 5.4rem;
            border: none;
            border-bottom: 1px solid #cccccc;
          }
        }
        & > div:first-child {
          margin-left: .64rem;
          & > img {
            width: .6rem;
            height: .6rem;
            vertical-align: bottom;
            margin-right: .3rem;
          }
        }
        & > div:last-child {
          margin-left: .64rem;
          margin-top: .6rem;
          & > img {
            width: .6rem;
            height: .6rem;
            vertical-align: bottom;
            margin-right: .3rem;
          }
        }
      }
      & > div:nth-of-type(3) {
        & > button {
          width: 6.3rem;
          height: .88rem;
          border-radius: 5px;
          background-color: #ff6633;
          font-size: .34rem;
          color: #ffffff;
          text-align: center;
          margin-top: .8rem;
          margin-left: .64rem;
          border: none;
          outline: none;
        }
      }
      & > div:nth-of-type(4) {
        margin-top: .58rem;
        text-align: center;
        & > span {
          font-size: .36rem;
          color: #666666;
        }
        & > span:nth-of-type(1) {
          margin-right: .4rem;
        }
        & > span:nth-of-type(2) {
          margin-left: .4rem;
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
  }

</style>
