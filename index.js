const express = require("express")


const app = express()
//cross content 
const cors = require("cors")
app.use(cors())
const bp = require('body-parser')
const morgan =require('morgan')

app.use(bp.json())
app.use(bp.urlencoded({extendend: true}))

morgan.token('person', function (req, res) {
	return JSON.stringify(req.body)

})

app.use(morgan(':method :url :status :person :response-time ms'))

var persons = [

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
   response.send('<h1>Hello World</h1>') })
app.get('/api/persons', (request,response) => {
    response.json(persons)

})

app.get('/api/persons?:id', (request , response) =>
	{
	    const id= Number(request.params.id)
	    const person = persons.find(person => person.id === id)
		response.json(person)

	}
)

app.get('/info', (request, response) => { 
	const date = new Date()
	 response.send(`<p>Phonebook has info as ${persons.length} persons <br/> ${date}</p>`)}

)
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const personBody = request.body

 if (!personBody.name || !personBody.number) 
{return response.status(400).json({error: 'please complet all the data'})}
else if (persons.find(({name}) => name == personBody.name)){
 console.log("error")
 return response.status(400).json({error: 'name be unique'})}
  

const id = Math.random(0, 999999999)  
  personBody.id = id
  persons= persons.concat(personBody)
  response.json(persons)
})

const PORT = 3001

app.listen(PORT, ()=> {

console.log(`Server runing on port ${PORT}`)

})
