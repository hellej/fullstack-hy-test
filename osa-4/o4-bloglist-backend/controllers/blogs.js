
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', ({ name: 1 }))
    response.json(blogs.map(Blog.format))
  } catch (exception) {
    console.log(exception)
    response.status(404).json({ error: 'Error' })
  }
})

blogsRouter.get('/:id', (request, response) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(Blog.format(blog))
      } else {
        response.status(404).end()
      }
    })
    .catch(() => {
      // console.log(error);
      response.status(400).send({ error: 'malformatted id ' })
    })
})


blogsRouter.delete('/:id', async (request, response) => {

  try {
    const userFromToken = jwt.verify(request.token, process.env.SECRET)

    if (!userFromToken.id || !request.token) {
      console.log('token missing or invalid')
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const toBeDeleted = await Blog.findById(request.params.id)

    if (toBeDeleted.user.toString() !== userFromToken.id) {
      console.log('trying to delete someone elses blog')
      return response.status(400).json({ error: 'trying to delete someone elses blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      console.log('EXCEPTION MESSAGE: ', exception.message)
      response.status(401).json({ error: exception.message, info: 'token error' })
    } else {
      console.log('malformatted id')
      response.status(400).send({ exception: 'malformatted id ' })
    }

  }

})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(Blog.format(updated))
  } catch (error) {
    console.log(error)
    response.status(400).send({ error: 'malformatted id ' })
  }

})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  if (!request.token) { return response.status(401).json({ error: 'token missing' }) }

  try {
    const userFromToken = jwt.verify(request.token, process.env.SECRET)
    if (!userFromToken.id || !request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!request.body.url || !request.body.title) {
      return response.status(400).send({ error: 'title or url missing' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes = body.likes || 0,
      user: userFromToken.id
    })

    const savedBlog = await blog.save()

    const user = await User.findById(userFromToken.id)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(savedBlog))

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})


module.exports = blogsRouter