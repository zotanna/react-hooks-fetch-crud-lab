import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ myData, delQuestion, updatedQuestion }) {
	const displayData = myData.map((val) => {
		return (
			<QuestionItem
				question={val}
				delQuestion={delQuestion}
				updatedQuestion={updatedQuestion}
			/>
		);
	});
	return (
		<section>
			<h1>Quiz Questions</h1>
			<ul>{displayData}</ul>
		</section>
	);
}

export default QuestionList;