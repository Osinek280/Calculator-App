const numbersButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const input = document.querySelector('.input')
const parent = document.querySelector(".historyParent")
const lastExquation = document.querySelector('.lastExquation')
const canel = document.querySelector('.canel')
let valueExquation = '';
let value = '';
let exquation = value;
let isResult = false;
let result = eval(value);


// popraw zapisz instrukcji warunkowej dotyczącej decimalPart
function displayNumbers () {
    if(this.textContent === '.' && value[value.length -1] === '.'){
        return;
    }
    if(this.textContent === '.' && value === ''){
        return 
    }
    input.value = input.value + this.textContent
    spanfunction()
}

function operate () {
    if(input.value[input.value.length -1] === '*' ||
       input.value[input.value.length -1] === '-' ||
       input.value[input.value.length -1] === '+' || 
       input.value[input.value.length -1] === '/' || 
       input.value === ''){
        return;
    }
    input.value = input.value + this.textContent
    spanfunction()
}

canel.addEventListener('click', () => {
    input.value = input.value.slice(0, -1);
    spanfunction()
})

function showResult() {
    const regex = /[*+-/]/;
    lastExquation.innerHTML = ""
    exquation = input.value
    if(regex.test(input.value)){
        try{
            result = eval(input.value)
            result = result.toString()
            result = result.slice(0, 14)
        }catch (erroe){
            return;
        }
        input.value = result
        lastExquation.innerHTML = exquation + ' ='
        addToHistory()
    }
}

function spanfunction() {
    const regex = /[*+-/]/;
    lastExquation.innerHTML = ""
    if(regex.test(input.value)){
        try{
            result = eval(input.value)
        }catch (erroe){
            return;
        }
        let decimalPart = result.toString().split(".")[1];
        if(decimalPart === 1){
            result = result.toFixed(1)
        }else if(decimalPart >= 2){
            result = result.toFixed(2)
        }
        lastExquation.innerHTML = result
    }else{
        return;
    }
}

function clear() {
    value = '';
    input.value = value;
    lastExquation.innerHTML = ''
}

function addToHistory(){
    const historyResult = Number(result)
    let decimalPart = historyResult.toString().split(".")[1];
    if(decimalPart === 1){
        historyResult = historyResult.toFixed(1)
    }else if(decimalPart >= 2){
        historyResult = historyResult.toFixed(2)
    }
    const newExquation = document.createElement('li')
    newExquation.className = 'child'
    newExquation.innerHTML = `
    ${exquation} = ${historyResult.toFixed(2)}
    `
    parent.appendChild(newExquation);
}

clearButton.addEventListener('click', clear)

numbersButtons.forEach((button) => {
    button.addEventListener('click', displayNumbers)
})

operatorsButtons.forEach((button) => {
    button.addEventListener('click', operate)
})

equalsButton.addEventListener('click', showResult)


input.addEventListener('input', spanfunction)

input.addEventListener('keypress', (event) =>{
    let regex = /[!@#$%^&*()_=[\]{};':"\\ |,.<>\?`~]/g;
    let key = String.fromCharCode(event.keyCode);
    if((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || regex.test(key)) {
      event.preventDefault();
    }else if(event.keyCode === 13){
        showResult()
    }
});