import { combineReducers } from 'redux';
import LogInOut,{LogInOutState} from './LogInOut';

export interface StoreState {
    LogInOut : LogInOutState;
}

export default combineReducers<StoreState>({
    LogInOut,
    // 다른 리듀서를 만들게되면 여기에 넣어줌..
});