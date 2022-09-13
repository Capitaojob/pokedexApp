const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.poke_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(apiResponse.status == 200) {
        const data = await apiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    renderPokemon(input.value.toLowerCase())
});

buttonPrev.addEventListener('click', (event) => {
    if (searchPokemon == 1) {
        searchPokemon = 905;
    }
    else {
        searchPokemon -= 1;
    }
    renderPokemon(searchPokemon);
});

buttonNext.addEventListener('click', (event) => {
    if (searchPokemon == 905) {
        searchPokemon = 1;
    }
    else {
        searchPokemon += 1;
    }   
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);