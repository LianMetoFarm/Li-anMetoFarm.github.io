$(document).ready(function() {
    // API key for Google Sheets API
    var apiKey = 'AIzaSyBJ52mawoRgwYjQd9kPjx0gIwjvFlX4Ysc';
    // ID of the spreadsheet
    var spreadsheetId = '1Rw9tiukS0x95xo1wisWOTLCYKt96QDC2RTf1uoxy_DM';
    // Sheet number (0 for the first sheet, 1 for the second, etc.)
    var sheetNumber = 0;

    // Google Sheets API endpoint
    var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId +
              '/values/Sheet' + sheetNumber + '!A8:Z100?key=' + apiKey;

    // Fetch data from Google Sheets API
    $.get(url, function(data) {
        var rows = data.values;

        // Append data to the table
        var table = $('#data-table');
        for (var i = 0; i < rows.length; i++) {
            var row = $('<tr>');
            for (var j = 0; j < rows[i].length; j++) {
                row.append($('<td>').text(rows[i][j]));
            }
            table.append(row);
        }
    });
});