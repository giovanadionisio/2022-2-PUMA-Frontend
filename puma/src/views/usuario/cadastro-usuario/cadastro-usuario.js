import { extend, ValidationObserver } from 'vee-validate';
import {
  // eslint-disable-next-line camelcase
  alpha_spaces,
  min,
  email,
  required,
  max,
} from 'vee-validate/dist/rules';
import Loading from '../../../components/Loading.vue';
// import UserService from '../../../services/userService';

// const userService = new UserService();
export default {
  name: 'CadastroUsuario',
  components: {
    ValidationObserver,
    Loading,
  },
  mounted() {
    document.title = 'PUMA | Cadastro Usuário';
  },
  data() {
    return {
      name: '',
      email: '',
      phoneNumber: '',
      matricula: '',
      password: '',
      repeatPassword: '',
      cnpj: '',
      cep: ' ',
      companyName: '',
      socialReason: '',
      cpf: '',
      type: '',
      externalAgentType: '',
      isLoading: false,
      hasMatricula: false,
      isJuridical: false,
      isPhysical: false,
      isExternalAgent: false,
    };
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        const newUser = {
          name: this.name,
          email: this.email,
          password: this.password,
          repeatPassword: this.repeatPassword,
          matricula: this.matricula,
          type: this.type,
          externalAgentType: this.externalAgentType,
          cnpj: this.cnpj,
          cep: this.cep,
          companyName: this.companyName,
          socialReason: this.socialReason,
          cpf: this.cpf,
        };
        console.log(newUser);
      } else {
        console.log('Data isnt valid');
      }
      // if (false) {
      //   this.isLoading = true;
      //   userService.registerUser(newUser).then(() => {
      //     this.isLoading = false;
      //     // eslint-disable-next-line no-alert
      //     alert('Cadastro feito com sucesso!');
      //   }).catch(() => {
      //     this.isLoading = false;
      //     // eslint-disable-next-line no-alert
      //     alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
      //   });
      // }
      // else if (evaluateLogin(newUser)) {
      //   this.isLoading = true;
      //   userService.logUserIn(newUser).then((userType) => {
      //     this.isLoading = false;
      //     console.log(userType);
      //     if (userType === 'Agente Externo') {
      //       this.$router.push({ name: 'My Proposals' });
      //     } else {
      //       this.$router.push('/');
      //     }
      //   }).catch(() => {
      //     this.isLoading = false;
      //     alert('Uma falha ocorreu ao fazer login. Tente novamente.');
      //   });
      // }
    },
    alterarTipoUsuario() {
      if (this.type === 'Aluno' || this.type === 'Professor') {
        this.hasMatricula = true;
        this.isExternalAgent = false;
        this.isJuridical = false;
        this.isPhysical = false;
      } else if (this.type === 'Agente Externo') {
        this.hasMatricula = false;
        this.isExternalAgent = true;
      }
      this.matricula = '';
      this.socialReason = '';
      this.cep = '';
      this.cnpj = '';
      this.companyName = '';
    },
    alterarTipoAgenteExterno() {
      if (this.externalAgentType === 'Pessoa Fisica') {
        this.isPhysical = true;
        this.isJuridical = false;
      } else if (this.externalAgentType === 'Pessoa Juridica') {
        this.isJuridical = true;
        this.isPhysical = false;
      } else {
        this.isPhysical = false;
        this.isJuridical = false;
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
// extend('min', {
//   ...min,
//   validate(value) {
//     if (value) {
//       return min.validate;
//     }
//     return '';
//   },
// });
extend('alpha_spaces', alpha_spaces);
extend('max', max);
extend('min', min);
extend('required', required);
