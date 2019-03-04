import React, { Component } from 'react';
import {Button, TextField, Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
      textAlign: 'center',
      //paddingTop: theme.spacing.unit * 14,
    },
    Paper: {
        padding: theme.spacing.unit * 3,
        margin: 'auto',
        maxWidth: 400
    },
    TextField: {
        'margin-top': theme.spacing.unit * 2,
        'margin-bottom': theme.spacing.unit
    },
    Button: {
        'margin-top': theme.spacing.unit * 2
    }
  });

class Login extends Component{
    render(){
        const {classes} = this.props;
        return(
            <div>
                <Paper className = {classes.Paper} elevation = {4}>
                    <Typography component="h4" variant="display2" gutterBottom>
                    Login page
                    </Typography>
                    <TextField className = {classes.TextField} value={"bla"} fullWidth= {true}>
                        
                    </TextField>
                    <TextField className = {classes.TextField} value={"bla"} fullWidth= {true}>
                        
                    </TextField>
                    <Button className = {classes.Button} variant="contained" color="primary" fullWidth = {true}>
                        Login
                    </Button>
                </Paper>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);