import ProjectService from '../../../services/ProjectService';
import AlocateService from '../../../services/AlocateService';
/* eslint-disable prefer-destructuring */
export default {
  name: 'CadastroProjeto',
  data() {
    return {
      titulo: { val: '', isValid: true },
      descricao: { val: '', isValid: true },
      resultadoEsperado: { val: '', isValid: true },
      formIsValid: '',
      projectService: new ProjectService(),
      alocateService: new AlocateService(),
      multiSelectPlaceholder: 'Carregando opções...',
      isLoading: false,
      isLoadingKeywords: false,
      isMultiselectTouched: false,
      operacao: 'cadastrar',
      keywords: [],
      keywordsSelected: [],
    };
  },
  beforeMount() {
    this.getKeywords();
  },
  mounted() {
    this.operacao = this.$route.path.split('/', 3)[2];
    if (this.operacao !== 'cadastrar') {
      if (this.operacao === 'visualizar') {
        this.disableForm();
      }
      this.getProject(this.$route.params.id);
    }
  },
  methods: {
    async onSubmit() {
      const isFormValid = await this.$refs.observer.validate();
      const isMultiselectValid = this.validateMultiselect();
      if (isFormValid && isMultiselectValid) {
        const project = {
          name: this.titulo.val,
          problem: this.descricao.val,
          expectedresult: this.resultadoEsperado.val,
          keywords: this.keywordsSelected,
          status: 'SB',
          createdat: new Date().toISOString(),
          userid: this.$store.getters.user.userId,
        };
        this.projectService.addProject(project).then(async () => {
          this.isLoading = false;
          this.$router.push({ name: 'Consulta de Projetos' }).catch(() => {});
        }).catch((error) => {
          this.isLoading = false;
          alert(`Infelizmente houve um erro ao cadastrar a proposta: ${error}`);
        });
      }
    },
    sortMultiselectLabels() {
      this.keywordsSelected.sort((a, b) => b.keyword.length - a.keyword.length);
    },
    validateMultiselect() {
      this.isMultiselectTouched = true;
      return !!this.keywordsSelected.length;
    },
    isChecked(option) {
      return this.keywordsSelected.some((op) => op.keywordid === option.keywordid);
    },
    disableForm() {
      const inputs = document.getElementsByTagName('input');
      const textareas = document.getElementsByTagName('textarea');
      for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = true; }
      for (let i = 0; i < textareas.length; i += 1) { textareas[i].disabled = true; }
    },
    getKeywords() {
      this.isLoadingKeywords = true;
      this.projectService.getKeywords().then((response) => {
        this.keywords = response.data;
        this.isLoadingKeywords = false;
        this.multiSelectPlaceholder = this.keywords.length ? 'Selecione' : 'Sem palavras disponíveis';
      }).catch((error) => {
        this.isLoadingKeywords = false;
        this.multiSelectPlaceholder = 'Sem palavras disponíveis';
        alert(`Infelizmente houve um erro ao recuperar as palavras-chave: ${error}`);
      });
    },
    getProject(projectId) {
      this.projectService.getProjById(projectId).then((response) => {
        const project = response.data;
        this.keywordsSelected = project.keywords;
        this.titulo.val = project.name;
        this.descricao.val = project.problem;
        this.resultadoEsperado.val = project.expectedresult;
      }).catch((error) => {
        alert(`Erro ao recuperar projeto: ${error}`);
      });
    },
  },
};
