const numbersBtns = document.querySelectorAll('[data-number]')
const operationsBtns = document.querySelectorAll('[data-operation]')
const allClearBtn = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equal]')
const previousText = document.querySelector('[data-previous]')
const currentText = document.querySelector('[data-current]')

numbersBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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
    if (!currentText.textContent) return
    let newUpdatedContent = currentText.textContent.slice(0, -1)
    currentText.textContent = newUpdatedContent
}

function operations(btn) {
    if (!currentText.textContent) return;
    currentText.textContent += btn.textContent;
    previousText.textContent = currentText.textContent;
    currentText.textContent = '';
}

function endsWithOperator(myString) {
    const lastChar = myString.charAt(myString.length - 1);
    return ['+', '-', '*', '÷'].includes(lastChar);
}

function calculate() {

}

function equals() {

}
