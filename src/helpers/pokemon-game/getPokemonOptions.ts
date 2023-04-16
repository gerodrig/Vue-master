import pokemonApi from '@/api/pokemon-game/pokemonApi';
import { Pokemon } from '@/interfaces/pokemon-game';

  //: save ALL pokemons in local storage
  const savePokemons = (pokemons: Pokemon[]) => {
    // check if pokemons are in local storage
    const pokemonsInStorage = localStorage.getItem('pokemons');
    if (!pokemonsInStorage) {
        localStorage.setItem('pokemons', JSON.stringify(pokemons));
        }

  };
  //get from localstorage
    const getPokemonsFromStorage = (): Pokemon[] => {
        const pokemonsInStorage = localStorage.getItem('pokemons');
        if (pokemonsInStorage) {
            return JSON.parse(pokemonsInStorage);
        }
        return [];
    };

  const mixPokemons = (pokemons: Pokemon[]): Pokemon[] => {
    return pokemons.sort(() => Math.random() - 0.5).slice(0, 4);
  };

const getPokemons = () => {
  const pokemonsArr = Array.from(Array(649));
  return pokemonsArr.map((_, index) => index + 1);
};
const getPokemonOptionsFromStorage = async () => {
    const pokemons = getPokemonsFromStorage();
    if (pokemons.length > 0) {
        //get 4 random pokemons
        return mixPokemons(pokemons);
    } else {
        //get all pokemons
        const allPokemons = await getAllPokemons();
        //save to local storage
        savePokemons(allPokemons);
        return mixPokemons(allPokemons);
    }
};

const getPokemonOptions = () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
    const pokemons = mixedPokemons.slice(0, 4);
    //save to local storage
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
  return getPokemonNames(mixedPokemons);
//   return [{ id: 1, name: 'bulbasaur' }, { id: 4, name: 'charmander' }, { id: 25, name: 'pikachu' }, { id: 7, name: 'squirtle' }];
};

const getPokemonNames = async ([a, b, c, d]: Number[] = []): Promise<Pokemon[]> => {
  //? GraphQL query
  const query = ` 
    query pokemons {
        pokemon_v2_pokemon(where: {
            id: {
                _in: [ ${a}, ${b} , ${c}, ${d} ]
            }
        }){
            id
            name
        }
    }
    `;


    // return [{ id: 1, name: 'bulby' }, { id: 4, name: 'squirtle' }, { id: 25, name: 'pikachu' }, { id: 6, name: 'charmander' }];

  try {
    const response = await pokemonApi.post('',{ query });
    const pokemons = response.data.data.pokemon_v2_pokemon;
    return pokemons;

  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAllPokemons = async () => {
    const query = ` 
        query pokemons {
            pokemon_v2_pokemon{
                id
                name
            }
        }
        `;
    
    try {
        const response = await pokemonApi.post('',{ query });
        const pokemons = response.data.data.pokemon_v2_pokemon;
        return pokemons.slice(0, 649);
    
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getPokemonOptionsFromStorage;
