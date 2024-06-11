document.addEventListener('DOMContentLoaded', () => {
    // Fetch user information when the page loads
    fetchUserProfile();
});

async function fetchUserProfile() {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        console.error('No access token found');
        return;
    }

    try {
        const response = await fetch('https://electronic-shopping-website-as07.onrender.com/api/user/profile/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const user = await response.json();
            console.log('User data:', user);
            document.getElementById('username').value = user.name || '';
            document.getElementById('first-name').value = user.first_name || '';
            document.getElementById('last-name').value = user.last_name || '';
            document.getElementById('email').value = user.email || '';
        } else {
            const errorData = await response.json();
            console.error('Failed to fetch user profile:', errorData);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

async function handleProfileUpdate(event) {
    event.preventDefault();

    const token = localStorage.getItem('accessToken');
    const username = document.getElementById('username').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;

    if (!token) {
        console.error('No access token found');
        return;
    }

    try {
        const response = await fetch('https://electronic-shopping-website-as07.onrender.com/api/user/profile/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: username,
                first_name: firstName,
                last_name: lastName,
                email: email
            })
        });

        const result = await response.json();
        const messageDiv = document.getElementById('message');

        if (response.ok) {
            messageDiv.textContent = 'Profile updated successfully!';
            messageDiv.classList.remove('text-red-500');
            messageDiv.classList.add('text-green-500');
        } else {
            messageDiv.textContent = result.error || 'Profile update failed. Please try again.';
            messageDiv.classList.remove('text-green-500');
            messageDiv.classList.add('text-red-500');
        }
    } catch (error) {
        console.error('Error during profile update:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = 'An error occurred. Please try again.';
        messageDiv.classList.remove('text-green-500');
        messageDiv.classList.add('text-red-500');
    }
}