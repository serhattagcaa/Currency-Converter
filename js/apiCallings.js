
fetch("https://api.frankfurter.app/latest")
  .then(response => {
    if (!response.ok) {
      throw new Error('Ağ yanıtı başarılı değil');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Veriyi konsola yazdırır
  })
  .catch(error => console.error('Hata:', error));
