<template>
  <div class="signUp">
    <header>
      <i class="icon-fanhui" @click="goBack()"></i>
      <span>注册</span>
    </header>
    <!-- 注册内容 -->
    <div class="container">
      <div>
        <ul>
          <li>
            <span>姓名</span>
            <input type="text" placeholder="请输入姓名" v-model="user.name">
          </li>
          <li>
            <span>手机号</span>
            <input type="tel" maxlength="11" oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                   placeholder="请输入11位手机号" v-model="user.phone">
          </li>
          <li>
            <span>验证码</span>
            <input type="tel" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                   placeholder="请输入验证码" v-model="user.code">
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
      <div>
        <ul>
          <li>
            <span>店铺名称</span>
            <input type="text" placeholder="请输入店铺名称" v-model="user.shopName">
          </li>
          <li>
            <span>店铺地址</span>
            <!--<input type="text" placeholder="请输入店铺地址" v-model="user.shopAddress">-->
            <div>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <input slot="right" type="text" @click.stop="show1 = true" v-model="model" readonly placeholder="请选择收货地址">
                </yd-cell-item>
              </yd-cell-group>
              <yd-cityselect v-model="show1" :callback="result1" :items="district"></yd-cityselect>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <textarea  cols="30" rows="3" class="textContainer" placeholder="请输入详细地址..." v-model="user.shopAddress">

        </textarea>
      </div>
      <div>
        <button type="button" @click="register()">注册</button>
      </div>
    </div>
    <div class="test">

    </div>
    <div class="footer">
      <span>&copy; 2018 用道云 {{copy}}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import District from 'ydui-district/dist/jd_province_city_area_id';
  export default {
    name: "sign-up",
    data() {
      return {
        user:{
          name:'',
          phone:'',
          code:'',
          password:'',
          passwordTwo:'',
          shopName:'',
          shopAddress:''
        },
        time:60, //验证码倒计时
        getCode:true, //验证码转换
        show1: false,
        model: '',
        district: District
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
      getMyCode() {
        if (this.user.phone === '') {
          this.$store.dispatch('getDatas', {
            states: true,
            msg: '请输入手机号！'
          })
          return false;
        }
        let time = Date.parse(new Date()).toString().substring(0, 10);
        let strA = {
          method: 'send_sms_code',
          system_id: 85916832,
          timestamp: time,
          phone: this.user.phone,
          type: 1
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
            type: 1
          }
        }).then(respone => {
          console.log(respone);
          if (respone.data.err_code === "0000") {
            this.getCode = false;
            let clock = setInterval(() => {
              if ((this.time--) <= 0) {
                this.time = 60;
                this.getCode = true;
                clearInterval(clock)
              }
            }, 1000)
          } else if (respone.data.err_code === "0002") {
            this.$store.dispatch('getDatas', {
              states: true,
              msg: '该号码已注册，请登录！'
            })
          } else {
            this.$store.dispatch('getDatas', {
              states: true,
              msg: respone.data.err_msg
            })
          }

        }).catch(err => {
          console.log(err)
        })
      },
      /* 注册按钮 */
      register() {
        if (this.user.name === '') {
          this.$store.dispatch('getDatas', {
            states: true,
            msg: '请输入姓名！'
          })
          return false;
        } else if (this.user.phone === '') {
          this.$store.dispatch('getDatas', {
            states: true,
            msg: '请输入手机号！'
          })
          return false;
        } else if (this.user.code === '') {
          this.$store.dispatch('getDatas', {
            states: true,
            msg: '请输入验证码！'
          })
          return false;
        } else if (this.user.password === '') {
          this.$store.dispatch('getDatas', {
            states: true,
            msg: '请输入密码！'
          })
          return false;
        } else if (this.user.passwordTwo === '') {
          this.$store.dispatch('getDatas', {
            states: true,
            msg: '请输入确认密码！'
          })
          return false;
        } else if (this.user.shopName === '') {
          this.$store.dispatch('getDatas', {
            states: true,
            msg: '请输入店铺名称！'
          })
          return false;
        } /*else if (this.user.shopAddress === '') {
          this.$store.dispatch('getDatas', {
            states: true,
            msg: '请输入店铺地址！'
          })
          return false;
        }*/
        if (this.user.password !== this.user.passwordTwo) {
          this.$store.dispatch('getDatas', {
            states: true,
            msg: '两次密码输入不一致！'
          })
          return false;
        }
        /* 拼接地址 */
        let addAddress = this.model+this.user.shopAddress;
        /* 接口 */
        let time = Date.parse(new Date()).toString().substring(0, 10);
        let obj = {
          method: 'register',
          system_id: 85916832,
          timestamp: time,
          address: addAddress,
          code: this.user.code,
          name: this.user.shopName,
          phone: this.user.phone,
          password: this.user.password,
          user_name: this.user.name
        };
        this.$http({
          method: 'post',
          url: 'https://api.yongdaoyun.com/pub/entrance',
          data: {
            sign: this.objKeySort(obj),
            method: 'register',
            system_id: 85916832,
            timestamp: time,
            address: addAddress,
            code: this.user.code,
            name: this.user.shopName,
            phone: this.user.phone,
            password: this.user.password,
            user_name: this.user.name
          }
        }).then(res => {
          console.log(res)
          if (res.data.err_code == "0000") {
            this.$router.push({path: '/'})
          } else {
            this.$store.dispatch('getDatas', {
              states: true,
              msg: res.data.err_msg
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },


      result1(ret) {
        this.model = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      },
    }
  }
</script>

<style scoped lang="scss">
  .signUp {
    & > header {
      height: 1rem;
      font-size: .36rem;
      border-bottom: 1px solid #e8e8e8;
      text-align: center;
      line-height: 1rem;
      background-color: #4B5060;
      position: relative;
      color: #ffffff;
      & > i {
        position: absolute;
        font-size: .3rem;
        left: .3rem;
      }
    }
    .container {
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
          & > li:nth-of-type(3) {
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
        background-color: #ffffff;
        font-size: 0.3rem;
        color: #333333;
        margin-top: .22rem;
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
          & > li:last-child {
            /*border-bottom: none;*/
            &>div{
              display: inline-block;
              input{
                border: none;
                width: 4.8rem;
              }
              i{
                display: inline-block;
                font-size: .22rem;
              }
            }
          }
        }
      }
      &>div:nth-of-type(3){
        background-color: #ffffff;
        .textContainer{
          width: 100%;
          border: none;
          color: #333333;
          font-size: .3rem;
          padding: .3rem;
        }
      }
      & > div:nth-of-type(4) {
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
<style lang="scss">
  .signUp{
    .yd-cell-box{
      margin-bottom: 0;
      height: .91rem;
    }
    .yd-cell{
      height: .91rem;
    }
    .yd-cell:after{
      border-bottom: 1px solid #e8e8e8;
    }
  }
</style>
