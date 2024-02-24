const apiKey = "AIzaSyBJ52mawoRgwYjQd9kPjx0gIwjvFlX4Ysc";
const spreadsheetId = "1Rw9tiukS0x95xo1wisWOTLCYKt96QDC2RTf1uoxy_DM";
const range = "Users!A:C"; // Adjust this according to your sheet structure

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      const user = rows.find(row => row[0] === username && row[1] === password);
      if (user) {
        // alert("Login Berhasil!");
        successfulLogin(user[2]); // Pass the dashboard link to successfulLogin
        window.location.href = user[2]; // Redirect to the dashboard link
      } else {
        alert("Password atau username salah");
      }
    })
    .catch(error => console.error('Error:', error));
}

function logout() {
  sessionStorage.clear(); // Clear session storage
  window.location.href = "/profile/index.html"; // Redirect to login page
}

// Check login status and redirect to login page if not logged in
function checkLoginStatus() {
  if (!sessionStorage.getItem("loggedIn")) {
    window.location.href = "/login/login.html";
  }
}

// Set session storage after successful login
function successfulLogin(dashboardLink) {
  sessionStorage.setItem("loggedIn", true);
  sessionStorage.setItem("dashboardLink", dashboardLink); // Store the dashboard link
}