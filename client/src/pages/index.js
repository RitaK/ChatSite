import React, { Component } from 'react';
import Chat from '../containers/Chat.js';
import Login from '../containers/Login';
import Registration from '../containers/Registration';
import 'typeface-roboto';
import withRoot from '../withRoot';
import resources from '../resources/default'
import {userLoginSocket, signInToSocketEvents, userCreateAccountSocket} from '../api'
import { /* Router, IndexRoute, Route, */  } from 'react-router';
import { Route, Switch, Redirect} from 'react-router-dom';
//import { CSSTransitionGroup } from 'react-transition-group';
import '../App.css';
import {withRouter} from 'react-router-dom'


class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentScreen: resources.screens.login,
      userState: resources.userStates.notLoggedIn
    }
  }

  updateScreenState = (screenName) =>{
    this.setState({currentScreen: screenName});
  }

  handleLogin = (username, password) => {
    userLoginSocket({username: username, password: password})
  }

  handleCreateAccount = (username, password) => {
    userCreateAccountSocket({username: username, password: password});
  }

  componentDidMount(){
    signInToSocketEvents(this.onDisconnect, this.onUserLogin);
  }

  //When user disconnects
  onDisconnect = () => {
    this.setState({ userState: resources.userStates.notLoggedIn});
  }

  onUserLogin = (err) => {
      if(err){
        console.log(err);
      } else {
        //Sing in succeeded - switch to chat screen
        //And - change state to logged in
        this.setState({currentScreen: resources.screens.chat, 
          userState: resources.userStates.loggedIn});
        this.props.history.push(`/${resources.screens.chat}`);
      }
  }

  render() {
    //const currScreen = this.state.currentScreen;
    const {login, registration, chat} = resources.screens;
    const LoginProps = {
      handleLogin : this.handleLogin,
      updateScreenState : this.updateScreenState
    }

    const RegistrationProps = {
      handleCreateAccount : this.handleCreateAccount,
      updateScreenState : this.updateScreenState
    }
    
    return (
      
        <Switch >
          <Redirect exact from='/' to={`/${login}`}/>
          <Route exact path={`/${login}`} render = {() => (
            <Login {...LoginProps} />
          )}/>
          <Route path={`/${registration}`} render ={() => (
            <Registration {...RegistrationProps}  />
          )} />
          <Route path={`/${chat}`} component={Chat} />
        </Switch>
      
    );
  }
}


export default withRouter(withRoot(Index));
