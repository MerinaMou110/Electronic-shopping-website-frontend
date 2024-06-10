async function handleChangePassword(event) {
    event.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const messageCard = document.getElementById('message-card');
    const messageDiv = document.getElementById('message');

    if (newPassword !== confirmPassword) {
        showMessage('New passwords do not match.', 'error');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/api/user/changepassword/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
                new_password2: confirmPassword
            })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Password changed successfully.', 'success');
        } else {
            const errorMsg = data?.errors?.non_field_errors?.[0] || 'Failed to change password.';
            showMessage(errorMsg, 'error');
        }
    } catch (error) {
        showMessage('An error occurred. Please try again.', 'error');
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
