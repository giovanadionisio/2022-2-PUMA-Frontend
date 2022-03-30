/* eslint-disable camelcase */
import { extend } from 'vee-validate';
// eslint-disable-next-line camelcase
import {
  email, required, min, regex,
} from 'vee-validate/dist/rules';
import UserService from '../../../services/userService';
import Loading from '../../../components/Loading.vue';

const userService = new UserService();

export default {
  name: 'LoginUsuario',
  components: {
    Loading,
  },
  data() {
    return {
      email: '',
      isLoading: false,
      isEqualsToNewPassword: true,
      newPassword: '',
      confirmNewPassword: '',
      passwordRedefined: false,
    };
  },

  created() {
    this.email = localStorage.email;
  },

  methods: {
    verifyConfirmPassword() {
      if (this.confirmNewPassword === this.newPassword) {
        this.isEqualsToNewPassword = true;
      } else {
        this.isEqualsToNewPassword = false;
      }
    },

    updatePassword() {
      if (this.isEqualsToNewPassword && this.newPassword.length) {
        userService.updatePassword(this.email, this.newPassword, (res) => {
          if (res.status === 200) {
            this.passwordRedefined = true;
          }
        });
      }
    },
  },
};

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
  message: 'Campo obrigatório',
});

extend('min', {
  // eslint-disable-next-line camelcase
  ...min,
  message: 'Mínimo 6 caracteres',
});

extend('regex', {
  // eslint-disable-next-line camelcase
  ...regex,
  message: 'Precisa ter letras e números',
});
