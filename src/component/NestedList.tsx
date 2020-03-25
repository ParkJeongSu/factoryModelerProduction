import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from "@material-ui/core/Collapse";
import LabelIcon from '@material-ui/icons/Label';
import {SideBar} from './../store/modules/Main';


    interface NestedListProps  {
        menuTitle : string,
        menuList? : SideBar[]
        checkedSideBar : (menuId :number) => void;
        clickSideBar : (sidebar :SideBar) => void;
    };
  
const NestedList = ({menuTitle , menuList,checkedSideBar,clickSideBar} : NestedListProps)=>{

    return (
        <div>
            <List>
                <ListSubheader inset>{menuTitle}</ListSubheader>
            {undefined !== menuList &&
            menuList.map((item)=>{ return ( 
                <div key = {item.MENUID}>
                    <ListItem button onClick={(e)=>{checkedSideBar(item.MENUID);}}>
                        <ListItemText primary={item.MENUNAME}/>
                    </ListItem>
                    <Collapse
                        component="li"
                        in={item.SHOW}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {
                            item.CHILDRENLIST.map(
                                (sidebar)=>{
                                    return (
                                        <ListItem button key={sidebar.MENUID} onClick = {(e)=>{ clickSideBar(sidebar); }} >
                                            <ListItemIcon>
                                                <LabelIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={sidebar.MENUNAME} />
                                        </ListItem> 
                                        );
                                    })
                            }
                        </List>
                    </Collapse>
                </div>
            );})}
            </List>
        </div>           
    )

};

export default NestedList;

