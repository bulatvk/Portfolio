'use strict';
import {equalButton, inputA, inputB, selectOperator, result, memory, memoryText} from './main.js';
export let count = 0;
export let newDiv;
export let checkSolution;
export function clear() {
	inputA.value = '';
	inputB.value = '';
	result.textContent = '';
	equalButton.style.display = 'none';
}

export function checkInput(arg1, arg2) {
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

export function calc() {
	let numA = parseFloat(inputA.value);
	let numB = parseFloat(inputB.value);
	let operator = selectOperator.value;
	let calcResult;
	let calculation = new Function('numA', 'numB', `return numA ${operator} numB`);
	calcResult = calculation(numA, numB);

	inputA.value = numA;
	inputB.value = numB;

	memoryText.addEventListener('mousemove', () => {
		memoryText.innerHTML = '<p id="memoryText" >Удалить все результаты?</p>';
		document.getElementById('memoryText').onclick = function () {
			memoryText.innerHTML = '<p id="memoryText" >Вы уверены?</p>';
			setTimeout(() => {
				document.getElementById('memoryText').onclick = function () {
					memoryText.innerHTML = '';
					memory.innerHTML = '';
					clear();
				}
			}, 300);
		}
	});

	memoryText.addEventListener('mouseleave', () => {
		setTimeout(() => {
			memoryText.innerHTML = '<p id="memoryText" >Результаты вычислений:</p>';
		}, 1000);
	});

	if (numB === 0 && selectOperator.value === '/') {
		result.style.color = 'red';
		result.innerHTML = 'Ошибка! Делить на ноль нельзя!';
	} else {
		let solution = `${numA} ${operator} ${numB} = ${calcResult}`;
		solution = solution.replace('*', 'x').replace('/', ':');
		solution = solution.replace(',', '.').replace(',', '.');
		result.style.color = 'black';
		result.innerHTML = calcResult;

		if (!memory.innerHTML) {
			memoryText.innerHTML = '<p id="memoryText" >Результаты вычислений:</p>';
		}

		if (checkSolution !== solution) {
			count++;
			newDiv = document.createElement('div');
			newDiv.id = String(count);
			memory.appendChild(newDiv);
			newDiv.innerHTML = solution;
			checkSolution = solution;
			newDiv.addEventListener("click", function (event) {
				this.remove();
				clear();
				if (!memory.innerHTML) {
					memoryText.innerHTML = '';
				}
			});
		}
	}
}