import requests
from bs4 import BeautifulSoup


from flask import Flask, jsonify
# Flask uygulamasını oluşturun
app = Flask(__name__)

# Örnek bir endpoint tanımlayalım
@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello, World!lllllllllllllll'})







####################################################################################

def get_prayer_times(city_id):
    # Diyanet'in namaz vakitleri sayfası URL'si (Örnek URL)
    url = f"https://namazvakitleri.diyanet.gov.tr/tr-TR/city_id/daily"
    
    # Sayfayı çekiyoruz
    response = requests.get(url)
    
    if response.status_code != 200:
        raise Exception(f"Failed to load page: {response.status_code}")
    
    # HTML içeriğini parse ediyoruz
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Namaz vakitlerinin bulunduğu tabloyu buluyoruz
    table = soup.find('table', {'class': 'table vakit-table'})
    
    if table is None:
        raise Exception("Prayer times table not found.")
    
    # Tablo satırlarını alıyoruz
    rows = table.find_all('tr')
    
    # Namaz vakitleri için bir sözlük oluşturuyoruz
    prayer_times = {}
    
    # İlk satır başlık satırı olduğu için atlıyoruz
    for row in rows[1:]:
        cols = row.find_all('td')
        if len(cols) >= 2:
            prayer_name = cols[0].get_text(strip=True)
           #prayer_time = cols[1].get_text(strip=True)
            prayer_time1 = cols[2].get_text(strip=True) 
            prayer_time2 = cols[3].get_text(strip=True)    
            prayer_time3 = cols[4].get_text(strip=True) 
            prayer_time4 = cols[5].get_text(strip=True)
            prayer_time5 = cols[6].get_text(strip=True) 
            prayer_time6 = cols[7].get_text(strip=True)
            prayer_times[prayer_name] = [prayer_time1, prayer_time2, prayer_time3, prayer_time4, prayer_time5, prayer_time6]

    
    return prayer_times

# Örnek şehir ID'si (Ankara için 919)
city_id = 919
prayer_times = get_prayer_times(city_id)

for prayer, time in prayer_times.items():
    print(f"{prayer}: {time}")
#################################################33###############




@app.route('/hello2', methods=['GET'])
def hello2():
    return jsonify({'message': prayer_times})

# Başlatma noktası
if __name__ == '__main__':
    app.run(debug=True)