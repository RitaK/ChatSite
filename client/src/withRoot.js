import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
/* import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green'; */
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
        palette: {
            primary: {
              light: '#fff1ff',
              main: '#e1bee7',
              dark: '#af8eb5',
              contrastText: '#424242',
            },
            secondary: {
              light: '#ffffff',
              main: '#ffcdd2',
              dark: '#cb9ca1',
              contrastText: '#4e342e',
            },
            notConnected: {
              main: "#ff4444"
            }
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