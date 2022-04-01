import BootstrapVue from 'bootstrap-vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import axios from 'axios';
import VueMask from 'v-mask';
import {
  localize,
  extend,
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from 'vee-validate';
import {
  // eslint-disable-next-line camelcase
  alpha_spaces,
  min,
  email,
  confirmed,
  required,
  max,
} from 'vee-validate/dist/rules';
import pt from 'vee-validate/dist/locale/pt_BR.json';
import dotenv from 'dotenv';
import App from './App.vue';
import router from './router';
import store from './store';
import environment from './config/environment';
import { validarCpf, validarCnpj } from '../utils/validators-puma';

dotenv.config();

localize('pt_BR', pt);
setInteractionMode('eager');

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('multiselect', Multiselect);

Vue.use(VueMask);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

environment.configUser();

extend('email', {
  ...email,
  validate(value) {
    if (value) {
      return email.validate(value);
    }
    return '';
  },
  message: 'Insira um email válido',
});
extend('required', {
  ...required,
  message: 'Preenchimento obrigatório',
});
extend('min', {
  ...min,
  validate(value, { length }) {
    if (value) {
      return !(value.length < length);
    }
    return '';
  },
  params: ['length'],
  /* eslint-disable max-len */
  message: (fieldName, placeholders) => (fieldName.slice(-1).toLowerCase() === 'a' ? `A ${fieldName} deve ter ao menos ${placeholders.length} caracteres` : `O ${fieldName} deve ter ao menos ${placeholders.length} caracteres`),
});
extend('confirmed', {
  ...confirmed,
  validate(value, { target }) {
    if (value) {
      return value === target;
    }
    return '';
  },
  params: ['target'],
  message: 'Os campos devem coincidir',
});
extend('alpha_spaces', alpha_spaces);
extend('max', max);
extend('cnpj', {
  validate: (value) => {
    if (value.length === 18) {
      return validarCnpj(value);
    }
    return '';
  },
  message: 'CNPJ inválido',
});
extend('multiselect', {
  validate(value) {
    console.log(value);
    // console.log(args);
    // const length = value.length;
    return '';
  },
});
extend('cpf', {
  validate: (value) => {
    if (value.length === 14) {
      return validarCpf(value);
    }
    return '';
  },
  message: 'CPF inválido',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default axios;
