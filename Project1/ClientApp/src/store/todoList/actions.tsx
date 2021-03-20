import { UPDATE_TODO_LIST, TodoListActionType, ITodoList } from './types';

export function updateTodoList(todoList: ITodoList): TodoListActionType {
	return {
		type: UPDATE_TODO_LIST,
		payload: todoList
	}
}
