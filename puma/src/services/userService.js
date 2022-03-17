/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-promise-reject-errors */
import axios from '@/main.js';

export default class UserService {
  registerUser(newUser) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/user/register`, newUser).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/register reject: ${response}`);
      });
    });
  }

  logUserIn(newUser) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/user/login`, newUser).then((response) => {
        if (response.data.auth) {
          resolve(response);
        } else {
          reject(`/login reject: ${response}`);
        }
      }).catch((response) => {
        reject(`/login reject: ${response}`);
      });
    });
  }
}
