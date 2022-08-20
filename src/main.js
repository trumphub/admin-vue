import Vue from 'vue'

// 样式重置
import 'normalize.css'

// 组件库
import ElementUI from 'element-ui';
import '@/styles/element-variables.scss'

// 全局样式
import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import '@/icons'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
