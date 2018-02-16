
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, nonExistingId, blogsInDb, usersInDb,
  addUserGetToken, getBasicBlog } = require('./test-helper')
const jwt = require('jsonwebtoken')

describe('When there is initially some blogs in the db', async () => {

  beforeAll(async () => {
    await Blog.remove({})
    await User.remove({})
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })


  test('blogs are returned as json by GET /api/blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsAtStart = await blogsInDb()
    const response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(blogsAtStart.length)
  })


  test('individual blog is returned as json by GET /api/blogs/:id', async () => {
    const blogsAtStart = await blogsInDb()
    const blog = blogsAtStart[0]

    const response = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const title = response.body.title
    expect(title).toContain(blog.title)
  })

  test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
    const validNonexistingId = await nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('400 returned by GET /api/blogs/:id with invalid id', async () => {
    const invalidId = '5a3d5da59070081a82a3223'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })


  describe('Addition of a new blog when there is initially one user in db', async () => {
    let blogsAtStart
    let token
    let newBlog

    beforeEach(async () => {
      await Blog.remove({})
      await User.remove({})
      token = await addUserGetToken('rane')
      newBlog = getBasicBlog()
      blogsAtStart = await blogsInDb()
    })


    test('POST /api/blogs succeeds with valid data', async () => {

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfterAdd = await blogsInDb()
      expect(blogsAfterAdd.length).toBe(blogsAtStart.length + 1)

      const titles = blogsAfterAdd.map(r => r.title)
      expect(titles).toContain(newBlog.title)
    })

    test('likes of the new blog are saved correctly ', async () => {

      const response = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog)
        .expect(200)

      expect(response.body.likes).toBe(newBlog.likes)
    })

    test('blog without likes results blog with 0 likes when added ', async () => {

      delete newBlog.likes
      const response = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog)
        .expect(200)

      expect(response.body.likes).toBe(0)
    })

    test('blog without url or title causes error 400', async () => {

      delete newBlog.url
      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog)
        .expect(400)

      delete newBlog.title
      newBlog.url = 'www.tba.com'

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog)
        .expect(400)

      const blogsAfterOperations = await blogsInDb()

      expect(blogsAtStart.length).toBe(blogsAfterOperations.length)
    })

    describe('401 returned by POST /api/blogs', async () => {

      test('without token', async () => {
        const res = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
        expect(res.body.error).toContain('token missing')
      })

      test('with invalid token', async () => {
        const res = await api
          .post('/api/blogs')
          .set('Authorization', 'Bearer asdf ' + token)
          .send(newBlog)
          .expect(401)
        expect(res.body.error).toContain('invalid token')

      })
    })

  })


  describe('Deletion of a blog', async () => {

    let blogsAtStart
    let user1Blog
    let user1Token
    let user2Token

    beforeEach(async () => {
      await Blog.remove({})
      await User.remove({})

      const user1Attr = { username: 'user1', password: 'sekret' }
      const user1 = new User(user1Attr)
      await user1.save()
      user1Attr.id = user1._id
      user1Token = jwt.sign(user1Attr, process.env.SECRET)

      const user2Attr = { username: 'user2', password: 'sekret' }
      const user2 = new User(user2Attr)
      await user2.save()
      user2Attr.id = user2._id
      user2Token = jwt.sign(user2Attr, process.env.SECRET)

      user1Blog = new Blog({
        title: "Don't panic",
        author: 'Douglas Adams',
        url: 'www.tba.com',
        user: user1Attr.id
      })
      await user1Blog.save()

      blogsAtStart = await blogsInDb()
    })

    test('DELETE api/blogs/:id succeeds for a blog added by the requesting user', async () => {

      await api
        .delete(`/api/blogs/${user1Blog._id}`)
        .set('Authorization', 'Bearer ' + user1Token)
        .expect(204)

      const blogsAfterRemove = await blogsInDb()
      expect(blogsAfterRemove.length).toBe(blogsAtStart.length - 1)
    })

    test('400 returned by DELETE api/blogs/:id when trying to delete a blog added by another user', async () => {

      const response = await api
        .delete(`/api/blogs/${user1Blog._id}`)
        .set('Authorization', 'Bearer ' + user2Token)
        .expect(400)

      expect(response.body.error).toContain('trying to delete someone elses blog')

      const blogsAfterRemove = await blogsInDb()
      expect(blogsAfterRemove.length).toBe(blogsAtStart.length)
    })

    test('401 returned by DELETE api/blogs/:id when trying to delete a blog without token', async () => {

      const response = await api
        .delete(`/api/blogs/${user1Blog._id}`)
        .expect(401)

      expect(response.body.info).toContain('token error')

      const blogsAfterRemove = await blogsInDb()
      expect(blogsAfterRemove.length).toBe(blogsAtStart.length)
    })

  })


  describe('when there is initially one user in db', async () => {
    let usersAtStart

    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })

    beforeEach(async () => {
      usersAtStart = await usersInDb()
    })

    test('400 returned by POST /api/users when username is already taken', async () => {
      const response = await api
        .post('/api/users')
        .send({ username: 'root', password: 'verysekret' })
        .expect(400)

      expect(response.body.error).toContain('proposed username is already taken')
    })

    test('POST /api/users succeeds with a fresh username', async () => {

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersAtStart.length + 1)

      const usernames = usersAfterOperation.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('400 returned by POST /api/users with password less than 4 char', async () => {

      const newUser = {
        username: 'mluukkainen',
        name: 'Matti Luukkainen',
        password: 'sal'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toContain('password must be longer than 3 characters')

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersAtStart.length)

      const usernames = usersAfterOperation.map(u => u.username)
      expect(usernames).not.toContain(newUser.username)

    })

  })

  afterAll(() => {
    server.close()
  })

})



