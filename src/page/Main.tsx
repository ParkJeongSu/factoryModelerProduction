﻿import * as React from 'react';
import clsx from 'clsx';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Content from '../layout/Content';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { connect } from 'react-redux';
// import { StoreState } from '../store/modules';
import { RootState } from '../store/modules';
import {actionCreators as ToDoActions, Todo} from '../store/modules/TodoList';
import {actionCreators as MainActions} from '../store/modules/Main';
import {bindActionCreators} from 'redux';
import {SideBar} from './../store/modules/Main';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  })
);


interface MainProps {
  ToDoActions: typeof ToDoActions;
  MainActions : typeof MainActions;
  todoList : Todo[];
  sidebarList : SideBar[];
  adminSidebarList : SideBar[];

}

const  Main = ({MainActions,ToDoActions,todoList,sidebarList,adminSidebarList} : MainProps)=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  React.useEffect(()=>{
      console.log('Main Mount 실행');
      MainActions.readSideBar();
    return ()=>{
        console.log('Main unMount 실행');
    };
  },[]);

  const handleClickSideBar = (menuID : number) : void =>{
    MainActions.clickSideBar(menuID);
  }

  const handelReadTodoList = () : void =>{
    ToDoActions.readTodoList();
  }
  const handlCreateTodo= (todo : string) :void =>{
    ToDoActions.createTodoList(todo);
  }
  const handleDeleteTodo = (id : number) : void =>{
    ToDoActions.deleteTodoList(id);
  }
  const handleCheckedTodo = (id : number) : void =>{
    ToDoActions.checkedTodoList(id);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header classes={classes} open={open} onClick={handleDrawerOpen} title='Sample'/>
        <Sidebar classes={classes} open ={open} onClick={handleDrawerClose} sidebarList = {sidebarList} adminSidebarList ={adminSidebarList} clickSideBar = {handleClickSideBar}/>
        <Content classes={classes} todoList = {todoList} read = {handelReadTodoList} create={handlCreateTodo} checked={handleCheckedTodo} deleted = {handleDeleteTodo} />
      </div>
    );
  }


  const mapStateToProps = ({ TodoList,Main } : RootState) => ({
    todoList : TodoList.todoList,
    sidebarList : Main.menuList,
    adminSidebarList : Main.adminMenuList 
  });
  
  const mapDispatchToProps = (dispatch : any) => ({
    ToDoActions : bindActionCreators(ToDoActions,dispatch),
    MainActions :  bindActionCreators(MainActions,dispatch)
  });

  export default connect(mapStateToProps,mapDispatchToProps)(Main);
