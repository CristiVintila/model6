let assert = require('assert')

describe('capitalize', function(){
	let capitalize = require('../app').capitalize
	it('returns capitalized string', function(){
		assert.equal(capitalize('this is a text',['text']), 'this is a Text')
	})
	it('returns capitalized string', function(){
		assert.equal(capitalize('i am sure this Passes',['i', 'passes']), 'I am sure this Passes')
	})
	it('throws an exception when the second parameter is not an array', function(){
		assert.throws(() => capitalize('this is a text', 'c'), {message : 'TypeError'})
	})
	it('throws an exception is an array with non string elements', function(){
		assert.throws(() => capitalize('this is a text',[1, 'this']), {message : 'TypeError'})
	})	
	it('returns capitalized string', function(){
		assert.equal(capitalize('this is a test',[]), 'this is a test')
	})
})