import { extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import UserService from '../../../services/userService';
import Loading from '../../../components/Loading.vue';
import VisitorNav from '../../../components/VisitorNav/VisitorNav.vue';

const userService = new UserService();

export default {
  name: 'LoginUsuario',
  components: {
    Loading,
    VisitorNav,
  },
  data() {
    return {
      email: '',
      isLoading: false,
      hasAuthError: false,
      successEmailReceived: false,
      emailWrongFormat: false,
      emailNotfound: false,
      navs: [{ title: 'HOME' }, { title: 'RECUPERAÇÃO DE SENHA' }],
    };
  },
  created() {
    localStorage.email = '';
  },
  mounted() {
    document.title = 'PUMA | Login';
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
        userService.sendEmail(this.email, (res) => {
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
  message: 'Campo obrigatório ',
});
