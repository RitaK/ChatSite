import React, { Component } from 'react';
import {Toolbar, AppBar} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//import { CSSTransition } from 'react-transition-group';

var styles = theme =>({
    root: {
        width: '100%'
    },

});

class ChatAppBar extends Component{
    

    render(){
        const {classes} = this.props;

        return(
            <AppBar position = "static" color = "primary" className = {classes.root}>
                <Toolbar>
                </Toolbar>
            </AppBar>
        );
    }
}


ChatAppBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatAppBar);