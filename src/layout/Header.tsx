import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { StoreState } from '../store/modules';
import { RootState } from '../store/modules';
import {actionCreators as LoginActions} from '../store/modules/LogInOut';
import {actionCreators as MainActions} from '../store/modules/Main';
import {bindActionCreators} from 'redux';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface HeaderProps  {
  classes : any;
  title : string;
  open :boolean;
  LoginActions: typeof LoginActions;
  MainActions : typeof MainActions;
  onClick : () => void;
  };
  
const Header = ({classes , title,open, LoginActions,MainActions,onClick} : HeaderProps) => {
  const handleLogOut = ()=>{
    console.log('LogOut Button Click');
    LoginActions.logOut();
  }
  const handleGoHOME = ()=>{
    MainActions.goHome();
  }
  const handleSettingFM_MEATADATA = (tableName :string)=>{
    MainActions.settingFM_METADATA(tableName);
  }
  const handleOnClick = ()=>{
    console.log('handleOnClick');
    onClick();
  }

  const [settingOpen, setsettingOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleClickOpen = () => {
    setsettingOpen(true);
  };

  const handleClose = () => {
    setsettingOpen(false);
  };
  return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
    <Toolbar className={classes.toolbar}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick= {()=>{handleOnClick();} }
        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
      >
        <MenuIcon />
      </IconButton>
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
        {title}
      </Typography>
      <IconButton color="inherit" onClick = {()=>{handleClickOpen();}}>
        <SettingsIcon/>
      </IconButton>
      <IconButton color="inherit" onClick = {()=>{handleGoHOME();}}>
        <HomeIcon/>
      </IconButton>
      <IconButton color="inherit"  onClick = {()=>{ handleLogOut(); }}  >
        <ExitToAppIcon/>
      </IconButton>
    </Toolbar>
    <Dialog open={settingOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Setting FM_METADATA</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input TableName if you want to use Table in FactoryModeler
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Input FM_METADATA"
            fullWidth
            onChange = {(e)=>{ setValue(e.target.value); }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
            (e)=>{
              handleClose();
              setValue('');
            }} 
            color="primary">
            Cancel
          </Button>
          <Button 
            onClick={
              (e)=>{
                handleSettingFM_MEATADATA(value);
                handleClose();
                setValue('');
              }
            } 
            color="primary">
            Setting
          </Button>
        </DialogActions>
      </Dialog>
  </AppBar>
  );
}

const mapStateToProps = ({ LogInOut ,Main} : RootState) => ({
});

const mapDispatchToProps = (dispatch : any) => ({
  LoginActions : bindActionCreators(LoginActions,dispatch),
  MainActions :  bindActionCreators(MainActions,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);

