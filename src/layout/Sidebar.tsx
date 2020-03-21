import * as React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


// import NestedList from '../component/NestedList';

interface SidebarProps  {
  classes : any;
  open :boolean;
  };

  
const Sidebar = ({classes,open} : SidebarProps)=>{
    return (
        <Drawer
        variant="permanent"
        classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}
        open={open}
        >
        <div className={classes.toolbarIcon}>
          <IconButton >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {/* <NestedList menuTitle='Menu' menuList = {props.menuList} checkedMenu = {props.checkedMenu} clickSideBar ={props.clickSideBar}></NestedList> */}
        <Divider />
        {/* <NestedList menuTitle='Admin' menuList = {props.adminMenuList} checkedMenu = {props.checkedMenu}></NestedList> */}
      </Drawer>
    );
}



export default Sidebar;