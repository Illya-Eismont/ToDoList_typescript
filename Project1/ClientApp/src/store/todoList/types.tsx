export interface ITodoItem {
	id: string,
	isDone: boolean,
	text: string,
}

export interface ITodoList extends Array<ITodoItem>{}

export interface ITodoListState {
	todoList: ITodoList
}

export const UPDATE_TODO_LIST = 'UPDATE_TODO_LIST';

export interface IUpdateTodoListAction {
	type: typeof UPDATE_TODO_LIST,
	payload: ITodoList
}

export interface IUpdateTodoListActionProps {
	updateTodoList: (todolist: ITodoList) => IUpdateTodoListAction;
}

export type TodoListActionType = IUpdateTodoListAction;