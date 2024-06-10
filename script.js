
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



// condition profile

document.addEventListener('DOMContentLoaded', function() {
    const role = localStorage.getItem('role');
    const profileLinkContainer = document.querySelector('#profileLinkContainer');

    let profileLink = '';

    if (role === 'admin') {
        profileLink = '<a href="../dashboard/admin_dashboard.html" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Admin Profile</a>';
    } else if (role === 'superadmin') {
        profileLink = '<a href="../dashboard/superadmin_dashboard.html" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Superadmin Profile</a>';
    } else {
        profileLink = '<a href="../dashboard/user_dashboard.html" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">User Profile</a>';
    }

    profileLinkContainer.innerHTML = profileLink;
});