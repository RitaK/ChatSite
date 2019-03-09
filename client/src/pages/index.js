import React, { Component } from 'react';
import Chat from '../containers/Chat.js';
import Login from '../containers/Login';
import Registration from '../containers/Registration';
import 'typeface-roboto';
import withRoot from '../withRoot';
import resources from '../resources/default'
import {emitUserLogin, registerToLoginLogoutEvents, emitUserCreateAccount} from '../api'
//import { /* Router, IndexRoute, Route, */  } from 'react-router';
import { Route, Switch, Redirect} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../App.css';
import {withRouter} from 'react-router-dom'
import '../App.css'
import {withSnackbar } from 'notistack';
import PropTypes from 'prop-types';


class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentScreen: resources.screens.login,
      userState: resources.userStates.notLoggedIn,
      username: ''
    }
  }

  updateScreenState = (screenName) =>{
    this.setState({currentScreen: screenName});
  }

  handleLogin = (username, password) => {
    emitUserLogin({username: username, password: password})
  }

  handleCreateAccount = (username, password) => {
    emitUserCreateAccount({username: username, password: password});
  }

  componentDidMount(){
    registerToLoginLogoutEvents(this.onDisconnect, this.onUserLogin);
  }

  //When user disconnects
  onDisconnect = () => {
    this.setState({ userState: resources.userStates.notLoggedIn});
    this.props.history.push(`/${resources.screens.login}`);
  }

  onUserLogin = (err, username) => {
      if(err){
        this.handleError(err);
      } else {
        //Sing in succeeded - switch to chat screen
        //And - change state to logged in
        this.setState({currentScreen: resources.screens.chat, 
          userState: resources.userStates.loggedIn,
            username: username});
        this.props.history.push(`/${resources.screens.chat}`);
      }
  }

  handleError = (err) => {
    this.props.enqueueSnackbar(err, { 
      variant: 'error' , 
      autoHideDuration: 2000, 
      anchorOrigin: { vertical: 'bottom', horizontal: 'left',}});
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
    
    const screensTransProps = {
      classNames : "fade",
      timeout: 1500,
      appear : true
    }

    const ChatProps = {
      handleError : this.handleError,
      username: this.state.username
    }

    return (    
      <Route render = {({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} {...screensTransProps}>
              <Switch key={ location.key } location={ location }>
                <Redirect exact from='/' to={`/${login}`}/>
                <Route exact path={`/${login}`} render = {() => (
                  <Login {...LoginProps} />
                )}/>
                <Route path={`/${registration}`} render ={() => (
                  <Registration {...RegistrationProps}  />
                )} />
                {this.state.userState === resources.userStates.loggedIn && 
                  <Route path={`/${chat}`} render = {() => (
                    <Chat {...ChatProps}/>
                  )} />}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}/>
    );
  }
}

Index.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withRouter(withRoot(Index)));
