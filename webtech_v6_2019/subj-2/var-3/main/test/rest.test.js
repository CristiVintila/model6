let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('authors', () => {
	describe('/POST authors', () => {
		before((done) => {
			chai.request(server)
				.get('/create')
				.send()
				.end((err, res) => {
					res.should.have.status(201)
					should.exist(res.body)
					res.body.should.have.property('message').eql('created')
					done()
				})			
		})
		it('it should get all authors listing', (done) => {
			chai.request(server)
				.get('/authors')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(10)
					done()
				})
		})
		it('it should find authors based on email', (done) => {
			chai.request(server)
				.get('/authors?email=e1@')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(1)
					done()
				})
		})
		it('it should find authors based on address', (done) => {
			chai.request(server)
				.get('/authors?address=th')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(10)
					done()
				})
		})
		it('it should find authors based on email and address', (done) => {
			chai.request(server)
				.get('/authors?email=name&address=8th')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(1)
					done()
				})
		})
		it('it should ignore empty filters', (done) => {
			chai.request(server)
				.get('/authors?email=&address=')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(10)
					done()
				})
		})
	})
})

