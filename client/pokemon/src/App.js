import './App.css';
import Form from './Form';

function App() {
	return (
		<div className='App'>
			<h1>Pokemon Usage Stats</h1>
			<div>
				Copy and paste your list of teams directly from https://pokepast.es/ and
				find out each Pokemon's usage!
				<br />
				<br />
			</div>
			<Form />
		</div>
	);
}

export default App;
