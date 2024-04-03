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

                // Endpoint API untuk mendapatkan data dari sheet tertentu
                var sheetUrl = baseUrl + spreadsheetId + '/values/' + sheetTitle + '!A9:C100,E9:E100?key=' + apiKey;

                // Ambil data dari sheet
                $.get(sheetUrl, function(sheetData) {
                    var rows = sheetData.values;

                    // Tambahkan data ke dalam tabel
                    var table = $('<table>');
                    // table.append($('<caption>').text(sheetTitle));
                    for (var j = 0; j < rows.length; j++) {
                        var row = $('<tr>');
                        row.append($('<td>').text(rows[j][0])); // Kolom B (indeks 0)
                        row.append($('<td>').text(rows[j][1])); // Kolom C (indeks 1)
                        row.append($('<td>').text(rows[j][2])); // Kolom D (indeks 2)
                        row.append($('<td>').text(rows[j][3])); // Kolom E (indeks 3)
                        table.append(row);
                    }

                    // Tambahkan tabel ke dalam dokumen
                    $('#data-container').append(table);
                });
            }
        }
    });
});