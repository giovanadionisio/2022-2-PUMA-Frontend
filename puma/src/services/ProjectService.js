/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-shorthand */

import axios from '../main.js';
import store from '../store';

export default class ProjectService {
  async getAllocatedProjects(subjctId) {
    const auth = store.getters.token;
    const allocatedArray = await axios.get(`${global.URL_GATEWAY}/project/alocated/${subjctId}`, {
      headers: {
        auth,
      },
    });
    return allocatedArray;
  }

  async getMyProposals(user) {
    const auth = store.getters.token;
    const myProposals = await axios.get(`${global.URL_GATEWAY}/project/myProposals`, {
      headers: {
        auth,
      },
      params: user,
    });
    return myProposals;
  }

  async getProjById(projId) {
    const auth = store.getters.token;
    const projInfos = await axios.get(`${global.URL_GATEWAY}/project/project/${projId}`, { headers: { auth } });
    return projInfos;
  }

  async getAllSubjects() {
    const auth = store.getters.token;
    const subjects = await axios.get(`${global.URL_GATEWAY}/project/subject`, { headers: { auth } });
    return subjects;
  }

  async putProposal(projectId, subjId) {
    const auth = store.getters.token;
    const subjects = await axios.put(`${global.URL_GATEWAY}/project/proposal/${projectId}`,
      { subjectId: subjId },
      { headers: { auth } });
    return subjects;
  }

  async putProposalStatus(id, status) {
    const auth = store.getters.token;
    const subjects = await axios.put(`${global.URL_GATEWAY}/project/alocate/${id}/status`,
      { proposal: { approved: status } },
      { headers: { auth } });
    return subjects;
  }

  getProject(projectId) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/project/get/${projectId}`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  addProject(project) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/project/create`, project, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/projetos/cadastrar reject: ${response}`);
      });
    });
  }

  updateProject(payload) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/project/update`, payload, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  deleteProject(projectId) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.delete(`${global.URL_GATEWAY}/project/delete/${projectId}`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  evaluateProject(payload) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/project/evaluate`, payload, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  reallocateProject(payload) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/project/reallocate`, payload, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  addFile(file) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.post(`${global.URL_GATEWAY}/project/upload`, file, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch(() => {
        reject('erro no upload do arquivo');
      });
    });
  }

  getKeywords() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/project/palavra-chave`).then((response) => {
        resolve(response);
      }).catch((error) => {
        alert(error);
        reject('Erro ao recuperar as palavras-chave');
      });
    });
  }

  getAvailableKeywordsToProject() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/project/keywords`).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getKnowledgeAreas() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/areas-conhecimento`).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getAvailableKeywordsToSubject() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/project/subject/keywords`).then((response) => {
        resolve(response);
      }).catch((error) => {
        alert(error);
        reject('Erro ao recuperar as palavras-chave para disciplina');
      });
    });
  }

  getSubareas() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/project/subareas`).then((response) => {
        resolve(response);
      }).catch((error) => {
        alert(error);
        reject('Erro ao recuperar as subareas');
      });
    });
  }

  addSubject(subject) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.post(`${global.URL_GATEWAY}/project/subject`, subject, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`Erro ao cadastrar disciplina: ${response}`);
      });
    });
  }

  subjectList() {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.get(`${global.URL_GATEWAY}/project/subjectList`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
