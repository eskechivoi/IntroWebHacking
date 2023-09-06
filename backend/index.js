const express = require('express')
const app = express()

const loginRouter = require('./controllers/login')

app.use(express.json())
app.use('/api/login', loginRouter)

app.post('/api/register', (request, response) => {

})

app.post('/api/profile', (request, response) => {
	
})

app.put('/api/changepassword', (request, response) => {

})

const PORT = 3001
app.listen(PORT)
console.log(`App listening on port ${PORT}`)
