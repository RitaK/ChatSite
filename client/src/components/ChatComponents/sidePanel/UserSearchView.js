
import React, { Component } from 'react';
import { List, InputBase, Paper, ListItem, ListItemText} from '@material-ui/core';
import SideViewBase from './SideViewBase'
import resources from '../../../resources/default'
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

const {userSearch} = resources.titles;

class UserSearchView extends Component{
    constructor(props){
        super(props);
        this.state= {
            searchText: '',
            usersResults: []
        }
    }

    componentDidMount(){
        registerToGetSearchedUsers((users) => {
            if(users){
                this.setState({usersResults: users});
            }
            
        })
    }

    onSearchChange = (event) => {
        setUsersSearch(event.target.value);
        this.setState({
            newMsgValue: event.target.value
        });
    }

    render(){
        
        const {onSwitchView, classes} = this.props;
        const {usersResults, newMsgValue} = this.state

        return(
            <SideViewBase onSwitchView = {onSwitchView} text={userSearch}
            content = { 
                <>
                    <Paper>
                        <InputBase value={newMsgValue} onChange = {this.onSearchChange} className={classes.input} placeholder="Search for a user" />
                    </Paper>
                    <List>
                        {usersResults.map((user) => {
                            if(!user._id || !user.username){
                                return false;
                            }
                            return <ListItem button divider
                                key = {user._id}>
                                <ListItemText
                                    primary={user.username}
                                    />
                                </ListItem>}
                            )}
                    </List>
                </>
                }/>
        );
    }
}

UserSearchView.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserSearchView);




