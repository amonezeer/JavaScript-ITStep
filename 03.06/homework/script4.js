document.addEventListener('DOMContentLoaded', () => {
    const redLight = document.getElementById('red');
    const yellowLight = document.getElementById('yellow');
    const greenLight = document.getElementById('green');
    const nextBtn = document.getElementById('next-btn');

    let currentColor = 'red';

    function changeLight() {
        redLight.classList.remove('active');
        yellowLight.classList.remove('active');
        greenLight.classList.remove('active');

        if (currentColor === 'red') {
            yellowLight.classList.add('active');
            currentColor = 'yellow';
            console.log('Світлофор переключено на жовтий');
        } else if (currentColor === 'yellow') {
            greenLight.classList.add('active');
            currentColor = 'green';
            console.log('Світлофор переключено на зелений');
        } else {
            redLight.classList.add('active');
            currentColor = 'red';
            console.log('Світлофор переключено на червоний');
        }
    }

    nextBtn.addEventListener('click', changeLight);
    redLight.classList.add('active');
});