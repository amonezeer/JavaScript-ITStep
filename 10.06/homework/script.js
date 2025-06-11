document.getElementById('colorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('colorName').value.trim().toLowerCase();
    const type = document.getElementById('colorType').value;
    const code = document.getElementById('colorCode').value.trim();
    const nameError = document.getElementById('nameError');
    const codeError = document.getElementById('codeError');
    const colorsList = document.getElementById('colorsList');
    const existingColors = Array.from(colorsList.getElementsByClassName('color-item')).map(item => item.dataset.name.toLowerCase());

    nameError.textContent = '';
    codeError.textContent = '';

    if (!/^[a-zA-Z]+$/.test(name)) {
        nameError.textContent = 'Колір може містити тільки літери';
        return;
    }
    if (existingColors.includes(name)) {
        nameError.textContent = 'Така назва кольору вже існує';
        return;
    }

    let isValid = false;
    if (type === 'RGB') {
        const rgbPattern = /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/;
        if (rgbPattern.test(code)) {
            const [r, g, b] = code.split(',').map(Number);
            isValid = r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
        }
    } else if (type === 'RGBA') {
        const rgbaPattern = /^(\d{1,3}),(\d{1,3}),(\d{1,3}),(0(\.\d+)?|1(\.0+)?)$/;
        if (rgbaPattern.test(code)) {
            const [r, g, b, a] = code.split(',').map(Number);
            isValid = r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1;
        }
    } else if (type === 'HEX') {
        const hexPattern = /^#([A-Fa-f0-9]{6})$/;
        isValid = hexPattern.test(code);
    }

    if (!isValid) {
        codeError.textContent = `${type} код має відповідати шаблону`;
        if (type === 'RGB') codeError.textContent += ' [0-255], [0-255], [0-255]';
        else if (type === 'RGBA') codeError.textContent += ' [0-255], [0-255], [0-255], [0-1]';
        else if (type === 'HEX') codeError.textContent += ' #RRGGBB';
        return;
    }

    const colorDiv = document.createElement('div');
    colorDiv.className = 'color-item';
    colorDiv.dataset.name = name;
    colorDiv.style.backgroundColor = type === 'HEX' ? code : `rgb(${code})`;
    colorDiv.innerHTML = `<h3>${name.toUpperCase()}</h3><p>${type}<br>${code}</p>`;
    colorsList.appendChild(colorDiv);
    this.reset();
});