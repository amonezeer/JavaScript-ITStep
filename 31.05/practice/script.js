const _console = document.getElementById("console");
if(!_console) throw "Element #console not found";
// принцип hoisting - пидняття коду ( оголошення ) - оголошення функций та зминних за допомогою var
// пиднимаются до верху блоку локализации ( тила функции або скрипту )
fun1(); // функцию можна викликати DO ии оголошення 
function fun1() {
    _console.innerHTML += "fun 1 works<br/>";
    fun2(); // теж саме и про взаемний виклик функций
}
function fun2(){
    _console.innerHTML += "fun 2 works<br/>";
    fun3(1); // килькисть параметрив та аргументив може видризнятись
    fun3(1,2,3,4);
    _console.innerHTML += "----<br/>"
    _console.innerHTML += sum(1,2,3,4,5) + "<br/>"
    // fun4(); // пидняття працюе тильки для оголошення , але не для присвоювання. до цього зминна е , а значення немае
}

// передача аргументив , параметри
function fun3(a,b,c){
    _console.innerHTML += `a: ${typeof a}<br/>`;
    _console.innerHTML += `b: ${typeof b}<br/>`;
    _console.innerHTML += `c: ${typeof c}<br/>`;
    _console.innerHTML += `args: ${arguments.length}<br/>`;
}

function sum() {
    res = 0;
    for(let arg of arguments){
        res += arg;
    }
    return res;
}
// function expression 
var fun4 = function(){
    _console.innerHTML += "fun 4 works<br/>";
    
}
fun4();
// arrow functional expression
const fun5 = () => _console.innerHTML += "fun 5 works <br/>";
// оголошення const не пидиймается , зверненя тильки писля коду
fun5();
// IIFE - Immendiately Invoked Functional Expression
// нотации миттевого виклику - економия ресурсив для однаразових ф.
(function(){
    _console.innerHTML += "IIFE works<br/>";
    
})();