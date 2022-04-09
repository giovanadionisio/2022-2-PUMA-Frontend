import { extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
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
    document.title = 'PUMA | Recuperar Senha';
  },
  data() {
    return {
      email: '',
      isLoading: false,
      hasAuthError: false,
      successEmailReceived: false,
      emailWrongFormat: false,
      emailNotfound: false,
      userService: new UserService(),
      navs: [{ title: 'HOME' }, { title: 'RECUPERAÇÃO DE SENHA' }],
    };
  },
  created() {
    localStorage.email = '';
  },
  methods: {
    ok() {
      // localStorage.email = this.email;
      this.$router.push('/usuario/newPassword');
    },

    disableError() {
      this.emailNotfound = false;
    },

    enviarEmail() {
      if (this.email.length) {
        this.userService.sendEmail(this.email, (res) => {
          if (res.status === 200) {
            localStorage.email = this.email;
            this.emailNotfound = false;
            this.successEmailReceived = true;
          } else if (res.status === 404) {
            this.hasAuthError = true;
            this.emailNotfound = true;
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
  message: 'Preenchimento obrigatório ',
});
