import Vue from 'vue'
import Router from 'vue-router'
//首页及列表
import Home from '../components/Home'
import List from '../components/List'
//登录及美食详情
import Login from '../components/Login'
import Search from '../components/Search'
//个人中心路由
import Self from '../components/Self-introductionSelf-introduction'
import showmy from '../components/showmy'
import order from '../components/order'
import collect from '../components/collect'
import evaluate from '../components/evaluate'
import first from '../components/first'
//店铺及景点详情页
import ScenicDetails from '../components/ScenicDetails'
import StoreDetails from '../components/StoreDetails'
//后台
import  ServerHome from '../components/ServerHome'
import  Store from '../components/server/store/Store'
import Menu from '../components/server/store/Menu'
import Order from '../components/server/order/Order'
import Scenic from '../components/server/scenic/Scenic'
import Food from '../components/server/food/food'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/List',
      name: 'List',
      component: List
    }, {
      path: '/Login',
      name: 'Login',
      component: Login
    }, {
      path: '/Search',
      name: 'Search',
      component: Search
    }, {
      path: '/ScenicDetails',
      name: 'ScenicDetails',
      component: ScenicDetails
    },
    {
      path: '/StoreDetails',
      name: 'StoreDetails',
      component: StoreDetails
    }, {
      path: '/Self',
      name: 'Self',
      component: Self,
      children: [
        {
          path: '/order',
          name: 'order',
          component: order
        },
        {
          path: '/showmy',
          name: 'showmy',
          component: showmy
        },
        {
          path: '/collect',
          name: 'collect',
          component: collect
        }
        ,
        {
          path: '/evaluate',
          name: 'evaluate',
          component: evaluate
        }
        ,
        {
          path: '/first',
          name: 'first',
          component: first
        }
      ]
    }
    ,
    {
      path: '/ServerHome',
      name: 'ServerHome',
      component: ServerHome,
      children:[
        {
          path: 'server/store/Store',
          name: 'Store',
          component: Store
        },
        {
          path: 'server/store/Menu',
          name: 'Menu',
          component: Menu
        },
        {
          path:"server/order/Order",
          name:'Order',
          component:Order

        },
        {
          path:"server/scenic/Scenic",
          name:'Scenic',
          component:Scenic

        }
        ,
        {
          path:"server/food/Food",
          name:'Food',
          component:Food
        }

      ]
    }
  ]
})
