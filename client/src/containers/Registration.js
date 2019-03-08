import React, { Component } from 'react';
import { TextField} from '@material-ui/core';
import LoginRegistrationContainer from './LoginRegistrationContainer';
import Info from '@material-ui/icons/Lock';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LoginRegButtons from '../components/LoginComponents/LoginRegButtons'
import resources from '../resources/default'

const styles = theme => ({
    textField: {
        'margin-top': theme.spacing.unit * 2,
        'margin-bottom': theme.spacing.unit
    },
    info: {
        width: '100%',
        'margin-bottom': theme.spacing.unit *2
    }
  });

class Registration extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: {text: '', error: false},
            password: {text: '', error: false},
            passwordRetyped: {text: '', matchingError: false}
    
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

    handleCreateAccount = () => {
        if(this.validateInput()){
                this.props.handleCreateAccount(this.state.username.text, this.state.password.text);
            }
            else {
                alert("you did something wrong");
            }
    }

    handleSwitchLogin = () => {
        this.props.handleScreenChange(resources.screens.login);
    }

    validateInput = () => {
        const {username, password, passwordRetyped} = this.state;
        if(!username.error && !password.error 
            && !passwordRetyped.matchingError 
            && password.text !== '' 
            && username.text !== '')
            return true;
    }

    handleComparePasswords = (event) =>{
        let userPasswordRetpyed = event.target.value;
        let prevTypedPassword = this.state.password.text;
        if(userPasswordRetpyed === ''){
            this.setState({passwordRetyped:{text: userPasswordRetpyed, matchingError: false}})
        }else if(userPasswordRetpyed === prevTypedPassword){
            this.setState({passwordRetyped:{text: userPasswordRetpyed, matchingError: false}})
        }
        else{
            this.setState({passwordRetyped:{text: userPasswordRetpyed, matchingError: true}});
        }
    }

    render(){
        const {classes: {info, textField}} = this.props;
        const {username, password, passwordRetyped} = this.state;

        const createAccountTextProps = {
            className : textField,
            fullWidth: true,
            required : true
        }

        const usernameTextFieldProps = {
            onChange : this.handleUsernameChange,
            label: "User Name",
            value : username.text,
            error: username.error,
            autoComplete : "username"
        }
        const passTextFieldProps = {
            onChange : this.handlePasswordChange,
            label: "Password",
            type: "Password",
            value : password.text,
            autoComplete : "current-password"
        }
        const passRetypeTextFieldProps = {
            onChange : this.handleComparePasswords,
            label: "Retype Password",
            type: "Password",
            value : passwordRetyped.text,
            error : passwordRetyped.matchingError
        }
        return(
            <LoginRegistrationContainer
                handleSubmit = {this.handleCreateAccount} 
                title = {resources.titles.registration}
                icon = {<Info className={info} color="primary"/>}
                textFields = {
                    <>
                        <TextField {...createAccountTextProps} {...usernameTextFieldProps} />
                        <TextField {...createAccountTextProps} {...passTextFieldProps} />
                        <TextField {...createAccountTextProps} {...passRetypeTextFieldProps} />
                    </>
                }
                buttons = {
                    <LoginRegButtons 
                    onSecondaryClick = {this.handleSwitchLogin}
                    mainText = {resources.buttons.createAccount} secondaryText = {resources.buttons.login}
                    mainButtonLength = {8} secondaryButtonLength = {1}/>
                }
            />
        );
    }
}

Registration.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Registration);