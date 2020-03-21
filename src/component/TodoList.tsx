import * as React from 'react';
import List from '@material-ui/core/List';
import Todo from './Todo';

export interface Todos  {
  id : number,
  task : string,
  checked : boolean
  };

interface TodoListProps  {
	todos : Array<Todos>;
  };
  
  const TodoList = ({todos} : TodoListProps)=>{
    let todoNode = todos.map((todo) => {
      return (
        <Todo 
          key={ todo.id } 
          todo={ todo.task } 
          id = {todo.id}
          checked = { todo.checked }
        />
      )
    });

    return(
      <List style={{marginLeft: '5%'}}>
      <ul>{ todoNode }</ul>
    </List>
    )
  }

export default TodoList