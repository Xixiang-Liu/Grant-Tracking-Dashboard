import axios from 'axios'

export const BASE_SERVER_URL = 'https://unrivaled-llama-9b0278.netlify.app/'

export const handleInsertDB = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(BASE_SERVER_URL + 'insert', params)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
    })
}

export const handleQueryDB = () => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_SERVER_URL + 'read')
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          console.log(error);
          reject(error)
        });
    })
}

export const handleUpdate = (params) => {
  return new Promise((resolve, reject) => {
      axios.post(BASE_SERVER_URL + 'update', params)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
  })
}

export const handleDelete = (id) => {
  return new Promise((resolve, reject) => {
      axios.delete(BASE_SERVER_URL + 'delete/' + id)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
  })
}

export const handleDeleteAll = () => {
  return new Promise((resolve, reject) => {
      axios.delete(BASE_SERVER_URL + 'delete_all')
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
  })
}

export const filterByAccount = (account) => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_SERVER_URL + 'filter_account/' + account)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
  })
}

export const filterByProgram = (program) => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_SERVER_URL + 'filter_program/' + program)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
  })
}

export const filterByAccountGroup = (account_group) => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_SERVER_URL + 'filter_account_group/' + account_group)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
  })
}

export const handleFilter = (account, program, account_group) => {
  const finalResult = []
  return new Promise(async (resolve, reject) => {
    try {
      if (account) {
        const response = await filterByAccount(account)
        finalResult.push(...response?.data)
      }
      if (program) {
        const response = await filterByProgram(program)
        finalResult.push(...response?.data)
      }
      if (account_group) {
        const response = await filterByAccountGroup(account_group)
        finalResult.push(...response?.data)
      }
      resolve(finalResult)
    } catch (e) {
      reject(e)
    }
  })
}