const fs = require('fs');

// content = 'hi good day';

// fs.writeFile('test.txt', content, (err) => {
// 	if (err) {
// 		console.error(err);
// 	}
// });

fs.readFile('test.txt', 'utf8', (err, data) => {
	let allTeamsString = data;
	let result = allTeamsString.split(' ');

	// console.log(`Result: ${result}`);

	let arr = [];

	for (let i = 0; i < result.length; i++) {
		if (
			result[i].slice(0, 2) === '\n\n' &&
			result[i].slice(0, 3) !== '\n\n\n'
		) {
			if (result[i + 1] === '' || result[i + 1] === '@') {
				arr.push(result[i].slice(2));
			} else {
				arr.push(result[i].slice(2).concat(' ' + result[i + 1]));
			}
		} else if (result[i].slice(3, 5) === '\n\n') {
			arr.push(result[i].slice(5));
		}
	}
	const pokemonObj = {};

	// console.log(`Arr: ${arr}`);

	for (let j = 0; j < arr.length; j++) {
		if (!pokemonObj[arr[j]]) {
			pokemonObj[arr[j]] = 1;
		} else {
			pokemonObj[arr[j]]++;
		}
	}

	// console.log(pokemonObj);
	// console.log(Object.keys(pokemonObj));

	let sortedPokemonObj = Object.entries(pokemonObj).sort((a, b) => b[1] - a[1]);

	console.log(sortedPokemonObj);
});
