import "./App.css";
import {
  setCurrentUser,
  logoutUser,
  setAuthToken,
} from "./redux/actions/authActions";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/auth/login";
import Header from './components/header'
import Main from './components/main'
import Register from './components/auth/register'
import OrderForm from './components/orders/order-form'
import PrivateRoute from './components/routes/private-route'
import Profile from './components/profile'
import AdminRoute from './components/routes/admin-route'
import Admin from './components/admin'
import Cart from './components/cart'

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/order-form' component={OrderForm} />
        <Route exact path='/' component={Main} />
        <Route exact path='/cart' component={Cart} />
        <Switch>
          <PrivateRoute exact path="/profile" component={Profile} />
          <AdminRoute exact path="/admin" component={Admin} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
