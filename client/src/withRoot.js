import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
        palette: {
            primary:  {main:pink['A100']},
            secondary: green,
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