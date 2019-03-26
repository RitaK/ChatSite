
import React, { Component } from 'react';
import SideViewBase from '../SideViewBase'
import UserSearchPanel from '../UserSearchPanel'
import resources from '../../../../resources/default'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getPrivateConversationWithUsers} from '../../../../api'

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

const {userSearch: userSearchTitle} = resources.titles;
const {conversations: converstationsView, userSearch: userSearchView} = resources.sidePanelViews;

class UserSearchView extends Component{


    handleListItemClick = (event, username) => {
        getPrivateConversationWithUsers([username]);
        this.props.onSwitchView(converstationsView);
    };

    
    render(){
        
        const {onSwitchView} = this.props;

        const userSearchPanelProps = {
            handleListItemClick: this.handleListItemClick
        }

        return(
            <SideViewBase onSwitchView = {onSwitchView} text={userSearchTitle}
            content = { 
                    <UserSearchPanel {...userSearchPanelProps}/>
                }/>
        );
    }
}

UserSearchView.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserSearchView);




