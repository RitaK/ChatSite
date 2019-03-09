import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ActionsAppBar from './ActionsAppBar';
import ChatRoomAppBar from './ChatRoomAppBar';
//import { CSSTransition } from 'react-transition-group';

var styles = theme =>({

});

class ChatHeader extends Component{


    render(){
        return(
            <Grid container>
                <ChatRoomAppBar>

                </ChatRoomAppBar>
                <ActionsAppBar>
                    
                </ActionsAppBar>
            </Grid>
        );
    }
}


ChatHeader.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatHeader);