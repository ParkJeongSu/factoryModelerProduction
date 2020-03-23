import produce from 'immer';


export interface Todo{
  id : number;
  task : string;
  checked : boolean;
}
export interface TodoListState {
  todoList : Todo[];
}


// 액션 타입 정의
const READ = 'TodoList/READ';
const CREATE = 'TodoList/CREATE';
const DELETE = 'TodoList/DELETE';
const CHECKED = 'TodoList/CHECKED';

interface ReadAction {
  type : typeof READ;
}
interface CreateAction {
  type : typeof CREATE;
  payload : {
    task : string;
  }
}
interface DeleteAction {
  type : typeof DELETE;
  payload : {
    id : number;
  }
}
interface CheckedAction {
  type : typeof CHECKED;
  payload : {
    id : number;
  }
}

export type TodoListActionTypes = ReadAction|CreateAction|DeleteAction|CheckedAction;

// **** 액션 생섬함수 정의

function readTodoList (){
  return {
    type : READ
  }
}
function createTodoList (todo: string){
  return {
    type : CREATE,
    todo : todo
  }
}
function deleteTodoList (id: number){
  return {
    type : DELETE,
    id : id
  }
}

function checkedTodoList (id: number){
  return {
    type : CHECKED,
    id : id
  }
}

export const actionCreators = {
  readTodoList,createTodoList,deleteTodoList,checkedTodoList
};

// **** 초기상태 정의
const initialState : TodoListState = {
    todoList : []
  };

// **** 리듀서 작성
export default function TodoList(state = initialState, action :TodoListActionTypes) {
  let todoList : Todo[] = [];
  switch (action.type) {
    case READ:
      try {
        todoList = (window as any).getTodoList();  
      } catch (error) {
        console.log('error : ',error);
      }
      return produce( state, draft =>{ draft.todoList = todoList });
    case CREATE:
      try {
        todoList = (window as any).createTodoList(action);
      } catch (error) {
        console.log('error : ',error);
      }
      return produce( state, draft =>{ draft.todoList = todoList });
    case DELETE:
      try {
        todoList = (window as any).deleteTodoList(action);  
      } catch (error) {
        console.log('error : ',error)
      }
      return produce( state, draft =>{ draft.todoList = todoList });
    case CHECKED:
      try {
        todoList = (window as any).checkedTodoList(action);
      } catch (error) {
        console.log('error : ',error)
      }
      return produce( state, draft =>{ draft.todoList = todoList });

    default:
      return state;
  }
}

