import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Login extends Component{
    render(){

        return(
            <div>
                <h1>Login page</h1>
                <Button variant="contained" color="primary">
                    Hello world
                </Button>
            </div>
        );
    }
}

export default Login;