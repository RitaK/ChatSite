import React, { Component } from 'react';
import {Paper, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
    },
    Paper: {
        margin: 'auto',
        'padding-top': theme.spacing.unit * 7,
        'padding-right': theme.spacing.unit * 5,
        'padding-bottom': theme.spacing.unit * 5,
        'padding-left': theme.spacing.unit * 5,
        maxWidth: 400
    },
    Typography: {
        width: '100%'
    },
    form: {
        display: 'contents'
    }
  });

class LoginRegistrationContainer extends Component{

    handleSubmit = (event) => {
        this.props.handleSubmit();
        event.preventDefault();
    }

    render(){
        const {classes, icon, title, textFields, buttons} = this.props;
        return(
            <div className = {classes.root}>
                <Paper className = {classes.Paper} elevation = {4}>
                    <Grid container>
                        <form onSubmit={this.handleSubmit} className= {classes.form}>
                            {icon}
                            <Typography className={classes.Typography} component="title" variant="h5" gutterBottom>
                                {title}
                            </Typography>
                            {textFields}
                            {buttons}
                        </form>
                        
                    </Grid>
                </Paper>
            </div> 
        );
    }
}

LoginRegistrationContainer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginRegistrationContainer);