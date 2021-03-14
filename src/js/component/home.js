import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

export function Home() {
	//const [todoList, setList] = useState(["No tasks. Add one!"]);
	const [todoList, setList] = useState([]);
	let listCopy = [];

	const handleRemoveItem = e => {
		const liElement = e.target;
		const index = liElement.parentElement.getAttribute("data-index");

		listCopy = todoList;
		listCopy = todoList.splice(index, 1);
		setList(todoList.filter(item => item.name !== listCopy));
	};
	const handleMouserOver = e => {
		const liElement = e.target;
		liElement.getElementsByTagName("i")[0].nextSibling.data !==
		"No tasks. Add one!"
			? liElement
					.getElementsByTagName("i")[0]
					.setAttribute("style", "display: inline")
			: false;
		//liElement.setAttribute("style", "display: none");
		//console.log(liElement.getElementsByTagName("i")[0].nextSibling.setAttribute(data));
	};
	const handleMouserOut = e => {
		const liElement = e.target;
		liElement
			.getElementsByTagName("i")[0]
			.setAttribute("style", "display: none");
	};

	function postList() {
		var raw = JSON.stringify([todoList]);

		var requestOptions = {
			method: "POST",
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/juanarrieta1986",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error in POST", error));
	}

	useEffect(() => {
		getList();
	}, []);

	function getList() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/juanarrieta1986",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setList(result))
			//.then(result => setList([...todoList, result]))
			//.then(result => console.log(result.label))
			.catch(error => alert("error in GET", error));
		console.log(todoList);
	}

	function deleteList() {}

	function putList(updateList) {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(updateList);
		console.log(raw);
		//var raw = todoList;
		//console.log("85");

		var requestOptions = {
			method: "PUT",
			body: raw,
			redirect: "follow",
			headers: myHeaders
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/juanarrieta1986",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.then(hacer => getList())
			.catch(error => console.log("error", error));
	}

	return (
		<div id="container">
			<h1 className="todo-header">To do List</h1>
			<input
				id="addToDo"
				type="text"
				placeholder="Add to do here"
				onKeyDown={e => {
					if (e.keyCode === 13 && e.target.value != "") {
						console.log(e.target.value);
						//setList();
						putList([
							...todoList,
							{ label: e.target.value, done: false }
						]);
						e.target.value = "";
					}
				}}
			/>
			<ul className="list-group">
				{todoList.map((item, index) => {
					return (
						<li
							key={index}
							data-index={index}
							className="list-group-item"
							style={
								todoList.length > 1 &&
								todoList[index] === "No tasks. Add one!"
									? { display: "none" }
									: { display: "inline" }
							}
							onMouseEnter={handleMouserOver}
							onMouseLeave={handleMouserOut}>
							<i
								className="fa fa-trash"
								style={{ display: "none" }}
								onClick={handleRemoveItem}></i>
							{item.label}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
