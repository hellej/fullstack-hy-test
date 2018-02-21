

const logger = (request, response, next) => {
  if (process.env.NODE_ENV === 'test') {
    return next()
  }
  let token = request.get('authorization')
  if (token) { token = token.substring(0, 150) } else { token = 'missing' }
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('Token:  ', token)
  console.log('---')
  next()
}

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    // console.log('TOKEN TO NULL')
    request.token = null
  }
  next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  logger,
  error,
  tokenExtractor
}