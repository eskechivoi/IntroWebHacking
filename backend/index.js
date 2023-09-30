require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')
const registerRouter = require('./controllers/register')
const profileRouter = require('./controllers/profile')
const mongoose = require('mongoose')
const path = require('path')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
	.then(result => {
	console.log('connected to MongoDB')
	})
	.catch((error) => {
	console.log('error connecting to MongoDB:', error.message)
	})

app.use(express.json())
app.use(cors())
app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)
app.use('/api/profile', profileRouter)

// Sirve los archivos estáticos de la carpeta dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Redirige todas las rutas al index.html
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'), function(err) {
	  if (err) {
		res.status(500).send(err)
	  }
	})
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`App listening on port ${PORT}`)
