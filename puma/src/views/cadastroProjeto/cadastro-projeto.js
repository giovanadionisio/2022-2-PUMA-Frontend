import ProjectService from '../../services/projectService';
import AlocateService from '../../services/AlocateService';

export default {
  name: 'ProjectRegister',
  data() {
    return {
      titulo: { val: '', isValid: true },
      descricao: { val: '', isValid: true },
      resultadoEsperado: { val: '', isValid: true },
      operacao: { val: '', isValid: true },
      formIsValid: '',
      projectService: new ProjectService(),
      alocateService: new AlocateService(),
      multiSelectPlaceholder: 'Carregando opções...',
      isLoading: false,
      isLoadingKeywords: false,
      keywords: [],
      keywordsSelected: [],
    };
  },
  beforeMount() {
    this.getKeywords();
  },
  methods: {
    submitForm() {
      const projectObject = {
        name: this.titulo.val,
        problem: this.descricao.val,
        expectedresult: this.resultadoEsperado.val,
        status: 'Em alocacao',
        subjectid: 1,
        userid: 1,
        isLoading: false,
        keywords: this.keywordsSelected,
      };
      this.projectService.addProject(projectObject).then(async () => {
        this.isLoading = false;
        this.$router.push({ name: 'My Proposals' });
      }).catch((error) => {
        this.isLoading = false;
        alert(`Infelizmente houve um erro ao cadastrar a proposta: ${error}`);
      });
    },
    sortMultiselectLabels() {
      this.keywordsSelected.sort((a, b) => b.keyword.length - a.keyword.length);
    },
    isChecked(option) {
      return this.keywordsSelected.some((op) => op.keywordid === option.keywordid);
    },
    getKeywords() {
      this.isLoadingKeywords = true;
      this.alocateService.getKeywords().then((response) => {
        this.keywords = response.data;
        this.isLoadingKeywords = false;
        this.multiSelectPlaceholder = this.keywords.length ? 'Selecione' : 'Sem palavras disponíveis';
      }).catch((error) => {
        this.isLoadingKeywords = false;
        alert(`Infelizmente houve um erro ao recuperar as palavras-chave: ${error}`);
      });
    },
  },
};
