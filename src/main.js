import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast'

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 解决移动端点击300ms延迟
FastClick.attach(document.body)

// 加载图片懒加载插件->https://www.npmjs.com/package/vue-lazyload
Vue.use(VueLazyload, {
  // 加载数量，默认3张
  attempt: 4,
  loading: require('./assets/img/common/placeholder.png'),
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
