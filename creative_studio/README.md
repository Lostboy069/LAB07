# Creative Studio — Flask Web Application

A modern, responsive multi-page website built with **Python Flask** and a simulated login/registration system (no database required).

---

## 📁 Project Structure

```
creative_studio/
├── app.py                  ← Flask application & all routes
├── requirements.txt        ← Python dependencies
├── templates/              ← Jinja2 HTML templates
│   ├── base.html           ← Shared layout (navbar, footer, flash messages)
│   ├── index.html          ← Home page        (/)
│   ├── about.html          ← About page       (/about)
│   ├── services.html       ← Services page    (/services)
│   ├── gallery.html        ← Gallery page     (/gallery)
│   ├── contact.html        ← Contact page     (/contact)
│   ├── login.html          ← Login page       (/login)
│   └── register.html       ← Register page    (/register)
└── static/
    ├── css/
    │   └── style.css       ← All styling (CSS variables, responsive)
    └── js/
        └── main.js         ← Gallery filter, hamburger nav, smooth scroll
```

---

## 🚀 How to Run

### 1. Install dependencies
```bash
pip install flask
```
Or use the requirements file:
```bash
pip install -r requirements.txt
```

### 2. Run the Flask app
```bash
python app.py
```

### 3. Open in browser
```
http://127.0.0.1:5000/
```

---

## 🔐 Login & Registration System

- **Simulated** using Python's in-memory dictionary (`users = {}`).
- **No database or file storage** is used — data resets when the server restarts.
- **Register** → validates all fields → checks for duplicate username/email → saves to `users` dict → redirects to login.
- **Login** → checks credentials against `users` dict → stores username in Flask `session` → redirects to home.
- **Logout** → clears the Flask session → redirects to home.
- Flash messages display success/error feedback on every action.
- ⚠️ Passwords are stored in plaintext for demo purposes only. Real applications must use hashing (e.g. `werkzeug.security.generate_password_hash`).

---

## ✨ Features

- ✅ 7 fully styled pages with Flask routes
- ✅ Jinja2 base template — no repeated navbar/footer HTML
- ✅ Active nav link highlighting via `request.endpoint`
- ✅ Flask flash messages for form feedback
- ✅ Server-side form validation (contact & auth forms)
- ✅ Session-based login state (shows user name + Logout in nav)
- ✅ Gallery filter (All / Web / App / Branding) via JavaScript
- ✅ Mobile hamburger navigation
- ✅ Fully responsive CSS (mobile, tablet, desktop)
