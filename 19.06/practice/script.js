document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('buttons-container');
    if(!container) throw "#button-container not found";
    const input = document.querySelector('input');
    const createButton = document.querySelector('button');
    
    if (!container) throw "#buttons-container not found";
    if (!input) throw "input not found";
    if (!createButton) throw "button not found";

    createButton.addEventListener('click', () => {
        container.innerHTML = '';
        const N = parseInt(input.value) || 10;
        for (let i = 1; i <= N; i++) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-dark m-1';
            btn.textContent = i;
            btn.addEventListener('click', () => {
                alert(`Кнопка номер ${i}`);
            });
            container.appendChild(btn);
        }
    });
    createButton.click();

    for(let i = 1; i <10; i++) {
        var btn = document.createElement('button');
        btn.innerText = i;
        btn.onclick = () => alert(i);
        container.appendChild(btn); 
    }

    window.field = document.getElementById("field-block");
    if(!field) throw "#field-block not found";
    window.ball = document.getElementById("ball-block");
    if(!ball) throw "#ball-block not found";
    window.brick = document.getElementById("brick-block");
    if(!brick) throw "#brick-block not found";
    
    window.ball.vx = -2;
    window.ball.vy = -2;
    moveball();
});

function moveball() {
    let posX = Number(window.ball.offsetLeft) + Number(window.ball.vx);
    let posY = Number(window.ball.offsetTop) + Number(window.ball.vy);
    
    if(posY <= 0) {
        posY = 0;
        window.ball.vy *= -1;
    }
    if(posX <= 0) {
        posX = 0;
        window.ball.vx *= -1;
    }
    if(posX >= field.clientWidth - window.ball.offsetWidth) {
        posX = field.clientWidth - window.ball.offsetWidth;
        window.ball.vx *= -1;
    }
    if(posY >= field.clientHeight - window.ball.offsetHeight) {
        posY = field.clientHeight - window.ball.offsetHeight;
        window.ball.vy *= -1;
    }
    
    const ballRect = window.ball.getBoundingClientRect();
    const brickRect = window.brick.getBoundingClientRect();
    
    if (ballRect.right > brickRect.left && 
        ballRect.left < brickRect.right && 
        ballRect.bottom > brickRect.top && 
        ballRect.top < brickRect.bottom) {
        
        const ballCenterX = ballRect.left + ballRect.width / 2;
        const ballCenterY = ballRect.top + ballRect.height / 2;
        const brickCenterX = brickRect.left + brickRect.width / 2;
        const brickCenterY = brickRect.top + brickRect.height / 2;
        
        const dx = ballCenterX - brickCenterX;
        const dy = ballCenterY - brickCenterY;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            window.ball.vx *= -1;
            posX = window.ball.offsetLeft + window.ball.vx;
            console.log('Відскок від кругу по горизонталі');
        } else {
            window.ball.vy *= -1;
            posY = window.ball.offsetTop + window.ball.vy;
            console.log('Відскок від кругу по вертикалі');
        }
    }
    
    window.ball.style.left = posX + 'px';
    window.ball.style.top = posY + 'px';
    setTimeout(moveball, 17);
}