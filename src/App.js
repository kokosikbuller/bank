import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BanksManagementPage from './pages/BanksManagementPage';
import MortgageCalculatorPage from './pages/MortgageCalculatorPage';

function App() {
	return (
		<BrowserRouter>
			<ul
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					width: 400,
					marginTop: 20,
					listStyle: 'none',
				}}
			>
				<li>
					<Link to='/'>BanksManagementPage</Link>
				</li>
				<li>
					<Link to='/mortgage'>MortgageCalculatorPage</Link>
				</li>
			</ul>
			<Routes>
				<Route path='/'>
					<Route index element={<BanksManagementPage />} />
					<Route index path='mortgage' element={<MortgageCalculatorPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
