import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


interface DetailSelectProps {
};

const DetailSelect = ( {}  : DetailSelectProps ) => {

  return (
    <React.Fragment>
        <Grid item xs={6} md={6} lg={6}>
            <FormControl required style={{width: '100%'}}>
              <Typography variant="h6" align ='center'>
                h6. Heading
              </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <FormControl required style={{width: '100%'}}>
                <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                <Select>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            <CssBaseline/>
    </React.Fragment>
  );
}



export default DetailSelect;

