import React, { Component } from 'react';
import {TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Lock from '@material-ui/icons/Lock';
//import GoogleLogin from 'react-google-login';
import LoginRegButtons from '../components/LoginComponents/LoginRegButtons';
import LoginRegistrationContainer from './LoginRegistrationContainer';
import resources from '../resources/default'


const styles = theme => ({
    root: {
      textAlign: 'center'
      //paddingTop: theme.spacing.unit * 14,
    },
    Paper: {
        margin: 'auto',
        'padding-top': theme.spacing.unit * 7,
        'padding-right': theme.spacing.unit * 5,
        'padding-bottom': theme.spacing.unit * 5,
        'padding-left': theme.spacing.unit * 5,
        maxWidth: 400
    },
    TextField: {
        'margin-top': theme.spacing.unit * 2,
        'margin-bottom': theme.spacing.unit
    },
    Button: {
        'margin-top': theme.spacing.unit * 2
    },
    Typography: {
        width: '100%'
    },
    Lock: {
        width: '100%',
        'margin-bottom': theme.spacing.unit *2
    }
  });

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: {text: '', error: false},
            password: {text: '', error: false}

        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSwitchCreateAccount = this.handleSwitchCreateAccount.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleUsernameChange(event){
        //Check for white spaces
        let regSpace = /\s/g;
        let userNameValue = event.target.value;
        if(regSpace.test(event.target.value)){
            this.setState({username:{text: userNameValue, error: true}})
        }
        else{
            this.setState({username: {text: userNameValue}});
        }
        
    }

    handlePasswordChange(event){
        this.setState({password: {text: event.target.value}});
    }

    handleLogin(){
        this.props.handleLogin(this.state.username.text, this.state.password.text);
    }

    handleSwitchCreateAccount(){
        this.props.handleScreenChange(resources.screens.registration);
    }
    

    render(){
        const {classes} = this.props;
        return(
            <LoginRegistrationContainer
                handleSubmit = {this.handleLogin} 
                title = {resources.titles.login}
                icon = {<Lock className = {classes.Lock} color = "primary"/>}
                textFields = {
                    <>
                        <TextField className = {classes.TextField} 
                        fullWidth= {true} onChange={this.handleUsernameChange}
                        label="User Name" value = {this.state.username.text}
                        error= {this.state.username.error} autoComplete="username" 
                        required = {true}/>
                        <TextField className = {classes.TextField} 
                        fullWidth= {true} onChange={this.handlePasswordChange}
                        label= "Password" type="Password" autoComplete="current-password"
                        value = {this.state.password.text} required = {true}/>
                    </>
                }
                buttons = {
                    <LoginRegButtons 
                    onSecondaryClick = {this.handleSwitchCreateAccount}
                    mainText = {resources.buttons.login} secondaryText = {resources.buttons.createAccount}
                    mainButtonLength = {3} secondaryButtonLength = {5}/>
                }
            />
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);