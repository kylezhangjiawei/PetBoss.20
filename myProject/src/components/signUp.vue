<template>
  <div class="signUp">
    <header>
      <i class="icon-back1" @click="goBack()"></i>
      <span>注册</span>
    </header>
    <!-- 注册内容 -->
    <div class="container">
      <div>
        <ul>
          <li>
            <span>姓名</span>
            <input type="text" placeholder="请输入姓名">
          </li>
          <li>
            <span>手机号</span>
            <input type="tel" maxlength="11" oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                   placeholder="请输入11位手机号">
          </li>
          <li>
            <span>验证码</span>
            <input type="tel" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                   placeholder="请输入验证码">
            <em>获取验证码</em>
          </li>
          <li>
            <span>密码</span>
            <input type="password" placeholder="请输入密码">
          </li>
          <li>
            <span>确认密码</span>
            <input type="password" placeholder="请确认密码">
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <span>店铺名称</span>
            <input type="text" placeholder="请输入店铺名称">
          </li>
          <li>
            <span>店铺地址</span>
            <input type="text" placeholder="请输入店铺地址">
          </li>
        </ul>
      </div>
      <div>
        <button type="button">注册</button>
      </div>
    </div>
    <div class="footer">
      <span>&copy;2017 用到云 {{copy}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sign-up",
    data() {
      return {
        copy: '',//版本号
      }
    },
    created() {
      this.copy = copy;
    },
    methods: {
      /* 返回 */
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="scss">
  .signUp {
    & > header {
      height: 1rem;
      font-size: .36rem;
      color: #333333;
      border-bottom: 1px solid #e8e8e8;
      text-align: center;
      line-height: 1rem;
      background-color: #ffffff;
      position: relative;
      & > i {
        position: absolute;
        font-size: .3rem;
        left: .3rem;
      }
    }
    .container {
      margin-top: .32rem;
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
            border-bottom: none;
          }
        }
      }
      & > div:nth-of-type(3) {
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
