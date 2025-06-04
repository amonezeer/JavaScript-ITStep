document.addEventListener('DOMContentLoaded', () => {
    const field = document.getElementById('field');
    const ball = document.getElementById('ball');

    field.addEventListener('click', (e) => {
        const fieldRect = field.getBoundingClientRect();
        const ballWidth = ball.offsetWidth;
        const ballHeight = ball.offsetHeight;

        let newX = e.clientX - fieldRect.left - ballWidth / 2;
        let newY = e.clientY - fieldRect.top - ballHeight / 2;

        newX = Math.max(0, Math.min(newX, fieldRect.width - ballWidth));
        newY = Math.max(0, Math.min(newY, fieldRect.height - ballHeight));

        ball.style.left = newX + 'px';
        ball.style.top = newY + 'px';

        if (newX <= 0 || newX >= fieldRect.width - ballWidth || newY <= 0 || newY >= fieldRect.height - ballHeight) {
            console.log('М’яч за полем');
        } else {
            console.log('М’яч переміщено на координати:', newX, newY);
        }
    });
});