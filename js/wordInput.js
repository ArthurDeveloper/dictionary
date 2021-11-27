import getCurrentLanguage from './language.js';

document.querySelector('#word-input').addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') {
        const getWordData = async (word) => {
            if (getCurrentLanguage() === 'en') {
                const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                if (data.status !== 200) {
                    return;
                }

                const json = await data.json();
                return {
                    word: json[0].word,
                    meanings: json[0].meanings[0].definitions.map((meaning) => meaning.definition),
                }
            } else if (getCurrentLanguage() === 'pt') {
                const data = await fetch(`https://significado.herokuapp.com/${word}`);
                if (data.status !== 200) {
                    return;
                }

                const json = await data.json();
                return {
                    word: word,
                    meanings: json[0].meanings
                }
            }
        }
       
        document.querySelector('#word-data').classList.add('fade-out');
        const fadeOutAnimationTime = 400;
        const timeout = setTimeout(async () => {
            const data = await getWordData(evt.target.value);
            if (!data) {
                if (getCurrentLanguage() === 'en') {
                    document.querySelector('#word').textContent = 'Word not found';
                } else if (getCurrentLanguage() === 'pt') {
                    document.querySelector('#word').textContent = 'Não encontrado';
                }
                document.querySelector('#word').classList.add('text-red-500');
                document.querySelector('#word-definitions').innerHTML = '';

                document.querySelector('#word-data').classList.remove('fade-out');
                document.querySelector('#word-data').classList.add('fade-in');

                clearTimeout(timeout);
                return;
            }

            document.querySelector('#word').classList.remove('text-red-500');

            const capitalize = (word) => {
                return word[0].toUpperCase() + word.slice(1);
            }

            const word = capitalize(data.word);
            document.querySelector('#word').textContent = word;

            document.querySelector('#word-definitions').innerHTML = '';
            for (let i in data.meanings) {
                let meaningIndex = i;
                document.querySelector('#word-definitions').innerHTML += `
                    <p class="italic mt-3 w-96">${++meaningIndex}. ${
                        data.meanings[i]
                    }</p>
                `;
            }

            document.querySelector('#word-meaning').style.height = 'auto';

            document.querySelector('#word-data').classList.remove('fade-out');
            document.querySelector('#word-data').classList.add('fade-in');
        }, fadeOutAnimationTime);
    }
});

document.querySelector('#word-input').addEventListener('focus', () => {
    document.querySelector('#word-meaning').style.height = 
        document.querySelector('#word').textContent == '' ?
        '16em' : 'auto';
    document.querySelector('#word-meaning').classList.add(
        'border-r', 'border-l', 'border-b', 'border-gray-200', 
        'rounded-b'
    );

    document.querySelector('#word-data').classList.remove('fade-out');
    document.querySelector('#word-data').classList.add('fade-in');
});

document.querySelector('#word-input').addEventListener('blur', () => {
    document.querySelector('#word-meaning').style.height = '0';
    document.querySelector('#word-meaning').classList.remove(
        'border-r', 'border-l', 'border-b', 'border-gray-200', 
        'rounded-b'
    );

    document.querySelector('#word-data').classList.remove('fade-in');
    document.querySelector('#word-data').classList.add('fade-out');
});