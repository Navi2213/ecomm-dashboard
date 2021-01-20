import './App.css';
import Login from './Login'
import Register from './Register'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Protected from './Protected'
function App() {
	return (
		<div className="App">
			<Router>
				{/* <h1>E-comm project</h1> */}
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route><Route path="/add">
					<Protected Cmp={AddProduct}/>
				</Route><Route path="/update">
					<Protected Cmp={UpdateProduct}/>
				</Route>
			</Router>
		</div>
	);
}

export default App;
