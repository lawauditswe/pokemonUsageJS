import React, { useState } from 'react';

const Form = () => {
	const [pokePast, setPokePast] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('PokePast submitted.');
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
			This is your PokePast: {pokePast}
		</div>
	);
};

export default Form;
