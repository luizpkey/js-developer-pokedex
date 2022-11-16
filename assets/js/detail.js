const pokemonDetail = document.getElementById('pokemonDetail')

var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b = "";
        else
            b = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.split('&'));

function moveList( type, move, index ){
    if (index<10){
        return (`<li class="move ${type}">${move}</li>`)
    }
    return ''
}
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.types[0].type.name}" id="pokemon${pokemon.id}">
            <div class="imagem ${pokemon.types[0].type.name}">
               <img class="image_pokemon" src="${pokemon.sprites.other.home.front_default}"
               alt="${pokemon.name}">
            </div>

            <div class="detail">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <ol class="types">
                    ${pokemon.types.map((slot) => `<li class="type ${slot.type.name}">${slot.type.name}</li>`).join('')}
                </ol>

                <ol class="moves">
                    ${pokemon.moves.map((item,index) => moveList( pokemon.types[0].type.name, item.move.name, index )).join('')}
                </ol>

            </div>
        </li>
    `
}

function loadPokemon(pokemonID) {
    pokeApi.getPokemon(pokemonID).then((pokemon = []) => {
//        console.log(pokemon)        
        console.log(pokemon.types[0].type.name)        
        const newHtml = convertPokemonToLi(pokemon)
        pokemonDetail.innerHTML += newHtml
    })
}

loadPokemon(qs?qs:'1')

