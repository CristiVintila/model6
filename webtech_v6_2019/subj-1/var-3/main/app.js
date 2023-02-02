 /*
 - funcția capitalize primește ca parametrii un string și un array
 - dicționarul conține o serie de termeni
 - in textul ințial cuvintele sunt separate de spațiu
 - fiecare termen din dicționar trebuie să apară capitalizat în rezultat
 - rezultatul este un string nou, fără modificarea celui inițial
 - dacă textul nu este un string sau dicționarul nu este un array de string-uri se va arunca o excepție (mesajul TypeError)
*/

/*
 - the capitalize function receives as parameters a string and an array
 - the dictionary (the array) contains a series of words
 - in the initial text the words are separated by space
 - each dictionary term has to appear capitalized in the result
 - the result is a new string without modifying the initial one
 - if the text is not string or the dictionary not an array of strings an exception is thrown (message is TypeError)
*/

function capitalize(text, dictionary){
	// TODO: implementați funcția
	// TODO: implement the function
	if(typeof text !=="string" || !Array.isArray(dictionary) || dictionary.some(x=>typeof x !=="string" )){
		throw new Error("TypeError")
	}
	let words = [...text.split(' ')]

	for(let i=0; i<words.length; i++){
		if(dictionary.findIndex(x=>x.toLowerCase() === words[i].toLowerCase())!==-1){
			words[i] = words[i].replace(`${words[i][0]}`,`${words[i][0].toUpperCase()}`)
			// console.log(word)
		}
	}

	console.log(words.join(" "))
	return words.join(" ")
}

capitalize('this is a text',['text'])

module.exports.capitalize = capitalize