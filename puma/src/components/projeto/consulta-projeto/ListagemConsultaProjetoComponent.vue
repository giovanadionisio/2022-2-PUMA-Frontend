<template>
  <div>
    <mdbDatatable ref="table" borderless color="blue" :data="data" :pagination="false" />
    <div v-if="!projects.length" class="no-results align-content-center mt-3">
      Sem resultados disponíveis
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    projects: Array,
  },
};
</script>
