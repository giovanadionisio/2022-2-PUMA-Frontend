import { ValidationProvider, extend } from 'vee-validate';
// eslint-disable-next-line camelcase
import { messages } from 'vee-validate/dist/locale/pt_BR.json';
// eslint-disable-next-line camelcase
import {
  email,
  required,
  max,
}
  from 'vee-validate/dist/rules';
import UserService from '../../../services/userService';
import Loading from '../../../components/Loading.vue';

const userService = new UserService();

export default {
  name: 'LoginUsuario',
  components: {
    ValidationProvider,
    Loading,
  },
  data() {
    return {
      password: '',
      email: '',
      isLoading: false,
    };
  },
  mounted() {
    document.title = 'PUMA | Login';
  },
  methods: {
    logar() {
      if (false) {
        const user = {
          email: this.email,
          password: this.password,
        };
        this.isLoading = true;
        userService.logUserIn(user).then((userType) => {
          this.isLoading = false;
          console.log(userType);
          if (userType === 'Agente Externo') {
            this.$router.push({ name: 'My Proposals' });
          } else {
            this.$router.push('/');
          }
        }).catch(() => {
          this.isLoading = false;
          alert('Uma falha ocorreu ao fazer login. Tente novamente.');
        });
      }
    },
    // if (this.isRegister) {
    //   // if (evaluateRegister(newUser, this.hasMatricula, this.isJuridical, this.isPhysical)) {
    //   //   this.isLoading = true;
    //   //   userService.registerUser(newUser).then(() => {
    //   //     this.isLoading = false;
    //   //     this.isRegister = false;
    //   //     alert('Cadastro feito com sucesso!');
    //   //   }).catch(() => {
    //   //     this.isLoading = false;
    //   //     alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
    //   //   });
    //   // }
    // } else if (evaluateLogin(newUser)) {

    // alterarTipoUsuario() {
    //   if (this.type === 'Aluno' || this.type === 'Professor') {
    //     this.isExternalAgent = false;
    //     this.hasMatricula = true;
    //   } else if (this.type === 'Agente Externo') {
    //     this.hasMatricula = false;
    //     this.isExternalAgent = true;
    //   }
    //   this.matricula = '';
    //   this.socialReason = '';
    //   this.cep = '';
    //   this.companyName = '';
    // },
    // alterarTipoAgenteExterno() {
    //   if (this.externalAgentType === 'Pessoa Fisica') {
    //     this.isPhysical = true;
    //     this.isJuridical = false;
    //   } else if (this.externalAgentType === 'Pessoa Juridica') {
    //     this.isJuridical = true;
    //     this.isPhysical = false;
    //   } else {
    //     this.isPhysical = false;
    //     this.isJuridical = false;
    //   }
    // },
    goToRegister() {
      // this.isRegister = true;
    },
    goToLogin() {
      // this.isRegister = false;
      // this.cleanControlVariables();
    },
    // cleanControlVariables() {
    //   this.isLoading = false;
    //   this.hasMatricula = false;
    //   this.isJuridical = false;
    //   this.isPhysical = false;
    //   this.isExternalAgent = false;
    // },
  },
};

extend('email', {
  validate(value) {
    if (value) {
      return email.validate(value);
    }
    return '';
  },
});
// extend('alpha_spaces', {
//   validate: alpha_spaces.validate,
//   params: alpha_spaces.params,
//   message: messages.alpha_spaces,
// });
extend('required', {
  validate: required.validate,
  params: required.params,
  message: 'Preenchimento obrigatório',
});
// required.message = messages.required;
extend('max', {
  validate: max.validate,
  params: max.params,
  message: messages.max,
});
extend('required', required);
extend('max', max);

// extend('')
