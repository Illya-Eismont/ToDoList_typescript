import { createStore } from 'redux'
import { todoListReducer } from './todoList/reducers';

export const store = createStore(todoListReducer);

export type RootState = ReturnType<typeof todoListReducer>;