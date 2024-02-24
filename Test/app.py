from flask import Flask, render_template, request, session, redirect, url_for
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)
app.secret_key = 'AIzaSyBJ52mawoRgwYjQd9kPjx0gIwjvFlX4Ysc'

# Google Sheets API credentials
scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name('path/to/your/credentials.json', scope)
gc = gspread.authorize(credentials)

# Function to authenticate user
def login(username, password):
    try:
        sh = gc.open_by_key('1Rw9tiukS0x95xo1wisWOTLCYKt96QDC2RTf1uoxy_DM')
        worksheet = sh.get_worksheet(0)  # Change index if needed
        # Example logic to check username and password in the sheet
        # If successful, return True
        # Otherwise, return False
        return True
    except Exception as e:
        print("Login failed:", e)
        return False

# Function to logout user
def logout():
    # Example logout logic
    session.pop('username', None)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if login(username, password):
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            return render_template('index.html', message='Login failed. Please try again.')
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        return render_template('dashboard.html', username=session['username'])
    else:
        return redirect(url_for('index'))

@app.route('/logout')
def user_logout():
    logout()
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)