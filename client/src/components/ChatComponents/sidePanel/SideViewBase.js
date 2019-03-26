
import React, { Component } from 'react';
import {Grid, IconButton, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ArrowBack from '@material-ui/icons/ArrowBack';
import resources from '../../../resources/default'

var styles = theme =>({
    topPanel: {
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
    },
    footerGrid: {
        height: '10vh',
        display: 'flex',
        'vertical-align': 'middle',
        'align-items': 'center',
        'justify-content': 'center'
    },
    additionalInfo: {
        overflow: 'scroll',
        'max-height': theme.spacing.unit * 12
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
                {
                    this.props.additionalInfo && 
                    <Grid item className = {classes.additionalInfo}>
                        {this.props.additionalInfo}
                    </Grid>
                }
                <Grid item className = {classes.contentGrid}>
                    {content}
                </Grid>
                {
                    this.props.footer && 
                    <Grid item className = {classes.footerGrid}>
                        {this.props.footer}
                    </Grid>
                }
                
            </Grid>
        );
    }
}

SideViewBase.propTypes = {
    classes: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired
}

export default withStyles(styles)(SideViewBase);



