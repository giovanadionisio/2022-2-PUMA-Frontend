<template>
    <div class="mt-4 ml-4">
        <table>
            <thead>
                <tr>
                    <td>ITEM</td>
                    <td>PALAVRA-CHAVE</td>
                    <td>DISCIPLINA</td>
                    <td></td>
                </tr>
            </thead>

            <tr v-for="keyWord in listKeyWords" :key="keyWord.subjectid">
                <td>{{keyWord.keywordid}}</td>
                <td>{{keyWord.keyword}}</td>
                <td>{{keyWord.subjectname}}</td>
                <td>
                  <button
                    class="btn cd-btn mx-2"
                  >
                    <font-awesome-icon icon="fas fa-edit" size="lg" />
                    EDITAR
                  </button>
                  <button
                    class="btn cd-btn mx-2"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash" size="lg" />
                    EXCLUIR
                  </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  props: {
    dataKeyWords: Array,
    filteredKeyWords: Array,
  },

  data: () => ({
    listKeyWords: [],
  }),

  watch: {
    dataKeyWords() {
      this.listKeyWords = this.dataKeyWords;
    },

    filteredKeyWords() {
      this.listKeyWords = this.filteredKeyWords;
    },
  },

  methods: {
    goToSubject(id) {
      this.$router.push({ path: `/disciplinas/visualizar/${id}` });
    },

    subjectSearch() {
      console.log(this.filteredKeyWords);
      this.listKeyWords = this.filteredKeyWords;
    },
  },
};
</script>
