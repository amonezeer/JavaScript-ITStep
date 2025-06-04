document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('modal');

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        console.log('Модальне вікно відкрито');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        console.log('Модальное вікно закрито');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            console.log('Модальное вікно закрито по кліку на фон');
        }
    });
});