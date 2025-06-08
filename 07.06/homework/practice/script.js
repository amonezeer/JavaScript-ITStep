document.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = e.target.querySelector('[name="username"]').value;
    let email = e.target.querySelector('[name="useremail"]').value;
    let phone = e.target.querySelector('[name="userphone"]').value;
    let type = e.target.querySelector('[name="phone-type"]').value;
    if(!name){
        alert("Заповніть поле з іменем ");
        return;
    }
    window.phonebook.push({
        "name" : name,
        "email": email,
        "phone": phone,
        "type": type
});
    showPhones();
    e.target.reset();
    // console.log("Submit canceled ");
});

document.addEventListener('DOMContentLoaded', () => {
    window.phonebook = [
        {"name": "Петрович", "email": "petrovic@i.ua", "phone": "380979992311", "type": "cellular"},
        {"name": "Олексійович", "email": "olexeevich@i.ua", "phone": "38098991231", "type": "work"},
        {"name": "Олегович", "email": "olegovic@gmail.ua", "phone": "380967771177", "type": "cellular"},
    ];
    showPhones (); 
    const btnGo = document.getElementById("vars-btn");
    if(!btnGo) throw "#vars-btn not found";
    btnGo.onclick = btnGoClick;
});

function btnGoClick() {
    const vars = document.querySelectorAll('.vars-box:checked');
    alert("Selected " + [...vars.values().map(v => v.id)].join(','));

    const rate = document.querySelector('.rate:checked');
    if(rate){
        alert("оцінка: " + rate.id);
    } else {
        alert("оцінки немає");
    }
}

function showPhones (){
    const container = document.getElementById("phones");
    if(!container) throw "#Phones not found";
    container.innerHTML = "";
    for(let phone of window.phonebook){
        const item = document.createElement('div');
        item.innerHTML = `name: ${phone.name}, email: ${phone.email}, phone: ${phone.phone}, type: ${phone.type}`;
        container.appendChild(item);
    }
}