import * as React from 'react';
import Paper from '@material-ui/core/Paper';

//internal dependecies
import AddTodo from './AddTodo';
import TodoList, {Todos} from './TodoList';

interface ToDoListMainProps  {
  todos : Array<Todos>
  };
  
const ToDoListMain = ({todos} : ToDoListMainProps)=>{

  const handleClick = ()=>{

  }
  return (

    <Paper 
          style={{paddingBottom: '20px'}}
          >
          <div 
          style={{
            display: 'flex',    
          }}
          >
            <div style={{marginLeft: '44%'}}>
              <h1 style={{ textAlign: 'center', color: 'grey'}}>
                Todo List 
              </h1>
            </div>
          </div>
          <TodoList 
            todos={todos}
          />
          <br />
          <div style={{marginLeft: '5%'}}>
           <AddTodo handleClick={handleClick}/>
          </div>
        </Paper>

  );
}

export default ToDoListMain;