<template>
  <div class="main-content hidden-scroll-bar">
    <h1 class="tittle ml-4">
      Disciplinas
    </h1>

    <div class="tittle sub-tittle ml-4 mb-4">
      Disciplinas Cadastradas na Plataforma
    </div>

    <div class="ml-4 input-group">
      <input
        v-model="subjectSearch"
        type="text"
        id="caixaPesquisa"
        class="search-input"
        placeholder="Pesquise por uma disciplina">
      <i class="fas fa-search input-group-prepend search-icon"></i>
    </div>

    <div>
      <button
        class="btn cd-btn ml-4 my-3"
        onclick="window.location.href = '/disciplinas/cadastrar'">
        <i class="fa-solid fa-plus-square mr-2 add-project"></i>Criar Disciplina
      </button>
    </div>

    <div class="tabelas">
      <ListagemConsultaDisciplinaComponent class="minhasDisciplinas"
        :dataSubjects="mySubjects"
        :subjectSearch="subjectSearch"/>

      <hr class="mb-0 mt-5">

      <ListagemConsultaDisciplinaComponent class="demaisDisciplinas"
      :dataSubjects="subjects"
      :subjectSearch="subjectSearch"/>
    </div>
  </div>
</template>

<script>
import SubjectService from '../../../services/SubjectService';
import ListagemConsultaDisciplinaComponent from './ListagemConsultaDisciplinaComponent.vue';

export default {
  beforeMount() {
    this.getSubjects();
  },

  components: {
    ListagemConsultaDisciplinaComponent,
  },

  data: () => ({
    subjectSearch: null,
    isLoading: false,
    wasLoaded: false,
    isDeletingSubject: false,
    subjects: [],
    mySubjects: [],
    subjectService: new SubjectService(),
  }),

  methods: {
    getSubjects() {
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      this.subjectService.getSubjects().then((response) => {
        this.subjects = response.data;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.separateSubjects();
      }).catch(() => {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Erro ao recuperar disciplinas', 'danger');
      });
    },
    separateSubjects() {
      this.subjects.map((sub) => {
        sub.professors.map((prof) => {
          if (prof.userid === this.$store.getters.user.userId) {
            this.mySubjects.push(sub);
            this.subjects = this.subjects.filter((item) => (
              item.subjectid !== sub.subjectid));
          }
          return prof;
        });
        return null;
      });
    },
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, autoHideDelay: 4000,
      });
    },
  },
};
</script>

<style src="./consulta-disciplina.css">
</style>
