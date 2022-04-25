/* eslint-disable*/

import axios from '../main.js';
import store from '../store';

export default class KeywordService {
  addKeyword(keyword) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
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
      axios.post(`${global.URL_GATEWAY}/keywords/subject/keyword`, { keywordid: keywordid, subjectid: subjectid }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
  }

  getKeywords() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/keywords/palavra-chave2`).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject('Erro ao recuperar as palavras-chave');
      });
    });
  }

  getSubjects() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/keywords/subjects`).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject('Erro ao Recuperar o Subjects');
      });
    });
  }

  updateKeyword(keywordid, newKeyword) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
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
      axios.put(`${global.URL_GATEWAY}/keywords/switch/subject`, { keywordid: keywordid, subjectid: subjectid }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
    });
  }

  deleteKeyword(keywordid) {
    const projectUrlDelete = `${global.URL_GATEWAY}/keywords/palavra-chave/${keywordid}/delete`;
    return new Promise((resolve, reject) => {
      axios.put(projectUrlDelete).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
