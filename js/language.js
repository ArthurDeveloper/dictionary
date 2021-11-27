const brazilianFlagEmoji = '\uD83C\uDDE7\uD83C\uDDF7';
const usaFlagEmoji = '\uD83C\uDDFA\uD83C\uDDF8';

document.querySelector('#toggle-language-btn').innerHTML = brazilianFlagEmoji;

let currentLanguage = navigator.language.includes('pt') ? 'pt' : 'en';

function changeLanguage(language) {
    currentLanguage = language;

    document.querySelector('#word-input').placeholder = language === 'en' ? 
        'Search for a word...' : 'Procure uma palavra...';
    
    document.querySelector('#toggle-language-btn').textContent = language === 'en' ?
        usaFlagEmoji : brazilianFlagEmoji;
}

document.querySelector('#toggle-language-btn').addEventListener('click', () => {
    if (currentLanguage === 'en') {
        changeLanguage('pt')
    } else if (currentLanguage === 'pt') {
        changeLanguage('en');
    }
});

document.querySelector('#toggle-language-btn').addEventListener('mouseover', () => {
    document.querySelector('#toggle-language-btn').classList.add('text-3xl');
});

document.querySelector('#toggle-language-btn').addEventListener('mouseout', () => {
    document.querySelector('#toggle-language-btn').classList.remove('text-3xl');
});

export default function getCurrentLanguage() {
    return currentLanguage;
}
