import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { CssBaseline } from '@material-ui/core';


interface DetailTextFieldProps {
};

const DetailTextField = ( {}  : DetailTextFieldProps ) => {
  return (
    <React.Fragment>
      <Grid item xs={6} md={6} lg={6}>
        <Typography variant="h6" align ='center'>
          h6. Heading
        </Typography>
      </Grid>
      <CssBaseline/>
      <Grid item xs={6} md={6} lg={6}>
        <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
      </Grid>
    </React.Fragment>
  );
}

export default DetailTextField;

