﻿import * as React from 'react';
import * as ReactDOM from 'react-dom';
import produce from 'immer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { CssBaseline } from '@material-ui/core';
import {FM_METADATA} from './../store/modules/Main';
import Box from '@material-ui/core/Box';

interface DetailTextFieldProps {
  FM_METADATA? : FM_METADATA;
  handleOnChange : (name:any ,value : any) => void;
  crudFlag ?  : string;
};

const DetailTextField = ( {FM_METADATA,handleOnChange,crudFlag}  : DetailTextFieldProps ) => {

  return (
    <React.Fragment>
      <Grid item xs={6} md={6} lg={6}>
      <Box overflow ="auto">
        <Typography variant="h6" align ='center'>
          {FM_METADATA.COLUMNNAME || ''}
        </Typography>
        </Box>
      </Grid>
      <CssBaseline/>
      <Grid item xs={6} md={6} lg={6}>
        <TextField
        name = {FM_METADATA.COLUMNNAME || ''}
        required={FM_METADATA.ISREQUIRED==="Y" ? true : false} 
        label={FM_METADATA.ISREQUIRED==="Y" ? "Required" : "" }
        value={FM_METADATA.VALUE || ''}
        onChange={(e)=>{ 
          handleOnChange(e.target.name,e.target.value);
        }}
        disabled = {crudFlag==='READ' ? true : false}
        />
      </Grid>
    </React.Fragment>
  );
}

export default DetailTextField;

