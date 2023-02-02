const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const mysql = require('mysql2/promise')

// const DB_USERNAME = 'root'
// const DB_PASSWORD = 'welcome12#'

// mysql.createConnection({
// 	user : DB_USERNAME,
// 	password : DB_PASSWORD
// })
// .then(async (connection) => {
// 	await connection.query('DROP DATABASE IF EXISTS tw_exam')
// 	await connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
// })
// .catch((err) => {
// 	console.warn(err.stack)
// })

// const sequelize = new Sequelize('tw_exam', DB_USERNAME, DB_PASSWORD,{
// 	dialect : 'mysql',
// 	logging: false
// })

const sequelize = new Sequelize({
	dialect : 'sqlite'
})

sequelize.sync().then( () => {
    console.log("All models were syncronized successfully!");
})

let Author = sequelize.define('author', {
	name : Sequelize.STRING,
	email : Sequelize.STRING,
	address : Sequelize.STRING,
	age : Sequelize.INTEGER
})

const app = express()
app.use(bodyParser.json())

app.get('/create', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		for (let i = 0; i < 10; i++){
			let author = new Author({
				name : 'name ' + i,
				email : 'name' + i + '@nowhere.com',
				address : 'some address on ' + i + 'th street'
			})
			await author.save()
		}
		res.status(201).json({message : 'created'})
	}
	catch(err){
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/authors', async (req, res) => {
	// TODO: implementați funcția
	// ar trebui să listeze toate cărțile unui autor
	// ar trebui să permită filtrare bazată pe adresă și email (filterele se numesc address și email și sunt trimise ca query parameters)
	// TODO: implement the function
	// should get all authors
	// should allow for filtering based on address and email (filters are called address and email and are sent as query parameters)
	try {
		let authors
		// let email = req.query.email
		// let address = req.query.address
		if(!req.query.email && !req.query.address){
			authors = await Author.findAll()
		} else if(!req.query.email){
			authors = await Author.findAll({
				where:{
					address:{
						[Op.like]:"%"+req.query.address+"%"
					}
				}
			})
		} else if(!req.query.address){
			authors = await Author.findAll({
				where:{
					email:{
						[Op.like]:"%"+req.query.email+"%"
					}
				}
			})
		} else if (req.query.email && req.query.address){
			authors = await Author.findAll({
				where:{
					email:{
						[Op.like]:"%"+req.query.email+"%"
					},
					address:{
						[Op.like]:"%"+req.query.address+"%"
					}
				}
			})
		}
		// if(req.query.email){
		// 	authors = authors.filter(a=>a.email.indexOf(req.query.email)!==-1)
		// }
		// if(req.query.address){
		// 	authors = authors.filter(a=>a.address.indexOf(req.query.address)!==-1)
		// }
		res.status(200).json(authors)
	} catch (err) {
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.post('/authors', async (req, res) => {
	try{
		let author = new Author(req.body)
		await author.save()
		res.status(201).json({message : 'created'})
	}
	catch(err){
		// console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.listen(8080, async()=>{
	try {
		await sequelize.authenticate();
        console.log("Connection has been established successfully")
	} catch (error) {
		console.log("Unable to connect to the database:", error)

	}
})


module.exports = app