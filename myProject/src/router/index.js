import Vue from 'vue'
import Router from 'vue-router'
import signIn from '../components/signIn'
import signUp from '../components/signUp'
import resetPassword from '../components/resetPassword'
import index from '../components/index/index'
import homePage from '../components/index/homePage/homePage'
import people from '../components/index/people'
import product from  '../components/index/product'
import performance from '../components/index/performance'
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/index',
      meta: {
        requiresAuth: true
      },
      component: index,
      children:[
        {path:'', name:'homePage',component:homePage},
        {path:'/people', name:'people',component:people},
        {path:'/product', name:'product',component:product},
        {path:'/performance', name:'performance',component:performance},
      ]
    },
  ]
})
router.beforeEach((to,from,next) => {
  //判断是否需要登录权限
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //判断是否登录
    if(localStorage.getItem('storeId') ===''){
      next({
        path:'/',
        query:{redirect: to.fullPath}
      })
      // console.log('yes')
    }else{  //如果没有登录跳转到登录页面
      next()
      // console.log('what')
    }
  }else {
    next()
  }
})

export default router
