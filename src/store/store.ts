import rootReducer,{StoreState} from './modules';
import { createStore,Store } from 'redux';
const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export default function configStore() : Store<StoreState>{
    const store = createStore(rootReducer,devTools);
    return store;
}