import { extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
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
      hasAuthError: false,
      successEmailReceived: false,
      emailWrongFormat: false,
      emailNotfound: false,
    };
  },
  mounted() {
    document.title = 'PUMA | Login';
  },
  methods: {
    ok() {
      localStorage.email = this.email;
      this.$router.push('/usuario/newPassword');
    },
    enviarEmail() {
      userService.sendEmail(this.email, () => {
        // window.alert(res);
        this.successEmailReceived = true;
      });
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
