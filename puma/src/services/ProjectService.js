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
    console.log(projId);
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

  getKnowledgeAreas() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/areas-conhecimento`).then((response) => {
        resolve(response);
      }).catch(() => {
        reject('erro na deleção do arquivo');
      });
    });
  }
}
