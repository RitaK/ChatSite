
import React, { Component } from 'react';
import SideViewBase from '../SideViewBase'
import UserSearchPanel from '../UserSearchPanel'
import resources from '../../../../resources/default'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { } from '../../../../api'
import {Chip, IconButton} from '@material-ui/core';
import {ArrowForward} from '@material-ui/icons';

var styles = theme =>({
    input: {
        marginLeft: 8,
        flex: 1,
        width: '100%'
    },
    grow: {
        flexGrow: 1,
    },
    chip: {
        margin: theme.spacing.unit,
    }

});

const {newGroup: newGroupTitle} = resources.titles;
//const {conversations: converstationsView, userSearch: userSearchView} = resources.sidePanelViews;

class NewGroupView extends Component{

    constructor(props){
        super(props);
        this.state = {
            newGroupParticipants: []
        }
    }

    handleListItemClick = (event, username) => {
        this.setState((state) => {
            let userInParticipantsList = state.newGroupParticipants.find(function(element) {
                return element === username;
              });
            if(!userInParticipantsList){
                return {newGroupParticipants : [...state.newGroupParticipants, username]}
            }
        });
    };


    handleDeleteParticipant = (username) =>{
        this.setState((state) => {
            let userInParticipantsList = state.newGroupParticipants.find(function(element) {
                return element === username;
              });
            if(userInParticipantsList){
                state.newGroupParticipants.splice( state.newGroupParticipants.indexOf(username), 1 );
                return {newGroupParticipants : state.newGroupParticipants}
            }
        });
    }
    
    createNewGroup = () => {

    }

    render(){
        
        const {onSwitchView, classes} = this.props;
        const {newGroupParticipants} = this.state;

        const userSearchPanelProps = {
            handleListItemClick: this.handleListItemClick,
            excludeUsers: newGroupParticipants
        }

        return(
            <SideViewBase onSwitchView = {onSwitchView} text={newGroupTitle}
            additionalInfo = {
                newGroupParticipants.map((username) => {
                        return <Chip
                                key = {username}
                                label= {username}
                                onDelete={event => this.handleDeleteParticipant(username)}
                                className={classes.chip}
                                />
                            }
                        )
            }
            content = { 
                <UserSearchPanel {...userSearchPanelProps}/>
            }
            footer = {
                newGroupParticipants.length > 0 &&
                    <IconButton color="inherit" onClick={(e) => this.createNewGroup()}>
                        <ArrowForward color= "primary"/>
                    </IconButton>}/>
        );
    }
}

NewGroupView.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewGroupView);




