import Vue from 'vue';
import axios from 'axios';
import VueTheMask from 'vue-the-mask';
// import * as VeeValidate from 'vee-validate';
import {
  localize, ValidationProvider, setInteractionMode,
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
// configure({
//   classes: {
//     valid: 'is-valid',
//     invalid: 'is-invalid',
//   },
// });

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(VueTheMask);

environment.configUser();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default axios;
