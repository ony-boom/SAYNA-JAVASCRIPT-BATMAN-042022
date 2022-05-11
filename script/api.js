const quizTemplate = document.getElementById("quiz1-template");

async function getQuestion() {
	const response = await fetch("https://plankton-app-mj9br.ondigitalocean.app/questions/all");
	return response.json();
}

function importTemplate(templateName) {
	const quizNode = document.importNode(quizTemplate.content, true);
	const answerTemplate = quizNode.getElementById("answer-template");
	const answerNode = document.importNode(answerTemplate.content, true);
	let tempToExport = quizNode;
	
	if (templateName === "answer") {
		tempToExport = answerNode;
	}
	
	return tempToExport;
}

function outputAnswer(quizEl, answerList) {
	const parentElement = quizEl.querySelector(".choices");
	const answerEl = importTemplate("answer");
	
	for (const answer of answerList) {
		const id = `response_of_quiz_${parentElement.parentElement.id}--no_${answerList.indexOf(answer)}`;
		const newAnswer = answerEl.cloneNode(true);
		const radioBtn = newAnswer.querySelector("input");
		const label = newAnswer.querySelector("label");
		radioBtn.id = id;
		label.setAttribute("for", id)
		
		label.textContent = answer.text;
		parentElement.append(newAnswer);
	}
}

function removeLoadingText(list) {
	if (list.length > 0) {
		document.getElementById("load").remove();
	}
}

async function outputQuestion() {
	const outputRoot = document.getElementById("root");
	const questionList = await getQuestion();
	removeLoadingText(questionList);
	let quizEl = importTemplate("quiz");
	quizEl = quizEl.children[0];
	
	for (const question of questionList) {
		const newQuiz = quizEl.cloneNode(true);
		newQuiz.id = questionList.indexOf(question);
		const questionOutputEl = newQuiz.querySelector(".question");
		
		questionOutputEl.textContent = question.question;
		
		outputAnswer(newQuiz, question.response)
		outputRoot.append(newQuiz);
	}
}

function output() {
	outputQuestion();
}

output();