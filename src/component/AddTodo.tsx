import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface AddTodoProps  {
	handleClick: () => void;
  };

  const AddTodo = ({handleClick} : AddTodoProps)=>{
	  const [inputValue,setInputValue] = React.useState('');

	  return (

		<div>
        <form id="myForm">
          <Paper style={{ width: "90%", marginLeft: "15px" }} z-index={1} >
            <div style={{ marginLeft: "10px" }}>
              <TextField
                placeholder="What needs to be done?"
                className="AddText"
                fullWidth={true}
				        onChange={e =>{ setInputValue(e.target.value); }}
				        value={inputValue}/>
            </div>
          </Paper>
          <br />
          <Button
            variant="contained"
            type="submit"
			      color="primary"			
            onClick={()=>{handleClick();}}
          >
            Add Todo
          </Button>
        </form>
      </div>

	  );
  }

  export default AddTodo;

