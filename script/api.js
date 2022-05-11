const quizTemplate = document.getElementById("quiz1-template");
const answers = [];

function getData() {
	return new Promise((resolve, reject) => {
		fetch("https://batman-api.herokuapp.com")
			.then(response => response.json())
			.then(data => resolve(data))
	})
}

function checkIfTrueAnswer(idx) {
	const current = answers[idx];
	current.isTrue = current.answer === current.chosenAnswer;
	console.log(answers);
}

function setChosenAnswer(answer, idx) {
	answers[idx].chosenAnswer = answer;
	checkIfTrueAnswer(idx);
}

function setRadioBtnClick() {
	const allRadio = document.querySelectorAll("input[type=radio]");
	allRadio.forEach(radio => {
		radio.addEventListener("click", (event) => {
			const label = event.target.nextElementSibling;
			setChosenAnswer(+label.dataset.answerId, +label.dataset.quizId - 1);
		})
	})
}

const outputData = (quizs) => {
	const quizOutput = document.importNode(quizTemplate.content, true);
	const questionOutput = quizOutput.querySelector(".question");
	const answer1 = quizOutput.querySelector(".choice-1 label");
	const answer2 = quizOutput.querySelector(".choice-2 label");
	const answer3 = quizOutput.querySelector(".choice-3 label");
	const answer4 = quizOutput.querySelector(".choice-4 label");
	
	const root = document.getElementById("root");
	for (const quiz of quizs) {
		questionOutput.textContent = quiz.question;
		answer1.textContent = quiz.choice1;
		answer1.dataset.answerId = "1";
		answer2.textContent = quiz.choice2;
		answer2.dataset.answerId = "2";
		answer3.textContent = quiz.choice3;
		answer3.dataset.answerId = "3";
		answer4.textContent = quiz.choice4;
		answer4.dataset.answerId = "4";
		
		quizOutput.querySelectorAll("label").forEach(label => {
			label.dataset.quizId = quiz.id
		});
		
		answer1.setAttribute("for", `question-${quiz.id}-1`);
		answer1.previousElementSibling.id = `question-${quiz.id}-1`;
		
		answer2.setAttribute("for", `question-${quiz.id}-2`);
		answer2.previousElementSibling.id = `question-${quiz.id}-2`;
		
		answer3.setAttribute("for", `question-${quiz.id}-3`);
		answer3.previousElementSibling.id = `question-${quiz.id}-3`;
		
		answer4.setAttribute("for", `question-${quiz.id}-4`);
		answer4.previousElementSibling.id = `question-${quiz.id}-4`;
		
		const answer = {
			answer: quiz.answer,
			chosenAnswer: null,
			isTrue: null,
		}
		answers.push(answer);
		const container = document.createElement("div");
		container.append(quizOutput.cloneNode(true));
		root.append(container);
	}
}

const setData = async () => {
	const data = await getData();
	const questions = data.question;
	outputData(questions);
	setRadioBtnClick();
}

setData();
