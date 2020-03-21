import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from "@material-ui/core/Collapse";

import LabelIcon from '@material-ui/icons/Label';


    interface sideBarList  {
        MENUID : number
        MENUNAME : string
        show : boolean
        children : Array<sideBarList>
        
    };
    interface NestedListProps  {
        menuTitle : string
        menuList : Array<sideBarList>
    };
  
const NestedList = ({menuTitle , menuList} : NestedListProps)=>{

    return (
        <div>
            <List>
                <ListSubheader inset>{menuTitle}</ListSubheader>
            {menuList.map((item)=>{ return ( 
                <div key = {item.MENUID}>
                    <ListItem button >
                        <ListItemText primary={item.MENUNAME}/>
                    </ListItem>
                    <Collapse
                        component="li"
                        in={item.show}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {
                            item.children.map(
                                (sidebar)=>{return (
                                <ListItem button key={sidebar.MENUID}>
                                    <ListItemIcon>
                                        <LabelIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={sidebar.MENUNAME} />
                                </ListItem>
                            );}
                            )}
                        </List>
                    </Collapse>
                </div>
            );})}
            </List>
        </div>           
    )

};

export default NestedList;

