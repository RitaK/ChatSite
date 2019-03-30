import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar';
import {IconButton, Chip, MenuList, Paper, Grow, Popper, MenuItem, InputBase} from '@material-ui/core';
import {Search, AddCircle, Delete} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import resources from '../../../resources/default'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const popperStyle = {
    zIndex: 1
}

var styles = theme =>({
    inputExpand: {
        animation: 'expand 1s ease-in forwards',
        padding: '5px',
        'background-color': 'white',
        'border-radius': '20px'
    },
    searchSlide: {
        animation: 'slide 1s ease-in forwards',
    },
    '@keyframes expand': {
        '0%': {
            width: 0,
            //transform: 'translateX(0%)'
        },
        '100%': {
            width: '50%',
            //transform: 'translateX(96px)'
        }
     },
     '@keyframes slide': {
        '0%': {
            transform: 'translateX(0%)'
        },
        '100%': {
            transform: 'translateX(96px)'
        }
     },
     buttons:{
         float: 'right'
     }
});



const {userSearch, userProfile, newGroup} = resources.sidePanelViews;
const {newGroup: newGroupLabel, profile: profileLabel} = resources.labels

class ActionsAppBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            username : '',
            menuOpen: false,
            searchOpened: false
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

    openSearch = () =>{
        this.setState((state) => {
            return {searchOpened: !state.searchOpened}
        })
    }
    render(){
        const { menuOpen, searchOpened } = this.state;
        const {classes: {searchSlide, inputExpand, buttons}} = this.props;

        return(
            <ChatAppBar 
            buttons = {<>
                {searchOpened &&
                    <>
                        <InputBase type = "search" className = {inputExpand} onChange = {this.onSearchChange}  />
                    </>}
                <IconButton  aria-label="Search" color="inherit" onClick={(e) => this.openSearch()}>
                        <Search />
                </IconButton>
                <IconButton 
                    className = {buttons}
                    buttonRef={node => {
                    this.anchorEl = node;}} 
                    aria-owns={menuOpen ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                {!searchOpened && <>
                    <IconButton className = {buttons} onClick={(e) => this.switchView(userSearch)} aria-label="Add" color="inherit">
                        <AddCircle />
                    </IconButton>
                    <IconButton className = {buttons} aria-label="Delete" color="inherit">
                        <Delete />
                    </IconButton>
                </>}
                <Popper style = {popperStyle} open={menuOpen} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList>
                                <MenuItem  onClick={(e) => this.handleClose(e, newGroup) }>{newGroupLabel}</MenuItem>
                                <MenuItem  onClick={(e) => this.handleClose(e, userProfile) }>{profileLabel}</MenuItem>
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


ActionsAppBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ActionsAppBar);
