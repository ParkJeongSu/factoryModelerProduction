import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { CssBaseline } from '@material-ui/core';
import Button from "@material-ui/core/Button";


import DetailAutocomplete from './DetailAutocomplete';
import DetailSelect from './DetailSelect';
import DetailTextField from './DetailTextField';

import {FM_METADATA} from './../store/modules/Main';
import produce from 'immer';

interface DetailInfoProps {
  FM_METADATALIST? : FM_METADATA[];
  handleOnChange : (name:any ,value : any) => void;
  crudFlag ?  : string;
  
  readSelectList : (FM_METADATA : FM_METADATA) => void;
  handleCreate : () => void;
  handleUpdate : () => void;
  handleDelete : () => void;
  handleCRUDFlag : (CRUDFlag :string) =>void;

};

const DetailInfo = ( {
  FM_METADATALIST,
  handleOnChange,
  crudFlag,
  handleCreate,
  readSelectList,
  handleUpdate,
  handleDelete,
  handleCRUDFlag
  
}  : DetailInfoProps ) => {
    React.useEffect(()=>{
      console.log('DetailInfo Mount 실행');
        return ()=>{
            console.log('DetailInfo unMount 실행');
        };
    });

  return (
    <form>
    <Paper>
      <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h4" align ='center'>
                Detail Info
              </Typography>
            </Grid>
            <CssBaseline/>

            <Grid item xs={4} md={4} lg={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick = {(e)=>{
                  e.preventDefault();
                  handleCRUDFlag('CREATE');
                }}
                >
                Create
              </Button>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick = {(e)=>{
                  e.preventDefault();
                  handleCRUDFlag('UPDATE');
                }}
                >
                Modifiy
              </Button>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick = {(e)=>{
                  e.preventDefault();
                  handleCRUDFlag('DELETE');
                }}
                >
                Delete
              </Button>
            </Grid>
            <CssBaseline/>

            { FM_METADATALIST!==null && FM_METADATALIST.map((item) =>{
              if(item.INPUTTYPE===null|| item.INPUTTYPE==="TEXT"){
                return (
                <DetailTextField 
                  key={item.COLUMNNAME} 
                  FM_METADATA = {item} 
                  handleOnChange ={handleOnChange}
                  crudFlag = {crudFlag}
                  />);
              }
              else if(item.INPUTTYPE==="SELECT"){
                return (
                <DetailSelect
                key={item.COLUMNNAME}
                FM_METADATA = {item} 
                handleOnChange ={handleOnChange}
                readSelectList = {readSelectList}
                crudFlag = {crudFlag}
                />);
              }else if(item.INPUTTYPE==="AUTOCOMPLETE"){
                return (<DetailAutocomplete/>);
              }
            }) }

            <Grid item xs={4} md={4} lg={4}>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick = {(e)=>{ 
                  e.preventDefault(); 
                  if(crudFlag === 'CREATE'){
                    handleCreate();
                  }
                  else if(crudFlag === 'UPDATE'){
                    handleUpdate();
                  }
                  else if(crudFlag === 'DELETE'){
                    handleDelete();
                  }
                  
                }}
                disabled = {crudFlag === 'READ'  ? true : false}
                >
                OK
              </Button>
            </Grid>
      </Grid>
      </Paper>
      </form>
  );
}

export default DetailInfo;

