document.addEventListener("DOMContentLoaded", function() {
    var logoutButton = document.querySelector('.logout-btn');
    var logoutConfirmButton = document.getElementById('logoutConfirmBtn');
    var cancelButton = document.querySelector('[data-bs-dismiss="modal"]'); // Menemukan tombol Batal pada modal
    var myModal = new bootstrap.Modal(document.getElementById('logoutModal'));

    logoutButton.addEventListener('click', function() {
      // Tampilkan modal konfirmasi
      myModal.show();
    });

    logoutConfirmButton.addEventListener('click', function() {
      // Redirect pengguna ke halaman logout jika konfirmasi diberikan
      window.location.href = 'https://lianmetofarm.github.io/profile/index.html';
    });

    // Tambahkan event listener untuk tombol Batal pada modal
    cancelButton.addEventListener('click', function() {
      // Tutup modal ketika tombol Batal ditekan
      myModal.hide();
      // Hapus backdrop
      var backdrop = document.getElementsByClassName('modal-backdrop')[0];
      backdrop.parentNode.removeChild(backdrop);
      // Fokus kembali ke tombol logout setelah modal ditutup
      logoutButton.focus();
    });

    // Tambahkan event listener untuk menutup modal jika tekan tombol ESC
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        myModal.hide();
        var backdrop = document.getElementsByClassName('modal-backdrop')[0];
        backdrop.parentNode.removeChild(backdrop);
        logoutButton.focus();
      }
    });
});