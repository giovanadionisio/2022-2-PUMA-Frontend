import Vue from 'vue';
import Vuex from 'vuex';
import * as Cookies from 'js-cookie';
import createPersistedState from 'vuex-persistedstate';

import userStore from './modules/user';
import navigationStore from './modules/navigation';

Vue.use(Vuex);

const userState = createPersistedState({
  paths: ['userStore'],
  storage: {
    getItem: (key) => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, { expires: 7, secure: true }),
    removeItem: (key) => Cookies.remove(key),
  },
});

const navigationState = createPersistedState({
  paths: ['navigationStore'],
});

const store = new Vuex.Store({
  modules: {
    userStore,
    navigationStore,
  },
  plugins: [userState, navigationState],
});

export default store;
