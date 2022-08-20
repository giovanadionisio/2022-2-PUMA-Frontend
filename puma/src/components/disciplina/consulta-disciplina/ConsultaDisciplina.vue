<template>
    <div class="main-content hidden-scroll-bar">
        <h1 class="tittle ml-4">
            Disciplinas
        </h1>

        <div class="tittle sub-tittle ml-4">
            Disciplinas Cadastradas na Plataforma
        </div>

        <div>
            <button
                class="btn cd-btn ml-4 my-3"
                onclick="window.location.href = '/disciplinas/cadastrar'">
                    <i class="fa-solid fa-plus-circle mr-2 add-project"></i>Criar Disciplina
            </button>
        </div>

        <ListagemConsultaDisciplinaComponent :title="'Minhas Disciplinas'" :list="mySubjects"/>
        <ListagemConsultaDisciplinaComponent :title="'Demais Disciplinas'" :list="auxsubjects"/>
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
    isLoading: false,
    wasLoaded: false,
    isDeletingSubject: false,
    subjects: [],
    mySubjects: [],
    auxsubjects: [
      {
        name: 'Calculo23',
        subjectid: 91,
        professors: [
          {
            email: 'giovannabbottino@gmail.com',
            fullname: 'Giovanna Borges Bottino',
            regnumber: '1700112',
            userid: 60,
          },
          {
            email: 'giovannabbottino@gmail.com',
            fullname: 'Giovanna Borges Bottino',
            regnumber: '1700112',
            userid: 61,
          },
        ],
      },
      {
        name: 'Calculo34',
        subjectid: 92,
        professors: [
          {
            email: 'giovannabbottino@gmail.com',
            fullname: 'Giovanna Borges Bottino',
            regnumber: '1700112',
            userid: 62,
          },
        ],
      },
      {
        name: 'Calculo4',
        subjectid: 93,
        professors: [
          {
            email: 'giovannabbottino@gmail.com',
            fullname: 'Giovanna Borges Bottino',
            regnumber: '1700112',
            userid: 4,
          },
        ],
      },
      {
        name: 'Calculo3',
        subjectid: 94,
        professors: [
          {
            email: 'giovannabbottino@gmail.com',
            fullname: 'Giovanna Borges Bottino',
            regnumber: '1700112',
            userid: 4,
          },
        ],
      },
      {
        name: 'Calculo2',
        subjectid: 95,
        professors: [
          {
            email: 'giovannabbottino@gmail.com',
            fullname: 'Giovanna Borges Bottino',
            regnumber: '1700112',
            userid: 4,
          },
        ],
      },
    ],
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
      this.auxsubjects.map((sub) => {
        sub.professors.map((prof) => {
          console.log(prof.userid, this.$store.getters.user.userId);
          if (prof.userid === this.$store.getters.user.userId) {
            this.mySubjects.push(sub);
            this.auxsubjects = this.auxsubjects.filter((item) => (
              item.subjectid !== sub.subjectid));
          }
          return prof;
        });
        return null;
      });
    },
    goToSubject(subjectid) {
      this.$router.push({ path: `/disciplinas/visualizar/${subjectid}` });
    },
  },
};
</script>

<style src="./consulta-disciplina.css"></style>
