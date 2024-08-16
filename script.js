
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('[data-collapse-toggle]');
    const mobileMenu = document.getElementById('mobile-menu-2');

    toggleButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});



document.querySelectorAll('[data-accordion-target]').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.getAttribute('data-accordion-target'));
        const expanded = button.getAttribute('aria-expanded') === 'true';

        button.setAttribute('aria-expanded', !expanded);
        target.classList.toggle('hidden', expanded);
    });
});



// condition profile based on role and hide navbar sigup,login for authentication

  document.addEventListener('DOMContentLoaded', function() {
    const access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    // const role = localStorage.getItem('role');

    const profileLinkContainer = document.querySelector('#profileLinkContainer');
    const mobileProfileLinkContainer = document.querySelector('#mobileProfileLinkContainer');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const logoutLink = document.getElementById('logoutLink');

    let profileLink = '';

    if (access && refresh) {
        // If user is authenticated
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'block';

        
            profileLink = '<a href="/dashboard/dashboard.html" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Profile</a>';
       
           
        

        profileLinkContainer.innerHTML = profileLink;
        mobileProfileLinkContainer.innerHTML = profileLink;
    } else {
        // If user is not authenticated
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';
        logoutLink.style.display = 'none';
        profileLinkContainer.innerHTML = '';
        mobileProfileLinkContainer.innerHTML = '';
    }
});