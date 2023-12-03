import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
	const [page, setPage] = useState("List");

	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/questions")
			.then((response) => response.json())
			.then((resData) => setData(resData));
	}, []);

	//POST Request
	function addQuestion(newQuestion) {
		const config = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newQuestion),
		};

		fetch("http://localhost:4000/questions", config)
			.then((response) => response.json())
			.then((newQuestion) => {
				const newQuestions = [...data, newQuestion];
				setData(newQuestions);
			});
	}

	//DELETE request
	function deleteQuestion(questId) {
		const config = {
			method: "DELETE",
		};
		fetch(`http://localhost:4000/questions/${questId}`, config)
			.then((response) => response.json())
			.then(() => {
				const newList = data.filter((filData) => filData.id !== questId);
				setData(newList);
			});
	}

	//UPDATE request
	function updateQuestion(questId, updQuestion) {
		console.log("UPDATE " + updQuestion + " " + questId);

		fetch(`http://localhost:4000/questions/${questId}`, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
			},
			body: { correctIndex: updQuestion },
		})
			.then((response) => response.json())
			.then((updQuestion) => {
				const updQuestions = data.map((dat) => {
					if (dat.id === questId) return updQuestion;
					return data;
				});

				setData(updQuestions);
			});
	}

	return (
		<main>
			<AdminNavBar onChangePage={setPage} />
			{page === "Form" ? (
				<QuestionForm addQuestion={addQuestion} />
			) : (
				<QuestionList
					myData={data}
					delQuestion={deleteQuestion}
					updatedQuestion={updateQuestion}
				/>
			)}
		</main>
	);
}

export default App;