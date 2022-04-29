/* eslint-disable*/
import KeywordService from '../../services/KeywordService';
import ProjectService from '../../services/ProjectService';

export default {
  data() {
    return {
      kwNameAlreadyExist: false,
      multiSelectPlaceholder: 'Carregando opções...',
      keywordService: new KeywordService(),
      projectService: new ProjectService(),
      openModalRegister: false,
      openModalEdit: false,
      openModalDelete: false,
      currentKeyWord: {},
      keywordDelete: null,
      selected: null,
      form: { keywordName: '', selectedSubject: null },
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
    this.handleLoadData();
  },
  methods: {
    async handleLoadData() {
      try {
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
        await this.getKeywordsInfo();
        await this.getKeyWords();
        await this.setFieldsPermissions();
        this.verifyPermission();
        this.$store.commit('CLOSE_LOADING_MODAL');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Falha ao carregar os dados', 'danger');
      }
    },

    verifyPermission() {
      const { isAdmin, type } = this.$store.getters.user;
      if (isAdmin || type === 'Professor') {
        this.permission = true;
      } else {
        this.permission = false;
      }
    },

    allowEdit(keyword) {
      // return true;
      const { isAdmin, userId } = this.$store.getters.user;
      if (isAdmin) return true;

      let flag = false;

      Object.values(this.keywordsInfo[keyword.keywordid]).forEach((profId) => {
        if (userId === profId) {
          flag = true;
        }
      });
      if (flag) {
        return true;
      }
      return false;
    },

    async setFieldsPermissions() {
      const { isAdmin } = this.$store.getters.user;
      if (isAdmin) {
        await this.getSubjects();
      } else {
        await this.getSubjectsProfessor();
        await this.getFilterProfessor();
      }
    },

    async getKeywordsInfo() {
      const { data } = await this.keywordService.getKeywords();
      Object.keys(data).forEach((key) => {
        this.keywordsInfo[data[key].keywordid] = data[key].array_agg;
      });
    },

    async getKeyWords() {
      try {
        const response = await this.keywordService.getKeywords();
        this.tableKeywordSubject = JSON.parse(JSON.stringify(response.data));
        this.keyWords = response.data;
      } catch (error) { }
    },

    async getSubjects() {
      try {
        const response = this.keywordService.getSubjects();
        this.subjectsForm = JSON.parse(JSON.stringify(response.data));
        this.subjectsForm.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
        this.subjects = JSON.parse(JSON.stringify(response.data));
        this.subjects.unshift({ value: 0, text: 'Todas as Disciplinas' });
        this.subjects.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
      } catch (error) { }
    },

    async getSubjectsProfessor() {
      try {
        const { userId } = this.$store.getters.user;
        const { data } = await this.keywordService.getKeywords();
        const subjectByKeywords = [];
        Object.keys(data).forEach((key) => {
          Object.values(data[key].array_agg).forEach((allowId) => {
            if (allowId === userId) {
              subjectByKeywords.push({ value: data[key].subjectid, text: data[key].subjectname });
            }
          });
        });
        this.subjectsForm = [...new Set(subjectByKeywords.map((o) => JSON.stringify(o)))].map((s) => (
          JSON.parse(s)));
        this.subjectsForm.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
      } catch (erro) { }
    },

    async getFilterProfessor() {
      try {
        const { data } = await this.keywordService.getSubjects();
        this.subjects = JSON.parse(JSON.stringify(data));
        this.subjects.unshift({ value: 0, text: 'Todas as Disciplinas' });
        this.subjects.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
      } catch (error) { }
    },

    filter(subjectId) {
      this.tableKeywordSubject = this.keyWords;
      if (subjectId === 0) {
        this.tableKeywordSubject = this.keyWords;
      } else {
        this.tableKeywordSubject = this.tableKeywordSubject.filter((d) => d.subjectid === subjectId);
      }
    },

    addKeyword() {
      this.openModalRegister = true;
      this.form = { keywordName: '', selectedSubject: null };
    },

    editKeyword(keyword) {
      this.openModalEdit = true;
      this.idKeywordEdit = keyword.keywordid;
      this.form = { keywordName: keyword.keyword, selectedSubject: keyword.subjectid };
    },

    deleteKeyword(keyWord) {
      this.openModalDelete = true;
      this.keywordDelete = keyWord.keywordid;
    },

    keywordNameAlreadyExist() {
      const currentKeyword = this.form.keywordName;
      this.kwNameAlreadyExist = this.tableKeywordSubject.some((k) => this.treatKeyword(k.keyword) === this.treatKeyword(this.form.keywordName),);
    },

    treatKeyword(keyword) { return keyword.split(' ').join('').toLowerCase(); },

    async handleAdd() {
      try {
        this.keywordNameAlreadyExist();
        const isFormValid = await this.$refs.observer.validate();

        if (isFormValid && !this.kwNameAlreadyExist) {
          this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
          const response = await this.keywordService.addKeyword(this.form.keywordName);
          const currentKeywordid = response.data.response.keywordid;
          const idSubject = this.form.selectedSubject;

          await this.keywordService.addKeywordToSubject(currentKeywordid, idSubject);
          await this.getKeyWords();

          this.openModalRegister = false;
          this.$store.commit('CLOSE_LOADING_MODAL');
          this.makeToast('SUCESSO', 'Cadastro realizado com sucesso!', 'success');
        }
      } catch (error) {
        this.openModalRegister = false;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Infelizmente houve um erro ao tentar cadastrar a palavra-chave', 'danger');
      }
    },

    async handleEdit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (isFormValid && this.kwNameAlreadyExist === false) {
          this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
          const response = await this.keywordService.updateKeyword(this.idKeywordEdit, this.form.keywordName);
          const idKeywordUpdated = response.data[0].keywordid;
          this.keywordService.updateSubjectKeyword(idKeywordUpdated, this.form.selectedSubject);
          this.openModalEdit = false;
          this.getKeyWords();
          this.$store.commit('CLOSE_LOADING_MODAL');
          this.makeToast('SUCESSO', 'Palavra-Chave editada com sucesso!', 'success');
        }
      } catch (error) {
        this.openModalEdit = false;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Infelizmente houve um erro ao tentar editar a palavra-chave', 'danger');
      }
    },

    async handleDelete() {
      try {
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
        await this.keywordService.deleteKeyword(this.keywordDelete);
        this.openModalDelete = false;
        await this.getKeyWords();
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('SUCESSO', 'Palavra-chave excluída com sucesso!', 'success');
      } catch (error) {
        this.openModalDelete = false;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Infelizmente houve um erro ao tentar excluir a palavra-chave', 'danger');
      }
    },

    makeToast(title, message, variant) {
      this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 2000, });
    },
  },
};
