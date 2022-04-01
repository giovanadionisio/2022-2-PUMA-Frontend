<template>
  <div class="home">
    <img alt="Puma logo" src="../assets/puma.png" />
    <router-link :to="{ path: '/evaluate/1'}" replace>PSP1</router-link> |
    <router-link :to="{ path: '/evaluate/2'}" replace>PSP2</router-link> |
    <router-link :to="{ path: '/projetos/cadastrar'}" replace>Novo projeto</router-link> |
    <router-link :to="{ path: '/projetos'}" replace>Meus projetos</router-link>
  </div>
</template>

<script>

export default {
  created() {
    if (this.$store.getters.user.type === 'Agente Externo') {
      this.$router.push({ name: 'Consulta de Projetos' });
    }
  },
  name: 'Home',
};
</script>
