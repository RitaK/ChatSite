import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar';
import {IconButton, Chip, MenuList, Paper, Grow, Popper, MenuItem} from '@material-ui/core';
import {Search, AddCircle, Delete} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import resources from '../../../resources/default'


const popperStyle = {
    zIndex: 1
}

const {userSearch, userProfile} = resources.sidePanelViews;

class ActionsAppBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            username : '',
            menuOpen: false
        }
    }

    componentDidMount(){
        
    }

    componentDidUpdate(){
        
    }

    handleOpenUserProfile = () => {

    }

    handleToggle = () => {
        this.setState(state => ({ menuOpen: !state.menuOpen }));
      };

    handleClose = (event, viewName) => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ menuOpen: false });

        this.props.onSwitchView(viewName);
    };

    switchView = (viewName) =>{
        this.props.onSwitchView(viewName);
    }

    render(){
        const { menuOpen } = this.state;

        return(
            <ChatAppBar 
            buttons = {<>
                <IconButton aria-label="Search" color="inherit">
                    <Search />
                </IconButton>
                <IconButton onClick={(e) => this.switchView(userSearch)} aria-label="Add" color="inherit">
                    <AddCircle />
                </IconButton>
                <IconButton aria-label="Delete" color="inherit">
                    <Delete />
                </IconButton>
                <IconButton buttonRef={node => {
                    this.anchorEl = node;}} 
                    aria-owns={menuOpen ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Popper style = {popperStyle} open={menuOpen} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList>
                            <MenuItem  onClick={(e) => this.handleClose(e, userProfile) }>Profile</MenuItem>
                            <MenuItem value = {"logout"} onClick={this.handleClose}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
                </>}
                leftButtonOrIcon = {
                    <Chip
                        label={this.props.username} 
                        onClick={this.handleOpenUserProfile}/>
                }/>
                
        );
    }
}


export default ActionsAppBar;