
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
            usersResults: []
        }
    }

    componentDidMount(){
        registerToGetSearchedUsers((users) => {
            if(users){
                this.setState({usersResults: this.cutCurrUserFromSearch(users)});
            }
            
        });
        setUsersSearch('');
    }

    onSearchChange = (event) => {
        setUsersSearch(event.target.value);
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
        const {usersResults} = this.state

        return(
        <>
            <Paper>
                <InputBase onChange = {this.onSearchChange} className={classes.input} placeholder="Search for a user" />
            </Paper>
            <List>
                {usersResults.map((user) => {
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




