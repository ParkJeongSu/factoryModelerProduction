import * as React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NestedList from '../component/NestedList';
import {SideBar} from './../store/modules/Main';
import Box from '@material-ui/core/Box';
interface SidebarProps  {
  classes : any;
  open :boolean;
  onClick : () => void;
  checkedSideBar : (menuId :number) => void;
  clickSideBar : (sidebar :SideBar) => void;
  sidebarList : SideBar[];
  adminSidebarList : SideBar[];
  };

const Sidebar = ({classes,open,onClick,sidebarList,adminSidebarList,checkedSideBar,clickSideBar} : SidebarProps)=>{
  const handleOnClick = ()=>{
    console.log('handleOnClick');
    onClick();
  }
  const test : SideBar[] = [{
    "MENUID" : 0,
    "MENUNAME" :"skjfdnsjkfndskjfnjdsfndsnfjdsnjfdnsjfndjsnfjsdnfjdsf",
    "ISROOT"   :"Y",
    "POSITION" :0,
    "MENUTYPE" :"Normal",
    "PARENTMENUID" :null,
    "FM_METADATA" :null,
    "FM_POLICYMETADATA" :null,
    "ADMINFLAG" :"Y",
    "CHILDRENLIST" :[{  "MENUID" : 1,
    "MENUNAME" :"skjfdnsjkfndskjfnjdsfndsnfjdsnjfdnsjfndjsnfjsdnfjdsf2",
    "ISROOT"   :"N",
    "POSITION" :0,
    "MENUTYPE" :"Normal",
    "PARENTMENUID" :0,
    "FM_METADATA" :null,
    "FM_POLICYMETADATA" :null,
    "ADMINFLAG" :"Y",
    "CHILDRENLIST" :[],
    "SHOW" :true}],
    "SHOW" :true
  }];
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
        <Box display ={open===true ? "" : "none"}>
        <Divider />
        <NestedList menuTitle='Menu' menuList = {sidebarList} checkedSideBar = {checkedSideBar} clickSideBar = {clickSideBar} />
        <Divider />
        <NestedList menuTitle='Admin' menuList = {adminSidebarList} checkedSideBar = {checkedSideBar} clickSideBar = {clickSideBar}/>
        </Box>
        
      </Drawer>
    );
}



export default Sidebar;