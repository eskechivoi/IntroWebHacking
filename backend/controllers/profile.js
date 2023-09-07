const jwt = require('jsonwebtoken')
const profileRouter = require('express').Router()
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

profileRouter.get('/', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id).catch(() => {
        return response.status(500).json({ error: 'server error'})
    })

    response
    .status(200)
    .send(user)
})

module.exports = profileRouter