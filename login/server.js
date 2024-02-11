const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SHEET_ID = process.env.SHEET_ID;

app.use(bodyParser.json());

app.get('/api/getCredentials', async (req, res) => {
    try {
        const credentials = await getGoogleSheetCredentials();
        res.json(credentials);
    } catch (error) {
        console.error('Error retrieving credentials:', error);
        res.status(500).json({ error: 'Failed to retrieve credentials' });
    }
});

async function getGoogleSheetCredentials() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Credentials!A2:B', // Assuming your credentials are in the 'Credentials' sheet, column A for username and column B for password
    });

    const credentials = response.data.values.map(row => {
        return { username: row[0], password: row[1] };
    });

    return credentials;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
