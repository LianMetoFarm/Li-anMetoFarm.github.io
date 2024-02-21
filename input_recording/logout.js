document.addEventListener("DOMContentLoaded", function() {
    var logoutButton = document.querySelector('.logout-btn');
    var logoutConfirmButton = document.getElementById('logoutConfirmBtn');
    var cancelButton = document.querySelector('[data-bs-dismiss="modal"]'); // Menemukan tombol Batal pada modal

    logoutButton.addEventListener('click', function() {
      // Tampilkan modal konfirmasi
      var myModal = new bootstrap.Modal(document.getElementById('logoutModal'));
      myModal.show();
    });

    logoutConfirmButton.addEventListener('click', function() {
      // Redirect pengguna ke halaman logout jika konfirmasi diberikan
      window.location.href = 'https://lianmetofarm.github.io/profile/index.html';
    });

    // Tambahkan event listener untuk tombol Batal pada modal
    cancelButton.addEventListener('click', function() {
      // Tutup modal ketika tombol Batal ditekan
      var myModal = new bootstrap.Modal(document.getElementById('logoutModal'));
      myModal.hide();

      // Fokus kembali ke tombol logout setelah modal ditutup
      logoutButton.focus();
    });

    // Tambahkan event listener untuk menutup modal jika tekan tombol ESC
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        myModal.hide();
        logoutButton.focus();
      }
    });
});