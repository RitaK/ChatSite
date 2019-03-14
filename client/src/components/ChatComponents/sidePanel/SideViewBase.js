
import React, { Component } from 'react';
import {Grid, IconButton, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ArrowBack from '@material-ui/icons/ArrowBack';
import resources from '../../../resources/default'

var styles = theme =>({
    topPanel: {
        'background-color': '#54b4bc',
        height: '10vh',
        display: 'flex',
        'vertical-align': 'middle',
        'align-items': 'center'
    },
    grow: {
        flexGrow: 1,
      },
    contentGrid:{
        padding: "10px"
    }

});

const {conversations} = resources.sidePanelViews;

class SideViewBase extends Component{

    backToConvs = () =>{
        this.props.onSwitchView(conversations);
    }

    render(){
        
        const {classes, content, text} = this.props;
        return(
            <Grid container direction={'column'}>
                <Grid item className= {classes.topPanel}>
                    <IconButton aria-label="Back" color="inherit" onClick={(e) => this.backToConvs()}>
                        <ArrowBack color= "primary"/>
                    </IconButton>
                    <Typography variant="h6" className={classes.grow} color = "primary">
                        {text}
                    </Typography>
                </Grid>
                <Grid item className = {classes.contentGrid}>
                    {content}
                </Grid>
            </Grid>
        );
    }
}

SideViewBase.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SideViewBase);



