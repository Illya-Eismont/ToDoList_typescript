import {
	ITodoListState,
	TodoListActionType,
	UPDATE_TODO_LIST
} from './types';

const InitialState: ITodoListState = {
	todoList: []
}

export function todoListReducer(state = InitialState, action: TodoListActionType): ITodoListState {
	switch(action.type){
		case UPDATE_TODO_LIST: 
			return {...state, todoList: action.payload};
		default: 
			return state;
	}
}