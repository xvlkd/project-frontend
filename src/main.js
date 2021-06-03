import VueEasySession from 'vue-easysession'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Axios from './plugins/axios'

var options = {
  presist: true,
}

Vue.use(VueEasySession.install, options);

Vue.prototype.$http = Axios;
//Vue.prototype.$apiUrl = 'http://localhost:9000/api/';
Vue.use(VueEasySession.install, options);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App),
  component: {
    App
  }
}).$mount('#app')