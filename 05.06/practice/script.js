document.addEventListener('DOMContentLoaded', () => {
    const appendTaskButton = document.getElementById('append-task');
    if(!appendTaskButton) throw "append-task not found";
    appendTaskButton.addEventListener('click', appendTaskClick);

    const printTaskButton = document.getElementById('print-task');
    if(!printTaskButton) throw "print-task not found";
    printTaskButton.addEventListener('click', printTaskClick);

    for(let btn of document.querySelectorAll('[data-action="insert"]')) {
        // btn.addEventListener('click', insertButtonClick);
        btn.onclick = insertButtonClick;
    }

    updateClickListeners();

    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "todo-list not found";
    window.todoList = todoList;
});

function updateClickListeners(){
    for(let btn of document.querySelectorAll('[data-action="insert"]')) {
        btn.onclick = insertButtonClick;
    }
    for(let btn of document.querySelectorAll('[data-action="delete"]')) {
        btn.onclick = deleteButtonClick;
    }
}

function deleteButtonClick(e){
    if(window.todoList.children.length == 1){
        alert("Неможна виконати останню задачу");
        return;
    }
    const li = e.target.closest("li");
    window.todoList.removeChild(li);
}

function insertButtonClick(e) {
    const li = e.target.closest('li');
    const task = li.cloneNode(true);
    // task.innerText = "New Task";
    task.firstElementChild.innerText = "New Task";
    // console.log(li);
    // console.log(window.todoList);

    window.todoList.insertBefore(task, li);
    updateClickListeners();
}

function printTaskClick() {
    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "todo-list not found";
    var txt = " ";
    for(let li of todoList.children ){
        txt += li.innerText + '\r\n';
    }
    const sheet = document.createElement('div');
    sheet.style.border = "1px solid lightgray";
    sheet.style.margin = "10px";
    sheet.style.padding = "10px";
    sheet.style['box-shadow'] = "5px 5px 3px #ddd";
    sheet.innerText = txt;
    document.body.appendChild(sheet);
    console.log(txt);


    console.log(txt);
}
function appendTaskClick() {
    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "todo-list not found";


    const task = document.createElement('li');
    task.innerText = "New Task";
    todoList.appendChild(task);
}