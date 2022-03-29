/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from '@/main.js';
// import store from '../store';

export default class AlocateService {
  getKeywords() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/alocate/palavras-chave`).then((response) => {
        resolve(response);
      }).catch((error) => {
        alert(error);
        reject('Erro ao recuperar as palavras-chave');
      });
    });
  }
}
