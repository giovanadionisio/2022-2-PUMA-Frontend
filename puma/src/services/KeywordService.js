/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-shorthand */

import axios from '../main.js';
import store from '../store';

export default class KeywordService {
  addKeyword(keyword) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      console.log('porra', `${global.URL_GATEWAY}/keywords/palavra-chave`);
      console.log('porra2', keyword);
      axios.post(`${global.URL_GATEWAY}/keywords/palavra-chave`, { keyword: keyword }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
  }

  addKeywordToSubject(keywordid, subjectid) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      console.log(`${global.URL_GATEWAY}/keywords/palavra-chave`);
      axios.post(`${global.URL_GATEWAY}/keywords/subject/keyword`, { keywordid: keywordid, subjectid: subjectid }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
  }

  getKeywords() {
    return new Promise((resolve, reject) => {
      // console.log('Cheguei aqui no keywords');
      axios.get(`${global.URL_GATEWAY}/keywords/palavra-chave2`).then((response) => {
        resolve(response);
      }).catch((error) => {
        alert(error);
        reject('Erro ao recuperar as palavras-chave');
      });
    });
  }

  getSubjects() {
    return new Promise((resolve, reject) => {
      // console.log('Cheguei aqui No Subjects');
      axios.get(`${global.URL_GATEWAY}/keywords/subjects`).then((response) => {
        resolve(response);
      }).catch((error) => {
        alert(error);
        reject('Erro ao Recuperar o Subjects');
      });
    });
  }

  updateKeyword(keywordid, newKeyword) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      console.log('DEBUG UPDATE:', keywordid, newKeyword);
      axios.put(`${global.URL_GATEWAY}/keywords/palavra-chave/edit`, { keywordid: keywordid, newKeyword: newKeyword }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
  }

  updateSubjectKeyword(keywordid, subjectid) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      console.log('DEBUG UPDATE SUBJECT:', keywordid, subjectid);
      axios.put(`${global.URL_GATEWAY}/keywords/switch/subject`, { keywordid: keywordid, subjectid: subjectid }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
  }

  deleteKeyword(keywordid) {
    const projectUrlDelete = `${global.URL_GATEWAY}/keywords/palavra-chave/${keywordid}/delete`;
    console.log('SIUUU RECEBA', projectUrlDelete);
    return new Promise((resolve, reject) => {
      axios.put(projectUrlDelete).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
