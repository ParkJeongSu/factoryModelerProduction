import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from "@material-ui/core/Collapse";
import LabelIcon from '@material-ui/icons/Label';
import {SideBar} from './../store/modules/Main';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    listIcon: {
        minWidth: '32px',
    },
    listText:{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    }
  });

    interface NestedListProps  {
        menuTitle : string,
        menuList? : SideBar[]
        checkedSideBar : (menuId :number) => void;
        clickSideBar : (sidebar :SideBar) => void;
    };
  
const NestedList = ({menuTitle , menuList,checkedSideBar,clickSideBar} : NestedListProps)=>{
    const classes = useStyles();
    return (
        <div>
            <List>
                <ListSubheader inset>{menuTitle}</ListSubheader>
            {undefined !== menuList &&
            menuList.map((item)=>{ return ( 
                <div key = {item.MENUID}>
                    <ListItem button onClick={(e)=>{checkedSideBar(item.MENUID);}}>
                        <ListItemText primary={item.MENUNAME} classes={{ root: classes.listText }} />
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
                                        <Box

                                        key={sidebar.MENUID}
                                        >
                                        <ListItem button key={sidebar.MENUID} onClick = {(e)=>{ clickSideBar(sidebar); }} >
                                            <ListItemIcon className={classes.listIcon}>
                                                <LabelIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={sidebar.MENUNAME} classes={{ root: classes.listText }}
                                            />
                                        </ListItem> 
                                        </Box>
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

