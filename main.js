const numbersBtns = document.querySelectorAll('[data-number]')
const operationsBtns = document.querySelectorAll('[data-operation]')
const allClearBtn = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equal]')
const previousText = document.querySelector('[data-previous]')
const currentOperand = document.querySelector('[data-current]')
let message = false

document.addEventListener('keydown', (event) => {
	handleKeyboardInputs(event)
})

function handleKeyboardInputs(event) {
	handleErrorMessage()
	let key = event.key
	if (key === '/') key = '÷'
	if (/[0-9.]/.test(key)) {
		handleNumberButtonClick(key)
	} else if (['+', '-', '*', '÷', '.'].includes(key)) {
		const operatorBtn = Array.from(operationsBtns).find(
			(btn) => btn.textContent === key
		)
		if (operatorBtn) {
			operations(operatorBtn)
		}
	} else if (key === 'Enter') {
		calculate()
	} else if (key === 'Backspace') {
		deleteOne()
	} else if (key === 'Escape') {
		allClear()
	}
}

numbersBtns.forEach((btn) => {
	btn.addEventListener('click', (event) => {
		handleNumberButtonClick(event.target.textContent)
	})
})

operationsBtns.forEach((btn) => {
	btn.addEventListener('click', () => operations(btn))
})

allClearBtn.addEventListener('click', allClear)

deleteBtn.addEventListener('click', deleteOne)

equalsBtn.addEventListener('click', calculate)

function allClear() {
	previousText.textContent = ''
	currentOperand.textContent = ''
}

function deleteOne() {
	handleErrorMessage()
	if (!currentOperand.textContent) return
	let newUpdatedContent = currentOperand.textContent.slice(0, -1)
	currentOperand.textContent = newUpdatedContent
}

function operations(btn) {
	handleErrorMessage()
	calculate()
	replaceSymbols(btn)
	if (!currentOperand.textContent) return
	currentOperand.textContent += btn.textContent
	previousText.textContent = currentOperand.textContent
	currentOperand.textContent = ''
}

function handleNumberButtonClick(key) {
	handleErrorMessage()
	if (currentOperand.textContent.length > 15) return
	if (
		!['-', '+', '*', '÷'].includes(previousText.textContent.slice(-1)) &&
    previousText.textContent
	) {
		previousText.textContent = ''
	}
	handleErrorMessage()
	if (key === '.') {
		let arrayCurrent = Array.from(currentOperand.textContent)
		if (arrayCurrent.includes('.')) return
	}
	currentOperand.textContent += key
}

function calculate() {
	let operand1 = previousText.textContent.slice(0, -1)
	let operation = previousText.textContent.slice(-1)
	let operand2 = currentOperand.textContent
	if (operand2 === '.' || operand1 === 'Error' || operand2 === 'NaN') {
		currentOperand.textContent = 'Error'
		message = true
		return
	}
	if (operand1 && operation && operand2) {
		operand1 = parseFloat(operand1)
		operand2 = parseFloat(operand2)
		let result
		switch (operation) {
		case '+':
			result = operand1 + operand2
			break
		case '-':
			result = operand1 - operand2
			break
		case '*':
			result = operand1 * operand2
			break
		case '÷':
			if (operand2 === 0) {
				currentOperand.textContent = 'Error'
				message = true
				return
			}
			result = operand1 / operand2
			break
		default:
			currentOperand.textContent = 'Error'
			message = true
			return
		}
		currentOperand.textContent = ''
		previousText.textContent = (Math.round(result * 100) / 100)
			.toFixed(2)
			.replace(/[.,]00$/, '')
	}
}

function handleErrorMessage() {
	if (message) {
		if (previousText.textContent.slice(0, -1) === 'Error') previousText.textContent = ''
		currentOperand.textContent = ''
		message = false
	}
}

function replaceSymbols(btn) {
	const lastChar = previousText.textContent.slice(-1)
	if (['-', '+', '*', '÷'].includes(lastChar)) {
		previousText.textContent = previousText.textContent.slice(0, -1) + btn.textContent
	}
	if (!['-', '+', '*', '÷'].includes(lastChar)) {
		previousText.textContent = previousText.textContent + btn.textContent
	}
}