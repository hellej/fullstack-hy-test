import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  try {
    const res = await axios.post(baseUrl, newObject, config)
    return res.data
  } catch (error) {
    return error.response.data
  }
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  // const request = axios.delete(`${baseUrl}/${id}`, config)
  // request
  //   .then(response => { return response })
  //   .catch(error => {
  //     console.log(error.response)
  //     return error.response
  //   })

  return new Promise((resolve, reject) => {
    axios.delete(`${baseUrl}/${id}`, config)
      .then(response => {
        if (response) {
          resolve(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  })


}

export default { getAll, create, update, setToken, remove }