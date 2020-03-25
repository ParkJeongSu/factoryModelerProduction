import * as React from 'react';
import { blueGrey } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listElementStyles: {
		color: blueGrey[700],
		fontSize: 18,
		lineHeight: '24px',
		flexGrow:1,
    },
    listElementCheckedStyles: {
		color: blueGrey[700],
		fontSize: 18,
		lineHeight: '24px',
		flexGrow:1,
		textDecoration: 'line-through',
    }
  })
);

interface TodoProps  {
	id :  number;
	todo : string;
	checked : boolean;
	handleDeleted : (id : number)=>void;
	handleChecked : (id : number)=>void;
  };
  
const Todo = ({id,todo,checked,handleDeleted,handleChecked} : TodoProps)=>{

	const handleCheck = (id : number) : void =>{
		handleChecked(id);
	};
	const handleRemove = (id : number) : void =>{
		handleDeleted(id);
	};
	const classes = useStyles();
	const listStyles = !checked ? classes.listElementStyles: classes.listElementCheckedStyles;

	return (

		<ListItem style={{ width: "90%" }}>
		<Container style={{display :"flex"}}>
			<div style={{flexGrow:1}}>
				<li className= {listStyles} >{todo}</li>
			</div>
			<IconButton onClick={()=>{ handleRemove(id); }}>
				<DeleteIcon/>
			</IconButton>
			<Checkbox checked = {checked} onClick={()=>{ handleCheck(id); }} />
		</Container>
        <Divider />
      </ListItem>

	);
}


export default Todo;