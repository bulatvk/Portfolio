'use strict';

const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');
const selectOperator = document.getElementById('selectOperator');
const equalButton = document.getElementById('equalButton');
const result = document.getElementById('result');
const clearButton = document.getElementById('clearButton');
const memory = document.getElementById('memory');

let count = 0;
let newDiv;
let checkSolution;
equalButton.style.display = 'none';
memory.textContent = '';

clear();

inputA.addEventListener('input', () => {
	checkInput(inputA, inputB);
});

inputB.addEventListener('input', () => {
	checkInput(inputB, inputA);
});

selectOperator.addEventListener('change', () => {
	result.textContent = '';
})

clearButton.addEventListener('click', () => {
	clear();
})

equalButton.addEventListener('click', calc);

function clear() {
	inputA.value = '';
	inputB.value = '';
	result.textContent = '';
	equalButton.style.display = 'none';
}

function checkInput(arg1, arg2) {
	if (!arg1.value) {
		result.style.color = 'red';
		result.textContent = 'Введите число!';
	}
	if (arg1.value === '' || arg2.value === '' || !arg1.value || !arg2.value) {
		equalButton.style.display = 'none';
	} else {
		equalButton.style.display = 'inline';
		result.textContent = '';
	}
}

function calc() {
	let numA = parseFloat(inputA.value);
	let numB = parseFloat(inputB.value);
	let operator = selectOperator.value;
	let calcResult;
	let calculation = new Function('numA', 'numB', `return numA ${operator} numB`);
	calcResult = calculation(numA, numB);

	inputA.value = numA;
	inputB.value = numB;

	if (!memory.textContent) {
		memory.innerHTML = '<p id="memoryText" >Результаты вычислений:</p>';
		memory.title = 'Нажмите чтобы очистить результаты вычислений';
		document.getElementById('memoryText').onclick = function () {
			memory.innerHTML = '';
			clear()
		}
	}

	if (numB === 0 && selectOperator.value === '/') {
		result.style.color = 'red';
		result.textContent = 'Ошибка! Делить на ноль нельзя!';
	} else {
		let solution = `${numA} ${operator} ${numB} = ${calcResult}`;
		solution = solution.replace('*', 'x').replace('/', ':');
		solution = solution.replace(',', '.').replace(',', '.');
		result.style.color = 'black';
		result.textContent = calcResult;
		if (checkSolution !== solution) {
			count++;
			newDiv = document.createElement('div');
			newDiv.id = String(count);
			memory.appendChild(newDiv);
			newDiv.innerHTML = solution;
			checkSolution = solution;
			newDiv.addEventListener("click", function (event) {
				this.remove();
			});
		}
	}
}