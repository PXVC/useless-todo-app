import React from "react";

export default function Todo({ todo, toggleTodo, removeSingleTodo }) {
	const toggleTodoHandle = () => {
		toggleTodo(todo.id);
	};

	const removeTodoHandle = () => {
		removeSingleTodo(todo.id);
	};

	return (
		<div className="todo-container">
			<div className="todo-content">
				<label>
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={toggleTodoHandle}
					/>
					{todo.name}
				</label>
				<button onClick={removeTodoHandle}>remove this todo</button>
			</div>
			<hr />
		</div>
	);
}
