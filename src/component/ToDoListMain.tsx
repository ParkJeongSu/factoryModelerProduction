import * as React from 'react';
import Paper from '@material-ui/core/Paper';

//internal dependecies
import AddTodo from './AddTodo';
import TodoList, {Todos} from './TodoList';

interface ToDoListMainProps  {
  todos : Array<Todos>
  create: (todo : string ) => void;
  deleted : (id : number)=>void;
  checked : (id : number)=>void;
  read : ()=>void;
  };
  
const ToDoListMain = ({todos,create,deleted,checked,read} : ToDoListMainProps)=>{
  React.useEffect(()=>{
    console.log('ToDoListMain Mount 실행');
    read();
    return ()=>{
      console.log('ToDoListMain UnMount 실행');
    }
  },[])
  const handleClick = (todo : string)=>{
    create(todo);
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
          deleted = {deleted}
          checked = {checked}
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