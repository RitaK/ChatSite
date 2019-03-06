import React, { Component } from 'react';
import {Paper, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
    Icon: {
        width: '100%',
        'margin-bottom': theme.spacing.unit *2
    }
  });

class LoginRegistrationContainer extends Component{

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Paper className = {classes.Paper} elevation = {4}>
                    <Grid container>
                        {this.props.icon}
                        <Typography className={classes.Typography} component="title" variant="h5" gutterBottom>
                            {this.props.title}
                        </Typography>
                        {this.props.textFields}
                        {this.props.buttons}
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