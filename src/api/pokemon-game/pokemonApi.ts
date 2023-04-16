import axios from 'axios';

const pokemonApiGraphql = axios.create({
    baseURL: 'https://beta.pokeapi.co/graphql/v1beta',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default pokemonApiGraphql;