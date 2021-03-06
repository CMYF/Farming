// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import '../theme/index.css' // 重置Element-ui主题
import App from './App'
import router from './router'
Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(ElementUI)
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })