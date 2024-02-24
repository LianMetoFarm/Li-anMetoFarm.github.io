const apiKey = "AIzaSyBJ52mawoRgwYjQd9kPjx0gIwjvFlX4Ysc";
const spreadsheetId = "1Rw9tiukS0x95xo1wisWOTLCYKt96QDC2RTf1uoxy_DM";
const range = "Sheet9!A:B"; // Adjust this according to your sheet structure

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      const found = rows.find(row => row[0] === username && row[1] === password);
      if (found) {
        alert("Login successful!");
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
      } else {
        alert("Invalid username or password!");
      }
    })
    .catch(error => console.error('Error:', error));
}

function logout() {
  document.getElementById('loginForm').reset();
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'none';
}