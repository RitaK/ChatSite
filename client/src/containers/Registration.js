import React, { Component } from 'react';
import { TextField} from '@material-ui/core';
import LoginRegistrationContainer from './LoginRegistrationContainer';
import Info from '@material-ui/icons/Lock';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LoginRegButtons from '../components/LoginComponents/LoginRegButtons'

const styles = theme => ({
    TextField: {
        'margin-top': theme.spacing.unit * 2,
        'margin-bottom': theme.spacing.unit
    },
    Info: {
        width: '100%',
        'margin-bottom': theme.spacing.unit *2
    }
  });

class Registration extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: {text: '', error: false},
            password: {text: '', error: false}
    
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleCreateNewAccount = this.handleCreateNewAccount.bind(this);
        this.handleLoginInstead = this.handleLoginInstead.bind(this);
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

    handleCreateNewAccount(){
        //this.props.handleScreenChange(this.state.username.text, this.state.password.text);
    }

    handleLoginInstead(){
        //this.props.handleScreenChange(this.state.username.text, this.state.password.text);
    }

    render(){
        const {classes} = this.props;
        return(
            <LoginRegistrationContainer
                title = {"Create an Account"}
                icon = {<Info className={classes.Info} color="primary"/>}
                textFields = {
                    <>
                        <TextField className = {classes.TextField} 
                        fullWidth= {true} onChange={this.handleUsernameChange}
                        label="User Name" value = {this.state.username.text}
                        error= {this.state.username.error} />
                        <TextField className = {classes.TextField} 
                        fullWidth= {true} onChange={this.handlePasswordChange}
                        label= "Password" type="Password" autoComplete="current-password"
                        value = {this.state.password.text} />
                    </>
                }
                buttons = {
                    <LoginRegButtons onMainClick = {this.handleCreateNewAccount} 
                    onSecondaryClick = {this.handleLoginInstead}
                    mainText = {"Create New Account"} secondaryText = {"Login"}
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