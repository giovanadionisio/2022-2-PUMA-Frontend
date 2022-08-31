<template>
  <div class="main-content hidden-scroll-bar">
    <h1 class="kw-title ml-4">
      Palavras-Chave
    </h1>

    <div class="kw-sub-title ml-4">
      PALAVRAS-CHAVE CADASTRADAS NA PLATAFORMA
    </div>

    <div class="div-filter-and-button ml-4">
      <b-form-select @input="filter" class="col-md-4 select" v-model="selected" :options="subjects">
      </b-form-select>
      <button class="kw-btn btn sizes mr-2" >
        <i class="fa-solid fa-plus-circle ml-3 add-project"></i>
        ADICIONAR PALAVRA-CHAVE
      </button>
    </div>

    <div class="tabelas">
      <ListagemConsultaKeyWords />

    </div>
  </div>
</template>

<script>
import ListagemConsultaKeyWords from './ListagemConsultaKeyWords.vue';

export default {
  components: {
    ListagemConsultaKeyWords,
  },
};
</script>

<style src="./keyWords.css"></style>
