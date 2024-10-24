function fetchRandomVerse() {
    const randomVerse = Math.floor(Math.random() * 6236) + 1; 
    const url = `http://api.alquran.cloud/v1/ayah/${randomVerse}/editions/quran-uthmani,en.pickthall`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.data && data.data.length > 0) {
                const arabicVerse = data.data[0].text;
                const englishTranslation = data.data[1].text; 
                const sura = `${data.data[0].surah.englishName} (${data.data[0].surah.number}):${data.data[0].numberInSurah}`;

                // Update the HTML with the verse information
                document.getElementById('arabicVerse').textContent = arabicVerse;
                document.getElementById('englishTranslation').textContent = englishTranslation;
                document.getElementById('suraInfo').textContent = sura;
            } else {
                console.error('No verse data found');
            }
        })
        .catch(error => {
            console.error('Error fetching verse:', error);
        });
}

fetchRandomVerse();
