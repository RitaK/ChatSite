import React, { Component } from 'react';
import {Grid, List, ListItem, ListItemText} from '@material-ui/core';
import {getAllUserConversations, registerToMessageEvents} from '../../api'
import ActionsAppBar from './header/ActionsAppBar'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

var styles = theme =>({
    root: {
        width: '40%'
    },

});

class SidePanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            conversations: []
        }
    }
    componentWillMount(){
        //On getting the conversations
        registerToMessageEvents((err, conversations) => {
            if(err){
                this.props.handleError(err);
            } else{
                this.setState({conversations: conversations});
            }
        });

        getAllUserConversations(this.props.username);
    }
    render(){
        const {conversations} = this.state;
        const {classes} = this.props;

        
        return(
            <>
                <Grid item className = {classes.root}>
                    <ActionsAppBar>

                    </ActionsAppBar>
                    <List>
                        {conversations.map((conv) => 
                            <ListItem key = {conv._id}>
                                <ListItemText
                                    primary={conv.groupName}
                                    secondary = {conv.usernamesInConv}
                                    />
                            </ListItem>)}
                    </List>
                </Grid>
            </>
        );
    }
}

SidePanel.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(SidePanel);