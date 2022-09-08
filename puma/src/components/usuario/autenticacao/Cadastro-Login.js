import Login from './Login/Login.vue';
import Cadastro from './Cadastro/Cadastro.vue';

export default {
  name: 'Cadastro-Login',

  components: {
    Login,
    Cadastro,
  },

  data() {
    return {
      paginaLogin: '/login',
      paginaCadastro: '/cadastro',
      paginaAutenticacao: null,
    };
  },

  watch: {
    $route() {
      this.takePaginaAutenticacao();
    },
  },

  created() {
    this.takePaginaAutenticacao();
  },

  methods: {
    takePaginaAutenticacao() {
      this.paginaAutenticacao = this.$route.path;
    },
  },
};
