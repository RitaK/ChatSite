
import React, { Component } from 'react';
import { List, InputBase, Paper, ListItem, ListItemText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {registerToGetSearchedUsers, setUsersSearch} from '../../../api'

var styles = theme =>({
    input: {
        marginLeft: 8,
        flex: 1,
        width: '100%'
    },
    grow: {
        flexGrow: 1,
      }

});

class UserSearchPanel extends Component{
    constructor(props){
        super(props);
        this.state= {
            originalUsersResults: [],
            presentedUsersResults: []
        }
    }

    componentDidMount(){
        registerToGetSearchedUsers((users) => {
            if(users){
                this.setState({originalUsersResults: users, presentedUsersResults: this.cutCurrUserFromSearch(users)});
            }
            
        });
        setUsersSearch('');
    }

    onSearchChange = (event) => {
        setUsersSearch(event.target.value);
    }

    componentWillReceiveProps(props){
        //If we get any users to exclude from the search list
        //And it's not ampty
        let {excludeUsers} = props;
        let currUsername = sessionStorage ? sessionStorage.username : '';
        if(excludeUsers && currUsername){
            this.setState((state) => {
                let filteredItems;
                
                filteredItems = state.originalUsersResults.filter(function(user) {
                    //Check if this user is not already checked and if this is not the current user
                    return !excludeUsers.includes(user.username) &&
                        user.username !== currUsername
                })
                return {presentedUsersResults: filteredItems || this.cutCurrUserFromSearch(state.originalUsersResults)}
            });
        }
    }

    cutCurrUserFromSearch = (users) => {
        let username = sessionStorage ? sessionStorage.username : '';
        let filteredItems;
        if(username){
            filteredItems = users.filter(function(user) {
                return user.username !== username
              })
        }
        return filteredItems || users;
    }
    
    render(){
        
        const {classes, handleListItemClick} = this.props;
        const {presentedUsersResults} = this.state

        return(
        <>
            <Paper>
                <InputBase onChange = {this.onSearchChange} className={classes.input} placeholder="Search for a user" />
            </Paper>
            <List>
                {presentedUsersResults.map((user) => {
                    if(!user._id || !user.username){
                        return false;
                    }
                    return <ListItem button divider
                        key = {user._id}
                        onClick={event => handleListItemClick(event, user.username)}>
                        <ListItemText
                            primary={user.username}
                            />
                        </ListItem>}
                    )}
            </List>
        </>
        );
    }
}

UserSearchPanel.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserSearchPanel);




