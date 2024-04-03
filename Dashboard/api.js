$(document).ready(function() {
    // API key untuk Google Sheets API
    var apiKey = 'AIzaSyBJ52mawoRgwYjQd9kPjx0gIwjvFlX4Ysc';
    // ID dari spreadsheet
    var spreadsheetId = '1Rw9tiukS0x95xo1wisWOTLCYKt96QDC2RTf1uoxy_DM';

    // Daftar nama sheet yang ingin diambil
    var sheetNames = ['Kandang 1'];

    // Kolom yang ingin ditampilkan (indeks dimulai dari 0)
    var columnsToDisplay = [0, 1, 4]; // Kolom A (0), B (1), dan E (4)
    var columnTitles = ['Id', 'Tanggal', 'Ayam Mati']; // Judul Kolom

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

                // Endpoint API untuk mendapatkan data dari sheet tertentu
                var range = sheetTitle + '!A11:U100';
                var sheetUrl = baseUrl + spreadsheetId + '/values/' + range + '?key=' + apiKey;

                // Ambil data dari sheet
                $.get(sheetUrl, function(sheetData) {
                    if (sheetData && sheetData.values && sheetData.values.length > 0) {
                        var rows = sheetData.values;

                        // Tambahkan data ke dalam tabel
                        var table = $('<table>').addClass('table table-dark table-striped table-hover');
                        // Tambahkan judul kolom
                        var headerRow = $('<tr>');
                        for (var k = 0; k < columnsToDisplay.length; k++) {
                            headerRow.append($('<th>').text(columnTitles[k]));
                        }
                        table.append(headerRow);
                        // Tambahkan data
                        for (var j = 0; j < rows.length; j++) {
                            var row = $('<tr>');
                            for (var k = 0; k < columnsToDisplay.length; k++) {
                                var columnIndex = columnsToDisplay[k];
                                row.append($('<td>').text(rows[j][columnIndex]));
                            }
                            table.append(row);
                        }

                        // Tambahkan tabel ke dalam dokumen
                        $('#data-container').append(table);
                    } else {
                        console.log('Data tidak tersedia atau tidak valid.');
                    }
                }).fail(function() {
                    console.log('Gagal mengambil data dari spreadsheet.');
                });
            }
        }
    }).fail(function() {
        console.log('Gagal mengambil metadata tentang spreadsheet.');
    });
});