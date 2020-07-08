// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Index from './router/Index.vue'
import Homepage from './router/Staff'
import router from './router'
import moment from 'moment'
import qs from 'qs';
import datePicker from "./components/datePicker";
//import Vue from'vue'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import store from './store'
Vue.use(ElementUI) //使用elementUI


/* eslint-disable no-new */
Vue.prototype.$moment=moment;
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios= require('axios')
axios.defaults.baseURL='http://localhost:8888/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
//全局注册，之后在其他组件中通过this.$axios发送数据
Vue.prototype.$axios=axios
Vue.config.productionTip = false

Vue.prototype.$qs = qs;



//首先判断访问的路径是否需要登录，如果需要，判断 store 里有没有存储 user 的信息，
// 如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在登录后跳转到访问页）。
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      if (store.state.user.username) {
        next()
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)

new Vue({
  el: '#app',
  render: h=>h(App),
  router,

  store,
  components: {
    App
  },
  template: '<app/>',


});

