import React from 'react';
import Popup from './popup';
import TodoItem from './todoItem';
import { connect } from 'react-redux';
import { updateTodoList } from '../store/todoList/actions';
import { ITodoList, ITodoListState, IUpdateTodoListAction } from '../store/todoList/types';
import { RootState } from '../store/configureStore';
import { Dispatch } from 'redux';
import { getTodoList } from '../webAPI/todoListAPI';

interface ITodoListProps extends ITodoListState {
	updateTodoList: (todolist: ITodoList) => IUpdateTodoListAction;
}

class TodoList extends React.Component<ITodoListProps, unknown> {
	
	async componentDidMount(){
		this.props.updateTodoList(await getTodoList());
	}
	
	render(){
		return (	
			<div className="todo-list-container">
				<Popup></Popup>
				<ul className="todo-list">
					{
						this.props.todoList.map((item) => {
								return(
									<TodoItem
										isDone={item.isDone}
										text={item.text}
										id={item.id}
										key={item.id}
									></TodoItem>
								);
							})
						}
				</ul>
			</div>
		);
	}
}

const mappropsToProps = (store: RootState) => {
	return {
		todoList: store.todoList
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	updateTodoList: (todoList: ITodoList) => dispatch(updateTodoList(todoList))
})

export default connect(mappropsToProps, mapDispatchToProps)(TodoList);
