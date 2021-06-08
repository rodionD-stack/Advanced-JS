const init = () => {

    let textWithSingleQuotes = document.querySelector('.firstQuest');
    //console.log(textWithSingleQuotest.textContent);

    let textWithDoubleQuotes = textWithSingleQuotes.textContent.replace(/'/g, '"');
    console.log(textWithDoubleQuotes);


    let textWithApostrophe = document.querySelector('.secondQuest');
    //console.log(textWithApostrophe.textContent);
    let regExp = /(?<![a-zа-яё0-9])'|'(?![a-zа-яё0-9])/gi;
    let passApostrophe = textWithApostrophe.textContent.replace(regExp, '"');
    console.log(passApostrophe);

}

window.onload = init;

