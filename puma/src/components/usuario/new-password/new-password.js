/* eslint-disable camelcase */
import { extend } from 'vee-validate';
// eslint-disable-next-line camelcase
import {
  email, required, min, regex,
} from 'vee-validate/dist/rules';
import UserService from '../../../services/UserService';
import Loading from '../../shared/loading/Loading.vue';
import VisitorNav from '../../VisitorNav/VisitorNav.vue';

export default {
  name: 'LoginUsuario',
  components: {
    Loading,
    VisitorNav,
  },
  mounted() {
    document.title = 'PUMA | Atualizar Senha';
  },
  data() {
    return {
      userService: new UserService(),
      email: '',
      isLoading: false,
      isEqualsToNewPassword: true,
      newPassword: '',
      confirmNewPassword: '',
      passwordRedefined: false,
      navs: [{ title: 'HOME' }, { title: 'RECUPERAÇÃO DE SENHA' }],
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

    async updatePassword() {
      const isValid = await this.$refs.observer.validate();
      if (isValid && this.isEqualsToNewPassword && this.newPassword.length) {
        this.userService.updatePassword(this.email, this.newPassword, (res) => {
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
  message: 'Preenchimento obrigatório',
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
