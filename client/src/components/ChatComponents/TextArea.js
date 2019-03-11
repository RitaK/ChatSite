import React, { Component } from 'react';
import {TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

var styles = theme =>({
    msgText: {
        width: '100vw'
    }
});


class TextArea extends Component{

    
    constructor(props){
        super(props);
        this.state = {
            newMsgValue: ''
        }
    }

    handleNewMsgChange = (event) => {
        this.setState({
            newMsgValue: event.target.value
        });
    }

    onSend = (event) => {
        event.preventDefault();
        this.props.onSend(this.state.newMsgValue);
        this.setState({
            newMsgValue : ''
        });
        
    }

    render(){
        const {newMsgValue} = this.state;
        const {classes} = this.props;

        return(
            <form onSubmit={this.onSend} >
            <TextField value={newMsgValue} onChange={this.handleNewMsgChange} className = {classes.msgText}>
            </TextField>
            </form>
        )
    }
}


TextArea.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(TextArea);