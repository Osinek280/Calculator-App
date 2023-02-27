const numbersButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const input = document.querySelector('.input')
const parent = document.querySelector('.historyParent')
const lastExquation = document.querySelector('.lastExquation')
let valueExquation = '';
let value = '';
let exquation = value;
let isResult = false;
let result = eval(value);

function displayNumbers () {
    if(this.textContent === '.' && value[value.length -1] === '.'){
        return;
    }
    if(this.textContent === '.' && value === ''){
        return 
    }
    value = value + this.textContent;
    input.value = value
    spanfunction()
}

function operate () {
    if(value[value.length -1] === '*' ||value[value.length -1] === '-' || value[value.length -1] === '+' || value[value.length -1] === '/' ){
        return;
    }
    if(value === '' && this.textContent === '-'){
        value = value + this.textContent;
        input.value = value
        return;
    }else if(value === '' || this.textContent === '%'){
        return;
    }
    value = value + this.textContent
    input.value = value
    spanfunction()
}

function showResult() {
    if(value === ''){
        return;
    }
    exquation = value;
    result = eval(value);
    result = Number(result.toFixed(14));
    input.value = result;
    value = Number(result.toFixed(2)).toString();
    addToHistory();
}

function spanfunction() {
    result = eval(value)
    console.log(value)
    console.log(input.value)
    if(isResult === false){
        lastExquation.innerHTML = result
    }else{
        lastExquation.innerHTML = exquation + result
    }
}

function clear() {
    value = '';
    input.value = value;
}

function addToHistory(){
    const newExquation = document.createElement("li");
    newExquation.className = 'child'
    newExquation.innerHTML = `
    ${exquation} = ${value}
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


input.addEventListener('keypress', (event) =>{
    let regex = /[!@#$%^&*()_=[\]{};':"\\|,.<>\?`~]/g;
    let key = String.fromCharCode(event.keyCode);
    if((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || regex.test(key)) {
      event.preventDefault();
    }
});