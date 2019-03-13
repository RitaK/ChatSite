import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar';
import {IconButton, Chip, MenuList, Paper, Grow, Popper, MenuItem} from '@material-ui/core';
import {Search, AddCircle, Delete} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const popperStyle = {
    zIndex: 1
}

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

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ menuOpen: false });
        if(event.target.value === "profile"){
            
        }else if(event.target.value === "logout"){

        }
    };

    render(){
        const { menuOpen } = this.state;

        return(
            <ChatAppBar 
            buttons = {<>
                <IconButton aria-label="Search" color="inherit">
                    <Search color="secondary"/>
                </IconButton>
                <IconButton aria-label="Search" color="inherit">
                    <AddCircle color="secondary"/>
                </IconButton>
                <IconButton aria-label="Delete" color="inherit">
                    <Delete color="secondary"/>
                </IconButton>
                <IconButton buttonRef={node => {
                    this.anchorEl = node;}} 
                    aria-owns={menuOpen ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    color="inherit" aria-label="Menu">
                    <MenuIcon color = "secondary"/>
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
                            <MenuItem value = {"profile"} onClick={this.handleClose}>Profile</MenuItem>
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