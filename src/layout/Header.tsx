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


import Dialog1 from './../component/Dialog1';
import Dialog2 from './../component/Dialog2';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface HeaderProps  {
  classes : any;
  title : string;
  open :boolean;
  LoginActions: typeof LoginActions;
  MainActions : typeof MainActions;
  onClick : () => void;
  };

  const options = [
    'FM_METADATA',
    'FM_MEATADATAHISTORY'
  ];
  const ITEM_HEIGHT = 48;
  
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
  const handleSettingFM_MEATADATAHISTORY = (tableName : string, historyTableName : string)=>{
    MainActions.settingFM_METADATAHISTORY(tableName,historyTableName);
  }
  const handleOnClick = ()=>{
    console.log('handleOnClick');
    onClick();
  }

  const [settingOpen, setsettingOpen] = React.useState(false);

  const handleClickOpen = () => {
    setsettingOpen(true);
  };

  const handleClose = () => {
    setsettingOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const hambergerOpen = Boolean(anchorEl);
  const [option, setOption] = React.useState('');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHamberGerClose = (optionName : string) => {
    setAnchorEl(null);
    handleClickOpen();
    setOption(optionName);
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
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={hambergerOpen}
        onClose={
          ()=>{
            setAnchorEl(null);
          }
        }
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '40ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={
            (e)=>{
              handleHamberGerClose(option);
            }
            }>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <IconButton color="inherit" onClick = {()=>{handleGoHOME();}}>
        <HomeIcon/>
      </IconButton>
      <IconButton color="inherit"  onClick = {()=>{ handleLogOut(); }}  >
        <ExitToAppIcon/>
      </IconButton>
    </Toolbar>
    <Dialog1 settingOpen={settingOpen && option==='FM_METADATA'} handleClose={handleClose} handleSettingFM_MEATADATA ={handleSettingFM_MEATADATA}/>
    <Dialog2 settingOpen={settingOpen && option==='FM_MEATADATAHISTORY'} handleClose={handleClose} handleSetting ={handleSettingFM_MEATADATAHISTORY}/>
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

