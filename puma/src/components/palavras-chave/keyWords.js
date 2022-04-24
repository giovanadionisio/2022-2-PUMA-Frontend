import KeywordService from '../../services/KeywordService';
import ProjectService from '../../services/ProjectService';

export default {
  data() {
    return {
      kwNameAlreadyExist: false,
      multiSelectPlaceholder: 'Carregando opções...',
      isMultiselectTouched: false,
      keywordService: new KeywordService(),
      projectService: new ProjectService(),
      openModalRegister: false,
      openModalEdit: false,
      openModalDelete: false,
      currentKeyWord: {},
      keywordDelete: null,
      selected: null,
      selectedToedit: null,
      selectedToRegister: null,
      selectedNameDiscipline: '',
      selectedSubject: '',
      newKeyword: '',
      inputKeyword: '',
      editKeyword: '',
      idKeywordEdit: '',
      idSubjectEdit: '',
      permission: '',
      flag: false,
      subjects: [],
      subjectsForm: [],
      subjectsList: [],
      isLoadingKeywords: false,
      optionsSelected: [],
      keyWords: [],
      keywordsInfo: {},
      tableKeywordSubject: [],
      cont: 0,
      subjectsFields: [
        {
          key: 'id',
          label: 'idDisciplina',
        },
        {
          key: 'name',
          label: 'subjectname',
        },
      ],
      keyWordsFields: [
        {
          key: 'keywordid',
          label: 'ITEM',
        },
        {
          key: 'keyword',
          label: 'PALAVRA-CHAVE',
        },
        {
          key: 'subjectname',
          label: 'DISCIPLINA',
        },
        {
          key: 'actions',
          label: '',
        },
      ],
    };
  },

  created() {
    this.getKeywordsInfo();
    this.getKeyWords();
    this.setFieldsPermissions();
    this.verifyPermission();
    // console.log(this.$store.getters.user);
  },

  methods: {
    verifyPermission() {
      const { isAdmin, type } = this.$store.getters.user;
      if (isAdmin || type === 'Professor') {
        this.permission = true;
      } else {
        this.permission = false;
      }
    },

    setFieldsPermissions() {
      const { isAdmin } = this.$store.getters.user;

      if (isAdmin) {
        this.getSubjects();
      } else {
        this.getSubjectsProfessor();
        this.getFilterProfessor();
      }
    },

    async getKeywordsInfo() {
      const { data } = await this.keywordService.getKeywords();
      // console.log(data);
      Object.keys(data).forEach((key) => {
        // console.log('debug', data[key]);
        this.keywordsInfo[data[key].keywordid] = data[key].array_agg;
      });
    },

    async getSubjectsProfessor() {
      const { userId } = this.$store.getters.user;
      const { data } = await this.keywordService.getKeywords();
      const subjectByKeywords = [];
      Object.keys(data).forEach((key) => {
        Object.values(data[key].array_agg).forEach((allowId) => {
          if (allowId === userId) {
            // console.log('Filtro', data[key]);
            subjectByKeywords.push({ value: data[key].subjectid, text: data[key].subjectname });
          }
        });
      });
      this.subjectsForm = [...new Set(subjectByKeywords.map((o) => JSON.stringify(o)))].map((s) => (
        JSON.parse(s)));
      this.subjectsForm.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
    },

    async getFilterProfessor() {
      const { data } = await this.keywordService.getSubjects();
      this.subjects = JSON.parse(JSON.stringify(data));
      this.subjects.unshift({ value: 0, text: 'Todas as Disciplinas' });
      this.subjects.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
    },

    AllowEdit(keyword) {
      const { isAdmin, userId } = this.$store.getters.user;
      if (isAdmin) return true;

      let flag = false;
      // console.log('Ta chegando oq?', this.keywordsInfo[keyword.keywordid]);
      Object.values(this.keywordsInfo[keyword.keywordid]).forEach((profId) => {
        // console.log('ok', profId);
        if (userId === profId) {
          flag = true;
        }
      });
      if (flag) {
        return true;
      }
      return false;
    },

    filter(discipline) {
      this.tableKeywordSubject = this.keyWords;
      if (discipline === 0) {
        this.tableKeywordSubject = this.keyWords;
      } else {
        const filter = this.tableKeywordSubject.filter((d) => d.subjectid === discipline);
        this.tableKeywordSubject = filter;
      }
    },

    editKeyWord(keyWord) {
      this.openModalEdit = true;
      this.idKeywordEdit = keyWord.keywordid;
      this.selectedSubject = keyWord.subjectid;
      this.newKeyword = keyWord.keyword;
    },

    async editar() {
      const isFormValid = await this.$refs.observer.validate();
      if (isFormValid && this.kwNameAlreadyExist === false) {
        this.keywordService.updateKeyword(this.idKeywordEdit,
          this.newKeyword).then(async (response) => {
          const idKeywordUpdated = response.data[0].keywordid;
          this.keywordService.updateSubjectKeyword(idKeywordUpdated, this.selectedSubject);
          this.getKeyWords();
          this.openModalEdit = false;
          this.makeToast('success', 'Palavra-Chave Editada com Sucesso!');
          this.getKeyWords();
        }).catch((error) => {
          this.openModalEdit = false;
          this.makeToast('danger', `Infelizmente houve um erro ao tentar editar a palavra-chave: ${error}`);
        });
      }
    },

    deleteKeyWord(keyWord) {
      this.openModalDelete = true;
      this.keywordDelete = keyWord.keywordid;
    },

    deletar() {
      this.keywordService.deleteKeyword(this.keywordDelete).then(async () => {
        this.openModalDelete = false;
        this.makeToast('success', 'Palavra-Chave Excluída com Sucesso!');
        // document.location.reload(true);
        this.getKeyWords();
      }).catch((error) => {
        this.openModalDelete = false;
        this.makeToast('danger', `Infelizmente houve um erro ao tentar excluir a palavra-chave: ${error}`);
      });
    },

    getKeyWords() {
      this.keywordService.getKeywords().then((response) => {
        this.tableKeywordSubject = JSON.parse(JSON.stringify(response.data));
        this.keyWords = response.data;
      }).catch((error) => {
        console.log('erro', error);
      });
    },

    getSubjects() {
      this.keywordService.getSubjects().then((response) => {
        this.subjectsForm = JSON.parse(JSON.stringify(response.data));
        this.subjectsForm.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
        this.subjects = JSON.parse(JSON.stringify(response.data));
        this.subjects.unshift({ value: 0, text: 'Todas as Disciplinas' });
        this.subjects.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
      }).catch((error) => {
        console.log('erro', error);
      });
    },

    kewordNameAlreadyExist() {
      const exist = this.tableKeywordSubject.find(
        (k) => k.keyword.toLowerCase() === this.inputKeyword.toLowerCase(),
      );
      if (exist) {
        this.kwNameAlreadyExist = true;
      } else {
        this.kwNameAlreadyExist = false;
      }
    },

    async addKeyword() {
      this.kewordNameAlreadyExist();
      const isFormValid = await this.$refs.observer.validate();

      if (isFormValid && this.kwNameAlreadyExist === false) {
        this.keywordService.addKeyword(this.inputKeyword).then((response) => {
          const currentKeywordid = response.data.response.response.keywordid;
          const idSubject = this.selectedToRegister;
          this.keywordService.addKeywordToSubject(currentKeywordid, idSubject);
          this.openModalRegister = false;
          // document.location.reload(true);
          this.makeToast('success', 'Cadastro realizado com sucesso!');
          this.getKeyWords();
        }).catch((error) => {
          this.openModalRegister = false;
          this.makeToast('danger', `Infelizmente houve um erro ao tentar cadastrar: ${error}`);
        });
      }
    },

    makeToast(variant = null, text) {
      this.$bvToast.toast(text, {
        title: 'PALAVRA-CHAVE',
        variant,
        solid: true,
        autoHideDelay: 2000,
      });
    },
  },
};
