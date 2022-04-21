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
      inputKeyword: { val: '', isValid: true },
      editKeyword: { val: '', isValid: true },
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

      isLoadingKeywords: false,
      optionsSelected: [],
      keyWords: [],
      keyWordsList: [
        { keywordid: 1, keyword: 'Qualidade', subjectId: 'Gestão da Qualidade - PSP 5' },
        { keywordid: 2, keyword: 'Estoque', subjectId: 'Planejamento e Controle de Produção - PSP 4' },
        { keywordid: 3, keyword: 'Capacidade', subjectId: 'Planejamento e Controle de Produção - PSP 4' },
        { keywordid: 4, keyword: 'Estratégia', subjectId: 'Gestão Estratégica - PSP 7' },
        { keywordid: 5, keyword: 'Desenvolver Produto', subjectId: 'Engenharia - PSP 6' },
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
          key: 'name',
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
  },

  methods: {
    filter(discipline) {
      this.keyWordsList = this.keyWords;
      const filter = this.keyWordsList.filter((d) => d.disciplina === discipline);
      this.keyWordsList = filter;
    },

    editKeyWord(keyWord) {
      this.openModalEdit = true;
      this.currentKeyWord = keyWord;
      this.selectedToedit = keyWord.disciplina;
      this.selectedNameDiscipline = keyWord.palavra_chave;
      console.log('oi');
      console.log(keyWord.keyword);
    },

    async editar() {
      console.log(this.currentKeyWord.keywordid, this.editKeyword.val);
      this.keywordService.updateKeyword(this.currentKeyWord.keywordid,
        this.editKeyword.val).then(async () => {
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
        console.log('UEEEE');
        this.keyWordsList = JSON.parse(JSON.stringify(response.data));
        this.keyWords = response.data;
        console.log('DEBUGA', this.keyWordsList);
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
        console.log('Palavra que está sendo enviada', this.inputKeyword.val);
        this.keywordService.addKeyword(this.inputKeyword.val).then(async () => {
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
