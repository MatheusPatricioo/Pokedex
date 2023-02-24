const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

/*o ASYNC garante uma função assincrona;*/
const fetchPokemon = async (pokemon) =>{
    /*AWAIT: ele espera o fetch carregar para dps passar para o resto do code
    obs:só é possível utilizar o await em funções assíncronas*/
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    console.log(data);
    return data;

}
const renderPokemon = async (pokemon) =>{
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    console.log('input.value')

    renderPokemon(input.value);
});