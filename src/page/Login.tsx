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
import {actionCreators as LoginActions} from '../store/modules/LogInOut';
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
}
const Login = ( {LoginActions} : LoginProps)=>{
  const classes = useStyles();
  const handeLogin = ()=>{
    console.log('Login Button Click');
    LoginActions.logIn();
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
          <CustomAutocomplete data={[]}/>
          <CustomTextField name= 'host' label= 'host' value='1'/>
          <CustomTextField name= 'dbid' label= 'dbid' value='1'/>
          <CustomTextField name= 'dbpw' label= 'dbpw' value='1' type='password'/>
          <CustomAlert/>
          <CustomTextField name= 'userid' label= 'userid' value='1'/>
          <CustomTextField name= 'userpw' label= 'userpw' value='1' type='password'/>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <CustomButton  buttonName='Db Connect Test' className={classes.submit} handleClick={()=>{console.log('button Click');}}/>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton  buttonName='Save' className={classes.submit} handleClick={()=>{console.log('button Click');}}/>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton  buttonName='Delete' className={classes.submit} handleClick={()=>{console.log('button Click');}}/>
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
  
});

const mapDispatchToProps = (dispatch : any) => ({
  LoginActions : bindActionCreators(LoginActions,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);
