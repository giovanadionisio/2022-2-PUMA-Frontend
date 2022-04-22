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
      operacao: 'cadastrar',
      options: [
        { value: null, text: 'Filtre por disciplina', disabled: true },
        { value: 'Planejamento e Controle de Produção - PSP 4', text: 'Planejamento e Controle de Produção - PSP 4' },
        { value: 'Gestão da Qualidade - PSP 5', text: 'Gestão da Qualidade - PSP 5' },
        { value: 'Engenharia - PSP 6', text: 'Engenharia - PSP 6' },
        { value: 'Gestão Estratégica - PSP 7', text: 'Gestão Estratégica - PSP 7' },
      ],

      options2: [
        { value: null, text: 'Escolha a disciplina', disabled: true },
        { value: 'Planejamento e Controle de Produção - PSP 4', text: 'Planejamento e Controle de Produção - PSP 4' },
        { value: 'Gestão da Qualidade - PSP 5', text: 'Gestão da Qualidade - PSP 5' },
        { value: 'Engenharia - PSP 6', text: 'Engenharia - PSP 6' },
        { value: 'Gestão Estratégica - PSP 7', text: 'Gestão Estratégica - PSP 7' },
      ],
      subjects: [
        { value: null, text: 'Escolha a disciplina', disabled: true },
        { value: 1, text: 'Qualidade' },
      ],
      subjectsList: [],
      isLoadingKeywords: false,
      optionsSelected: [],
      keyWords: [],
      tableKeywordSubject: [
        { keywordid: 1, keyword: 'Qualidade', subjectname: 'Gestão da Qualidade - PSP 5' },
        { keywordid: 2, keyword: 'Estoque', subjectname: 'Planejamento e Controle de Produção - PSP 4' },
        { keywordid: 3, keyword: 'Capacidade', subjectname: 'Planejamento e Controle de Produção - PSP 4' },
        { keywordid: 4, keyword: 'Estratégia', subjectname: 'Gestão Estratégica - PSP 7' },
        { keywordid: 5, keyword: 'Desenvolver Produto', subjectname: 'Engenharia - PSP 6' },
      ],
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
          label: 'PALAVRA CHAVE',
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
    this.getKeyWords();
    this.getSubjects();
  },

  methods: {
    filter(discipline) {
      this.tableKeywordSubject = this.keyWords;
      const filter = this.tableKeywordSubject.filter((d) => d.disciplina === discipline);
      this.tableKeywordSubject = filter;
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
          this.openModalEdit = false;
          this.makeToast('success', 'Palavra-Chave Editada com Sucesso!');

          document.location.reload(true);
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
        document.location.reload(true);
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
        this.subjects = JSON.parse(JSON.stringify(response.data));
        this.subjects.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
      }).catch((error) => {
        console.log('erro', error);
      });
    },

    getNewKeyword() {
      console.log(this.inputKeyword.value);
    },

    kewordNameAlreadyExist() {
      const exist = this.tableKeywordSubject.find((k) => k.keyword === this.inputKeyword);
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
          this.makeToast('success', 'Cadastro realizado com sucesso!');
          document.location.reload(true);
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
