import ObjetoDisciplina from '../ObjetoDisciplina/ObjetoDisciplina.vue';

export default {
  components: {
    ObjetoDisciplina,
  },

  props: {
    listaDisciplinas: Array,
    loading: Boolean,
    error: String,
  },

  data() {
    return {
      disciplinaAtual: {},
    };
  },

  beforeMount() {
    const disciplina = this.listaDisciplinas[0];
    this.disciplinaAtual = disciplina;
  },

  methods: {
    alterarShowSelectDisciplina(event, disciplina) {
      const li = event.target;
      const filhos = document.querySelectorAll('#tabela-listagem-disciplina > *');

      this.disciplinaAtual = disciplina;

      for (let i = 0; i < filhos.length; i += 1) {
        filhos[i].style.backgroundColor = '#ffffff';
        filhos[i].style.color = '#000000';
      }

      li.style.backgroundColor = '#15355e';
      li.style.color = '#ffffff';
    },
  },
};
