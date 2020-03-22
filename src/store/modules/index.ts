import { combineReducers } from 'redux';
import LogInOut,{LogInOutState} from './LogInOut';
import TodoList,{TodoListState} from './TodoList'

export interface StoreState {
    LogInOut : LogInOutState;
    TodoList : TodoListState;
}
const rootReducer = combineReducers({
    LogInOut,
    TodoList,
    // 다른 리듀서를 만들게되면 여기에 넣어줌..
});

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>