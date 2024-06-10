async function handleResetPassword(event) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const uid = params.get('uid');
    const token = params.get('token');

    if (!uid || !token) {
        showMessage('Invalid reset link.', 'error');
        return;
    }

    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    const response = await fetch(`http://127.0.0.1:8000/api/user/reset-password/${uid}/${token}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, password2 })
    });

    const result = await response.json();
    if (response.ok) {
        showMessage('Password reset successfully. Redirecting to login...', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000); // Redirect after 3 seconds
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
