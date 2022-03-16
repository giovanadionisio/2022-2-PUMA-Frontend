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

Vue.use(VueMask);
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
  message: 'O campo {_field_} deve ter ao menos {length} caracteres',
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
    if (value) {
      return validarCnpj(value);
    }
    return '';
  },
  message: 'CNPJ inválido',
});
extend('cpf', {
  validate: (value) => {
    if (value) {
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
