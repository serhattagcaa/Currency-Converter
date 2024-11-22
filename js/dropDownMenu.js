// JavaScript Kodu



function toggleDropdown(dropdownId, buttonId) {
    const dropdown = document.getElementById(dropdownId);
    const button = document.getElementById(buttonId);
    const isOpen = dropdown.classList.contains("show");
    // Tüm menüleri ve butonları kapat
    const allDropdowns = document.querySelectorAll(".dropdown-content-left, .dropdown-content-right");
    const allButtons = document.querySelectorAll(".dropdown-button-left, .dropdown-button-right");
    // Diğer menüleri kapat
    allDropdowns.forEach(drop => {
        if (drop.id !== dropdownId) {
            drop.classList.remove('show');
        }
    });
    
    // Diğer butonları aktif olmayan duruma getir
    allButtons.forEach(btn => {
        if (btn.id !== buttonId) {
            btn.classList.remove('active', 'closing');
        }
    });

    // Kapanış süresi için sınıf ekle
    if (isOpen) {
        button.classList.add('closing');
        setTimeout(() => button.classList.remove('closing'), 1000);
    }
    
    // Seçili menüyü aç/kapat
    dropdown.classList.toggle("show");
    button.classList.toggle("active");

}
function selectOption(buttonId, text) {
    const button = document.getElementById(buttonId);
    button.textContent = text;
    const dropdownId = `myDropdown${buttonId.slice(-1)}`;
    const dropdown = document.getElementById(dropdownId);
    
    button.classList.add('closing');
    
    dropdown.classList.remove('show');
    button.classList.remove('active');
    
    setTimeout(() => {
        button.classList.remove('closing');
    }, 1000);

    fetchExchangeRate(text); 
}



// Sayfa dışına tıklandığında menüleri kapat
document.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-button-left') && 
        !event.target.matches('.dropdown-button-right') && 
        !event.target.closest('.dropdown-content-left') && 
        !event.target.closest('.dropdown-content-right')) {
        
        const allDropdowns = document.querySelectorAll(".dropdown-content-left, .dropdown-content-right");
        const allButtons = document.querySelectorAll(".dropdown-button-left, .dropdown-button-right");
        
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
        
        allButtons.forEach(button => {
            button.classList.remove('active');
            button.classList.add('closing');
            setTimeout(() => button.classList.remove('closing'), 1000);
        });
    }
});

function rateActivation() {
    fetchExchangeRates()

}