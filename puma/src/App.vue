<template>
  <div id='app'>
    <link
      href='https://fonts.googleapis.com/css?family=Rubik:300,400,500,600,700,900'
      rel='stylesheet'
    />
    <Navbar v-if='isAuthenticated' />
    <router-view />
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  methods: {
    updateSessionStatus() {
      this.isAuthenticated = this.$store.getters.isAuthenticated;
    },
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.updateSessionStatus();
  },
  updated() {
    this.updateSessionStatus();
  },
};
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #15355e;
  height:100%;
}

.input-field {
  border-radius: 7px;
  font-size: 1.1em;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 70px;
  margin-right: 70px;
  padding: 15px;
}

.submit-btn {
  align-items: center;
  background-color: #f7db36;
  color: #15355e;
  border: 2px solid #f7db36;
  border-radius: 5px;
  padding: 5px;
  font-size: 24px;
  font-weight: 700;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  transition: 0.5s;
  width: 196.7px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}

.flex1 {
  flex: 1;
}

.title {
  display: flex;
  color: black;
  font-family: rubik, Sans-serif;
  font-weight: 300;
  font-size: 2em;
  justify-content: left;
  margin-top: 1.7em;
  margin-left: 3.5em;
}

.logo-puma {
  width: 184px;
  height: 56px;
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: 0.3em;
  color: #15355e;
}
</style>
