document.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = validateForm(e.target);
    if(!data) return;
    window.phonebook.push(data);
    showPhones();
    e.target.reset();
});

function inputKeyPressed(e) {
    e.target.classList.remove('is-invalid');
    e.target.classList.remove('is-valid');
}

document.addEventListener('DOMContentLoaded', () => {
    for(let ctr of document.querySelectorAll("form .form-control")) {
        ctr.onkeypress = inputKeyPressed;
        ctr.onchange = inputKeyPressed;
    };
    window.phonebook = [
        {"name": "Петрович", "email": "petrovic@i.ua", "phone": "380979992311", "type": "cellular", "password": "Pass123!"},
        {"name": "Олексійович", "email": "olexeevich@i.ua", "phone": "38098991231", "type": "work", "password": "Work456#"},
        {"name": "Олегович", "email": "olegovic@gmail.ua", "phone": "380967771177", "type": "cellular", "password": "Home789$"},
    ];
    showPhones(); 
    const btnGo = document.getElementById("vars-btn");
    if(!btnGo) throw "#vars-btn not found";
    btnGo.onclick = btnGoClick;

    const togglePassword = document.getElementById("togglePassword");
    if (!togglePassword) throw "#togglePassword not found";
    togglePassword.onclick = () => {
        const passwordInput = document.querySelector('[name="userpassword"]');
        const icon = togglePassword.querySelector('i');
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");
        } else {
            passwordInput.type = "password";
            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");
        }
    };
});

function validateForm(form) {
    let nameInput = form.querySelector('[name="username"]');
    let name = nameInput.value;
     if(!name){
        nameInput.classList.add("is-invalid");
        nameInput.parentNode.querySelector(".invalid-feedback").innerText = 
             "заповніть дане поле";
        return false;
    }
    const cyrPattern = /^[А-ЯЄЇІҐ][а-яєїіґ']+([-\s][А-ЯЄЇІҐ][а-яєїіґ']+)*$/;
    const latPattern = /^([od]')?[A-Z][a-z]+(\s([od]')?[A-Z][a-z]+)*$/;
    if(!(cyrPattern.test(name) || latPattern.test(name))) {
        setInvalid(nameInput, "Імя має починатись з великої літери та продовжуватись малими");
        return false;
    }
    const emailInput = form.querySelector('[name="useremail"]')
    let email = emailInput.value;
    const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!emailPattern.test(email)) {
        setInvalid(emailInput, "E-mail не відповідає правилам");
        return false;
    }

    let phoneInput = form.querySelector('[name="userphone"]');
    let phone = phoneInput.value;
    const phonePattern = /^\+\d{12}$|^\+\d{2}\(\d{3}\)\d{7}$/;
    if (!phonePattern.test(phone)) {
        setInvalid(phoneInput, "Номер телефону має починатися з '+' і містити рівно 12 цифр ");
        return false;
    }

    let passwordInput = form.querySelector('[name="userpassword"]');
    let password = passwordInput.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        setInvalid(passwordInput, "Пароль має містити мінімум 8 символів, включаючи заглавну літеру, цифру та спеціальний символ");
        return false;
    }

    let type = form.querySelector('[name="phone-type"]').value;
    return {
        "name": name,
        "email": email,
        "phone": phone,
        "type": type,
        "password": password
    };
}

function setInvalid(input, message) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.parentNode.querySelector(".invalid-feedback").innerText = message;
}

function btnGoClick() {
    const vars = document.querySelectorAll('.vars-box:checked');
    alert("Selected " + [...vars].map(v => v.id).join(','));

    const rate = document.querySelector('.rate:checked');
    if(rate){
        alert("оцінка: " + rate.id);
    } else {
        alert("оцінки немає");
    }
}

function showPhones() {
    const container = document.getElementById("phones");
    if (!container) throw "#Phones not found";
    container.innerHTML = "";
    for (let phone of window.phonebook) {
        const item = document.createElement('div');
        item.innerHTML = `Name: ${phone.name}, Email: ${phone.email}, Phone: ${phone.phone}, Type: ${phone.type}, Password: ${phone.password}`;
        container.appendChild(item);
    }
}