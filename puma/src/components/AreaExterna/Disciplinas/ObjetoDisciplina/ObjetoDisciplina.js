import SubjectService from '../../../../services/SubjectService';

export default {
  props: {
    disciplinaAtual: Object,
  },

  beforeMount() {
    this.getSubject();
  },

  data() {
    return {
      subjectService: new SubjectService(),
      loading: false,
      error: null,
      disciplina: {},
    };
  },

  watch: {
    disciplinaAtual() {
      this.getSubject();
    },
  },

  methods: {
    async getSubject() {
      this.loading = true;

      this.subjectService.getSubjectById(this.disciplinaAtual.subjectid).then((response) => {
        this.disciplina = response.data;

        this.loading = false;
      }).catch((error) => {
        this.error = error;
        this.loading = false;
      });
    },
  },
};
