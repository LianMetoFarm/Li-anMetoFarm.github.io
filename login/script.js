// script.js

// JavaScript code untuk style
const signInBtnLink = document.querySelector('.signInBtn-link');
//const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

signInBtnLink.addEventListener('click', () => {
  wrapper.classList.toggle('active');
});

signUpBtnLink.addEventListener('click', () => {
  wrapper.classList.toggle('active');
});

//proses login
function checkLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // API endpoint
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  // Ambil data dari Google Sheets API
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const users = data.values;
      const foundUser = users.find(user => user[0] === username && user[1] === password);
      if (foundUser) {
        // Login berhasil, lakukan tindakan setelah login berhasil
        console.log('Login berhasil');
        // Dapatkan tautan yang sesuai berdasarkan pengguna yang masuk
        const redirectLink = foundUser[2]; // Anggap kolom ke-3 berisi tautan

        // Redirect ke tautan yang sesuai
        window.location.href = redirectLink;
      } else {
        // Login gagal, tampilkan pesan kesalahan
        document.getElementById('errorMessage').textContent = 'Username atau password salah';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Tampilkan pesan kesalahan jika terjadi kesalahan saat mengambil data
      document.getElementById('errorMessage').textContent = 'Terjadi kesalahan saat mengambil data.';
    });
}
