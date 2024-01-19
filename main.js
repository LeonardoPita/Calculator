const numbersBtns = document.querySelectorAll('[data-number]')
const operationsBtns = document.querySelectorAll('[data-operation]')
const allClearBtn = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equal]')
const previousText = document.querySelector('[data-previous]')
const currentText = document.querySelector('[data-current]')
let message = false

numbersBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleErrorMessage()
        if (e.target.textContent === '.') {
            let arrayCurrent = Array.from(currentText.textContent)
            if (arrayCurrent.includes('.')) return
        }
        currentText.textContent += btn.textContent
    })
})

operationsBtns.forEach(btn => {
    btn.addEventListener('click', () => operations(btn))
})

allClearBtn.addEventListener('click', allClear)

deleteBtn.addEventListener('click', deleteOne)

equalsBtn.addEventListener('click', calculate)

function allClear() {
    previousText.textContent = ''
    currentText.textContent = ''
}

function deleteOne() {
    handleErrorMessage()
    if (!currentText.textContent) return
    let newUpdatedContent = currentText.textContent.slice(0, -1)
    currentText.textContent = newUpdatedContent
}

function operations(btn) {
    handleErrorMessage()
    if (!currentText.textContent) return;
    checkSymbols(btn)
    currentText.textContent += btn.textContent;
    previousText.textContent = currentText.textContent;
    currentText.textContent = '';
}


function calculate() {
    let operandA = previousText.textContent.slice(0, -1);
    let operation = previousText.textContent.slice(-1);
    let operandB = currentText.textContent;
    if (operandA && operation && operandB) {
        operandA = parseFloat(operandA);
        operandB = parseFloat(operandB);
        let result;
        switch (operation) {
            case '+':
                result = operandA + operandB;
                break;
            case '-':
                result = operandA - operandB;
                break;
            case '*':
                result = operandA * operandB;
                break;
            case '÷':
                if (operandB === 0) {
                    currentText.textContent = 'Error';
                    message = true
                    return;
                }
                result = operandA / operandB;
                break;
            default:
                currentText.textContent = 'Error';
                message = true
                return;
        }
        currentText.textContent = '';
        previousText.textContent = result;
    }
}

function handleErrorMessage() {
    if (message) {
        currentText.textContent = ''
        message = false
    }
}

function checkSymbols(btn) {
    if (['-', '+', '*', '÷'].includes(previousText.textContent.slice(-1))) {
        const lastChar = previousText.textContent.slice(0, -1);
        previousText.textContent = lastChar + btn.textContent;
    }
}


