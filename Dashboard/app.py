# app.py

from flask import Flask, render_template
import pandas as pd
import matplotlib.pyplot as plt
import base64
from io import BytesIO

app = Flask(__name__)

def generate_plot():
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

    return img_base64

@app.route('/')
def dashboard():
    plot_data = generate_plot()
    return render_template('dashboard.html', plot_data=plot_data)

if __name__ == '__main__':
    app.run(debug=True)