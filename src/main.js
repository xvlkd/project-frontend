import VueEasySession from "vue-easysession";
import Vue from 'vue';
import App from './App';
import Axios from 'axios';
import router from './router';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import store from './store'

var options = {
	persist: true,
}

Vue.use(VueEasySession.install, options);

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://localhost:8000/api/';
//Vue.prototype.$apiUrl = 'https://kouvee.simbahlucu.com/api/'; // hosting

Vue.config.productionTip = false;
Axios.defaults.withCredentials = true;
Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
Axios.defaults.headers.post["Content-Type"] = "application/json";

new Vue({
    render: (h) => h(App),
    vuetify,
    router,
    store,
    components: {
		App
	}
}).$mount('#app');