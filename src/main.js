// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import LocalStore from 'store'
import 'element-ui/lib/theme-default/index.css'
import './assets/scss/cmy-variable.scss'
//import '../theme/index.css' // 重置Element-ui主题
import App from './App'
import router from './router'
Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(ElementUI)
axios.defaults.baseURL = BASE_URL;
axios.defaults.transformRequest = function (data) {
  let token = LocalStore.get('token');
  if (token) {
    if (!data) {
      data = 'loginedtoken=' + token;
    } else {
      data += '&loginedtoken=' + token;
    }
  }
  return data;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})