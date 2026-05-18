from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)
app.secret_key = 'creative-studio-secret-key-2024'

# In-memory user store (simulated — resets on server restart, no database needed)
users = {}

# ─── Page Routes ──────────────────────────────────────────────────────────────

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name    = request.form.get('name', '').strip()
        email   = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()

        if not name or not email or not message:
            flash('Please fill in all required fields.', 'error')
        else:
            flash(f'Thank you, {name}! Your message has been received.', 'success')
            return redirect(url_for('contact'))

    return render_template('contact.html')

# ─── Auth Routes ───────────────────────────────────────────────────────────────

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'username' in session:
        return redirect(url_for('home'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()

        if username in users and users[username]['password'] == password:
            session['username'] = username
            session['fullname'] = users[username]['fullname']
            flash(f'Welcome back, {users[username]["fullname"]}!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid username or password.', 'error')

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'username' in session:
        return redirect(url_for('home'))

    if request.method == 'POST':
        fullname         = request.form.get('fullname', '').strip()
        email            = request.form.get('email', '').strip()
        username         = request.form.get('username', '').strip()
        password         = request.form.get('password', '').strip()
        confirm_password = request.form.get('confirm_password', '').strip()

        if not all([fullname, email, username, password, confirm_password]):
            flash('All fields are required.', 'error')
        elif len(password) < 6:
            flash('Password must be at least 6 characters.', 'error')
        elif password != confirm_password:
            flash('Passwords do not match.', 'error')
        elif username in users:
            flash('Username already taken. Please choose another.', 'error')
        elif any(u['email'] == email for u in users.values()):
            flash('Email already registered. Please use another.', 'error')
        else:
            users[username] = {
                'fullname': fullname,
                'email':    email,
                'password': password
            }
            flash('Account created successfully! You can now log in.', 'success')
            return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'success')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
