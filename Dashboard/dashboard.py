import pandas as pd
import matplotlib.pyplot as plt
import base64
from io import BytesIO

# Mengimpor data dari spreadsheet
url = 'https://docs.google.com/spreadsheets/d/1rRadtWZisAskPWuFf-oyBr8KGTYb-N87JIz9s7M0ZQY/export?format=csv'
df = pd.read_csv(url)

# Konversi kolom tanggal ke tipe datetime
df['Tanggal'] = pd.to_datetime(df['Tanggal'])

# Membuat kolom baru untuk bulan
df['Bulan'] = df['Tanggal'].dt.month

# Membuat grafik kematian ayam per hari
plt.figure(figsize=(10, 6))
plt.plot(df['Tanggal'], df['Kematian Ayam'], marker='o', linestyle='-')
plt.title('Kematian Ayam per Hari')
plt.xlabel('Tanggal')
plt.ylabel('Jumlah Kematian Ayam')
plt.grid(True)

# Menyimpan gambar grafik ke dalam BytesIO
img_data = BytesIO()
plt.savefig(img_data, format='png')
img_data.seek(0)

# Mengkonversi gambar ke base64
img_base64 = base64.b64encode(img_data.read()).decode('utf-8')
plt.close()

# Script HTML dengan Bootstrap 5
html_content = f'''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Grafik</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-YFzIPrKmQab2wclEXFOCDfV+J0Es8wv3BqF0QK/C/wjXebjUFL/lEySuJ2XA3L+3" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <h2>Kematian Ayam per Hari</h2>
                <img src="data:image/png;base64,{img_base64}" class="img-fluid" alt="Kematian Ayam per Hari">
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-WqtfDX6HGV6PugOrjfcD1fn2gpOFm25ZqWd4m2jCmCOw4up2uxjZl3BdEEasOcoI" crossorigin="anonymous"></script>
</body>
</html>
'''

# Menyimpan script HTML ke dalam file
with open('dashboard.html', 'w') as file:
    file.write(html_content)