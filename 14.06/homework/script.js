function asyncOperation(delay, shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const timestamp = new Date().toLocaleTimeString('uk-UA');
            if (shouldFail) {
                reject(`${timestamp} завершено з помилкою`);
            } else {
                resolve(`${timestamp} завершено успішно`);
            }
        }, delay);
    });
}

function addMessage(message, isError = false) {
    const output = document.getElementById('output');
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert ${isError ? 'alert-danger' : 'alert-success'} mt-2`;
    messageDiv.textContent = message;
    output.appendChild(messageDiv);
}

document.getElementById('startThenBtn').addEventListener('click', () => {
    const delay = parseInt(document.getElementById('delayInput').value) || 1000;
    const shouldFail = document.getElementById('error').checked;
    const timestamp = new Date().toLocaleTimeString('uk-UA');
    addMessage(`${timestamp} виклик (.then)`);

    asyncOperation(delay, shouldFail)
        .then(result => addMessage(result))
        .catch(error => addMessage(error, true));
});

document.getElementById('startAwaitBtn').addEventListener('click', async () => {
    const delay = parseInt(document.getElementById('delayInput').value) || 1000;
    const shouldFail = document.getElementById('error').checked;
    const timestamp = new Date().toLocaleTimeString('uk-UA');
    addMessage(`${timestamp} виклик (await)`);

    try {
        const result = await asyncOperation(delay, shouldFail);
        addMessage(result);
    } catch (error) {
        addMessage(error, true);
    }
});