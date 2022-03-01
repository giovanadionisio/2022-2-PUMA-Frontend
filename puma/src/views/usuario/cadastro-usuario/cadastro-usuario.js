import { extend } from 'vee-validate';
import {
  // eslint-disable-next-line camelcase
  alpha_spaces,
  min,
  email,
  required,
  max,
} from 'vee-validate/dist/rules';
import Loading from '../../../components/Loading.vue';
import UserService from '../../../services/userService';

const userService = new UserService();
export default {
  name: 'CadastroUsuario',
  components: {
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
      // console.log(min);
      // console.log(email);
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        const newUser = {
          name: this.name,
          email: this.email,
          phoneNumber: this.phoneNumber,
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
        this.isLoading = true;
        userService.registerUser(newUser).then(() => {
          this.$router.push('/usuario/login');
          // eslint-disable-next-line no-alert
          alert('Cadastro feito com sucesso!');
        }).catch(() => {
          this.isLoading = false;
          // eslint-disable-next-line no-alert
          alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
        });
      }
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
extend('min', {
  ...min,
  validate(value, { length }) {
    if (value) {
      return min.validate(value, length);
    }
    return '';
  },
  params: ['length'],
  message: 'O campo {_field_} deve ter ao menos {length} caracteres',
});
extend('alpha_spaces', alpha_spaces);
extend('max', max);
// extend('min', min);
