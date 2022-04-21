import ProjectService from '../../../services/ProjectService';
import AlocateService from '../../../services/AlocateService';
/* eslint-disable prefer-destructuring */
export default {
  name: 'CadastroDisciplina',
  data() {
    return {
      name: { val: '', isValid: true },
      courseSyllabus: { val: '', isValid: true },
      formIsValid: '',
      projectService: new ProjectService(),
      alocateService: new AlocateService(),
      multiSelectPlaceholder: 'Carregando opções...',
      isLoading: false,
      isLoadingKeywords: false,
      isLoadingSubareas: false,
      isMultiselectTouched: false,
      operacao: 'cadastrar',
      keywords: [],
      keywordsSelected: [],
      subareas: [],
      subareasSelected: [],
    };
  },
  beforeMount() {
    this.getKeywords();
    this.getSubareas();
  },
  mounted() {
    this.operacao = this.$route.path.split('/', 3)[2];
    if (this.operacao !== 'cadastrar') {
      if (this.operacao === 'visualizar') {
        this.disableForm();
        this.removeDropdownIcons();
      }
    }
  },
  methods: {
    async onSubmit() {
      const isFormValid = await this.$refs.observer.validate();
      const isMultiselectValid = this.validateMultiselect();
      if (isFormValid && isMultiselectValid) {
        const subject = {
          subject: {
            name: this.name.val,
            courseSyllabus: this.courseSyllabus.val,
          },
          keywords: this.keywordsSelected,
          subareas: this.subareasSelected,
        };

        this.projectService.addSubject(subject).then(async () => {
          this.isLoading = false;
          this.$router.push({ name: 'Consulta a Disciplinas' }).catch(() => { });
        }).catch((error) => {
          this.isLoading = false;
          alert(`Infelizmente houve um erro ao cadastrar a disciplina: ${error}`);
        });
      }
    },
    sortMultiselectLabels() {
      this.keywordsSelected.sort((a, b) => b.keyword.length - a.keyword.length);
    },
    sortSubareaMultiselectLabels() {
      this.subareasSelected.sort((a, b) => b.description.length - a.description.length);
    },
    validateMultiselect() {
      this.isMultiselectTouched = true;
      return !!this.keywordsSelected.length;
    },
    validateSubareaMultiselect() {
      this.isMultiselectTouched = true;
      return !!this.subareasSelected.length;
    },
    isChecked(option) {
      return this.keywordsSelected.some((op) => op.keywordid === option.keywordid);
    },
    isSubareaChecked(option) {
      return this.subareasSelected.some((op) => op.subareaid === option.subareaid);
    },
    disableForm() {
      const inputs = document.getElementsByTagName('input');
      const textareas = document.getElementsByTagName('textarea');
      for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = true; }
      for (let i = 0; i < textareas.length; i += 1) { textareas[i].disabled = true; }
    },
    removeDropdownIcons() {
      document.getElementsByClassName('multiselect__select')[0].remove();
    },
    getKeywords() {
      this.isLoadingKeywords = true;
      this.projectService.getAvailableKeywordsToSubject().then((response) => {
        this.keywords = response.data;
        this.isLoadingKeywords = false;
        this.multiSelectPlaceholder = this.keywords.length ? 'Selecione' : 'Sem palavras disponíveis';
      }).catch((error) => {
        this.isLoadingKeywords = false;
        this.multiSelectPlaceholder = 'Sem palavras disponíveis';
        alert(`Infelizmente houve um erro ao recuperar as palavras-chave: ${error}`);
      });
    },
    getSubareas() {
      this.isLoadingSubareas = true;
      this.projectService.getSubareas().then((response) => {
        this.subareas = response.data;
        this.isLoadingSubareas = false;
        this.multiSelectPlaceholder = this.subareas.length ? 'Selecione' : 'Sem subáreas disponíveis';
      }).catch((error) => {
        this.isLoadingSubareas = false;
        this.multiSelectPlaceholder = 'Sem subáreas disponíveis';
        alert(`Infelizmente houve um erro ao recuperar as subáreas: ${error}`);
      });
    },
  },
};
