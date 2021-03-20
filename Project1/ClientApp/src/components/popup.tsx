import React , { useState } from 'react';
import { Btn } from './btn';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITodoList, IUpdateTodoListActionProps } from '../store/todoList/types';
import { updateTodoList } from '../store/todoList/actions';
import { addTodoItem } from '../webAPI/todoListAPI';



function Popup(props: IUpdateTodoListActionProps): JSX.Element {
	const [text, setText] = useState('');
	const [isView, setView] = useState(false);

	if(!isView){
		return <Btn text="Add" onClick={() => setView(!isView)} className="add-btn btn"></Btn>
	}

	return (
		<div className="popup">
			<div className="popup-content-container">
				<textarea  onChange={(event) => setText(event.currentTarget.value)}></textarea>
				<Btn 
					text="Save"
					onClick={async () => { setView(!isView); text.length && props.updateTodoList(await addTodoItem(text)) }}
					className="save-btn btn"
				></Btn>
				
				<Btn
					text="Cancel"
					onClick={() => setView(!isView)}
					className="cancel-btn btn"
				></Btn>
			</div>
		</div>
	);
}



const mapDispatchToProps = (dispatch: Dispatch) => ({
	updateTodoList: (todoList: ITodoList) => dispatch(updateTodoList(todoList))
})

export default connect(null, mapDispatchToProps)(Popup)