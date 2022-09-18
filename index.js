const express = require("express")

const app = express()

const persons = [

   {
	   id:1,
	   name: "Arto Hellas",
	   number:"040-12356"
   },
   {
	   id:2,
	   name:"Ada Lovelance",
	   number:"39-44-5342252"
   },
   {
	   id:3,
	   name:"Dan Abramaov",
	   number:"12-43-234345"
   },
   {
	   id:4,
	   name:"Mary Poppendick",
	   number:"39-23-643122"
   }
]

app.get('/', (request, response) => {
   response.send('<h1>Hello World</h1>')

})

app.get('/api/persons', (request,response) => {
    response.json(persons)

})

const PORT = 3001

app.listen(PORT, ()=> {

console.log(`Server runing on port ${PORT}`)

})
