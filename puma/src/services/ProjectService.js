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
    const subjects = await axios.get(`${global.URL_GATEWAY}/project/subject`, {
      headers: {
        auth,
      },
    });
    return subjects;
  }

  async putProposal(projectId, subjId) {
    const auth = store.getters.token;
    const subjects = await axios.put(`${global.URL_GATEWAY}/project/proposal/${projectId}`,
      { subjectId: subjId },
      {
        headers: {
          auth,
        },
      });
    return subjects;
  }

  async putProposalStatus(id, status) {
    const auth = store.getters.token;
    const subjects = await axios.put(`${global.URL_GATEWAY}/project/alocate/${id}/status`,
      { proposal: { approved: status } },
      {
        headers: {
          auth,
        },
      });
    return subjects;
  }

  addProject(project) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.post(`${global.URL_GATEWAY}/project`, project, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/projetos/cadastrar reject: ${response}`);
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

  deleteProject(idprojeto) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/project/${idprojeto}`).then((response) => {
        resolve(response);
      }).catch(() => {
        reject('erro na deleção do arquivo');
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

  getKnowledgeAreas() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/areas-conhecimento`).then((response) => {
        resolve(response);
      }).catch(() => {
        reject('erro na deleção do arquivo');
      });
    });
  }

  getAvailableKeywordsToSubject() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/project/subject/keywords`).then((response) => {
        resolve(response);
      }).catch((error) => {
        alert(error);
        reject('Erro ao recuperar as palavras-chave para disciplinaa');
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

  getProfessors() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/project/professors`).then((response) => {
        resolve(response);
      }).catch((error) => {
        alert(error);
        reject('Erro ao recuperar os professores');
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

  async getSubjectById(subjectid) {
    const auth = store.getters.token;
    const subject = await axios.get(`${global.URL_GATEWAY}/project/subject/${subjectid}`, { headers: { auth } });
    return subject;
  }

  updateSubject(subjectid, subjectBody) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.put(`${global.URL_GATEWAY}/project/subject/${subjectid}`, subjectBody, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`Erro ao atualizar disciplina: ${response}`);
      });
    });
  }
}
