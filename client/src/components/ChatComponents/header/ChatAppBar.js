import React, { Component } from 'react';
import {Toolbar, AppBar} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Typography, Grid} from '@material-ui/core';
//import { CSSTransition } from 'react-transition-group';

var styles = theme =>({
    root: {
        width: '100%',
        'border-color': "#b2a59e",
        'border-left-style': "solid",
        'border-left-width': "1px",
        'max-height': '64px'
    },
    grow: {
        flexGrow: 1,
      },
    buttons:{
        width: '80%'
    }

});

class ChatAppBar extends Component{
    

    render(){
        const {classes, text, buttons, leftButtonOrIcon, additionalText} = this.props;
        
        return(
            <AppBar elevation = {0} position = "static" className = {classes.root}>
                <Toolbar>
                    {leftButtonOrIcon}
                    {additionalText}
                    <Typography variant="h6" className={classes.grow} color = "secondary">
                        {text}
                    </Typography>
                    <Grid className = {classes.buttons} item>
                        {buttons}
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}


ChatAppBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatAppBar);