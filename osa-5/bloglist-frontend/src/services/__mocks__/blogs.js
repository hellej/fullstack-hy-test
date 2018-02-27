let token = null


const blogs = [
  {
    title: "Don't Panic from mock",
    author: 'Douglas Adams',
    url: 'www.dontpanic.com',
    likes: 5,
    id: 'a5a897d83e95fa2914caa775a',
    user: {
      _id: '5a8808282ecfcd76c28b4703',
      username: 'hellej',
      name: 'Joose'
    }
  },
  {
    title: 'Mapbox & React',
    author: 'Bob Dylan',
    url: 'mapbox.com',
    likes: 3,
    id: '5a897e08e95fa2914caa775b',
    user: {
      _id: '5a8808282ecfcd76c28b4703',
      username: 'hellej',
      name: 'Joose'
    }
  },
  {
    title: 'Moon',
    author: 'Wallace',
    url: 'www.moon.com',
    likes: 4,
    id: '5a897ec1e95fa2914caa775c',
    user: {
      _id: '5a8808282ecfcd76c28b4703',
      username: 'hellej',
      name: 'Joose'
    }
  },
  {
    title: 'Dude',
    author: 'Ethan Coen',
    url: 'www.imdb.com',
    likes: 2,
    id: '5a898072e95fa2914caa775d',
    user: {
      _id: '5a8808282ecfcd76c28b4703',
      username: 'hellej',
      name: 'Joose'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }