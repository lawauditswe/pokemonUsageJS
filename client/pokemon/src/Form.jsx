import React, { useState } from 'react';
import './App.css';

const Form = () => {
	let sortedPokemonArr;
	const [pokePast, setPokePast] = useState('');
	const [result, setResult] = useState('');
	const [numberOfPokemon, setNumberOfPokemon] = useState(0);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('PokePast submitted.');
		pokePastFunctionality(pokePast);
	};

	const pokePastFunctionality = (paste) => {
		const pokemonObj = {};
		let pokePastString = paste;
		let result = pokePastString.split(' ');
		console.log('Result: ');
		console.log(result);

		let arr = [];

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
						result[atIndex - 3] &&
						result[atIndex - 3] !== '' &&
						result[atIndex - 3] !== '===' &&
						result[atIndex - 3] !== '(M)' &&
						result[atIndex - 3] !== '(F)'
					) {
						currString += result[atIndex - 3] + ' ';
					}
					if (
						result[atIndex - 2] &&
						result[atIndex - 2] !== '' &&
						result[atIndex - 2] !== '===' &&
						result[atIndex - 2] !== '(M)' &&
						result[atIndex - 2] !== '(F)'
					) {
						currString += result[atIndex - 2] + ' ';
					}
					if (
						result[atIndex - 1] &&
						result[atIndex - 1] !== '(M)' &&
						result[atIndex - 1] !== '(F)'
					) {
						currString += result[atIndex - 1];
					}
					atSymbolSeen = false;
					atIndex = null;
				} else {
					if (
						result[i - 4] &&
						result[i - 4] !== '' &&
						result[i - 4] !== '===' &&
						result[i - 4] !== '(M)' &&
						result[i - 4] !== '(F)'
					) {
						currString += result[i - 4] + ' ';
					}
					if (
						result[i - 3] &&
						result[i - 3] !== '' &&
						result[i - 3] !== '===' &&
						result[i - 3] !== '(M)' &&
						result[i - 3] !== '(F)'
					) {
						currString += result[i - 3];
					}
				}
				arr.push(currString);
			}
		}

		// console.log(`Arr: ${arr}`);

		for (let j = 0; j < arr.length; j++) {
			if (!pokemonObj[arr[j]]) {
				pokemonObj[arr[j]] = 1;
			} else {
				pokemonObj[arr[j]]++;
			}
		}

		console.log(`Pokemon obj: ${JSON.stringify(pokemonObj)}`);
		// console.log(Object.keys(pokemonObj));

		sortedPokemonArr = Object.entries(pokemonObj).sort((a, b) => b[1] - a[1]);

		// console.log(JSON.stringify(sortedPokemonArr));
		console.log(`Sorted pokemon array: ${sortedPokemonArr}`);
		setResult(sortedPokemonArr);

		let totalPokemon = 0;
		let pokemonQuantity = [];
		for (let i = 0; i < sortedPokemonArr.length; i++) {
			pokemonQuantity.push(sortedPokemonArr[i][1]);
			if (sortedPokemonArr[i][0] === 'Urshifu-Rapid-Strike') {
				sortedPokemonArr[i][0] = 'Urshifu';
			}
			if (sortedPokemonArr[i][0] === 'Necrozma-Dusk-Mane') {
				sortedPokemonArr[i][0] = 'Necrozma-Dusk';
			}
			if (sortedPokemonArr[i][0] === 'Calyrex-Shadow') {
				sortedPokemonArr[i][0] = 'Calyrex-Shadow-Rider';
			}
			if (sortedPokemonArr[i][0].includes('Zamazenta-Crowned')) {
				sortedPokemonArr[i][0] = 'Zamazenta-Crowned';
			}
		}

		for (let j = 0; j < pokemonQuantity.length; j++) {
			totalPokemon += pokemonQuantity[j];
		}
		setNumberOfPokemon(totalPokemon);

		// console.log(`Result array: ${result}`);
	};

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
				<div className='gridContainer'>
					{result &&
						result.map((arrayElement) => (
							<div key={arrayElement[0]}>
								<img
									className='sprites'
									alt=''
									src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${arrayElement[0]
										.toLowerCase()
										.trim()
										.replace(' ', '-')}.png`}
								/>
								<div>
									{arrayElement[0]} x{arrayElement[1]}
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Form;
