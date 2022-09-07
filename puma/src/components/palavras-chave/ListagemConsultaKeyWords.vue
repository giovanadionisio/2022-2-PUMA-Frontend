<template>
    <div class="mt-4 ml-4">
        <table>
            <thead class="mb-10">
                <tr>
                    <td>Item</td>
                    <td>Palavra-chave</td>
                    <td>Disciplina</td>
                    <td></td>
                </tr>
            </thead>

            <tr v-for="(keyWord, index) in listKeyWords" :key="index">
                <td>{{keyWord.keywordid}}</td>
                <td>{{keyWord.keyword}}</td>
                <td>{{keyWord.subjectname}}</td>
                <td>
                    <div class="actions">
                      <button
                        class="btn cd-btn mx-2"
                        @click="editKeyword(keyWord)"
                        v-if="allowEdit(keyWord.keywordid)"
                      >
                        <font-awesome-icon icon="fas fa-edit" size="lg" />
                        Editar
                      </button>
                      <button
                        class="btn cd-btn"
                        v-if="allowEdit(keyWord.keywordid)"
                        @click="deleteKeyword(keyWord)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash" size="lg" />
                        Excluir
                      </button>
                    </div>
                </td>
            </tr>
        </table>

        <b-modal hide-footer v-model="openModalEdit" centered size="md" modal-class="myclass">
          <template #modal-header>
            Editar Palavra-Chave
          </template>

          <ValidationObserver ref="observer">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <b-form-group class="col-md-9">
                <template #label>
                  <span class="label-text">Palavra-Chave</span>
                </template>

                <validation-provider rules="required" v-slot="{ errors }">
                  <b-form-input
                    type="text"
                    placeholder="Escreva aqui a palavra-chave"
                    v-model="form.keywordName"
                    v-bind:class="{ 'kw-invalid': errors.length }"
                    class="custom-input"
                  />
                  <span class="kw-error">{{ errors[0] }}</span>
                </validation-provider>
              </b-form-group>

              <b-form-group class="col-md-9">
                <template #label>
                  <span class="label-text">Disciplina</span>
                </template>

                <validation-provider rules="required" v-slot="{ errors }">
                  <b-select v-model="form.selectedSubject" :options="subjectsForm"
                    v-bind:class="{ 'kw-invalid': errors.length }" class="custom-input" />
                  <span class="kw-error">{{ errors[0] }}</span>
                </validation-provider>
              </b-form-group>
            </div>
          </ValidationObserver>

          <div class="divFooter">
            <button
              class="kw-btn-crud-cancel"
              @click="openModalEdit=false"
              style="margin-right: 5%;"
            >
              Cancelar
            </button>
            <button
              class="kw-btn-confirm"
              @click="handleEdit"
            >
              Editar
            </button>
          </div>
        </b-modal>
    </div>
</template>

<script>
import KeywordService from '../../services/KeywordService';

export default {
  props: {
    dataKeyWords: Array,
    tableKeywordSubject: Array,
    keywordsInfo: {},
    subjectsForm: [],
    subjects: [],
    form_prop: { },
  },

  data: () => ({
    listKeyWords: [],
    openModalEdit: false,
    keywordService: new KeywordService(),
    kwNameAlreadyExist: false,
    newKeyWords: [],
    idKeywordEdit: '',
    keywordDelete: null,
  }),

  watch: {
    dataKeyWords() {
      this.listKeyWords = this.dataKeyWords;
    },

    tableKeywordSubject() {
      this.listKeyWords = this.tableKeywordSubject;
    },
  },

  methods: {
    goToSubject(id) {
      this.$router.push({ path: `/disciplinas/visualizar/${id}` });
    },

    subjectSearch() {
      this.listKeyWords = this.tableKeywordSubject;
    },

    keywordNameAlreadyExist() {
      // const currentKeyword = this.form.keywordName;
      this.kwNameAlreadyExist = this.tableKeywordSubject.some(
        (k) => this.treatKeyword(k.keyword) === this.treatKeyword(this.form.keywordName),
      );
    },

    allowEdit(keywordId) {
      // return true;
      const { isAdmin, userId } = this.$store.getters.user;
      if (isAdmin) return true;

      let flag = false;

      Object.values(this.keywordsInfo[keywordId]).forEach((profId) => {
        if (userId === profId) {
          flag = true;
        }
      });

      if (flag) {
        return true;
      }
      return false;
    },

    editKeyword(keyword) {
      this.openModalEdit = true;
      this.idKeywordEdit = keyword.keywordid;
      this.form = { keywordName: keyword.keyword, selectedSubject: keyword.subjectid };
    },

    makeToast(thisTitle, message, thisVariant) {
      this.$bvToast.toast(
        message,
        {
          title: thisTitle,
          variant: thisVariant,
          solid: true,
          autoHideDelay: 4000,
        },
      );
    },

    async handleEdit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (isFormValid && this.kwNameAlreadyExist === false) {
          this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
          const response = await this.keywordService.updateKeyword(
            this.idKeywordEdit,
            this.form.keywordName,
          );
          const idKeywordUpdated = response.data.keywordid;
          await this.keywordService.updateSubjectKeyword(
            idKeywordUpdated,
            this.form.selectedSubject,
          );
          this.openModalEdit = false;
          this.$store.commit('CLOSE_LOADING_MODAL');
          const subjectName = this.subjectsForm.find(
            (s) => s.value === this.form.selectedSubject,
          ).text;
          this.makeToast('SUCESSO', 'Palavra-Chave editada com sucesso!', 'success');
          this.listKeyWords = this.listKeyWords.map((kw) => {
            if (kw.keywordid === this.idKeywordEdit) {
              return {
                ...kw,
                keyword: this.form.keywordName,
                subjectname: subjectName,
              };
            }
            return kw;
          });
        }
      } catch (error) {
        this.openModalEdit = false;
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Infelizmente houve um erro ao tentar editar a palavra-chave', 'danger');
      }
    },

    deleteKeyword(keyWord) {
      this.$store.commit('OPEN_CONFIRM_MODAL', {
        title: 'EXCLUIR PALAVRA-CHAVE',
        content: 'Confirmar exclusão da palavra-chave ?',
        cancelButton: {
          text: 'Cancelar',
          variant: 'outline-danger',
          onClick: () => this.$store.commit('CLOSE_CONFIRM_MODAL'),
        },
        okButton: {
          text: 'Confirmar',
          variant: 'danger',
          onClick: () => { this.handleDelete(); this.$store.commit('CLOSE_CONFIRM_MODAL'); },
        },
      });
      this.keywordDelete = keyWord.keywordid;
    },

    async handleDelete() {
      try {
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
        await this.keywordService.deleteKeyword(this.keywordDelete);
        this.listKeyWords = this.listKeyWords.filter((kw) => kw.keywordid !== this.keywordDelete);
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('SUCESSO', 'Palavra-chave excluída com sucesso!', 'success');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('ERRO', 'Infelizmente houve um erro ao tentar excluir a palavra-chave', 'danger');
      }
    },
  },
};
</script>
