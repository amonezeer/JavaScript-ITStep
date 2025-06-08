document.getElementById('messageForm').addEventListener('submit', function(e) {
e.preventDefault();
const name = document.getElementById('name').value;
const message = document.getElementById('message').value;
const now = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString();
            
const messageDiv = document.createElement('div');
messageDiv.className = 'card mb-2';
messageDiv.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${name} - ${now}</h5>
         <p class="card-text">${message}</p>
     </div>     `; 
document.getElementById('messageList').prepend(messageDiv);
this.reset();
});