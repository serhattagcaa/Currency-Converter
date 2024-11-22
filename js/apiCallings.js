let baseCurrency;
let currencyUnit;
let otherUnit;
let exchangeRate; // Global değişken

function updateCurrencyInfo() {
    baseCurrency = document.getElementById("button1").innerText; // Base döviz
    currencyUnit = document.getElementById("tentacles").value; // Kullanıcının girdiği miktar
    otherUnit = document.getElementById("button2").innerText; // Hedef döviz

    // Eğer exchangeRate varsa ve geçerli bir sayıysa
    if (exchangeRate && !isNaN(exchangeRate)) {
        const logText = `Amount:${currencyUnit} - From:${baseCurrency} - To:${otherUnit} - Rate:${exchangeRate.toFixed(2)}`;
        console.log(logText);

        // Son 4 işlemi tutmak için bir array kullanıyoruz
        const savedData = JSON.parse(sessionStorage.getItem("savedData")) ||  [];

        // Yeni veriyi ekle
        savedData.push(logText);

        // Sadece son 4 veriyi tut
        if (savedData.length > 4) {
            savedData.shift();
        }

        // Veriyi sessionStorage'a kaydet
        sessionStorage.setItem("savedData", JSON.stringify(savedData));

        // Listeyi güncelle
        displayData(savedData);
    } else {
        console.warn("Geçerli bir kur bilgisi mevcut değil. Veri kaydedilmedi.");
    }
}

// Listeyi güncelleyen fonksiyon
function displayData(data) {
    const listItems = document.querySelectorAll(".inSlideByTwo .textingv2");

    // Liste elemanlarına verileri yerleştir
    for (let i = 0; i < listItems.length; i++) {
        if (i < data.length) {
            listItems[i].textContent = data[data.length - 1 - i]; // Ters sırayla ekle
        } else {
            listItems[i].textContent = ""; // İçeriği temizle
        }
    }
}

// Sayfa yüklendiğinde mevcut veriyi görüntüle
window.onload = function () {
    const savedData = JSON.parse(sessionStorage.getItem("savedData")) || [];
    displayData(savedData);
};

// Döviz kurunu çeken fonksiyon
function fetchExchangeRate() {
    // Değişkenleri güncellemek için updateCurrencyInfo'u çağırıyoruz
    updateCurrencyInfo();

    // Eğer gerekli bilgiler yoksa hata ver ve çık
    if (!baseCurrency || !currencyUnit || !otherUnit) {
        console.error('Tüm alanları doldurduğunuzdan emin olun');
        return;
    }

    // API çağrısını yap
    fetch(`https://api.frankfurter.app/latest?base=${baseCurrency}&amount=${currencyUnit}&rates=${otherUnit}`)
        .then(response => response.json())
        .then(data => {
            // Seçilen döviz biriminin kuru
            exchangeRate = data.rates[otherUnit]; // exchangeRate global değişkenini güncelle

            // Sonucu sadece sayı olarak yazdır (ondalıklı 2 basamak)
            document.getElementById('result').innerHTML = (exchangeRate || 0).toFixed(2);

            // Döviz kuru güncellendikten sonra bilgileri tekrar yazdır
            updateCurrencyInfo();
        })
        .catch(error => console.error('Döviz kurları çekilirken bir hata oluştu:', error));
}


          // Çekmek istediğimiz dövizlerin listesi
          function fetchExchangeRates() {
            // updateCurrencyInfo();
            // baseCurrency değeri yoksa varsayılan olarak nameText kullan
            const currentBaseCurrency =  baseCurrency || "EUR"; // Eğer nameText boşsa EUR varsayılan olarak alınacak
            console.log(currentBaseCurrency)
            const currencies = ['JPY','USD', 'GBP', 'TRY', 'AUD', 'CAD', 'NZD', 'SEK', 'NOK', 'DKK'];
            const symbols = currencies.join(',');
            const url = `https://api.frankfurter.app/latest?from=${currentBaseCurrency}&symbols=${symbols}`;
        
            fetch(url)
                .then(response => response.json())  // API yanıtını JSON'a dönüştür
                .then(data => {
                    const slideByOne = document.getElementById('slideByOne');
                    const slideByTwo = document.getElementById('slideByTwo');
                    
                    slideByOne.innerHTML = '';  // Önceki veriyi temizle
                    slideByTwo.innerHTML = '';  // Önceki veriyi temizle
        
                    let counter = 0;
                    const halfwayIndex = Math.ceil(currencies.length / 2);
        
                    for (const [currency, rate] of Object.entries(data.rates)) {
                        const roundedRate = rate.toFixed(2);
                        const rateElement = document.createElement('li');
                        rateElement.className = 'boxingv1 rate';
                        rateElement.textContent = `${roundedRate} ${currency}`;
        
                        // slideByOne ve slideByTwo'yu sırayla doldur
                        if (counter < halfwayIndex) {
                            slideByOne.appendChild(rateElement);
                        } else {
                            slideByTwo.appendChild(rateElement);
                        }
                        counter++;
                    }
                })
                .catch(error => {
                    console.error("Döviz kurları alınırken hata oluştu:", error);
                });
        }
        
        // Base döviz ve hedef döviz seçildiğinde veya güncellendiğinde çağırılacak
        fetchExchangeRates()

        function newsOnTexts() {
            // API anahtarını değişken olarak tanımla
            const apiKey = "APiKEY";
        
            // Haberleri almak için API çağrısı
            fetch(`https://eodhd.com/api/news?s=AAPL.US&offset=0&limit=11&api_token=${apiKey}&fmt=json`)
                .then(response => response.json())
                .then(data => {
                    const newsItems = document.querySelectorAll(".textingv3");
                    
                    // Mevcut içerikleri temizle
                    newsItems.forEach(item => item.textContent = "");
        
                    // Her bir haberi işleyip listeye ekle
                    data.forEach((item, index) => {
                        if (newsItems[index]) {
                            // Haberin başlığını ekle
                            newsItems[index].textContent = item.title;
                            newsItems[index].addEventListener("click", () => {
                                window.open(item.link, "_blank"); // Linke yönlendirme
                            });
                        }
                    });
                })
                .catch(err => console.error("Hata:", err));
        }
        
        // Fonksiyonu çağır
        newsOnTexts();
        