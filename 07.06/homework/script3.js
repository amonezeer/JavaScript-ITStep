document.getElementById('textForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bold = document.getElementById('bold').checked;
    const underline = document.getElementById('underline').checked;
    const italics = document.getElementById('italics').checked;
    const fontSize = document.getElementById('fontSize').value;
    const fontColor = document.getElementById('fontColor').value;
    const align = document.querySelector('input[name="align"]:checked').value;
    const text = document.getElementById('textInput').value;

    let styledText = text;
    if (bold) styledText = `<strong>${styledText}</strong>`;
    if (underline) styledText = `<u>${styledText}</u>`;
    if (italics) styledText = `<em>${styledText}</em>`;
    styledText = `<span style="font-size: ${fontSize}px; color: ${fontColor}">${styledText}</span>`;
    styledText = `<div style="text-align: ${align}">${styledText}</div>`;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Результат (оформлено о ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' })}):<br>${styledText}`;
    resultDiv.className = 'alert mt-4';
    resultDiv.style.display = 'block';

    this.querySelectorAll('input, button, select, textarea').forEach(element => element.disabled = true);
});