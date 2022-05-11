const quizTemplate = document.getElementById("quiz1-template");
const checkBtn = document.getElementById("check-btn");
let started = false;
let score = 0;
let currentQuiz;
let notGoodResponseList = [];
let quizList = null;

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

function checkAnswer(list, answerId, quizId) {
	started = true;
	if (quizId !== currentQuiz) {
		if (list[answerId].isGood) {
			score++;
		} else {
			notGoodResponseList.push(quizId);
			return
		}
	}
	currentQuiz = quizId;
}

function outputAnswer(quizEl, answerList) {
	const parentElement = quizEl.querySelector(".choices");
	const answerEl = importTemplate("answer");
	
	for (const answer of answerList) {
		const currentAnwser = answerList.indexOf(answer);
		const id = `response_of_quiz_${parentElement.parentElement.id}--no_${currentAnwser}`;
		const newAnswer = answerEl.cloneNode(true);
		const radioBtn = newAnswer.querySelector("input");
		const label = newAnswer.querySelector("label");
		radioBtn.id = id;
		radioBtn.name = `choice_of_quiz_${parentElement.parentElement.id}`;
		label.setAttribute("for", id);
		
		radioBtn.addEventListener("click", checkAnswer.bind(null, answerList, currentAnwser, +parentElement.parentElement.id));
		
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
	quizList = questionList;
	removeLoadingText(questionList);
	let quizEl = importTemplate("quiz");
	quizEl = quizEl.children[0];
	
	for (const question of questionList) {
		const newQuiz = quizEl.cloneNode(true);
		newQuiz.id = questionList.indexOf(question);
		const questionOutputEl = newQuiz.querySelector(".question");
		
		questionOutputEl.textContent = question.question;
		
		outputAnswer(newQuiz, question.response)
		outputRoot.insertAdjacentElement("beforeend", newQuiz);
	}
}

function outputScore() {
	started = false;
	if (notGoodResponseList.length > 0) {
		for (const response of notGoodResponseList) {
			console.log(quizList[response]);
		}
	}
	const outputEl = document.getElementById("score-output");
	outputEl.textContent = `Veuillez d'abord choisir les reponses`;
	if (started) {
		outputEl.textContent = `Vous avez eu ${score} bonne reponses`;
	}
}

function output() {
	outputQuestion();
}

output();

checkBtn.addEventListener("click", outputScore);