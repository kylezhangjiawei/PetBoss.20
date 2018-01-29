// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import store from './vuex'
import YDUI from 'vue-ydui'
import '../static/icon/iconfont.css'


/* 启用Vuex状态管理 */
Vue.use(Vuex);

/* 启用YDUI */
Vue.use(YDUI);

/* API */
// import 'configuration/api'

/* 对VUE添加通用方法(数据请求的加密) */
import {getSendData,sendData} from '../static/configuration/encryptionOne'
Vue.prototype.getSendData = getSendData;
Vue.prototype.sendData = sendData;

/* 对VUE添加个别方法(登陆的加密) */
import {objKeySort} from '../static/configuration/encryptionTwo'
Vue.prototype.objKeySort = objKeySort;

/* 设置axios调用方式 */
Vue.prototype.$http = axios;

/* 版本号 */
global.copy = "1.0.14";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

/* 状态拦截 */
//全局注册数据加载前动画
axios.defaults.timeout =5000;
// var loadinginstace
/* 请求数据前 */
axios.interceptors.request.use(config =>{
  console.log(config.data)
  // if(config.data.method=="login"){
  //   loadinginstace = Indicator.open('加载中..');
  // }else{
  //   console.log('oJBk')
  // }
  return config
}),error =>{
  // loadinginstace=Indicator.close();
  // Toast({
  //   message:'加载超时',
  //   duration:2000
  // })
  console.log(error);
  return Promise.reject(error);
}
/* 请求数据后 */
axios.interceptors.response.use(data =>{
  // loadinginstace=Indicator.close();
  console.log(data)
  return data
}),error =>{
  // loadinginstace=Indicator.close();
  // Toast({
  //   message:'加载失败',
  //   duration:2000
  // })
  console.log(error)
  return Promise.reject(error)
}

/* 时间格式化 */
Date.prototype.format = function(fmt) {
  let o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
};
