// OOP
const _console2 = document.getElementById("console2");
if(!_console2) throw "Element #console2 not found";

// у JavaScript дие протитипний принцип
// оскильки типизация динамична , класи як типи данних не фиксуется
// клас слид розумити як прототип , початковий стан обьекта
// подальший код може зминити склад обьекта як у бик збильшення , так и зменшення

var obj = {};
obj.a = 10; // звертаемось до неиснуючого поля - створюемо його
 _console2.innerHTML += `obj.a${obj.a}<br/>`;

// JSON - JavaScript Object Notation
var obj2 = {
    x: 10,
    y: 20,
    str: "the string",
    arr: [1,2,3,4,5],
    "cond": true,
    "nested": {
        a: 30,
        b: 40
    },
    fun1: function self() { _console2.innerHTML += `fun1 ${self.c}<br/>`}
};
obj2.w = "1223";
obj2.fun2 = () => {_console2.innerHTML += `fun2 ${obj2.fun1.c}<br/>`}
delete obj2.x; // видалення поля
obj2.fun1.c = 10; // обьектом е все и навить функции
obj2.fun2();
    _console2.innerHTML += "---------<br/>"

for(let field in obj2){
    if(typeof obj2[field] == "object"){
    _console2.innerHTML += `obj2.${field} = ${JSON.stringify(obj2[field])}<br/>`;
    }
    else{
     _console2.innerHTML += `obj2.${field} = ${obj2[field]}<br/>`;
    }
}

var points = [
    {x:10, y:20},
    {x:11, y:21},
    {x:12, y:22},
]