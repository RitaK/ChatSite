import React, { Component } from 'react';
import {Paper, InputBase} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

var styles = theme =>({
    msgText: {
        width: '100vw',
        marginLeft: 8,
        marginRight: 8,
        flex: 1
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
                <Paper>
                    <InputBase value={newMsgValue} onChange={this.handleNewMsgChange} className = {classes.msgText} />
                </Paper>
            
            </form>
        )
    }
}


TextArea.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(TextArea);