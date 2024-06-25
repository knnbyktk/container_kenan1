const axios = require('axios');
const cheerio = require('cheerio');

async function getPrayerTimes() {
    try {
        const url = 'https://www.diyanet.gov.tr/tr/'; // Diyanet'in namaz vakitleri sayfasının URL'si

        // Web sayfasını axios ile getir
        const response = await axios.get(url);
        const html = response.data;

        // Cheerio kullanarak HTML'i parse et
        const $ = cheerio.load(html);

        // Namaz vakitlerinin bulunduğu elementin seçici bilgisi
        const vakitlerElement = $('.pt-0 .col-md-4:nth-child(2) .vakit-listesi');

        // Namaz vakitlerini içeren metinleri al
        const namazVakitleri = [];
        vakitlerElement.find('li').each((index, element) => {
            const vakit = $(element).text().trim();
            namazVakitleri.push(vakit);
        });

        // Konsola namaz vakitlerini yazdır
        console.log('Namaz Vakitleri:');
        console.log(namazVakitleri);
    } catch (error) {
        console.error('Hata:', error);
    }
}

// Fonksiyonu çağırarak namaz vakitlerini getir
getPrayerTimes();
