const shoppingList = [
    { name: "Молоко", quantity: 2, bought: false },
    { name: "Хліб", quantity: 1, bought: true },
    { name: "Яйця", quantity: 12, bought: false },
    { name: "Сир", quantity: 1, bought: true }
];

function displayShoppingList() {
    const output = document.getElementById("output");
    const sortedList = [...shoppingList].sort((a, b) => a.bought - b.bought);
    let html = "<h2>Список покупок:</h2><ul>";
    sortedList.forEach(item => {
        html += `<li>${item.name} (${item.quantity} шт.) - ${item.bought ? "Куплено" : "Не куплено"}</li>`;
    });
    html += "</ul>";
    output.innerHTML = html;
}

function addPurchase(name, quantity) {
    const existingItem = shoppingList.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        shoppingList.push({ name, quantity, bought: false });
    }
}

function buyProduct(name) {
    const item = shoppingList.find(item => item.name === name);
    if (item) {
        item.bought = true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayShoppingList();
    addPurchase("Молоко", 3);
    buyProduct("Яйця");
    displayShoppingList();
});