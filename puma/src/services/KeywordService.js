/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-shorthand */

import axios from '../main.js';
import store from '../store';

export default class KeywordService {
  addKeyword() {
    return new Promise((resolve, reject) => {
      console.log('ate aqui');
      const auth = store.getters.token;
      axios.get(`${global.URL_GATEWAY}/project/palavra-chave`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
  }
}
