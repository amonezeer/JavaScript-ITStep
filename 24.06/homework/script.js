const authContent = `<button id="exit-button" class="btn btn-danger">Вихід з системи</button>`;
const anonContent = `<button id="auth-button" class="btn btn-dark">Вхід до системи</button>`;

document.addEventListener('DOMContentLoaded', () => {
    updateAuthBlock();
});

function authenticate() {   
    const token = "eyJ1c2VyIjogIll1c3lwaXYgT2xleGFuZHIiLCAidGltZXN0YW1wIjogIjIwMjUtMDYtMjhUMTI6MDE6NTIrMDM6MDAifQ==";
    return new Promise((resolve) => {
        setTimeout(() => resolve(token), 600);
    });
}

function updateListeners() {
    const authBtn = document.getElementById("auth-button");
    if(authBtn) authBtn.onclick = authBtnClick;

    const exitBtn = document.getElementById("exit-button");
    if(exitBtn) exitBtn.onclick = exitBtnClick;
}

function authBtnClick() {
    authenticate()
    .then(token => {
        window.localStorage.setItem('token', token);
        updateAuthBlock();
    })
    .catch(error => {
        console.error("Помилка автентифікації:", error);
        showErrorModal("Помилка входу в систему");
    });
}

function exitBtnClick() {
    window.localStorage.removeItem('token');
    updateAuthBlock();
    showInfoModal("Сесія завершена", "Ви успішно вийшли з системи");
}

function decodeToken(token) {
    try {
        const decoded = atob(token);
        return JSON.parse(decoded);
    } catch (e) {
        console.error("Помилка декодування токену:", e);
        return null;
    }
}

function isTokenValid(tokenData) {
    if (!tokenData || !tokenData.timestamp) return false;
    
    try {
        const tokenDate = new Date(tokenData.timestamp);
        const now = new Date();
        
        const tokenValidUntil = new Date(tokenDate.getTime() + 24 * 60 * 60 * 1000);
        
        return {
            isValid: now < tokenValidUntil,
            validUntil: tokenValidUntil,
            timeLeft: Math.max(0, tokenValidUntil - now)
        };
    } catch (e) {
        console.error("Помилка перевірки токену:", e);
        return { isValid: false };
    }
}

function formatTimeLeft(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
        return `${hours} год. ${minutes} хв.`;
    } else if (minutes > 0) {
        return `${minutes} хв. ${seconds} сек.`;
    } else {
        return `${seconds} сек.`;
    }
}

function updateAuthBlock() {
    const authBlock = document.getElementById("auth-block");
    if(!authBlock) {
        console.error("Блок авторизації не знайдено");
        return;
    }

    const token = window.localStorage.getItem('token');
    
    if(token) {
        const payload = decodeToken(token);
        const validity = isTokenValid(payload);
        
        if(!payload || !validity.isValid) {
            console.error("Недійсний або прострочений токен");
            exitBtnClick();
            return;
        }

        authBlock.innerHTML = authContent;
        
        const userInfo = document.createElement("div");
        userInfo.className = "user-info mt-3 p-3 bg-light rounded";
        
        const name = document.createElement("h5");
        name.innerHTML = `<i class="bi bi-person-fill"></i> Користувач: <strong>${payload.user}</strong>`;
        
        const timestamp = document.createElement("div");
        timestamp.className = "mt-2";
        const tokenDate = new Date(payload.timestamp);
        
        timestamp.innerHTML = `
            <div class="d-flex align-items-center mb-1">
                <i class="bi bi-clock-history me-2"></i>
                <span>Час авторизації: <strong>${tokenDate.toLocaleString('uk-UA')}</strong></span>
            </div>
            <div class="d-flex align-items-center">
                <i class="bi bi-calendar-check me-2"></i>
                <span>Дійсний до: <strong class="text-dark">${validity.validUntil.toLocaleString('uk-UA')}</strong></span>
            </div>
        `;
        
        userInfo.appendChild(name);
        userInfo.appendChild(timestamp);
        authBlock.appendChild(userInfo);
        
        if (!authBlock.dataset.authenticated) {
            showWelcomeModal(payload.user, validity);
            authBlock.dataset.authenticated = "true";
        }
    } else {
        authBlock.innerHTML = anonContent;
        authBlock.removeAttribute('data-authenticated');
    }
    
    updateListeners();
}

function showWelcomeModal(userName, validity) {
    const userNameElement = document.getElementById('userName');
    const timeLeftElement = document.getElementById('modal-time-left');
    const modalElement = document.getElementById('welcomeModal');
    
    if (userNameElement && timeLeftElement && modalElement) {
        userNameElement.textContent = userName;
        timeLeftElement.textContent = formatTimeLeft(validity.timeLeft);
        
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
        const timerInterval = setInterval(() => {
            const newTimeLeft = validity.validUntil - new Date();
            if (newTimeLeft <= 0) {
                clearInterval(timerInterval);
                timeLeftElement.innerHTML = '<span class="text-danger">Термін дії закінчився</span>';
                setTimeout(() => {
                    modal.hide();
                    exitBtnClick();
                }, 3000);
            } else {
                timeLeftElement.innerHTML = `
                    <span class="text-danger">${formatTimeLeft(newTimeLeft)}</span>
                    <small class="text-muted">(до ${validity.validUntil.toLocaleTimeString('uk-UA')})</small>
                `;
            }
        }, 1000);
   
        modalElement.addEventListener('hidden.bs.modal', () => {
            clearInterval(timerInterval);
        });
    }
}

function showInfoModal(title, message) {
    const infoModal = `
        <div class="modal fade" id="infoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <i class="bi bi-info-circle-fill text-dark" style="font-size: 3rem;"></i>
                        <p class="mt-3">${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
const modalContainer = document.createElement('div');
modalContainer.innerHTML = infoModal;
document.body.appendChild(modalContainer);
const modal = new bootstrap.Modal(document.getElementById('infoModal'));
modal.show();
modalContainer.querySelector('.modal').addEventListener('hidden.bs.modal', () => {
    document.body.removeChild(modalContainer);
});
}

function showErrorModal(message) {
    const errorModal = `
        <div class="modal fade" id="errorModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">Помилка</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <i class="bi bi-exclamation-triangle-fill text-danger" style="font-size: 3rem;"></i>
                        <p class="mt-3">${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Зрозуміло</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
const modalContainer = document.createElement('div');
modalContainer.innerHTML = errorModal;
document.body.appendChild(modalContainer);


const modal = new bootstrap.Modal(document.getElementById('errorModal'));
modal.show();

modalContainer.querySelector('.modal').addEventListener('hidden.bs.modal', () => {
    document.body.removeChild(modalContainer);
});
}