import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Spin, Icon, Input, message } from 'ant-design-vue'

Vue.config.productionTip = false

Vue.prototype.$message = message

Vue.use(Button)
Vue.use(Spin)
Vue.use(Icon)
Vue.use(Input)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
