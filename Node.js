const axios = require('axios');
const cheerio = require('cheerio');

async function fetchNamazTimes(cityId) {
    const url = `https://www.diyanet.gov.tr/tr-TR/${cityId}/namazvakitleri`;
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const namazTimes = {};

        $('table.diyanetDataTable tbody tr').each((index, element) => {
            const time = $(element).find('td:nth-child(2)').text().trim();
            const name = $(element).find('td:nth-child(1)').text().trim();

            namazTimes[name] = time;
        });

        return namazTimes;
    } catch (error) {
        console.error('Error fetching namaz times:', error);
        return null;
    }
}

// Örnek olarak İstanbul için namaz vakitlerini çekelim (cityId = 34)
fetchNamazTimes(34)
    .then(times => {
        if (times) {
            console.log('Namaz Times for Istanbul:');
            console.log(times);
        }
    })
    .catch(err => console.error('Error fetching namaz times:', err));
