import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
	let sortedPokemonArr;
	const [pokePast, setPokePast] = useState('');
	const [result, setResult] = useState('');
	const [linksArr, setLinksArr] = useState([]);
	const [numberOfPokemon, setNumberOfPokemon] = useState(0);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('PokePast submitted.');
		pokePastFunctionality(pokePast);

		// sprites(sortedPokemonArr);
	};

	const pokePastFunctionality = (paste) => {
		const pokemonObj = {};
		let pokePastString = paste;
		let result = pokePastString.split(' ');
		console.log('Result: ');
		console.log(result);

		let arr = [];
		let emptyStringCount = 0;
		let tripleEqualCount = 0;

		for (let i = 0; i < result.length; i++) {
			let currString = '';
			if (result[i] === '===' || result[i] === '') {
				if (result[i] === '===') {
					tripleEqualCount++;
				} else {
					emptyStringCount++;
				}
			} else if (tripleEqualCount === 2) {
				currString += result[i];
				if (result[i + 1] && result[i + 1] !== '') {
					currString += ' ';
					currString += result[i + 1];
				}
				arr.push(currString);
				tripleEqualCount = 0;
				emptyStringCount = 0;
			} else if (emptyStringCount === 5) {
				if (
					result[i] !== '===' &&
					result[i] !== '[gen8]' &&
					result[i] !== '[gen8ou]'
				) {
					currString += result[i];
					if (
						result[i + 1] &&
						result[i + 1] !== '' &&
						result[i + 1] !== '(M)' &&
						result[i + 1] !== '(F)'
					) {
						currString += ' ';
						currString += result[i + 1];
					}
					arr.push(currString);
					emptyStringCount = 0;
				} else {
					tripleEqualCount = 1;
					emptyStringCount = 0;
				}
			}
		}

		for (let j = 0; j < arr.length; j++) {
			if (!pokemonObj[arr[j]]) {
				pokemonObj[arr[j]] = 1;
			} else {
				pokemonObj[arr[j]]++;
			}
		}

		// console.log(pokemonObj);
		// console.log(Object.keys(pokemonObj));

		sortedPokemonArr = Object.entries(pokemonObj).sort((a, b) => b[1] - a[1]);
		// console.log(sortedPokemonArr);
		setResult(sortedPokemonArr);

		const spriteLinks = [];
		for (let i = 0; i < sortedPokemonArr.length; i++) {
			// console.log(sortedPokemonArr[i]);
			let currPokemonString = sortedPokemonArr[i][0];
			for (let j = 0; j < currPokemonString.length; j++) {
				if (currPokemonString[j] === ' ') {
					currPokemonString =
						currPokemonString.slice(0, j) +
						'-' +
						currPokemonString.slice(j + 1);
				}
				currPokemonString = currPokemonString.toLowerCase();
			}
			spriteLinks.push(
				`https://pokeapi.co/api/v2/pokemon/${currPokemonString}`
			);
		}

		let totalPokemon = 0;
		let pokemonQuantity = [];
		for (let i = 0; i < sortedPokemonArr.length; i++) {
			pokemonQuantity.push(sortedPokemonArr[i][1]);
		}

		for (let j = 0; j < pokemonQuantity.length; j++) {
			totalPokemon += pokemonQuantity[j];
		}
		console.log(`Total Pokemon: ${totalPokemon}`);
		setNumberOfPokemon(totalPokemon);
		// console.log(`Total Pokemon: ${totalPokemon}`);
		// console.log(`sortedPokemonArr: ${sortedPokemonArr}`);
		// console.log(`This is spriteLinks: ${spriteLinks}`);
		// console.log(spriteLinks.length);
		// setLinksArr(spriteLinks);
		// console.log(typeof spriteLinks); // object
		// console.log(`This is the linksArr: ${linksArr}`);

		// console.log(`Result within pokePastFunctionality function: ${result}`);
		// console.log(`Sorted Pokemon Array: ${sortedPokemonArr}`);
		// console.log(`Type of result: ${typeof result}`);
		// console.log(`Type of sortedPokemonArr: ${typeof sortedPokemonArr}`);
	};

	// const sprites = (pokemonArr) => {
	// 	const spriteLinks = [];
	// 	console.log('This is the console log within the sprites function.');
	// 	console.log(pokemonArr);
	// 	for (let i = 0; i < pokemonArr.length; i++) {
	// 		spriteLinks.push(`https://pokeapi.co/api/v2/pokemon/${result[i][0]}`);
	// 	}
	// 	setLinksArr(spriteLinks);
	// 	console.log(spriteLinks);
	// };

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Enter your PokePast:
					<input
						type='text'
						value={pokePast}
						onChange={(e) => setPokePast(e.target.value)}
					/>
				</label>
				<input type='submit' />
			</form>
			<br />
			<br />
			<h3>Pokemon Usage:</h3>
			<div>
				Total Pokemon: {numberOfPokemon}
				<br />
				<br />
				{result &&
					result.map((arrayElement) => (
						<div key={arrayElement[0]}>
							{/* <br /> */}
							{arrayElement[0]}: {arrayElement[1]}
						</div>
					))}
			</div>
		</div>
	);
};

export default Form;
