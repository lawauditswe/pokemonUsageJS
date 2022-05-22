import React, { useState } from 'react';
import './App.css';

// import axios from 'axios';

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

		// BELOW LINES ARE NEW FUNCTIONALITY
		let atSymbolSeen = false;
		let atIndex;

		for (let i = 0; i < result.length; i++) {
			let currString = '';
			if (result[i] === '@') {
				atSymbolSeen = true;
				atIndex = i;
			}
			if (result[i] === 'Ability:') {
				if (atSymbolSeen) {
					if (
						result[atIndex - 2] &&
						result[atIndex - 2] !== '' &&
						result[atIndex - 2] !== '==='
					) {
						currString += result[atIndex - 2] + ' ';
					}
					currString += result[atIndex - 1];
					atSymbolSeen = false;
					atIndex = null;
				} else {
					if (
						result[i - 4] &&
						result[i - 4] !== '' &&
						result[i - 4] !== '==='
					) {
						currString += result[i - 4] + ' ';
					}
					currString += result[i - 3];
				}
				arr.push(currString);
			}
		}

		// BELOW LINES ARE ORIGINAL FUNCTIONALITY
		// let emptyStringCount = 0;
		// let tripleEqualCount = 0;
		// let atCount = 0;

		// for (let i = 0; i < result.length; i++) {
		// 	let currString = '';
		// 	let currIndex = result[i];
		// 	// NEW FUNCTIONALITY
		// 	// For if pokemon has items
		// 	if (currIndex === '@') {
		// 		if (result[i - 2] !== '' && result[i - 2] !== '===') {
		// 			currString += result[i - 2] + ' ';
		// 		}
		// 		currString += result[i - 1];
		// 		arr.push(currString);
		// 		atCount++;

		// 		// If pokemon does not have items
		// 	} else if (atCount === 0 && currIndex === 'Ability:') {
		// 		let ignoredStrings = ['', '===', '(M)', '(F)'];
		// 		if (
		// 			!ignoredStrings.includes(result[i - 5]) &&
		// 			result[i - 4] !== '==='
		// 		) {
		// 			currString += result[i - 5];
		// 		}
		// 		if (!ignoredStrings.includes(result[i - 4])) {
		// 			currString += result[i - 4] + ' ';
		// 		}
		// 		currString += result[i - 3];
		// 		arr.push(currString);
		// 	}
		// }

		console.log(`Arr: ${arr}`);

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
	};

	// const sprites = (pokemonArr) => {
	// 	const spriteLinks = [];
	// 	console.log('This is the console log within the sprites function.');
	// 	console.log(pokemonArr);
	// 	for (let i = 0; i < pokemonArr.length; i++) {
	// 		spriteLinks.push(`https://pokeapi.co/api/v2/pokemon/${currIndex[0]}`);
	// 	}
	// 	setLinksArr(spriteLinks);
	// 	console.log(spriteLinks);
	// };

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					<div className='title'>Enter your PokePast:</div>
					<input
						className='pasteInput'
						type='text'
						value={pokePast}
						onChange={(e) => setPokePast(e.target.value)}
					/>
				</label>
				<br />
				<input
					className='submitButton'
					type='submit'
					value='Submit your PokePast'
				/>
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
						<div className='pokemonList' key={arrayElement[0]}>
							{/* <br /> */}
							{arrayElement[0]} x{arrayElement[1]}
						</div>
					))}
			</div>
		</div>
	);
};

export default Form;
