/* eslint-disable */
import { extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import UserService from '../../../services/userService';
import Loading from '../../../components/Loading.vue';
import VisitorNav from '../../../components/VisitorNav/VisitorNav.vue';
import NAV_CONST from '@/constants/navigations.js';

const userService = new UserService();

export default {
  name: 'LoginUsuario',
  components: {
    Loading,
    VisitorNav,
  },
  data() {
    return {
      password: '',
      email: '',
      isLoading: false,
      hasAuthError: false,
      navs: [{ title: 'HOME' }, { title: 'LOGIN' }],
    };
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
          this.$store.commit('SET_CURRENT_NAVIGATION', NAV_CONST.MY_PROJECTS.KEY);
          this.$router.push('/meus-projetos/listar');
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
