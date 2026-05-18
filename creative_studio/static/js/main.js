// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// ===== Simulated User Database (In-Memory) =====
let users = [];

// Load users from localStorage if available
if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
}

// ===== Login Form Handler =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const messageDiv = document.getElementById('loginMessage');
        
        // Find user in our simulated database
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Successful login
            localStorage.setItem('currentUser', JSON.stringify(user));
            showMessage(messageDiv, 'Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Failed login
            showMessage(messageDiv, 'Invalid username or password. Please try again.', 'error');
        }
    });
}

// ===== Register Form Handler =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const messageDiv = document.getElementById('registerMessage');
        
        // Validation
        if (password !== confirmPassword) {
            showMessage(messageDiv, 'Passwords do not match!', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage(messageDiv, 'Password must be at least 6 characters long.', 'error');
            return;
        }
        
        // Check if username already exists
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            showMessage(messageDiv, 'Username already exists. Please choose another.', 'error');
            return;
        }
        
        // Check if email already exists
        const existingEmail = users.find(u => u.email === email);
        if (existingEmail) {
            showMessage(messageDiv, 'Email already registered. Please use another email.', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            fullname,
            email,
            username,
            password, // In real app, this should be hashed!
            createdAt: new Date().toISOString()
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage (simulating database)
        localStorage.setItem('users', JSON.stringify(users));        
        showMessage(messageDiv, 'Registration successful! Redirecting to login...', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        const formData = {
            name,
            email,
            subject,
            message,
            submittedAt: new Date().toISOString()
        };
        
        // Store in localStorage (simulating database)
        let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts.push(formData);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ===== Gallery Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== Helper Functions =====
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = 'message ' + type;
    
    setTimeout(() => {
        element.className = 'message';
    }, 5000);
}

// ===== Check if user is logged in =====
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        console.log('Logged in as:', user.username);
        // You can update UI to show user info here
    }
}

// ===== Logout Function =====
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
});