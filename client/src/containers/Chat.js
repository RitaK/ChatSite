import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import SidePanel from '../components/ChatComponents/sidePanel/SidePanel'
import ChatPanel from '../components/ChatComponents/ChatPanel'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

var styles = theme =>({
    root: {
        height: '100vh'
    },

});

class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            refreshSideBarConversations : true,
            convIdToInc: ''
        }
    }

    updateNewMessageOnSidePanel = (convID) => {
        this.setState({refreshSideBarConversations: !this.state.refreshSideBarConversations, convIdToInc: convID})
    }

    render(){
        const {handleError, username, classes} = this.props;
        const {refreshSideBarConversations, convIdToInc} = this.state;

        const chatPanelProps = {
            handleError: handleError,
            username: username,
            updateNewMessageOnSidePanel: this.updateNewMessageOnSidePanel
        }

        const sidePanelProps = {
            handleError: handleError,
            username: username, 
            refreshSideBarConversations: refreshSideBarConversations, 
            convIdToInc: convIdToInc
        }
        
        return(
            <Grid container direction={'row'} className = {classes.root}>
                <SidePanel {...sidePanelProps}/>
                <ChatPanel {...chatPanelProps}/>
            </Grid>
            
        );
    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(Chat);