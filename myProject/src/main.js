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
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
import {CitySelect} from 'vue-ydui/dist/lib.rem/cityselect';
import echarts from 'echarts'

/* 启用Vuex状态管理 */
Vue.use(Vuex);

/* YDUI-Popup */
Vue.component(Popup.name, Popup);
/* YDUI省市联动 */
Vue.component(CitySelect.name, CitySelect);

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

/* 设置echarts调用方法 */
Vue.prototype.$echarts = echarts;

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
// http request 拦截器
axios.interceptors.request.use(config =>{
  //console.log(config.data)
  // if(config.data.method=="login"){
  //   loadinginstace = Indicator.open('加载中..');
  // }else{
  //   console.log('oJBk')
  // }
  // if(localStorage.getItem('storeId') && localStorage.getItem('storeId') !== ""){
  //   console.log('过不去的,兄dei~')
  // }
  Loading.open('正在加载...');
  return config
}),error =>{
  // loadinginstace=Indicator.close();
  // Toast({
  //   message:'加载超时',
  //   duration:2000
  // })
  Loading.close();
  //console.log(error);
  return Promise.reject(error);
}
// http response 拦截器
axios.interceptors.response.use(data =>{
  // loadinginstace=Indicator.close();
  Loading.close();
  //console.log(data)
  return data
}),error =>{
  // loadinginstace=Indicator.close();
  // Toast({
  //   message:'加载失败',
  //   duration:2000
  // })
  Loading.close();
  //console.log(error)
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
/* 折叠面板（构造器） */
const accordion = Vue.extend({
  template: `
        <div class="foldContainer">
            <div class="foldHeader">
                <slot name="headerLeft"></slot>
                <slot name="headerRight"></slot>
            </div>
            <div class="foldBody">      
                <slot name="body"></slot>   
            </div>
        </div>
  `
})
Vue.component('fold',accordion);

