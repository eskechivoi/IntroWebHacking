require('dotenv').config()
const express = require('express')
const app = express()
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

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
app.use('/api/login', loginRouter)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`App listening on port ${PORT}`)
