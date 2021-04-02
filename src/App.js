import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddProduct from './Components/AddProduct/AddProduct';
import Login from './Components/LogIn/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/Private Route/PrivateRoute';
import CheckOut from './Components/CheckOut/CheckOut';
import Orders from './Components/Orders/Orders';
import ManageProduct from './Components/Manage Product/ManageProduct';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/addProduct">
          <AddProduct></AddProduct>
        </Route>
        <Route path="/manageProduct">
          <ManageProduct></ManageProduct>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute path="/checkOut/:id">
          <CheckOut></CheckOut>
        </PrivateRoute>
        <Route path="/orders">
          <Orders></Orders>
        </Route>
        <Route path="/checkOut">
          <CheckOut></CheckOut>
        </Route>        
        <Route exact path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
    </userContext.Provider>
  );
}

export default App;
