import './App.css';
import React, { Component, useState } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import GameSearch from './GameSearch';
import GameDetail from './GameDetail';
import LoginUser from './loginUser';
import NavBar from './navBar';
import Whishlist from './wishlist';
import Axios from 'axios';
import History from './history';
import ViewList from './viewList';
//Routing setup
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    //call to check on refresh, like F5
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/user",
    }).then((res) => {
      if (res.data._id) {
        this.setState({ loggedIn: true });
      }
      else {
        this.setState({ loggedIn: false });
      }
    });
  }
  handleLogout() {
    this.setState({ loggedIn: false });
  }
  handleLogin() {
    this.setState({ loggedIn: true });
    console.log(this.state.loggedIn + "LOGGEDIN APP.JA")
    this.setState(this.state);
  }
  render() {
    return (
      <div className="container">
        <Navbar className="navbar navbar-default" handleLogin={this.handleLogin} handleLogout={this.handleLogout} state={this.state.loggedIn}></Navbar>
        <hr />

        <h1>Find the best game deals</h1>

        <hr />

        <Switch>
          <Route exact path='/' render={() => (<Home />)} />
          <Route exact path='/about' render={() => (<About />)} />
          <Route exact path='/game' render={() => (<Game />)} />
          <Route exact path='/loginOk' render={() => (<LoginOk />)} />
          <Route exact path='/history' render={() => (<History />)} />
          <Route exact path='/viewList' render={() => (<ViewList />)} />
          <Route exact path='/wishlist' render={() => (<Whishlist loggedIn={this.state.loggedIn} />)} />
          <Route exact path='/game-detail/:id' render={(props) => (<GameDetail id={props.match.params.id} />)} />
        </Switch>
      </div>
    )
  }
}

//Navigation bar links
const Navbar = (props) => {

  return (
    <div>
      <NavBar handleLogin={props.handleLogin} state={props.state} handleLogout={props.handleLogout}></NavBar>
    </div>
  )
}

//Home Component
const Home = () => {

  return (

    <div className="md-form active-purple active-purple-2 mb-3">
      <GameSearch></GameSearch>
    </div>

  )
}



//About component
const About = () => {
  return (
    <div>
      <p>This website was created by Group 8</p>
    </div>
  )
}

//Login Component


//Login ok page
const LoginOk = () => {
  return (
    <div>

      <LoginUser></LoginUser>
    </div>
  )

}

//Game Component
const Game = () => {
  return (
    <div>
      <p>Game</p>
    </div>
  )
}

export default App;
