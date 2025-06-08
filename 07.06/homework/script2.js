document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const q1 = document.querySelector('input[name="q1"]:checked').value === 'Київ';
    const q2 = document.querySelector('input[name="q2"]:checked').value === 'Синій і жовтий';
    const q3 = document.querySelector('input[name="q3"]:checked').value === 'Говерла';
    const q4 = document.querySelector('input[name="q4"]:checked').value === 'Дніпро';
    const q5 = document.querySelector('input[name="q5"]:checked').value === '482';
    const correctAnswers = (q1 ? 1 : 0) + (q2 ? 1 : 0) + (q3 ? 1 : 0) + (q4 ? 1 : 0) + (q5 ? 1 : 0);
    
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Результат: ${correctAnswers} правильних відповідей з 5 питань.`;
    resultDiv.className = 'alert alert-success mt-4';
    resultDiv.style.display = 'block';
    
    this.querySelectorAll('input, button').forEach(element => element.disabled = true);
});