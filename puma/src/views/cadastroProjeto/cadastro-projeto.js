/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-tabs */
/* eslint-disable comma-spacing */
/* eslint-disable key-spacing */
/* eslint-disable prefer-template */
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
    this.fillKeywords();
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
        alert(error);
      });
    },
    sortLabels() {
      this.keywordsSelected.sort((a, b) => b.keyword.length - a.keyword.length);
    },
    isChecked(option) {
      return this.keywordsSelected.some((op) => op.keywordid === option.keywordid);
    },
    fillKeywords() {
      this.isLoadingKeywords = true;
      this.alocateService.getKeywords().then((response) => {
        this.keywords = response.data;
        this.isLoadingKeywords = false;
        this.multiSelectPlaceholder = this.keywords.length ? 'Selecione' : 'Sem palavras disponíveis';
      });
    },
  },
};
