import * as React from 'react';
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Copyright from './../component/Copyright';

import CustomAlert from './../component/CustomAlert';
import CustomAutocomplete from './../component/CustomAutocomplete';
import CustomButton from './../component/CustomButton';
import CustomTextField from './../component/CustomTextField';


import { connect } from 'react-redux';
import { StoreState } from '../store/modules';
import {actionCreators as LoginActions, Dbconfig} from '../store/modules/LogInOut';
import {bindActionCreators} from 'redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 0),
    }
  }),
);

interface LoginProps {
  LoginActions: typeof LoginActions;
  name : string;
  host:string;
  dbid:string;
  dbpw:string;
  userid:string;
  userpw:string;
  dbconfigList :Dbconfig[];
  dbConnectTest : boolean;
}
const Login = ( {LoginActions,name,host,dbid,dbpw,userid,userpw,dbconfigList,dbConnectTest} : LoginProps)=>{
  React.useEffect(()=>{
    LoginActions.readDbConfig();
  },[]);
  const classes = useStyles();
  const handeLogin = ()=>{
    console.log('Login Button Click');
    LoginActions.logIn();
  }
  const hanedleChangeInputValue = (name : string,value:string)=>{
    console.log('hanedleChangeInputValue');
    LoginActions.changeInputValue(name,value);
  }
  const handleOnSelected = ( id? : number ) : void=>{
    console.log('handleOnSelected');
    LoginActions.selectedDbConfig(id);
  }
  const handleDbConnectTest = () : void=>{
    console.log('handleDbConnectTest');
    LoginActions.connectTest();
  }
  const handleSaveDbconfig = () : void=>{
    console.log('handleSaveDbconfig');
    LoginActions.saveDbConfig();
  }
  const handleDeleteDbconfig = () : void=>{
    console.log('handleDeleteDbconfig');
    LoginActions.deleteDbConfig();
  }
  React.useEffect(()=>{
    return ()=>{
        console.log('Login unMount 실행');
    };});
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <CustomAutocomplete name='name'  onChange={hanedleChangeInputValue} data={dbconfigList} onSelected={handleOnSelected}  value={name} />
          <CustomTextField name= 'host' onChange={hanedleChangeInputValue} label= 'host' value={host}/>
          <CustomTextField name= 'dbid' onChange={hanedleChangeInputValue} label= 'dbid' value={dbid}/>
          <CustomTextField name= 'dbpw' onChange={hanedleChangeInputValue} label= 'dbpw' value={dbpw} type='password'/>
          <CustomAlert result = {dbConnectTest}/>
          <CustomTextField name= 'userid' onChange={hanedleChangeInputValue} label= 'userid' value={userid}/>
          <CustomTextField name= 'userpw' onChange={hanedleChangeInputValue} label= 'userpw' value={userpw} type='password'/>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <CustomButton  buttonName='Db Connect Test' className={classes.submit} handleClick={()=>{handleDbConnectTest();}}/>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton  buttonName='Save' className={classes.submit} handleClick={()=>{handleSaveDbconfig();}}/>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton  buttonName='Delete' className={classes.submit} handleClick={()=>{handleDeleteDbconfig();}}/>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton  buttonName='Sign In' className={classes.submit} handleClick={()=>{handeLogin();}}/>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = ({ LogInOut } : StoreState) => ({
  dbconfigList : LogInOut.dbconfigList,
  name : LogInOut.name,
  host:LogInOut.host,
  dbid:LogInOut.dbid,
  dbpw:LogInOut.dbpw,
  userid:LogInOut.userid,
  userpw:LogInOut.userpw,
  dbConnectTest : LogInOut.dbConnectTest
});

const mapDispatchToProps = (dispatch : any) => ({
  LoginActions : bindActionCreators(LoginActions,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);
