// class MyClass1{                  // оголошення классу
//     x = 10;                      // оголошення поля : завжди public
//     #y = 20;                     // имена , що починаются з ' # ' - private 
//     get y() {                    // оголошення GET-тера 
//         return this.#y;          // доступ до полив : ОБОВЯЗКОВО через this 
//     }                            // Методи (у т.ч. get/set) роздилюются без ";"
//     set y(val){
//         this.#y = val;
//     }
//     getX(){
//         // return x;            // без this мова йде про глобальни зминни 
//         return window.x;       // Пряме звернення до обьекту глобализации window 
//     }
//     constructor(){             //  Конструктор - спец.метод , не за именем классу
//         this.a = a || "A";          // створення додаткового поля 
//     }
// }

// const myObj1 = new MyClass1();
// const myObj2 = new MyClass1(); // Перевиряемо чи е статичним поле "x"
// myObj2.x = 50;                 // зминюючи його через статичний обьект
// console.log(myObj1.x);         // Виводить 10 , що засвидчуе НЕстатичнисть поля 


// console.log(myObj1.a, myObj2.a);
// console.log(myObj1.x);
// // console.log(myObj1.#y); блокуется як private 
// myObj1.y = 40;
// console.log(myObj1.y);
// try{
// console.log(myObj1.getX());     // помилка :  ReferenceError: x is not defined
// }
// catch(err) {
//     console.error(err);
// }
// window.x = 30;                  // те ж саме , що x = 30;
// console.log(myObj1.getX());     // 30

// myObj1.b = "B";                 // Чи можна модификувати обьекти писля створення ? 
// console.log(myObj1.b);          // Так , поле додается 
// console.log(myObj2.b);          // у дургому - немае 

// MyClass1.prototype.fun1 = () => {
//     return "My x = " + this.x;    //  Лексичний ( лексикого) окил фукнции ( scope )             
// }                                 // це область видности зминних ( имен, лекзем)
// console.log(myObj1.fun1());       // C++: (x) [ scope ] {}               
// console.log(myObj2.fun1());       // У цей окил копиюються зминни , яки не будуть видни у тили функции , але видни при ии оголошенни                 

// MyClass1.prototype.fun2 = function()  {
//     return "My x = " + this.x;     // Ризниця у стрилковий та function декларациях , зокрема ,                        
// }                                  // полягае у тому , що стрилкова автоматично формуе
// console.log(myObj1.fun2());        // scope , a function - ни                    
// console.log(myObj2.fun2());        // Иншими словами проводиться анализ всих зминних в тили функции и ти , яки не належать тилу функции копиюються у scope   

// /*
//     funs = [];
//     for(i){ funs[i] = () => {print(i)} }
 
//     funs[0]
//     пізнє зв'язування -- дані на момент виконання -- яке значення матиме "і"?
//     Або останнє по циклу, або взагалі ніяке, якщо "і" локальна у циклі.
 
//     for(i){ funs[i] = () =>[enclosure "і"]=> {print(i)} }
//     Якщо "і" поміщене у лексичний окіл (захоплене, enclosured),
//     то тіло функції звертається не до глобальної області, а саме до околу.
 
//     for(i){ funs[i] = function() =>[enclosure nothing]=> {print(i)} }
// */

class Component1 {
name;
price;
rating;
constructor(name, price, rating) {
    this.name = name || "Без назви";
    this.price = price || "Не вказано";
    this.rating = rating || 0;
}
toHtml() {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < this.rating ? '★' : '☆';
    }
    return `
        <div class="product">
            <h3>${this.name}</h3>
            <h4>Цiна: ${this.price}</h4>
            <h5>Оцiнка: <span class="stars">${stars}</span></h5>
        </div>
    `;
    }
}

const products = [
     new Component1("Олiвець", 14.50, 5),
     new Component1("Ручка", 19.50, 4),
     new Component1("Ластик", 9.50, 3),
     new Component1("Зошит", 14.50, 0)
 ];


const container = document.getElementById("container");
if (!container) throw "#container not found";
for (let product of products) {
    container.innerHTML += product.toHtml();
}