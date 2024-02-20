document.addEventListener("DOMContentLoaded", function() {
    var logoutButton = document.querySelector('.logout-btn');
    var logoutConfirmButton = document.getElementById('logoutConfirmBtn');

    logoutButton.addEventListener('click', function() {
      // Tampilkan modal konfirmasi
      var myModal = new bootstrap.Modal(document.getElementById('logoutModal'));
      myModal.show();
    });

    logoutConfirmButton.addEventListener('click', function() {
      // Redirect pengguna ke halaman logout jika konfirmasi diberikan
      window.location.href = 'https://lianmetofarm.github.io/profile/index.html';
    });
  });