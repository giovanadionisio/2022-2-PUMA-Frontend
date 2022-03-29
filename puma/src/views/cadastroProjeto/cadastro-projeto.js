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
      fonk: '',
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
      isMultiselectOpen: false,
      keywords: [],
      keywordsSelected: [],
      value: [],
      options: [
        { language: 'JavaScript', library: 'Vue.js' },
        { language: 'JavaScript', library: 'Vue-Multiselect' },
        { language: 'JavaScript', library: 'ffff' },
        { language: 'JavaScript', library: 'ggggg' },
        { language: 'JavaScript', library: 'hhhhhh' },
        { language: 'JavaScript', library: 'nnnnnnnn' },
        { language: 'JavaScript', library: 'kkkkkkkkk' },
      ],
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
      console.log(projectObject);
      console.log(this.keywords);
      // this.value = [{ language: 'JavaScript', library: 'Vue-Multiselect', checked: false }];
      this.projectService.addProject(projectObject).then(async (response) => {
        console.log(response);
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
        this.multiSelectPlaceholder = this.keywords.length ? 'Selecione' : 'Sem resultados';
      });
    },
  },
};
