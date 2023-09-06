const express = require('express')
const app = express()

app.use(express.json())

app.post('/api/signin', (request, response) => {
	const body = request.body
	if(!body.name || !body.password || !body.mail){
		return response.status(400).end( 
			JSON.stringify({error: "You must submit user name, password and mail."})
		)
	}
})

app.put('/api/changepassword', (request, response) => {

})

PORT = 80
app.listen(PORT)
console.log(`App listening on port ${PORT}`)
