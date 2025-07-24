document.addEventListener('DOMContentLoaded', () => {
    // === Header Shrink on Scroll (from main style.css) ===
    const header = document.querySelector('.header');
    if (header) { // Ensure header exists
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Adjust scroll threshold as needed
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // === Login Form Functionality ===
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username_login');
    const passwordInput = document.getElementById('password_login');
    const authContainer = document.querySelector('.auth-container');
    const togglePassword = document.getElementById('togglePassword');

    if (loginForm) { // Ensure loginForm exists
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === '' || password === '') {
                // Add shake animation
                authContainer.classList.add('shake');
                // Remove shake animation after it completes
                authContainer.addEventListener('animationend', () => {
                    authContainer.classList.remove('shake');
                }, { once: true }); // Only run once

                alert('Please fill in both username/email and password.'); // Basic validation alert
                return;
            }

            // Basic validation: For a real application, you'd send data to a server
            if (username === 'user@example.com' && password === 'password123') {
                alert('Login successful!');
                window.location.href = 'index.html'; // Redirect to home page on success
            } else {
                authContainer.classList.add('shake');
                authContainer.addEventListener('animationend', () => {
                    authContainer.classList.remove('shake');
                }, { once: true });
                alert('Invalid username/email or password.');
            }
        });
    }

    // === Toggle Password Visibility ===
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle the eye icon
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // === Animation on Scroll (if you use this on other pages too) ===
    // This part is generally for sections, not the login form itself.
    // If you apply .animate-on-scroll to the login container, it will work.
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Optional: remove 'is-visible' if you want animation to repeat when scrolling back up
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // When 10% of the element is visible
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });
});