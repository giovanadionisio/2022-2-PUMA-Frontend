module.exports = {
  configUser: () => {
    if (process.env.VUE_APP_ENVIRONMENT === 'dev') {
      /* eslint-disable  semi */
      global.URL_GATEWAY = `http://${process.env.VUE_APP_IP_ADDRESS}:3004`
    } else if (process.env.VUE_APP_ENVIRONMENT === 'test') {
      /* eslint-disable  semi */
      global.URL_GATEWAY = `${process.env.VUE_APP_IP_ADDRESS}`
    } else if (process.env.VUE_APP_ENVIRONMENT === 'prod') {
      /* eslint-disable  semi */
      global.URL_GATEWAY = `http://${process.env.VUE_APP_IP_ADDRESS}:3004`
    }
  },
};
