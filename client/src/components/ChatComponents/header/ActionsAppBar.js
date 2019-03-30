import React, { Component } from 'react';
import ChatAppBar from './ChatAppBar';
import {IconButton, Chip, MenuList, Paper, Grow, Popper, MenuItem, InputBase} from '@material-ui/core';
import {Search, AddCircle, Delete} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import resources from '../../../resources/default'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import {setChatSearch} from '../../../api'




const popperStyle = {
    zIndex: 1
}

var styles = theme =>({
    inputExpand: {
        animation: 'expand 0.5s ease-in forwards'
    },
    searchInput: {
        'background-color': 'white',
        border: 'solid 1px #ccc',
        'border-radius': '10em',
        transition: 'all .5s',
        display: 'inline-flex',
        width: '48px',
        'padding-left': '7px',
        'padding-right': '7px',
        'margin-top': '7px',
        cursor: 'pointer'
    },
    '@keyframes expand': {
        '0%': {
            width: '48px'
        },
        '100%': {
            width: '50%'
        }
     },
     inputShrink:{
        animation: 'shrink 0.5s ease-in forwards'
     },
     '@keyframes shrink': {
        '0%': {
            width: '50%'
        },
        '100%': {
            width: '48px'
        }
     },
     buttons:{
         float: 'right'
     },
     searchBtn: {
         'margin-top': '7px'

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
            searchOpened: false,
            inputClasses: [props.classes.searchInput]
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

    openSearch = (e) =>{
        console.log(this.state.searchOpened);
        let {classes: {inputExpand, searchInput}} = this.props;
        if(!this.state.searchOpened){
            let searchInputClasses= [searchInput];
            searchInputClasses.push(inputExpand);
            this.setState({searchOpened: true, inputClasses: searchInputClasses})
        }
        
    }

    closeSearch = () =>{
        let {classes: {inputShrink, searchInput}} = this.props;
        this.setState((state) => {
            let searchInputClasses= [searchInput];
            searchInputClasses.push(inputShrink);
            return {searchOpened: false, inputClasses: searchInputClasses}
        })
    }

    onSearchChange = (event) =>{
        setChatSearch(event.target.value);
    }

    render(){
        const { menuOpen, searchOpened, inputClasses } = this.state;
        const {classes: {buttons, searchBtn}} = this.props;

        return(
            <ChatAppBar 
            buttons = {<>
                <Paper elevation ={0} className = {inputClasses.join(' ')} onFocus={this.openSearch}
                    onBlur={this.closeSearch}>
                        <Search className = {searchBtn} onClick={e => {this.openSearch(e)}}/>
                    <InputBase type = "search"  onChange = {this.onSearchChange}  />
                </Paper>
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
                {!searchOpened && 
                    <CSSTransition 
                        classNames = "fade"
                        in = {searchOpened}
                        timeout = {1000}
                        appear = {true}>
                        <>
                            <IconButton className = {buttons} onClick={(e) => this.switchView(userSearch)} aria-label="Add" color="inherit">
                                <AddCircle />
                            </IconButton>
                            <IconButton className = {buttons} aria-label="Delete" color="inherit">
                                <Delete />
                            </IconButton>
                        </>
                    </CSSTransition>}
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
