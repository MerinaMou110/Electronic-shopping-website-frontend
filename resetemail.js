async function handleResetPasswordEmail(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    const response = await fetch('http://127.0.0.1:8000/api/user/send-reset-password-email/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });

    const result = await response.json();
    if (response.ok) {
        showMessage(result.msg, 'success');
    } else {
        showMessage(result.errors, 'error');
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    const messageCard = document.getElementById('message-card');

    messageDiv.textContent = message;
    if (type === 'success') {
        messageDiv.classList.add('text-green-500');
        messageDiv.classList.remove('text-red-500');
    } else {
        messageDiv.classList.add('text-red-500');
        messageDiv.classList.remove('text-green-500');
    }

    messageCard.classList.remove('hidden');
}

function dismissMessageCard() {
    const messageCard = document.getElementById('message-card');
    messageCard.classList.add('hidden');
}
