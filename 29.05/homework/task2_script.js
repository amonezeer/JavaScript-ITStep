const receipt = [
    { name: "Молоко", quantity: 2, pricePerUnit: 30 },
    { name: "Хліб", quantity: 1, pricePerUnit: 15 },
    { name: "Яйця", quantity: 12, pricePerUnit: 5 },
    { name: "Сир", quantity: 1, pricePerUnit: 100 }
];

function displayReceipt() {
    const output = document.getElementById("output");
    let html = "<h2>Чек:</h2><ul>";
    receipt.forEach(item => {
        html += `<li>${item.name}: ${item.quantity} x ${item.pricePerUnit} грн = ${item.quantity * item.pricePerUnit} грн</li>`;
    });
    html += "</ul>";
    output.innerHTML += html;
}

function getTotalSum() {
    const total = receipt.reduce((sum, item) => sum + item.quantity * item.pricePerUnit, 0);
    document.getElementById("output").innerHTML += `<p>Загальна сума: ${total} грн</p>`;
}

function getMostExpensive() {
    const mostExpensive = receipt.reduce((max, item) => 
        item.quantity * item.pricePerUnit > max.quantity * max.pricePerUnit ? item : max, receipt[0]);
    document.getElementById("output").innerHTML += `<p>Найдорожча покупка: ${mostExpensive.name} (${mostExpensive.quantity * mostExpensive.pricePerUnit} грн)</p>`;
}

function getAveragePrice() {
    const totalItems = receipt.reduce((sum, item) => sum + item.quantity, 0);
    const totalSum = receipt.reduce((sum, item) => sum + item.quantity * item.pricePerUnit, 0);
    const average = totalSum / totalItems;
    document.getElementById("output").innerHTML += `<p>Середня вартість одного товару: ${average.toFixed(2)} грн</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
    displayReceipt();
    getTotalSum();
    getMostExpensive();
    getAveragePrice();
});