import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { TodoList } from "./TodoList";

//create your first component
const Home = () => {
	return (

		<div className=" home container text-center bg-light p-4 mt-5">
			<h1>Todos</h1>
			<TodoList />
		</div>
	);
};

export default Home;
