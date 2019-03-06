import React, { Component } from 'react';
import {Button, TextField, Paper, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Lock from '@material-ui/icons/Lock';

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
            username: 'username',
            password: 'password'
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }
    
    render(){
        const {classes} = this.props;
        return(
            <div>
                <Paper className = {classes.Paper} elevation = {4}>
                    <Grid container>
                        <Lock className = {classes.Lock} color = "primary"/>
                        <Typography className={classes.Typography} component="title" variant="h5" gutterBottom>
                        Login
                        </Typography>
                        <TextField className = {classes.TextField} 
                        fullWidth= {true} onChange={this.handleUsernameChange}
                        label="User Name" />
                        <TextField className = {classes.TextField} 
                        fullWidth= {true} onChange={this.handlePasswordChange}
                        label= "Password" type="Password" autoComplete="current-password"/>
                        <Grid item  sm= {4}>
                            <Button className = {classes.Button} variant="contained"
                            size="small" color="primary" fullWidth = {true}>
                                Login
                            </Button>
                        </Grid>
                        <Grid item sm= {3}>
                        </Grid>
                        <Grid item sm= {5} >
                            <Button className = {classes.Button} variant="text" 
                            color="primary" fullWidth = {true} size="small">
                                Create account
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div> 
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);