function logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (refreshToken && accessToken) {
        fetch('http://127.0.0.1:8000/api/user/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        })
        .then(response => {
            if (response.ok) {
                // Remove tokens from local storage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('role');
                localStorage.removeItem('id');

                // Redirect to the login page or any other desired page
                window.location.href = 'login.html';
            } else {
                response.json().then(data => {
                    console.error('Logout failed:', data);
                });
            }
        })
        .catch(error => console.error('Error during logout:', error));
    } else {
        console.error('No refresh token or access token found.');
    }
}
