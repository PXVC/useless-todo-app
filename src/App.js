import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import TodoList from "./TodoList";
import "./App.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
	const [todos, setTodos] = useState([]);
	const TodoNameRef = useRef();

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (storedTodos) setTodos(storedTodos);
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const addTodo = (e) => {
		const name = TodoNameRef.current.value;

		if (name === "") return;
		setTodos((prevTodos) => {
			return [...prevTodos, { id: uuid(), name: name, completed: false }];
		});
		TodoNameRef.current.value = null;
	};

	const toggleTodo = (id) => {
		const newTodos = [...todos];
		const todo = newTodos.find((todo) => todo.id === id);
		todo.completed = !todo.completed;
		setTodos(newTodos);
	};

	const removeSingleTodo = (id) => {
		const newTodos = [...todos];
		const todo = newTodos.find((todo) => todo.id === id);
		newTodos.splice(newTodos.indexOf(todo), 1);
		setTodos(newTodos);
	};

	const clearTodos = () => {
		const newTodos = todos.filter((todo) => !todo.completed);
		setTodos(newTodos);
	};

	return (
		<>
			<div className="header">
				<input ref={TodoNameRef} type="text" />
				<button onClick={addTodo}>Add Todo</button>
				<button onClick={clearTodos}>Clear Completed</button>
			</div>
			<h3>{todos.filter((todo) => !todo.completed).length} left to do</h3>
			<TodoList
				todos={todos}
				toggleTodo={toggleTodo}
				removeSingleTodo={removeSingleTodo}
			/>
		</>
	);
}

export default App;
