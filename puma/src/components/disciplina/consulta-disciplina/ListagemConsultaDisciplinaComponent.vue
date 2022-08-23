<template>
    <div class="mt-4">
        <h2 class="tittle sub-tittle ml-4">{{ title }}</h2>

        <table>
            <thead>
                <tr>
                    <td>Nome</td>
                    <td>Professores</td>
                    <td></td>
                </tr>
            </thead>

            <tr v-for="subject in listSubjects" :key="subject.subjectid">
                <td>{{subject.name}}</td>
                <td>
                    <div v-for="professor in subject.professors" :key="professor.userid">
                        {{professor.fullname}}
                    </div>
                </td>
                <td class="botao">
                    <button
                        class="btn cd-btn"
                        @click="goToSubject(subject.subjectid)">
                        <i class="fa-solid fa-circle-info mr-2 ml-0"></i>Ver Detalhes
                    </button>
                </td>
            </tr>

            <div v-if="!listSubjects.length" class="no-results align-content-center mt-3">
                Sem Resultados Disponíveis
            </div>
        </table>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    dataSubjects: Array,
    subjectSearch: String,
  },

  data: () => ({
    listSubjects: [],
  }),

  watch: {
    dataSubjects() {
      this.listSubjects = this.dataSubjects;
    },

    subjectSearch() {
      if (this.subjectSearch) {
        this.listSubjects = this.dataSubjects.filter((item) => (
          item.name.toLowerCase().includes(this.subjectSearch.toLowerCase())));
      } else {
        this.listSubjects = this.dataSubjects;
      }
    },
  },

  methods: {
    goToSubject(id) {
      this.$router.push({ path: `/disciplinas/visualizar/${id}` });
    },
  },
};
</script>
