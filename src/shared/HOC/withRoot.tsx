import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { getTheme } from '../theme';
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';

function withRoot(Component: any) {
  function WithRoot(props: any) {
    const theme = {
      primaryColor: purple['600'],
      secondaryColor: orange['600']
    };
    return (
      <MuiThemeProvider theme={getTheme(theme)}>
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return connect(
    (state: ApplicationState) => ({
    })
  )(WithRoot);
}

export { withRoot };
