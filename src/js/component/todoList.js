import { func } from "prop-types";
import React, { useState, useEffect } from "react";

const Todos = () => {
	const [inputValue, setInputValue] = useState("Type There");
	const [inputList, setInputList] = useState([]);
	useEffect(() => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/pandapandapanda"
		)
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => setInputList(data));
	}, []);
	function addItem(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			setInputValue(inputValue);
			const list = inputList.concat(inputValue);
			setInputList(list);
			setInputValue("");
		}
	}
	function deleteItem(index) {
		setInputList(function(currentList) {
			return currentList.filter(function(el, elIndex) {
				return index !== elIndex;
			});
		});
	}

	return (
		<div className="text-center mt-5">
			<h1>TodoList</h1>
			<h3>
				{inputList.length == 0
					? "No task to display"
					: inputList.length == 1
					? "There is one task left"
					: "The number of tasks left is: " + inputList.length}
			</h3>
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyUp={addItem}
			/>
			<div>
				<ul>
					{inputList.map((todo, i) => (
						<li key={todo.label}>
							{todo.label}
							<button onClick={() => deleteItem(i)}>X</button>
						</li>
					))}
				</ul>
			</div>
			<button onClick={() => setInputList([])}>Delete All</button>
		</div>
	);
};

export default Todos;
