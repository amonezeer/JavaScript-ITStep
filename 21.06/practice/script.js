document.addEventListener('DOMContentLoaded', () => {
    // const dndItem = document.getElementById('dnd-item')
    // if(!dndItem) throw "#dnd-item not found"
    let posX = 30;
    for(let elem of document.getElementsByClassName('dnd-item')) {
        elem.onmousedown = onMousedown;
        elem.style.left = posX + 'px'
        posX += elem.offsetWidth + 10;
    }
    document.onmousemove = onMousemove;
    document.onmouseup = onMouseup;
    window.canDrag = false;
});

function onMousedown(e) {
    e.preventDefault();
   const dndField = document.getElementById('dnd-field');
   if(!dndField) throw "#dnd-field not found";
   window.dndField = dndField;
   
   const rect = e.target.getBoundingClientRect();
   window.dndDeltaX = e.pageX - rect.x;
   window.dndDeltaY = e.pageY - rect.y;
   window.canDrag = true;
   window.draggableItem = e.target;
}

function onMousemove(e) {
    if(window.canDrag){ 
        e.preventDefault();
        if(!window.draggablePhantom) {
            window.draggablePhantom = window.draggableItem.cloneNode(true);
            window.draggablePhantom.style.opacity = 0.7;
            window.dndField.appendChild(window.draggablePhantom);
        }
        window.draggablePhantom.style.left = e.pageX - window.dndField.offsetLeft - window.dndDeltaX + 'px';
        window.draggablePhantom.style.top = e.pageY - window.dndField.offsetTop - window.dndDeltaY + 'px';
    }
}

function onMouseup(e) {
    if(window.canDrag) {
    let leftBlock = document.getElementById('left-block');
    rect = leftBlock.getBoundingClientRect();
    if(rect.x < e.pageX && e.pageX < rect.x + rect.width 
        && rect.y < e.pageY && e.pageY < rect.y + rect.height){
        // alert("Left Block")
        leftBlock.appendChild(window.draggableItem);
        window.draggableItem.style.left = 30 + LeftBlock.children.length * window.draggableItem.offsetWidth / 2 + 'px'
        window.draggableItem.style.top = 30 + 'px';
        window.dndField.removeChild(window.draggablePhantom);
        window.draggablePhantom = false;

    }
    else{
        let rightBlock = document.getElementById('right-block');
        rect = rightBlock.getBoundingClientRect();
        if(rect.x < e.pageX && e.pageX < rect.x + rect.width 
        && rect.y < e.pageY && e.pageY < rect.y + rect.height) {
        window.canDrag = false;
        rightBlock.appendChild(window.draggableItem);
        window.draggableItem.style.left = 30 + rightBlock.children.length * window.draggableItem.offsetWidth / 2 + 'px'
        window.draggableItem.style.top = 30 + 'px';
        window.dndField.removeChild(window.draggablePhantom);
        window.draggablePhantom = false;
        }
        else {
         window.canDrag = false;
         window.dndField.removeChild(window.draggablePhantom);
         window.draggablePhantom = false;
        }
    }
    // window.canDrag = false;
    // window.draggableItem.style.left = e.pageX - window.dndField.offsetLeft - window.dndDeltaX + 'px';
    // window.draggableItem.style.top = e.pageY - window.dndField.offsetTop - window.dndDeltaY + 'px';
    // window.dndField.removeChild(window.draggablePhantom);
    // window.draggablePhantom = false;
    }
}