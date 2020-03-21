import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';

interface HeaderProps  {
  classes : any;
  title : string;
  open :boolean;
  };
  
const Header = ({classes , title,open} : HeaderProps) => {
  return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
    <Toolbar className={classes.toolbar}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
      >
        <MenuIcon />
      </IconButton>
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
        {title}
      </Typography>
      <IconButton color="inherit">
        <HomeIcon/>
      </IconButton>
      <IconButton color="inherit" >
        <ExitToAppIcon/>
      </IconButton>
    </Toolbar>
  </AppBar>
  );
}



export default Header;
