import logo from './logo.svg';
import { createContext, useState } from "react";
import './App.css';
import NavBar from './Component/Home/NavBar.js/NavBar';
import Home from './Component/Home/Home';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BookNow from './Component/BookNow/BookNow';
import Destination from './Component/Destination/Destination';
import Login from './Component/Login/Login';
import NotFound from "./Component/NotFound/NotFound";
import PrivetRoute from "./Component/PrivatRoute/PrivetRoute"


export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

      <Router>
        <NavBar />
        <Switch>
          
          <Route path="/home">
            <Home></Home>
          </Route>

          <PrivetRoute path="/BookNow/:id">
            <BookNow />
          </PrivetRoute>

          <PrivetRoute path="/Destination/:id">
            <Destination />
          </PrivetRoute>

          <Route path="/Login">
            <Login />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Router path="*">
            <NotFound></NotFound>
          </Router>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
