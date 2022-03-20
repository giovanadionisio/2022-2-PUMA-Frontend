import Loading from '../../../components/Loading.vue';
import Navbar from '../../../components/Navbar.vue';
import UserService from '../../../services/userService';

const userService = new UserService();
export default {
  name: 'CadastroUsuario',
  components: {
    Loading,
    Navbar,
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
      companyName: '',
      socialReason: '',
      cpf: '',
      type: '',
      externalAgentType: '',
      passwordTypeText: false,
      repeatPasswordTypeText: false,
      isFirstPage: true,
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
          phoneNumber: this.clearMask(this.phoneNumber),
          password: this.password,
          repeatPassword: this.repeatPassword,
          matricula: this.clearMask(this.matricula),
          type: this.type,
          externalAgentType: this.externalAgentType,
          cnpj: this.clearMask(this.cnpj),
          cpf: this.clearMask(this.cpf),
          companyName: this.companyName,
          socialReason: this.socialReason,
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
        this.externalAgentType = '';
      } else if (this.type === 'Agente Externo') {
        this.hasMatricula = false;
        this.isExternalAgent = true;
      }
      this.matricula = '';
      this.clearJuridicalAgentData();
    },
    alterarTipoAgenteExterno() {
      this.clearJuridicalAgentData();
      this.clearPhysicalAgentData();
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
    clearJuridicalAgentData() {
      this.socialReason = '';
      this.cnpj = '';
      this.companyName = '';
    },
    clearPhysicalAgentData() {
      this.cpf = '';
    },
    clearMask(maskedValue) {
      return maskedValue.replace(/_|-|\(|\)|\.|\/|\s/g, '');
    },
  },
};
