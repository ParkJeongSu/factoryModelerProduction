﻿import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Copyright from './../component/Copyright';
import ToDoListMain from '../component/ToDoListMain';
import NomalTable from '../component/NomalTable';
import {actionCreators as ToDoActions, Todo} from '../store/modules/TodoList';
import DetailInfo from  '../component/DetailInfo';
import {FM_METADATA} from './../store/modules/Main';
// import Paper from '@material-ui/core/Paper';



interface ContentProps  {
  classes : any
  todoList : Todo[]
  create: (todo : string ) => void;
  deleted : (id : number)=>void;
  checked : (id : number)=>void;
  read : ()=>void;
  clickRowData : (rowData : any) => void;
  columnList? : [];
  dataList? : [];
  FM_METADATALIST : FM_METADATA[];
  handleOnChange : (name:any ,value : any) => void;
  
  importExcel : () => void ;
  readSelectList : (FM_METADATA : FM_METADATA) => void;
  handleCreate : () => void;
  handleUpdate : () => void;
  handleDelete : () => void;
  handleCRUDFlag : (CRUDFlag :string) =>void;
  crudFlag ?  : string;
  isHome : boolean;
  };

const Content = ({ 
  classes ,
  todoList,
  create,
  checked,
  deleted ,
  read,
  columnList
  ,dataList,
  clickRowData,
  FM_METADATALIST,
  handleOnChange,
  handleCreate,
  importExcel,
  readSelectList,
  handleUpdate,
  handleDelete,
  handleCRUDFlag,
  crudFlag,
  isHome
} : ContentProps)=> {

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {
            isHome === true ?   
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <ToDoListMain todos={todoList} read= {read} create={create} deleted = {deleted} checked ={checked} />
              </Grid>
            </Grid>
            : 
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <NomalTable columnList={columnList} dataList = {dataList} clickRowData= {clickRowData} importExcel = {importExcel}/>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <DetailInfo 
                FM_METADATALIST={FM_METADATALIST} 
                handleOnChange ={handleOnChange} 
                handleCreate={handleCreate} 
                readSelectList = {readSelectList}
                handleUpdate = {handleUpdate}
                handleDelete ={handleDelete}
                handleCRUDFlag = {handleCRUDFlag} 
                crudFlag = {crudFlag}
                />
              </Grid>
            </Grid>
          }

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  }

  export default Content;