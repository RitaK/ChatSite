import React, { Component } from 'react';
import Chat from '../containers/Chat.js';
import Login from '../containers/Login';
import Registration from '../containers/Registration';
import 'typeface-roboto';
import withRoot from '../withRoot';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import resources from '../resources/default'


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
      currentScreen: resources.screens.login
    }
    this.handleScreenChange = this.handleScreenChange.bind(this);
  }

  handleScreenChange(screenName){
    this.setState({currentScreen: screenName});
  }

  handleLogin(){
    
  }

  handleCreateAccount(){

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
          {currScreen === chat && <Chat />}
        </div>
      
      
    );
  }
}

Index.propTypes = {
  classes : PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
