<template>
    <div class="mt-4">
        <h2 class="tittle sub-tittle ml-4">{{ title }}</h2>
        <table>
            <thead>
                <tr>
                    <td>Título</td>
                    <td>Professorres</td>
                    <td></td>
                </tr>
            </thead>
            <tr v-for="subject in list" :key="subject.subjectid">
                <td>{{subject.name}}</td>
                <td>
                    <div v-for="professor in subject.professors" :key="professor.userid">
                        {{professor.fullname}}
                    </div>
                </td>
                <td>
                    <button
                    class="btn cd-btn"
                    @click="goToSubject(subject.subjectid)">
                    <i class="fa-solid fa-circle-info mr-2 ml-0"></i>Ver Detalhes
                    </button>
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
