const authContent = `<button id="exit-button" class="btn btn-danger">Вихід з системи </button>`;
const anonContent = `<button id="auth-button" class="btn btn-dark">Вхід до системи </button>`;

document.addEventListener('DOMContentLoaded', () => {
   updateAuthBlock();
});

function updateAuthBlock() {
    const authBlock = document.getElementById("auth-block");
    if(!authBlock) throw "#auth-block not found";
    const token = window.localStorage.getItem('token');
    if(token){
       const payload = JSON.parse(decodeURIComponent(escape(window.atob(token.split('.')[1]))));
       authBlock.innerHTML = authContent;
       if (!authBlock.dataset.authenticated) {
           showWelcomeModal(payload.nam);
           authBlock.dataset.authenticated = "true";
       }
    }
    else{
        authBlock.innerHTML = anonContent;
        authBlock.removeAttribute('data-authenticated');
    }
    updateListeners();
}

function showWelcomeModal(userName) {
    const userNameElement = document.getElementById('userName');
    const modalElement = document.getElementById('welcomeModal');
    
    if (userNameElement && modalElement) {
        userNameElement.textContent = userName;
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

function updateListeners() {
    const authBtn = document.getElementById("auth-button");
    if(authBtn) {
        authBtn.onclick = authBtnClick;
    }

    const exitBtn = document.getElementById("exit-button");
    if(exitBtn) {
        exitBtn.onclick = exitBtnClick;
    }
}

function exitBtnClick() {
    window.localStorage.removeItem('token');
    updateAuthBlock();
}

function authBtnClick() {
    authenticate()
    .then(token => {
        window.localStorage.setItem('token', token);
        updateAuthBlock();
    })
}

function authenticate() {   
    const token = "eyJ1c2VyIjogIll1c3lwaXYgT2xleGFuZHIiLCAidGltZXN0YW1wIjogIjIwMjUtMDYtMjhUMTE6NDg6MTkrMDM6MDAifQ==";    
    return new Promise((resolve) => {
        setTimeout(() => resolve(token), 600);
    });
}