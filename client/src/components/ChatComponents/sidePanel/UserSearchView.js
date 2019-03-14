
import React, { Component } from 'react';
import { List, InputBase, Paper, ListItem, ListItemText} from '@material-ui/core';
import SideViewBase from './SideViewBase'
import resources from '../../../resources/default'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

var styles = theme =>({
    input: {
        marginLeft: 8,
        flex: 1,
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

    }

    onSearchChange = (event) => {

    }

    render(){
        
        const {onSwitchView, classes} = this.props;
        const {usersResults} = this.state

        return(
            <SideViewBase onSwitchView = {onSwitchView} text={userSearch}
            content = { 
                <>
                    <Paper>
                        <InputBase onChange = {this.onSearchChange} className={classes.input} placeholder="Search for a user" />
                    </Paper>
                    <List>
                        {usersResults.map((user) => {
                            if(!user._id){
                                return false;
                            }
                            return <ListItem button divider
                                key = {user._id}>
                                <ListItemText
                                    primary={user.message}
                                    secondary = {user.sender}
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




