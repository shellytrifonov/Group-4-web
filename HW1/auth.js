/* ----------------------- Login ----------------------- */
let logedFlag = false;
let currentUser = null;
let userName = null;
let userPic = null;

document.addEventListener('DOMContentLoaded', () => {
    // Handle restricted links for unauthorized users
    const restrictedLinks = document.querySelectorAll('a[data-restricted="true"]');
    restrictedLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (!logedFlag) {
                event.preventDefault(); // Prevent navigation
                window.location.href = 'restricted.html'; // Redirect to restricted page
            }
        });
    });

    // Highlight the current page in the navigation
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Retrieve login state and user details from localStorage
    logedFlag = localStorage.getItem('logedFlag') === 'true'; // Convert to boolean
    currentUser = localStorage.getItem('currentUser');
    userName = localStorage.getItem('userName');
    userPic = localStorage.getItem('userPic');

    // Update UI for logged-in users
    const checkLoged = () => {
        if (logedFlag) {
            document.querySelector('.auth-buttons').classList.add('hidden');
            document.querySelector('.user-navigation').classList.remove('hidden');
            document.querySelector('.user-navigation p').textContent = `Hello, ${userName}`;
            const profilePic = userPic || "./assets/images/default_profile.png";
            document.getElementById('userProfilePic').src = profilePic;
            console.log(`Welcome back, ${currentUser}`);
        }
    };
    checkLoged();

    // Profile page-specific logic
    if (window.location.pathname.includes('profile.html')) {
        if (logedFlag) {
            // Update profile page content
            document.getElementById('profile-name').textContent = userName;
            const profilePic = userPic || "./assets/images/default_profile.png";
            document.getElementById('profile-picture').src = profilePic;
        } else {
            // Redirect to login if user is not logged in
            window.location.href = 'login.html';
        }
    }

    // Handle logout
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            logedFlag = false;
            currentUser = null;
            // Clear login state from localStorage
            localStorage.removeItem('logedFlag');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userName');
            localStorage.removeItem('userPic');
            document.querySelector('.auth-buttons').classList.remove('hidden');
            window.location.href = 'index.html'; // Redirect to homepage
        });
    }
});

// Users array
const users = [
    { firstName: 'Guy', lastName: 'Naeh', email: 'guylay12@gmail.com', password: '319002366', profilePic: "./assets/images/guy_profile.jpeg" },
    { firstName: 'Maor', lastName: 'Tzur', email: 'maortz42@gmail.com', password: '316313543', profilePic: './assets/images/maor_profile.png' },
    { email: 'liroy', password: '1234' },
    { email: 'yuval', password: '1234' },
    { email: 'shelly', password: '1234' }
];

// Registration function
const register = (user, pass) => {
    if (users.some(u => u.email === user)) {
        return false;
    } else {
        users.push({ email: user, password: pass });
        return true;
    }
};

// Login function
const login = (user, pass) => {
    return users.some(u => u.email === user && u.password === pass);
};

// Login form handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (!form) {
        console.error('Form element not found.');
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const errorLogin = document.querySelector('.error-login p');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (login(email, password)) {
            logedFlag = true;
            const user = users.find(u => u.email === email);
            console.log(user);
            // Save login state to localStorage
            localStorage.setItem('logedFlag', 'true');
            localStorage.setItem('currentUser', user.email);
            localStorage.setItem('userName', user.firstName);
            localStorage.setItem('userPic', user.profilePic);
            document.querySelector('.auth-buttons').classList.add('hidden');
            window.location.href = 'index.html'; // Redirect after login
        } else {
            errorLogin.textContent = 'Wrong user or password';
            errorLogin.style.color = 'red';
        }
    });
});


/* ----------------------- Sign Up ----------------------- */
// Basic validation functions
const validators = {
    isValidName: (name) => {
        let letters = /[a-zA-Z]/;
        return letters.test(name);
    },
    isValidEmail: (email) => {
        return email.includes('@') && email.includes('.');
    }
};

function validateForm(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const foodPreferences = document.querySelectorAll('input[name="foodPreferences"]:checked');
    
    let isValid = true;
    let errorMessages = [];

    // Validation checks
    if (!validators.isValidName(firstName)) {
        errorMessages.push('Please enter your first name');
        isValid = false;
    }

    if (!validators.isValidName(lastName)) {
        errorMessages.push('Please enter your last name');
        isValid = false;
    }

    if (!validators.isValidEmail(email)) {
        errorMessages.push('Please enter a valid email address');
        isValid = false;
    }

    if (password.length < 6) {
        errorMessages.push('Password must be at least 6 characters');
        isValid = false;
    }

    if (foodPreferences.length === 0) {
        errorMessages.push('Please select at least one food preference');
        isValid = false;
    }

    // Check if user already exists
    if (users.some(u => u.email === email)) {
        errorMessages.push('User with this email already exists');
        isValid = false;
    }

    if (!isValid) {
        // Show error modal
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'error-modal';
        modal.innerHTML = `
            <div class="error-icon">⚠</div>
            <ul class="error-list">
                ${errorMessages.map(msg => `<li>${msg}</li>`).join('')}
            </ul>
            <button class="close-button" onclick="closeErrorModal()">OK</button>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        return false;
    }

    // If validation passes, create new user
    const newUser = {
        firstName,
        lastName,
        email,
        password,
        profilePic: "./assets/images/default_profile.png",
        foodPreferences: Array.from(foodPreferences).map(pref => pref.value)
    };

    // Add user to array
    users.push(newUser);

    // Save to localStorage
    localStorage.setItem("logedFlag", "true");
    localStorage.setItem("currentUser", email);
    localStorage.setItem("userName", firstName);
    localStorage.setItem("userPic", newUser.profilePic);

    // Show success modal
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-icon">✓</div>
        <div class="success-message">Registration successful!</div>
        <div>Welcome, ${firstName}!</div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
    
    return false;
}

// Function to close the error modal
function closeErrorModal() {
    const modal = document.querySelector('.error-modal');
    const overlay = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
    if (overlay) overlay.remove();
}

// Handle login form if present
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            
            const userExists = users.some(u => u.email === email && u.password === password);
            if (userExists) {
                const user = users.find(u => u.email === email);
                localStorage.setItem('logedFlag', 'true');
                localStorage.setItem('currentUser', user.email);
                localStorage.setItem('userName', user.firstName);
                localStorage.setItem('userPic', user.profilePic);
                window.location.href = 'index.html';
            } else {
                const errorMessage = document.querySelector('.error-login p');
                errorMessage.textContent = 'Wrong user or password';
                errorMessage.style.color = 'red';
            }
        });
    }
});