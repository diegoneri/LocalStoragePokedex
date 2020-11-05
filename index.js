const validarLocalStorage = () => {
    if (!localStorage.backgroundColor){
        localStorage.backgroundColor = "blue";
        localStorage.fontStyle = "'Ubuntu Mono'";
        localStorage.fontColor = "white";
    }
    popularCampos();
    aplicaTema();
};

const popularCampos = () => {
    document.getElementById('bgColor').value = localStorage.backgroundColor;
    document.getElementById('fontStyle').value = localStorage.fontStyle;
    document.getElementById('fontColor').value = localStorage.fontColor;
}

const aplicaTema = () => {
    document.querySelector('html').style.backgroundColor = localStorage.backgroundColor;
    var elementsColor = document.querySelectorAll('p, fieldset, label');
    elementsColor.forEach( e => e.style.color = localStorage.fontColor);
    var elementsFontStyle = document.querySelectorAll('p, fieldset, label, input[type="text"], select, button');
    elementsFontStyle.forEach( e => e.style.fontFamily = localStorage.fontStyle);
}

const urlPokemonPorNumero = (numero) => {
    return `https://pokeapi.co/api/v2/pokemon/${numero}`; 
}

const sorteiaNumero = () => {
    return Math.round(Math.random() * 150) +1;
}

const iniciar = async () => {
    validarLocalStorage();
    await atualizaPokemon();
    document.getElementById("pref-usuario").hidden = false;
    document.forms[0].addEventListener("submit", (evt) => {
        evt.preventDefault();
        populaStorage();
    });
}

const populaStorage = () => {
    localStorage.backgroundColor = document.getElementById('bgColor').value;
    localStorage.fontStyle = document.getElementById('fontStyle').value;
    localStorage.fontColor = document.getElementById('fontColor').value;
    aplicaTema();
}

const atualizaPokemon = async () => {
    const url = urlPokemonPorNumero(sorteiaNumero());
    const response = await fetch(url);
    const result = await response.json();
    atualizaTela(result);
}

const atualizaTela = (pokemon) => {
    const imagem = document.getElementById("foto-pokemon");
    const nomePokemon = document.getElementById("nome-pokemon");
    imagem.src = pokemon.sprites.other["official-artwork"].front_default;
    nomePokemon.innerHTML = pokemon.name;
}

document.addEventListener('DOMContentLoaded', iniciar);