import React, { Component } from 'react';
import {Toolbar, AppBar} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Typography, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
//import { CSSTransition } from 'react-transition-group';

var styles = theme =>({
    root: {
        width: '100%'
    },
    grow: {
        flexGrow: 1,
      },

});

class ChatAppBar extends Component{
    

    render(){
        const {classes, children, text} = this.props;

        return(
            <AppBar position = "static" color = "primary" className = {classes.root}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {text}
                    </Typography>
                    {children}
                </Toolbar>
            </AppBar>
        );
    }
}


ChatAppBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatAppBar);