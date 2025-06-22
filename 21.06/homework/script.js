document.addEventListener('DOMContentLoaded', () => {
const items = [
    {symbol: "$", name: "Dollar"},
    {symbol: "€", name: "Euro"}, 
    {symbol: "£", name: "Pound"},
    {symbol: "¥", name: "Yen"},
    {symbol: "₴", name: "Hrivnyaa"},
    {symbol: "₹", name: "Rupee"},
    {symbol: "₿", name: "Bitcoin"}
];
const colors = ['maroon', 'lime', 'gold', 'dodgerblue', 'purple', 'orange', 'pink', 'teal'];
const dndField = document.getElementById('dnd-field');
const leftBlock = document.getElementById('left-block');
const rightBlock = document.getElementById('right-block');
const summary = document.getElementById('summary');items.forEach((item, index) => {
    const elem = createItemElement(item, colors[index % colors.length]);
    dndField.insertBefore(elem, leftBlock);
});
positionItems(dndField);
initDragEvents();
updateSummary();function createItemElement(item, color) {
const elem = document.createElement('div');
elem.className = `dnd-item ${color}`;
elem.textContent = item.symbol;
elem.dataset.name = item.name;
elem.dataset.symbol = item.symbol;
return elem;
}

function positionItems(container) {
const items = Array.from(container.querySelectorAll('.dnd-item:not(.phantom)'));
const containerWidth = container.offsetWidth;
const itemWidth = items.length > 0 ? items[0].offsetWidth + 10 : 50;
const itemsPerRow = Math.floor(containerWidth / itemWidth);

let row = 0;
let col = 0;

items.forEach((item, index) => {
    if (index > 0 && index % itemsPerRow === 0) {
        row++;
        col = 0;
    }
    
    item.style.left = (10 + col * (itemWidth)) + 'px';
    item.style.top = (10 + row * (itemWidth)) + 'px';
    col++;
});
}

function initDragEvents() {
document.querySelectorAll('.dnd-item').forEach(elem => {
    elem.onmousedown = onMousedown;
});

document.onmousemove = onMousemove;
document.onmouseup = onMouseup;
window.canDrag = false;
}

function onMousedown(e) {
    e.preventDefault();
    if (!e.target.classList.contains('dnd-item')) return;
    
    window.dndField = e.target.parentElement;
    window.draggableItem = e.target;
    
    const rect = e.target.getBoundingClientRect();
    window.dndDeltaX = e.pageX - rect.left;
    window.dndDeltaY = e.pageY - rect.top;
    window.canDrag = true;
}

function onMousemove(e) {
    if (!window.canDrag) return;
    
    e.preventDefault();
    
    if (!window.draggablePhantom) {
        window.draggablePhantom = window.draggableItem.cloneNode(true);
        window.draggablePhantom.classList.add('phantom');
        window.draggablePhantom.style.opacity = 0.7;
        window.draggablePhantom.style.cursor = 'grabbing';
        document.body.appendChild(window.draggablePhantom);
    }
    
    window.draggablePhantom.style.left = (e.pageX - window.dndDeltaX) + 'px';
    window.draggablePhantom.style.top = (e.pageY - window.dndDeltaY) + 'px';
}

function onMouseup(e) {
if (!window.canDrag) return;
window.canDrag = false;
if (window.draggablePhantom) {
    document.body.removeChild(window.draggablePhantom);
    window.draggablePhantom = null;
}

const leftRect = leftBlock.getBoundingClientRect();
const rightRect = rightBlock.getBoundingClientRect();
let targetBlock = null;

if (e.pageX >= leftRect.left && e.pageX <= leftRect.right &&
    e.pageY >= leftRect.top && e.pageY <= leftRect.bottom) {
    targetBlock = leftBlock;
} else if (e.pageX >= rightRect.left && e.pageX <= rightRect.right &&
           e.pageY >= rightRect.top && e.pageY <= rightRect.bottom) {
    targetBlock = rightBlock;
}

if (targetBlock) {
    targetBlock.appendChild(window.draggableItem);
    if (window.draggableItem.parentElement === leftBlock || window.draggableItem.parentElement === rightBlock) {
        positionItems(leftBlock);
        positionItems(rightBlock);
    } else {
        positionItems(dndField);
        positionItems(targetBlock);
    }
} else {
    positionItems(window.draggableItem.parentElement);
}

updateSummary();
}

function updateSummary() {
    const leftItems = Array.from(leftBlock.querySelectorAll('.dnd-item')).map(item => item.dataset.name);
    const rightItems = Array.from(rightBlock.querySelectorAll('.dnd-item')).map(item => item.dataset.name);
    
    summary.innerHTML = `
        <div class="alert alert-danger"><strong>Left block:</strong> ${leftItems.join(', ') || 'empty'}</div>
        <div class="alert alert-success"><strong>Right block:</strong> ${rightItems.join(', ') || 'empty'}</div>
    `;
}
});