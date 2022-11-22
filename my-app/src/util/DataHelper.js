import axios from 'axios'

export const BASE_SERVER_URL = 'http://localhost:3001/'

export const handleInsertDB = (params) => {
    return axios.post(BASE_SERVER_URL + 'insert', params)
      .then(function (response) {
        console.log(response, 233);
      })
      .catch(function (error) {
        console.log(error);
      });
}

export const handleQueryDB = () => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_SERVER_URL + 'read')
        .then(function (response) {
          console.log({response})
          resolve(response)
        })
        .catch(function (error) {
          console.log(error);
          reject(error)
        });
    })
}