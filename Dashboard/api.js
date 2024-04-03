$(document).ready(function() {
    // API key for Google Sheets API
    var apiKey = 'AIzaSyBJ52mawoRgwYjQd9kPjx0gIwjvFlX4Ysc';
    // ID of the spreadsheet
    var spreadsheetId = '1Rw9tiukS0x95xo1wisWOTLCYKt96QDC2RTf1uoxy_DM';

    // Daftar nama sheet yang ingin diambil
    var sheetNames = ['Kandang 1'];

    // Google Sheets API endpoint
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
                var sheetUrl = baseUrl + spreadsheetId + '/values/' + sheetTitle + '!B10:B100?key=' + apiKey;

                // Ambil data dari sheet
                $.get(sheetUrl, function(sheetData) {
                    var rows = sheetData.values;

                    // Tambahkan data ke dalam tabel
                    var table = $('<table>');
                    table.append($('<caption>').text(sheetTitle));
                    for (var j = 0; j < rows.length; j++) {
                        var row = $('<tr>');
                        row.append($('<td>').text(rows[j][0])); // Kolom B (indeks 0)
                        row.append($('<td>').text(rows[j][1])); // Kolom E (indeks 1)
                        table.append(row);
                    }

                    // Tambahkan tabel ke dalam dokumen
                    $('#data-container').append(table);
                });
            }
        }
    });
});