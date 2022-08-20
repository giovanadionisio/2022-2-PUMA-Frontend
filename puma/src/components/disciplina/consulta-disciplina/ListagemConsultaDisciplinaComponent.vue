<template>
    <div class="mt-4">
        <h2 class="tittle sub-tittle ml-4">{{ title }}</h2>
        <table>
            <thead>
                <tr>
                    <td>Nome</td>
                    <td></td>
                </tr>
            </thead>
            <tr v-for="subject in list" :key="subject.subjectid">
                <td>{{subject.name}}</td>
                <td class="botao">
                    <button
                    class="btn cd-btn"
                    @click="goToSubject(subject.subjectid)">
                    <i class="fa-solid fa-circle-info mr-2 ml-0"></i>Ver Detalhes
                    </button>
                    <button name="editar" class="btn cd-btn mx-2">
                    <i class="fas fa-edit mr-2 ml-0"></i>EDITAR</button>
                    <button name="excluir" class="btn cd-btn mx-2">
                    <i class="fa-solid fa-trash mr-2 ml-0"></i>EXCLUIR</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    list: Array,
  },
};
</script>
