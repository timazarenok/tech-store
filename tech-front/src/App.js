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

import 'react-notifications/lib/notifications.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { NotificationContainer } from 'react-notifications';
import Login from "./components/auth/login";
import Header from './components/header'
import Main from './components/main'
import Register from './components/auth/register'
import AdminRoute from './components/routes/admin-route'
import Admin from './components/admin'
import Cart from './components/cart'
import Product from './components/product'
import Catalog from "./components/catalog";
import CatalogLink from "./components/catalog/catalog-link";
import AddProduct from "./components/admin/add-product";
import Colors from "./components/colors";
import Manufacturers from "./components/manufacturer";
import AddCategory from "./components/admin/add-category";
import AddDelivery from "./components/admin/add-delivery";
import Profile from "./components/profile";

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
        <Header />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Main} />
        <Route exact path='/catalog' component={Catalog} />
        <Route exact path='/catalog/:id' component={CatalogLink} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/product/:id' component={Product} />
        <Switch>
          <AdminRoute exact path="/admin" component={Admin} />
          <AdminRoute exact path="/admin/add-product" component={AddProduct} />
          <AdminRoute exact path="/admin/add-color" component={Colors} />
          <AdminRoute exact path="/admin/add-manufacturer" component={Manufacturers} />
          <AdminRoute exact path="/admin/add-category" component={AddCategory} />
          <AdminRoute exact path="/admin/add-delivery" component={AddDelivery} />
        </Switch>
        <NotificationContainer />
      </Router>
    </Provider>
  );
};

export default App;
