import KeywordService from '../../services/KeywordService';
import ProjectService from '../../services/ProjectService';

export default {
  data() {
    return {
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
        { keywordid: 1, keyword: 'Qualidade', subjectId: 'Gestão da Qualidade - PSP 5' },
        { keywordid: 2, keyword: 'Estoque', subjectId: 'Planejamento e Controle de Produção - PSP 4' },
        { keywordid: 3, keyword: 'Capacidade', subjectId: 'Planejamento e Controle de Produção - PSP 4' },
        { keywordid: 4, keyword: 'Estratégia', subjectId: 'Gestão Estratégica - PSP 7' },
        { keywordid: 5, keyword: 'Desenvolver Produto', subjectId: 'Engenharia - PSP 6' },
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
      console.log('Ta ok?', this.idKeywordEdit, this.selectedSubject, this.newKeyword);
      this.keywordService.updateKeyword(this.idKeywordEdit,
        this.newKeyword).then(async (response) => {
        console.log(response);
        console.log(response.data);
        const idKeywordUpdated = response.data[0].keywordid;
        this.keywordService.updateSubjectKeyword(idKeywordUpdated, this.selectedSubject);
        this.openModalEdit = false;
        alert('Palavra-Chave Editada com Sucesso!');
        document.location.reload(true);
      }).catch((error) => {
        this.openModalEdit = false;
        alert(`Infelizmente houve um erro ao editar a palavra-chave: ${error}`);
      });
    },

    deleteKeyWord(keyWord) {
      this.openModalDelete = true;
      console.log('Ta na hora', keyWord.keywordid);
      this.keywordDelete = keyWord.keywordid;
    },

    deletar() {
      this.keywordService.deleteKeyword(this.keywordDelete).then(async () => {
        this.openModalDelete = false;
        alert('Palavra-Chave Excluída com Sucesso!');
        document.location.reload(true);
      }).catch((error) => {
        this.openModalDelete = false;
        alert(`Infelizmente houve um erro ao excluir a palavra-chave: ${error}`);
      });
    },

    getKeyWords() {
      this.keywordService.getKeywords().then((response) => {
        this.tableKeywordSubject = JSON.parse(JSON.stringify(response.data));
        this.keyWords = response.data;
        // console.log('DEBUGA', this.tableKeywordSubject);
      }).catch((error) => {
        console.log('erro', error);
      });
    },

    getSubjects() {
      this.keywordService.getSubjects().then((response) => {
        // console.log('GetSubjects');
        this.subjects = JSON.parse(JSON.stringify(response.data));
        this.subjects.unshift({ value: null, text: 'Escolha a disciplina', disabled: true });
        // console.log('SUBJECT??', this.subjects);
      }).catch((error) => {
        console.log('erro', error);
      });
    },

    getNewKeyword() {
      console.log(this.inputKeyword.value);
    },

    async addKeyword() {
      const isFormValid = true;
      if (isFormValid) {
        console.log('Palavra que está sendo enviada', this.inputKeyword);
        console.log('Disciplina que está sendo enviada', this.selectedToRegister);
        this.keywordService.addKeyword(this.inputKeyword).then((response) => {
          const currentKeywordid = response.data.response.response.keywordid;
          const idSubject = this.selectedToRegister;
          this.keywordService.addKeywordToSubject(currentKeywordid, idSubject);
          this.openModalRegister = false;
          alert('Palavra-Chave Cadastrada com sucesso');
          document.location.reload(true);
        }).catch((error) => {
          this.openModalRegister = false;
          alert(`Infelizmente houve um erro ao cadastrar a proposta: ${error}`);
        });
      }
    },
  },
};
