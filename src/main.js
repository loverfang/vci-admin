import Vue from 'vue' // 引入Vue

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import '@/icons' // icon

import '@/permission' // permission control

//  引入vue最核心的内容
import App from './App'
import store from './store'
import router from './router'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//    mockXHR()
// }

// 设置使用ElementUI并设置语言为英文EN
Vue.use(ElementUI, { locale })

// 是否打印非必要的日志信息
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
