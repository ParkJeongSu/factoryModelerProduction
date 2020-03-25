import * as React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NestedList from '../component/NestedList';
import {SideBar} from './../store/modules/Main';

interface SidebarProps  {
  classes : any;
  open :boolean;
  onClick : () => void;
  clickSideBar : (menuId :number) => void;
  sidebarList : SideBar[];
  adminSidebarList : SideBar[];
  };

const Sidebar = ({classes,open,onClick,sidebarList,adminSidebarList,clickSideBar} : SidebarProps)=>{
  const handleOnClick = ()=>{
    console.log('handleOnClick');
    onClick();
  }
    return (
        <Drawer
        variant="permanent"
        classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}
        open={open}
        >
        <div className={classes.toolbarIcon}>
          <IconButton onClick= {()=>{handleOnClick();}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <NestedList menuTitle='Menu' menuList = {sidebarList} clickSideBar = {clickSideBar}/>
        <Divider />
        <NestedList menuTitle='Admin' menuList = {adminSidebarList} clickSideBar = {clickSideBar}/>
      </Drawer>
    );
}



export default Sidebar;