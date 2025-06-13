document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let selectedShape = 'square';
    let selectedColor = 'black';
    const shapeSize = 40;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

document.querySelectorAll('.shape-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedShape = btn.dataset.shape;
            document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
});

document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedColor = btn.style.backgroundColor;
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
});

document.getElementById('clear-btn').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('click', (event) => {
        if (selectedShape !== 'pen') {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            drawShape(x, y, selectedShape, selectedColor);
        }
});

canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = event.clientX - rect.left;
        lastY = event.clientY - rect.top;
        if (selectedShape === 'pen') {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.strokeStyle = selectedColor;
            ctx.lineWidth = 2;
        }
});

canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            const rect = canvas.getBoundingClientRect();
            const currentX = event.clientX - rect.left;
            const currentY = event.clientY - rect.top;
            if (selectedShape === 'pen') {
                ctx.lineTo(currentX, currentY);
                ctx.stroke();
                lastX = currentX;
                lastY = currentY;
            } else {
                lastX = currentX;
                lastY = currentY;
            }
        }
});

canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        if (selectedShape !== 'pen') {
            const rect = canvas.getBoundingClientRect();
            const currentX = lastX;
            const currentY = lastY;
            drawShape(lastX, lastY, selectedShape, selectedColor, currentX, currentY);
        }
});

canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
});

function drawShape(x1, y1, shape, color, x2 = x1 + shapeSize, y2 = y1 + shapeSize) {
        ctx.fillStyle = color;
        ctx.beginPath();
        if (shape === 'square') {
            ctx.fillRect(x1 - shapeSize / 2, y1 - shapeSize / 2, shapeSize, shapeSize);
        } else if (shape === 'circle') {
            ctx.arc(x1, y1, shapeSize / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (shape === 'diamond') {
            ctx.moveTo(x1, y1 - shapeSize / 2);
            ctx.lineTo(x1 + shapeSize / 2, y1);
            ctx.lineTo(x1, y1 + shapeSize / 2);
            ctx.lineTo(x1 - shapeSize / 2, y1);
            ctx.closePath();
            ctx.fill();
        } else if (shape === 'triangle') {
            ctx.moveTo(x1, y1 - shapeSize / 2);
            ctx.lineTo(x1 + shapeSize / 2, y1 + shapeSize / 2);
            ctx.lineTo(x1 - shapeSize / 2, y1 + shapeSize / 2);
            ctx.closePath();
            ctx.fill();
        } else if (shape === 'barn') {
            ctx.fillRect(x1 - shapeSize / 2, y1 - shapeSize / 4, shapeSize, shapeSize / 2);
            ctx.moveTo(x1 - shapeSize / 2, y1 - shapeSize / 4);
            ctx.lineTo(x1, y1 - shapeSize / 2);
            ctx.lineTo(x1 + shapeSize / 2, y1 - shapeSize / 4);
            ctx.closePath();
            ctx.fill();
        }
    }
});