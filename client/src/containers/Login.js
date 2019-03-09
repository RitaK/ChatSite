import React, { Component } from 'react';
import {TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Lock from '@material-ui/icons/Lock';
//import GoogleLogin from 'react-google-login';
import LoginRegButtons from '../components/LoginComponents/LoginRegButtons';
import LoginRegistrationContainer from './LoginRegistrationContainer';
import resources from '../resources/default'
import {withRouter} from 'react-router-dom'


const styles = theme => ({
    root: {
      textAlign: 'center'
    },
    paper: {
        margin: 'auto',
        'padding-top': theme.spacing.unit * 7,
        'padding-right': theme.spacing.unit * 5,
        'padding-bottom': theme.spacing.unit * 5,
        'padding-left': theme.spacing.unit * 5,
        maxWidth: 400
    },
    textField: {
        'margin-top': theme.spacing.unit * 2,
        'margin-bottom': theme.spacing.unit
    },
    button: {
        'margin-top': theme.spacing.unit * 2
    },
    typography: {
        width: '100%'
    },
    lock: {
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
    }

    handleUsernameChange = (event) => {
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

    handlePasswordChange = (event) => {
        this.setState({password: {text: event.target.value}});
    }

    handleLogin = () => {
        this.props.handleLogin(this.state.username.text, this.state.password.text);
    }

    handleSwitchCreateAccount = () =>{
        this.props.history.push(`/${resources.screens.registration}`);
        this.props.updateScreenState(resources.screens.registration);
    }
    

    render(){
        const {classes: {textField, lock}} = this.props;
        const {password, username} = this.state;
        const {buttons:buttonsText, titles: titlesText} = resources;

        const loginTextFieldProps = {
            className : textField,
            fullWidth : true,
            required : true
        }

        const loginButtonsProps = {
            onSecondaryClick : this.handleSwitchCreateAccount,
            mainText : buttonsText.login,
            secondaryText : buttonsText.createAccount,
            mainButtonLength : 3,
            secondaryButtonLength : 5
        }
        
        return(
            <LoginRegistrationContainer
                handleSubmit = {this.handleLogin} 
                title = {titlesText.login}
                icon = {<Lock className = {lock} color = "primary"/>}
                textFields = {
                    <>
                        <TextField {...loginTextFieldProps} onChange={this.handleUsernameChange}
                        label="User Name" value = {username.text}
                        error= {username.error} autoComplete="username" />
                        <TextField {...loginTextFieldProps} onChange={this.handlePasswordChange}
                        label= "Password" type="Password" autoComplete="current-password"
                        value = {password.text}/>
                    </>
                }
                buttons = {
                    <LoginRegButtons {...loginButtonsProps}
                    />
                }
            />
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Login));