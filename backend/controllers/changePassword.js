const bcrypt = require('bcrypt')
const changePwdRouter = require('express').Router()
const User = require('../models/user')

changePwdRouter.put('/:num', async (request, response) => {
  const num = request.params.num

  const user = await User.findOne({ num }).catch(() => {
    return response.status(500).end()
  })

  const password = request.body
  if (password.length < 8)
    return response.status(400).json({error: 'Password must be at least 8 characters long.'})
  const passwordHash = bcrypt.hashSync(password, 10)

  user.password = passwordHash

  await User.update(
    { num: num }, // Consulta para filtrar los documentos a modificar
    { $set: user } // Elementos que se modificarán
  ).catch(error => {
        return response.status(500).end(error)
  })
})

module.exports = changePwdRouter