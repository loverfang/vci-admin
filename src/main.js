import Vue from 'vue' // 引入Vue

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import '@/icons' // icon

import '@/permission' // permission control

//  引入vue最核心的内容
import App from './App'
import store from './store'
import router from './router'

import * as filters from './filters' // global filters

// 设置使用ElementUI并设置语言为英文EN
Vue.use(ElementUI)

// 注册全局公用的Filters,比如期格式化等一些功能方法都可以卸载filters中进行全局注册
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false // 是否打印非必要的日志信息
Vue.config.devtools = true // 确认是否允许用户打开开发调试工具，开发版本默认为true，生产版本默认为false。
Vue.config.silent = false // 静默(取消)日志与警告提醒 !isDev [default false]

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
