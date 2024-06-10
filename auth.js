document.getElementById('registrationForm').addEventListener('submit', handleRegistration);

function handleRegistration(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
   
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const tc = document.getElementById('tc').checked;
    const errorDiv = document.getElementById('error');
    const successDiv = document.getElementById('success');

    // Clear previous messages
    errorDiv.textContent = '';
    successDiv.textContent = '';

    if (password !== confirmPassword) {
        errorDiv.textContent = "Passwords do not match!";
        return;
    }

    fetch('http://127.0.0.1:8000/api/user/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            name: username,
            first_name: firstName,
            last_name: lastName,
            password: password,
            password2: confirmPassword,
            tc: tc,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            errorDiv.textContent = data.error;
        } else {
            successDiv.textContent = 'Registration successful. Please check your email to activate your account.';
            // Optionally clear the form
            document.getElementById('registrationForm').reset();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        errorDiv.textContent = 'An error occurred during registration.';
    });
}




// for login
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email-address').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const result = await response.json();

        const messageDiv = document.getElementById('message');

        if (response.ok) {
            // Store token, role, and ID in local storage
            localStorage.setItem('accessToken', result.token.access);
            localStorage.setItem('refreshToken', result.token.refresh);
            localStorage.setItem('role', result.role);
            localStorage.setItem('id', result.user_id);

            messageDiv.textContent = 'Login successful!';
            messageDiv.classList.remove('text-red-500');
            messageDiv.classList.add('text-green-500');

            // Redirect based on role
            if (result.role === 'admin') {
                window.location.href = '../dashboard/admin_dashboard.html';
            } else if (result.role === 'superadmin') {
                window.location.href = '../dashboard/superadmin_dashboard.html';
            } else {
                window.location.href = '../dashboard/user_dashboard.html';
            }
        } else {
            messageDiv.textContent = result.error || 'Login failed. Please try again.';
            messageDiv.classList.remove('text-green-500');
            messageDiv.classList.add('text-red-500');
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = 'An error occurred. Please try again.';
        messageDiv.classList.remove('text-green-500');
        messageDiv.classList.add('text-red-500');
    }
}


