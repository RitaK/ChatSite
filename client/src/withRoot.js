import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
/* import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green'; */
import CssBaseline from '@material-ui/core/CssBaseline';
//import {red, amber} from '@material-ui/core/colors'


const theme = createMuiTheme({
        palette: {
            primary: {
              light: '#9be7ff',
              main: '#64b5f6',
              dark: '#2286c3',
              contrastText: '#0d47a1',
            },
            secondary: {
              light: '#b2fef7',
              main: '#80cbc4',
              dark: '#4f9a94',
              contrastText: '#263238',
            },
            type: 'light',
          },
        typography: {
            useNextVariants: true,
          }
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