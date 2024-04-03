$(document).ready(function() {
    // API key untuk Google Sheets API
    var apiKey = 'AIzaSyBJ52mawoRgwYjQd9kPjx0gIwjvFlX4Ysc';
    // ID dari spreadsheet
    var spreadsheetId = '1Rw9tiukS0x95xo1wisWOTLCYKt96QDC2RTf1uoxy_DM';

    // Daftar nama sheet yang ingin diambil
    var sheetNames = ['Kandang 1'];

    // Endpoint API untuk mendapatkan metadata tentang spreadsheet
    var baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
    var url = baseUrl + spreadsheetId + '?key=' + apiKey;

    // Ambil metadata tentang spreadsheet
    $.get(url, function(data) {
        var sheets = data.sheets;

        // Loop melalui setiap sheet
        for (var i = 0; i < sheets.length; i++) {
            var sheet = sheets[i];
            var sheetTitle = sheet.properties.title;

            // Jika sheet ada dalam daftar yang diinginkan
            if (sheetNames.includes(sheetTitle)) {
                var sheetId = sheet.properties.sheetId;

                // Ambil data dari sheet
                var sheetUrl = baseUrl + spreadsheetId + '/values/' + sheetTitle + '!A9:E100?key=' + apiKey;
                $.get(sheetUrl, function(sheetData) {
                    var rows = sheetData.values;
                    
                    // Menambahkan form untuk memilih kolom
                    var select = $('<select id="column-select">');
                    for (var k = 0; k < rows[0].length; k++) {
                        select.append($('<option>', { value: k, text: rows[0][k] }));
                    }
                    $('#data-container').append(select);
                    
                    // Menampilkan data awal
                    showData(rows);
                    
                    // Menangani perubahan pilihan kolom
                    $('#column-select').change(function() {
                        var columnIndex = $(this).val();
                        showData(rows, columnIndex);
                    });
                });
            }
        }
    });
    
    // Fungsi untuk menampilkan data sesuai dengan pilihan kolom pengguna
    function showData(rows, columnIndex = 0) {
        $('#data-container').empty();
        var table = $('<table>');
        for (var j = 0; j < rows.length; j++) {
            var row = $('<tr>');
            row.append($('<td>').text(rows[j][0])); // Kolom A (indeks 0)
            row.append($('<td>').text(rows[j][columnIndex])); // Kolom yang dipilih oleh pengguna
            table.append(row);
        }
        $('#data-container').append(table);
    }
});