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
      newPassword: '',
      confirmNewPassword: '',
      passwordRedefined: false,

    };
  },
  created() {
    this.email = localStorage.email;
  },
  mounted() {
    document.title = 'PUMA | Login';
  },
  methods: {
    async logar() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        const user = { email: this.email, password: this.password };
        this.isLoading = true;
        // this.hasAuthError = false;

        userService.logUserIn(user).then((response) => {
          this.isLoading = false;
          // this.hasAuthError = false;

          this.$store.commit('LOGIN_USER', {
            userId: response.data.userId,
            fullName: response.data.fullName,
            email: response.data.email,
            type: response.data.type,
          });

          this.$store.commit('SET_TOKEN', response.data.token);

          if (response.data.type === 'Agente Externo') {
            this.$router.push('/myProposals');
          } else {
            this.$router.push('/');
          }
        }).catch(() => {
          this.hasAuthError = true;
          this.isLoading = false;
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
