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

profileRouter.get('/:num', async (request, response) => {
    const token = getTokenFrom(request)
    if (!token) return response.status(401).json({ error: 'token invalid' })
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id).catch(() => {
        return response.status(500).json({ error: 'server error'})
    })

    if (user.num != request.params.num) // Esta comprobación es absurrda, es para el reto.
        return response.status(401).json({ error: 'token invalid' })
    
    delete user.password // No enviamos el hash de la contraseña a través de la red

    response
    .status(200)
    .send(user)
})

/*
RUTA PARA EL RETO. ESTO ES UNA VULNERABILIDAD. EN LA VIDA REAL NO TIENE QUE ESTAR Y SE DEBE BORRAR ESTA RUTA
*/
profileRouter.get('/', async (request, response) => {
    const usuarios = await User.find({}, { email: 1, _id: 0 });
    return response.status(200).json(usuarios)
})

module.exports = profileRouter