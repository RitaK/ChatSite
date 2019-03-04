import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    
    overrides: {
        palette: {
            primary:  { main: purple[500] },
            secondary: green,
          },
        /* MuiButton: {
            label:{
                background: '#18202c'
            },
        }, */
    },
  });
  

  function withRoot(Component){
      function WithRoot(props){

        return (
            <MuiThemeProvider theme = {theme}>
                <CssBaseline/>
                <Component {...props} />
            </MuiThemeProvider>
        );
      }

      return WithRoot;
  }
  export default withRoot;