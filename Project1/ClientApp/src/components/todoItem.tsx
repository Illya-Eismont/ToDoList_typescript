import React from 'react';
import { Btn } from './btn';
import { TextToggle } from './textToggle';
import { ITodoItem, IUpdateTodoListAction } from '../store/todoList/types';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITodoList } from '../store/todoList/types';
import { updateTodoList } from '../store/todoList/actions';
import { editTodoItem, removeTodoItem } from '../webAPI/todoListAPI';

interface ITodoItemProps extends ITodoItem {
	updateTodoList: (todolist: ITodoList) => IUpdateTodoListAction;
}

function TodoItem(props: ITodoItemProps): JSX.Element{

	return (
		<li className="todo-item">
			<div className="checkbox-container">
					<input 
						type='checkbox' 
						onChange={async () => props.updateTodoList(await editTodoItem(props.id, props.text, !props.isDone))}
						checked={props.isDone}
					></input>

					<TextToggle
						editItem={async (text) => props.updateTodoList(await editTodoItem(props.id, text, props.isDone))}
						text={props.text}
					></TextToggle>
			</div>
			<Btn
				text="Remove"
				onClick={async () => props.updateTodoList(await removeTodoItem(props.id))}
				className="btn-remove btn"
			></Btn>
		</li>
	);
}




const mapDispatchToProps = (dispatch: Dispatch) => ({
	updateTodoList: (todoList: ITodoList) => dispatch(updateTodoList(todoList))
})

export default connect(null, mapDispatchToProps)(TodoItem)