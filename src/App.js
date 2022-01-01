import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login/Login";
import Register from "./components/Register/Register";
import AuthProvider from "./contexts/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
		<Router>
			<Switch>
				<PrivateRoute exact path="/">
				<Dashboard></Dashboard>
				</PrivateRoute>
				<PrivateRoute path="/dashboard">
					<Dashboard></Dashboard>
				</PrivateRoute>
				<Route path="/login">
					<Login></Login>
				</Route>
				<Route path="/register">
					<Register></Register>
				</Route>
			</Switch>
		</Router>
	</AuthProvider>
  );
}

export default App;
