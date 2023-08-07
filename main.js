'use strict';
import data from './data.json' assert { type: 'json' };

const formHigh = document.querySelector('.addTaskHigh');
const textarea = document.querySelector('textarea');
const formLow = document.querySelector('.addTaskLow');
const inputLow = document.getElementById('inputLow');
const formSummaryHigh = document.querySelector('.form-summary__shell_High');
const formSummaryLow = document.querySelector('.form-summary__shell_Low');
const hintHigh = document.getElementById("hint");
const hintLow = document.getElementById("hint2");
const buttonHigh = document.getElementById("createTaskHigh");
const buttonLow = document.getElementById("createTaskLow");
const INPROGRESS	 = 'InProgress';
const DONE = 'Done';

let taskHigh;
let taskLow;
let allTasks = [];

formHigh.addEventListener('keydown', function(event) {
	if (event.keyCode === 13 && event.ctrlKey === true) {
		event.preventDefault();
		createTaskHigh();
	}
});

buttonHigh.addEventListener('click', createTaskHigh);
buttonLow.addEventListener('click', createTaskLow);

const ERRORS = {
	short: 'Слишком короткий текст',
	long: 'Слишком длинные слова без пробелов',
	multiline: 'Слишком многострочный текст',
	whiteSpace: 'Слишком много пробелов',
}

function createTaskHigh() {
	try {
		if (!textarea.value || textarea.value.length < 3) {
			hintHigh.textContent = ERRORS.short;
			hintHigh.style.color = 'red';
			throw new Error(ERRORS.short);
		} else if (textarea.value.trim() === '') {
			hintHigh.textContent = ERRORS.whiteSpace;
			hintHigh.style.color = 'red';
			throw new Error(ERRORS.whiteSpace);
		} else if (textarea.value.split(' ').length > 120 || textarea.value.includes('\n') > 20) {
			hintHigh.textContent = ERRORS.multiline;
			hintHigh.style.color = 'red';
			throw new Error(ERRORS.multiline);
		} else {
			const words = textarea.value.split(' ');
			for (let i = 0; i < words.length; i++) {
				if (words[i].length > 30) {
					hintHigh.textContent = ERRORS.long;
					hintHigh.style.color = 'red';
					throw new Error(ERRORS.long);
				}
			}
		}
	} catch (error) {
		console.log(error);
		return;
	}

	taskHigh = {
		text: textarea.value,
		status: INPROGRESS,
		important: 'High'
	};
	addTask(taskHigh);
	hintHigh.textContent = '';
	textarea.style.height = "52px";
}

formLow.addEventListener('submit', function(event) {
	event.preventDefault();
	createTaskLow();
})

function createTaskLow() {
	try {
		if (!inputLow.value || inputLow.value.length < 3) {
			alert(ERRORS.short);
			throw new Error(ERRORS.short);
		} else if (inputLow.value.trim() === '') {
			alert(ERRORS.whiteSpace)
			throw new Error(ERRORS.whiteSpace);
		} else {
			const words = inputLow.value.split(' ');
			for (let i = 0; i < words.length; i++) {
				if (words[i].length > 30) {
					alert(ERRORS.long)
					throw new Error(ERRORS.long);
				}
			}
		}
	} catch (error) {
		console.log(error);
		return;
	}

	taskLow = {
		text: inputLow.value,
		status: 'InProgress',
		important: 'Low'
	};
	addTask(taskLow);
	hintLow.textContent = "";
}

function addTask(input) {
	if (input.important === 'High') {
		allTasks.push(input);
		renderingAllTasks();
		textarea.value = '';
		textarea.blur();
	} else {
		allTasks.push(input);
		renderingAllTasks();
		inputLow.value = '';
		inputLow.blur();
	}
}

function changeStatusTask(input) {
	if (input.status === INPROGRESS) {
		input.status = DONE;
	} else {
		input.status = INPROGRESS;
	}
}

function createTask(input) {

	let newElement = document.createElement("div");
	newElement.classList.add("form-summary__shell-task");

	let newInput = document.createElement("input");
	newInput.setAttribute("id", "rate");
	newInput.setAttribute("autocomplete", "off");
	newInput.setAttribute("type", "checkbox");
	newInput.setAttribute("name", "rate");
	newInput.setAttribute("data-error", "Ошибка");
	newInput.setAttribute("data-value", "");

	if (input.status === DONE) {
		newInput.setAttribute("checked", "checked");
	}
	newInput.classList.add("inputt");

	let newDiv = document.createElement("div");
	newDiv.classList.add("form-summary__task");
	newDiv.textContent = input.text;

	let newImg = document.createElement("img");
	newImg.classList.add("form-summary__img-2");
	newImg.setAttribute("src", "close-icon.svg");
	newImg.setAttribute("alt", "");
	newImg.setAttribute("style", "cursor: pointer");

	newElement.appendChild(newInput);
	newElement.appendChild(newDiv);
	newElement.appendChild(newImg);

	if (input.important === 'High') {
		formSummaryHigh.parentNode.insertBefore(newElement, formSummaryHigh);
		formSummaryHigh.parentNode.insertBefore(formSummaryHigh, newElement);
	} else {
		formSummaryLow.parentNode.insertBefore(newElement, formSummaryLow);
		formSummaryLow.parentNode.insertBefore(formSummaryLow, newElement);
	}

	newImg.addEventListener('click', () => {
		const index = allTasks.indexOf(input);
		allTasks.splice(index, 1);
		renderingAllTasks();
	})

	newInput.addEventListener('change', function() {
		changeStatusTask(input);
		renderingAllTasks();
	});
}

function renderingAllTasks() {
	const taskElements = document.querySelectorAll('.form-summary__shell-task');
	taskElements.forEach(function(taskElement) {
		taskElement.remove();
	});

	allTasks.forEach(function(input) {
		createTask(input);
	});
}

formHigh.addEventListener('input', function() {
	auto_grow(textarea);
});

function auto_grow(textarea) {
	textarea.style.height = "52px";
	textarea.style.height = textarea.scrollHeight + "px";
}

textarea.addEventListener('input', function showHint() {
	hintHigh.style.color = 'black';
	hintHigh.textContent = 'CTRL+ENTER';
});

textarea.addEventListener('focusout', function showHint() {
	hintHigh.style.color = 'black';
	hintHigh.textContent = '';
});

formLow.addEventListener('input', function showHint() {
	hintHigh.style.color = 'black';
	hintLow.textContent = 'ENTER';
});

formLow.addEventListener('focusout', function showHint() {
	hintHigh.style.color = 'black';
	hintLow.textContent = '';
});

data.forEach(task => addTask(task));