const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

// Load credentials from a JSON file
const credentials = require('./client_secret_1048826291956-tnlbo6ihcpflq5osigq53fh6vpl6jfva.apps.googleusercontent.com.json');

// Create an OAuth2 client with the given credentials
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id, client_secret, redirect_uris[0]);

// Set the token if available, otherwise get a new one
fs.readFile('./client_secret_1048826291956-tnlbo6ihcpflq5osigq53fh6vpl6jfva.apps.googleusercontent.com.json', (err, token) => {
  if (err) {
    getAccessToken(oAuth2Client);
  } else {
    oAuth2Client.setCredentials(JSON.parse(token));
    accessSpreadsheet(oAuth2Client);
  }
});

// Function to get an access token
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  console.log('Authorize this app by visiting this URL:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile('./client_secret_1048826291956-tnlbo6ihcpflq5osigq53fh6vpl6jfva.apps.googleusercontent.com.json', JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', './client_secret_1048826291956-tnlbo6ihcpflq5osigq53fh6vpl6jfva.apps.googleusercontent.com.json');
      });
      accessSpreadsheet(oAuth2Client);
    });
  });
}

// Function to access the spreadsheet
function accessSpreadsheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1Rw9tiukS0x95xo1wisWOTLCYKt96QDC2RTf1uoxy_DM',
    range: 'Users!A2:B',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Data:');
      rows.map((row) => {
        console.log(`${row[0]}, ${row[1]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}
