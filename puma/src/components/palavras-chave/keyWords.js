import KeywordService from '../../services/KeywordService';

export default {
  data() {
    return {
      multiSelectPlaceholder: 'Carregando opções...',
      isMultiselectTouched: false,
      keywordService: new KeywordService(),

      openModalRegister: false,
      openModalEdit: false,
      openModalDelete: false,
      currentKeyWord: {},
      selected: null,
      inputKeyword: { val: '', isValid: true },

      operacao: 'cadastrar',
      options: [
        { value: null, text: 'Filtre por disciplina', disabled: true },
        { value: 'Planejamento e Controle de Produção - PSP 4', text: 'Planejamento e Controle de Produção - PSP 4' },
        { value: 'Gestão da Qualidade - PSP 5', text: 'Gestão da Qualidade - PSP 5' },
        { value: 'Engenharia - PSP 6', text: 'Engenharia - PSP 6' },
        { value: 'Gestão Estratégica - PSP 7', text: 'Gestão Estratégica - PSP 7' },
      ],
      isLoadingKeywords: false,
      optionsSelected: [],
      keyWords: [],
      keyWordsList: [
        { item: 1, palavra_chave: 'Qualidade', disciplina: 'Gestão da Qualidade - PSP 5' },
        { item: 2, palavra_chave: 'Estoque', disciplina: 'Planejamento e Controle de Produção - PSP 4' },
        { item: 3, palavra_chave: 'Capacidade', disciplina: 'Planejamento e Controle de Produção - PSP 4' },
        { item: 4, palavra_chave: 'Estratégia', disciplina: 'Gestão Estratégica - PSP 7' },
        { item: 5, palavra_chave: 'Desenvolver Produto', disciplina: 'Engenharia - PSP 6' },
      ],

      keyWordsFields: [
        {
          key: 'item',
          label: 'ITEM',
        },
        {
          key: 'palavra_chave',
          label: 'PALAVRA CHAVE',
        },
        {
          key: 'disciplina',
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
    this.keyWords = this.keyWordsList;
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
      console.log('oi');
    },

    editar() {
      console.log('eita keyword');
      console.log(this.currentKeyWord);
    },

    deleteKeyWord(keyWord) {
      this.openModalDelete = true;
      console.log('deletar k...');
      console.log(keyWord);
    },

    getKeyWords() {},

    getNewKeyword() {
      console.log('No peito na grama:', this.inputKeyword.value);
    },

    async addKeyword() {
      console.log('Add Keyword:', this.inputKeyword.val);
      const isFormValid = true;
      if (isFormValid) {
        this.keywordService.addKeyword(this.inputKeyword.val);
      }
    },
  },
};
