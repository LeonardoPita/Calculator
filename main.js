const numbersBtns = document.querySelectorAll('[data-number]')
const operationsBtns = document.querySelectorAll('[data-operation]')
const allClearBtn = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equal]')
const previousText = document.querySelector('[data-previous]')
const currentText = document.querySelector('[data-current]')
let message = false

////////////////////Make the keyboard work!**********************************************

document.addEventListener('keydown', e => console.log(e.key))

function handleKeyboardInputs(event) {

}

////////////////////Make the keyboard work!**********************************************

numbersBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (currentText.textContent.length > 15) return
        if (!['-', '+', '*', '÷'].includes(previousText.textContent.slice(-1)) && previousText.textContent) {
            previousText.textContent = ''
        }

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
    calculate()
    replaceSymbols(btn)
    if (!currentText.textContent) return;
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
        previousText.textContent = (Math.round(result * 100) / 100).toFixed(2).replace(/[.,]00$/, "");;
    }
}

function handleErrorMessage() {
    if (message) {
        currentText.textContent = ''
        message = false
    }
}

function replaceSymbols(btn) {
    const lastChar = previousText.textContent.slice(-1);
    if (['-', '+', '*', '÷'].includes(lastChar)) {
        previousText.textContent = previousText.textContent.slice(0, -1) + btn.textContent;
    } if (!['-', '+', '*', '÷'].includes(lastChar)) {
        previousText.textContent = previousText.textContent + btn.textContent
    }
}


