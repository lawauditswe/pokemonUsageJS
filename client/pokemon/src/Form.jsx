import React, { useState } from 'react';

const Form = () => {
	let sortedPokemonArr;
	const [pokePast, setPokePast] = useState('');
	const [result, setResult] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('PokePast submitted.');
		return pokePastFunctionality(pokePast);
	};

	const pokePastFunctionality = (paste) => {
		const pokemonObj = {};
		let pokePastString = paste;
		let result = pokePastString.split(' ');
		// console.log('Result: ');
		// console.log(result);

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
					if (result[i + 1] && result[i + 1] !== '') {
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
		console.log(sortedPokemonArr);
		setResult(sortedPokemonArr);
	};

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
			This is your sorted Pokemon Object:
			<div>
				{result &&
					result.map((arrayElement) => (
						<div key={arrayElement[0]}>
							{arrayElement[0]}: {arrayElement[1]}
						</div>
					))}
			</div>
		</div>
	);
};

export default Form;
