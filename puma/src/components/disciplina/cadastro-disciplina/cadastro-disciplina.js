import ProjectService from '../../../services/ProjectService';
import AlocateService from '../../../services/AlocateService';
/* eslint-disable */
export default {
  name: 'CadastroDisciplina',
  data() {
    return {
      name: '',
      courseSyllabus: '',
      keywords: [],
      subareas: [],
      professors: [],
      projectService: new ProjectService(),
      alocateService: new AlocateService(),
      multiSelectPlaceholderKeyword: 'Carregando opções...',
      multiSelectPlaceholderSubarea: 'Carregando opções...',
      multiSelectPlaceholderProfessor: 'Carregando opções...',
      isLoading: false,
      isLoadingKeywords: false,
      isLoadingSubareas: false,
      isLoadingProfessors: false,
      isMultiselectsTouched: false,
      operacao: this.$route.path.split('/', 3)[2],
      keywordsSelected: [],
      subareasSelected: [],
      professorsSelected: [],
      subject: '',
    };
  },
  beforeMount() {
    this.getKeywords();
    this.getSubareas();
    this.getProfessors();
  },
  mounted() {
    if (this.operacao !== 'cadastrar') {
      if (this.operacao === 'visualizar') {
        this.disableForm();
        this.removeDropdownIcons();
      }
      this.getSubject(this.$route.params.id);
    }
  },
  methods: {
    async onSubmit() {
      const isFormValid = await this.$refs.observer.validate();
      const isMultiselectValid = this.validateMultiselects();
      if (isFormValid && isMultiselectValid) {
        const subject = {
          subject: {
            name: this.name,
            courseSyllabus: this.courseSyllabus,
          },
          keywords: this.keywordsSelected,
          subareas: this.subareasSelected,
          professors: this.professorsSelected,
        };
        if (this.operacao === 'cadastrar') {
          this.projectService.addSubject(subject).then(async () => {
            this.isLoading = false;
          this.$router.push({ name: 'Disciplinas' }).catch(() => { });
          }).catch((error) => {
            this.isLoading = false;
            alert(`Infelizmente houve um erro ao cadastrar a disciplina: ${error}`);
          });
        } else if (this.operacao === 'editar') {
          subject.subject.subjectid = parseInt(this.$route.params.id, 10);
          subject.subject.coursesyllabus = this.courseSyllabus;
          this.projectService.updateSubject(this.$route.params.id, subject).then(async () => {
            this.isLoading = false;
            this.$router.push({ name: 'Disciplinas' }).catch(() => { });
          }).catch((error) => {
            this.isLoading = false;
            alert(`Infelizmente houve um erro ao atualizar a disciplina: ${error}`);
          });
        }
      }
    },
    sortMultiselectLabels() {
      this.keywordsSelected.sort((a, b) => b.keyword.length - a.keyword.length);
    },
    sortSubareaMultiselectLabels() {
      this.subareasSelected.sort((a, b) => b.description.length - a.description.length);
    },
    sortProfessorMultiselectLabels() {
      this.professorsSelected.sort((a, b) => b.fullname.length - a.fullname.length);
    },
    validateMultiselects() {
      this.isMultiselectsTouched = true;
      return !!this.keywordsSelected.length ;
    },
    isChecked(option) {
      return this.keywordsSelected.some((op) => op.keyword === option.keyword);
    },
    isSubareaChecked(option) {
      return this.subareasSelected.some((op) => op.subareaid === option.subareaid);
    },
    isProfessorChecked(option) {
      return this.professorsSelected.some((op) => op.userid === option.userid);
    },
    disableForm() {
      const inputs = document.getElementsByTagName('input');
      const textareas = document.getElementsByTagName('textarea');
      for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = true; }
      for (let i = 0; i < textareas.length; i += 1) { textareas[i].disabled = true; }
    },
    removeDropdownIcons() {
      let multiselecctsIcon = document.getElementsByClassName('multiselect__select');
      while(multiselecctsIcon.length > 0){
        multiselecctsIcon[0].remove();
      }
    },
    getKeywords() {
      this.isLoadingKeywords = true;
      this.projectService.getAvailableKeywordsToSubject().then((response) => {
        this.keywords = response.data;
        this.isLoadingKeywords = false;
        this.multiSelectPlaceholderKeyword = this.keywords.length ? 'Crie palavras-chave para sua disciplina' : 'Sem palavras disponíveis';
      }).catch((error) => {
        this.isLoadingKeywords = false;
        this.multiSelectPlaceholderKeyword = 'Sem palavras disponíveis';
        alert(`Infelizmente houve um erro ao recuperar as palavras-chave: ${error}`);
      });
    },
    getSubareas() {
      this.isLoadingSubareas = true;
      this.projectService.getSubareas().then((response) => {
        this.subareas = response.data;
        this.isLoadingSubareas = false;
        this.multiSelectPlaceholderSubarea = this.subareas.length ? 'Selecione a subárea do conhecimento que correspondam a disciplina' : 'Sem subáreas disponíveis';
      }).catch((error) => {
        this.isLoadingSubareas = false;
        this.multiSelectPlaceholderSubarea = 'Sem subáreas disponíveis';
        alert(`Infelizmente houve um erro ao recuperar as subáreas: ${error}`);
      });
    },
    getProfessors() {
      this.isLoadingProfessors = true;
      this.projectService.getProfessors().then((response) => {
        this.professors = response.data;
        this.isLoadingProfessors = false;
        this.multiSelectPlaceholderProfessor = this.professors.length ? 'Pesquise os professores que deseja adicionar' : 'Sem professores disponíveis';
      }).catch((error) => {
        this.isLoadingProfessors = false;
        this.multiSelectPlaceholderProfessor = 'Sem professores disponíveis';
        alert(`Infelizmente houve um erro ao recuperar os professores: ${error}`);
      });
    },
    addKeyword(keyword) {
      this.keywords.push({ keyword });
      this.keywordsSelected.push({ keyword });
    },
    getSubject(subjectid) {
      this.projectService.getSubjectById(subjectid).then((response) => {
        const subject = response.data;
        this.keywordsSelected = subject.keywords;
        this.subareasSelected = subject.subareas;
        this.professorsSelected = subject.professors;
        this.subject = subject.subject[0];
        this.name = subject.subject[0].name;
        this.courseSyllabus = subject.subject[0].coursesyllabus;
      }).catch((error) => {
        alert(`Erro ao recuperar disciplina: ${error}`);
      });
    },
  },
};
