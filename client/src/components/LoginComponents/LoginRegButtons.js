import React, { Component } from 'react';
import {Button, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    Button: {
        'margin-top': theme.spacing.unit * 2
    }
  });

class LoginRegButtons extends Component{
    constructor(props){
        super(props);

        this.handleSecondaryClick = this.handleSecondaryClick.bind(this);
        this.handleMainClick = this.handleMainClick.bind(this);
    }

    handleSecondaryClick (event){
        if(this.props.onSecondaryClick)
            this.props.onSecondaryClick();
    }

    handleMainClick (event){
        if(this.props.onMainClick)
            this.props.onMainClick();
    }

    render() {
        const { classes } = this.props;
        let secLen = this.props.secondaryButtonLength;
        let mainLen = this.props.mainButtonLength;
        return (
            <>
                <Grid item sm= {secLen} >
                    <Button className = {classes.Button} variant="text" 
                    color="primary" fullWidth = {true} size="small"
                    onClick = {this.handleSecondaryClick}>
                        {this.props.secondaryText}
                    </Button>
                </Grid>
                <Grid item sm= {12 - mainLen - secLen}>
                </Grid>
                <Grid item  sm= {mainLen}>
                    <Button className = {classes.Button} variant="contained"
                    size="small" color="primary" fullWidth = {true} onClick = {this.handleMainClick}>
                        {this.props.mainText}
                    </Button>
                </Grid>
            </>
        )
    };
}

LoginRegButtons.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginRegButtons);