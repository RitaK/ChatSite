import React, { Component } from 'react';
import Chat from '../containers/Chat.js';
import Login from '../containers/Login';
import Registration from '../containers/Registration';
import 'typeface-roboto';
import withRoot from '../withRoot';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import resources from '../resources/default'
import {userLoginSocket, signInToSocketEvents, userCreateAccountSocket} from '../api'
//import { Router, IndexRoute, Route, browserHistory } from 'react-router';



const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentScreen: resources.screens.login,
      userState: resources.userStates.notLoggedIn
    }
  }

  handleScreenChange = (screenName) =>{
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
    this.setState({currentScreen: resources.screens.login, 
      userState: resources.userStates.notLoggedIn});
  }

  onUserLogin = (err) => {
      if(err){
        console.log(err);
      } else {
        //Sing in succeeded - switch to chat screen
        //And - change state to logged in
        this.setState({currentScreen: resources.screens.chat, 
          userState: resources.userStates.loggedIn});
      }
  }

  render() {
    const { classes } = this.props;
    const currScreen = this.state.currentScreen;
    const {login, registration, chat} = resources.screens;
    return (
      
        <div className={classes.root}>
          <header >
            
          </header>
            {currScreen === login && 
              <Login handleLogin = {this.handleLogin} 
                handleScreenChange = {this.handleScreenChange}/>}
            {currScreen === registration && 
              <Registration handleCreateAccount = {this.handleCreateAccount} 
                handleScreenChange = {this.handleScreenChange} />}
            {currScreen === chat && 
              <Chat />}
        </div>
      
      
    );
  }
}

Index.propTypes = {
  classes : PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
