import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => { return response.data })
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => { return response.data })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => { return response.data })
}

const deletePerson = (id) => {
  const deleteurl = `${baseUrl}/${id}`
  const request = axios.delete(deleteurl)
  return request.then(response => { return response })
}

export default { getAll, create, update, deletePerson }