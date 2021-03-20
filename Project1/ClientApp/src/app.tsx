import React  from 'react';
import { Provider } from 'react-redux';
import  TodoList  from './components/todoList';
import { store } from './store/configureStore';

export default function App(): JSX.Element {

	return (
		<div className="app">
			<Provider store={store}>
				<TodoList></TodoList>
			</Provider>
		</div>
	);
}