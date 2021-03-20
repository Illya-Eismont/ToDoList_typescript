import { ITodoList } from "../store/todoList/types";
import { baseUrl } from "./baseUrl";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { todoItemFragment } from "./fragments";

const client = new ApolloClient({
    uri: baseUrl, 
		cache: new InMemoryCache(),
});


export async function getTodoList(): Promise<ITodoList> {
	let res = await client.query({
		query: gql`
		${todoItemFragment}
		{
			todoItems(order: {isDone: ASC}){
				...TodoItem
			}
		}
		`
	});
	
	return  res.data.todoItems || [];
}

export async function editTodoItem(id: string, text: string, isDone: boolean): Promise<ITodoList> {
	const res = await client.mutate({
		mutation: gql`
		${todoItemFragment}
		mutation updateTodoItem($id: String!, $text: String!, $isDone: Boolean!){
			updateTodoItem(
					id: $id,
					text: $text,
					isDone: $isDone,
					order: {isDone: ASC}
			){
				...TodoItem
			}
		}
		`,
		variables: {
			id,
			text,
			isDone
		}
	})


	return res.data.updateTodoItem || [];
}


export async function addTodoItem(text: string): Promise<ITodoList>{
	const res = await client.mutate({
		mutation: gql`
		${todoItemFragment}
		mutation addTodoItem($text: String!){
			addTodoItem(
					text: $text,,
					order: {isDone: ASC}
			){
				...TodoItem
			}
		}
		`,
		variables: {
			text,
		}
	})

	return res.data.addTodoItem || [];
}

export async function removeTodoItem(id: string): Promise<ITodoList> {
	const res = await client.mutate({
		mutation: gql`
		${todoItemFragment}
		mutation removeTodoItem($id: String!){
			removeTodoItem(
					id: $id,
					order: {isDone: ASC}
			){
				...TodoItem
			}
		}`,
		variables: {
			id,
		}
	});
	
	return res.data.removeTodoItem || [];

}