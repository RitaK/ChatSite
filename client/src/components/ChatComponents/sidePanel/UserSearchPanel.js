
import React, { Component } from 'react';
import { List, InputBase, Paper, ListItem, ListItemText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {registerToGetSearchedUsers, setUsersSearch} from '../../../api'

var styles = theme =>({
    input: {
        flex: 1,
        width: '100%'
    },
    grow: {
        flexGrow: 1,
      },
    inputPaper: {
        'padding-left': 8,
        'padding-right': 8
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
                this.setState((state) => {
                    let excludeUsers = this.props.excludeUsers || [] ;
                    return {originalUsersResults: users,
                         presentedUsersResults: this.cutCurrAndExcludedUsersFromSearch(excludeUsers, users)}
                });
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
        if(excludeUsers){
            this.cutCurrAndExcludedUsersFromSearch(excludeUsers)
        }
    }

    cutCurrAndExcludedUsersFromSearch = (excludeUsers, newUsersResults) => {
        let currUsername = sessionStorage ? sessionStorage.username : '';
        if(currUsername){
            this.setState((state) => {
                let filteredItems;
                let users = newUsersResults ?  newUsersResults : state.originalUsersResults;
                filteredItems = users.filter(function(user) {
                    //Check if this user is not already checked and if this is not the current user
                    let needsToBeExcluded = excludeUsers ? excludeUsers.includes(user.username) : false;
                    return !needsToBeExcluded &&
                        user.username !== currUsername
                })
                return {presentedUsersResults: filteredItems || this.cutCurrUserFromSearch(state.originalUsersResults)}
            });
        }
        /* let username = sessionStorage ? sessionStorage.username : '';
        let filteredItems;
        if(username){
            filteredItems = users.filter(function(user) {
                return user.username !== username
              })
        }
        return filteredItems || users; */
    }
    
    render(){
        
        const {classes, handleListItemClick} = this.props;
        const {presentedUsersResults} = this.state

        return(
        <>
            <Paper className={classes.inputPaper} >
                <InputBase type = "search" onChange = {this.onSearchChange} className={classes.input} placeholder="Search for a user" />
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




