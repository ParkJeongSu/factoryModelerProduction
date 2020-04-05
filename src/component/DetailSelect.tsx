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
import {FM_METADATA} from './../store/modules/Main';
import Box from '@material-ui/core/Box';


interface DetailSelectProps {
  FM_METADATA? : FM_METADATA;
  handleOnChange : (name:any ,value : any) => void;
  readSelectList : (FM_METADATA : FM_METADATA) => void;
  crudFlag ?  : string;
};

const DetailSelect = ( {FM_METADATA,handleOnChange,readSelectList,crudFlag}  : DetailSelectProps ) => {  

  return (
    <React.Fragment>
            <Grid item xs={6} md={6} lg={6} >
            <FormControl style={{width: '100%'}} >
              <Box overflow ="auto">
              <Typography variant="h6" align ='center'>
                {FM_METADATA.COLUMNNAME || ''}
              </Typography>
              </Box>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <FormControl 
              required={FM_METADATA.ISREQUIRED==='Y' ? true : false}
              style={{width: '100%'}}
              disabled = { crudFlag==='READ' ? true : false}
              >
                {/* <InputLabel>{FM_METADATA.COLUMNNAME || ''}</InputLabel> */}
                <Select 
                name = {FM_METADATA.COLUMNNAME || ''}
                value = {FM_METADATA.VALUE || ''}
                onChange={(e)=>{ 
                  handleOnChange(e.target.name,e.target.value);
                }}
                onOpen = {(e)=>{ 
                  readSelectList(FM_METADATA);
                }}

                >
                  {
                    FM_METADATA.SELECTLIST === undefined ?
                    <MenuItem value ={FM_METADATA.VALUE}>{FM_METADATA.VALUE}</MenuItem> : false
                  }
                  { FM_METADATA.SELECTLIST !==undefined && FM_METADATA.SELECTLIST.map((option,index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
                {FM_METADATA.ISREQUIRED==='Y' ? <FormHelperText>Required</FormHelperText> : false}
              </FormControl>
            </Grid>

            <CssBaseline/>
    </React.Fragment>
  );
}



export default DetailSelect;

