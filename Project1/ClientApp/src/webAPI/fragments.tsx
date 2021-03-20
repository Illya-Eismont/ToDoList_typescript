import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const todoItemFragment:DocumentNode = gql`
	fragment TodoItem on TodoItemModel {
		id,
		text,
		isDone
	}

`