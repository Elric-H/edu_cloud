import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/theme/theme-default/index.css'
import './styles/newStyles.css'
import 'element-ui/lib/theme-chalk/display.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './router/index'


import '../static/css/font-awesome.min.css'

//自定义全局样式
import './assets/style/all-style.css'
import './assets/font/iconfont.css'


Vue.use(ElementUI,{size:"small"});
Vue.use(VueRouter);
Vue.use(Vuex);

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path == '/') {
        next({ path: '/index' })
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/index') {
    next({ path: '/index' })
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

