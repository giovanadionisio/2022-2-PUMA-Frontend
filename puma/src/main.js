import Vue from 'vue';
import axios from 'axios';
import VueMask from 'v-mask';
import {
  localize,
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from 'vee-validate';
import pt from 'vee-validate/dist/locale/pt_BR.json';
import dotenv from 'dotenv';
import App from './App.vue';
import router from './router';
import store from './store';
import environment from './config/environment';

dotenv.config();

localize('pt_BR', pt);
setInteractionMode('eager');
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(VueMask);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

environment.configUser();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default axios;
