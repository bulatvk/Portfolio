'use strict';
import {clear,checkInput,calc} from './module.js';

export const inputA = document.getElementById('inputA');
export const inputB = document.getElementById('inputB');
export const selectOperator = document.getElementById('selectOperator');
export const equalButton = document.getElementById('equalButton');
export const result = document.getElementById('result');
const clearButton = document.getElementById('clearButton');
export const memory = document.getElementById('memory');
export const memoryText = document.getElementById('memoryText');

equalButton.style.display = 'none';
memory.innerHTML = '';

clear()

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