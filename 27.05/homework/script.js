const CURRENT_YEAR = 2025;

// 1
let name = prompt("Введіть ваше ім'я:");
alert(`Привіт, ${name}!`);

// 2
let birthYear = prompt("Введіть ваш рік народження:");
let age = CURRENT_YEAR - parseInt(birthYear);
alert(`Вам ${age} років!`);

// 3
let side = prompt("Введіть довжину сторони квадрата (в см):");
let perimeter = 4 * parseFloat(side);
alert(`Периметр квадрата: ${perimeter} см`);

// 4
let radius = prompt("Введіть радіус кола (в см):");
let area = Math.PI * parseFloat(radius) ** 2;
alert(`Площа кола: ${area.toFixed(2)} см²`);

// 5
let distance = prompt("Введіть відстань між містами (в км):");
let time = prompt("Введіть час, за який хочете дістатися (в годинах):");
let speed = parseFloat(distance) / parseFloat(time);
alert(`Необхідна швидкість: ${speed.toFixed(2)} км/год`);

// 6
const EXCHANGE_RATE = 0.95; 
let dollars = prompt("Введіть суму в доларах:");
let euros = parseFloat(dollars) * EXCHANGE_RATE;
alert(`${dollars} доларів = ${euros.toFixed(2)} євро`);

// 7
let flashSize = prompt("Введіть обсяг флешки (в ГБ):");
let fileSize = 820 / 1024; 
let fileCount = Math.floor(parseFloat(flashSize) / fileSize);
alert(`На флешку вміститься ${fileCount} файлів розміром 820 МБ`);

// 8
let money = prompt("Введіть суму грошей у гаманці (в грн):");
let chocolatePrice = prompt("Введіть ціну однієї шоколадки (в грн):");
let chocolates = Math.floor(parseFloat(money) / parseFloat(chocolatePrice));
let change = parseFloat(money) - chocolates * parseFloat(chocolatePrice);
alert(`Ви можете купити ${chocolates} шоколадок, здача: ${change.toFixed(2)} грн`);

// 9
let number = prompt("Введіть тризначне число:");
let num = parseInt(number);
let reversed = (num % 10) * 100 + Math.floor((num % 100) / 10) * 10 + Math.floor(num / 100);
alert(`Паліндром числа ${number}: ${reversed}`);

// 10
let numForParity = prompt("Введіть ціле число:");
let isEven = parseInt(numForParity) % 2 === 0;
alert(isEven && "Число парне" || "Число непарне");