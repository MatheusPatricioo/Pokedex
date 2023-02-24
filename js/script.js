const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

let searchPokemon = 1;

/*o ASYNC garante uma função assincrona;*/
const fetchPokemon = async (pokemon) =>{
    /*AWAIT: ele espera o fetch carregar para dps passar para o resto do code
    obs:só é possível utilizar o await em funções assíncronas*/
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status==200){
        const data = await APIResponse.json();
        console.log(data);
        return data;  
    }

}
const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = ' ';

    const data = await fetchPokemon(pokemon);

    if(data){
    pokemonImage.style.display ='block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value ='';
    searchPokemon = data.id;
    } else{
        pokemonName.innerHTML ='Not found';
        pokemonNumber.innerHTML = 'null';
        pokemonImage.style.display ='none';
    }
}
/*Forma padrao para formularios, posso usar a mesma formula
para trabalhar com os botoes*/
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonNext.addEventListener('click', () => {
    searchPokemon +=1;
    renderPokemon(searchPokemon);

});

buttonPrev.addEventListener('click', () => {
    searchPokemon -=1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);