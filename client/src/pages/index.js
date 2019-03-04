import React, { Component } from 'react';
import Chat from '../containers/Chat.js';
import Login from '../containers/Login';
import Registration from '../containers/Registration';
import 'typeface-roboto';
import withRoot from '../withRoot';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginScreen: true,
      registrationScreen: false,
      chatScreen: false
    }
  }
  render() {

    const {classes } = this.props;

    return (
      
        <div className={classes.root}>
          <header >
            
          </header>
          {this.state.loginScreen && <Login />}
          {this.state.registrationScreen && <Registration />}
          {this.state.chatScreen && <Chat />}
        </div>
      
      
    );
  }
}

Index.propTypes = {
  classes : PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
