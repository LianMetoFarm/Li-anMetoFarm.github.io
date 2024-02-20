// logout.js
document.addEventListener("DOMContentLoaded", function() {
    var logoutButton = document.querySelector('.btn-danger');
  
    logoutButton.addEventListener('click', function() {
      // Menampilkan konfirmasi sebelum logout
      var confirmation = confirm("Apakah Anda yakin ingin logout?");
      if (confirmation) {
        // Jika pengguna mengonfirmasi, maka arahkan ke halaman logout
        window.location.href = 'https://lianmetofarm.github.io/profile/index.html';
      }
      // Jika tidak, biarkan pengguna tetap di halaman saat ini
    });
  });