document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name-input');

    nameInput.addEventListener('input', (e) => {
        const value = e.target.value;
        console.log('Поточне значення введення:', value); 
        const lastChar = value.slice(-1);
        if (/[0-9]/.test(lastChar)) {
            console.log('Виявлено цифра:', lastChar); 
            e.target.value = value.replace(/[0-9]/g, ''); 
        }
    });
});