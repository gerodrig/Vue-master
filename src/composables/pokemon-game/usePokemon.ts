import { ref } from 'vue';

import getPokemonOptionsFromStorage from '@/helpers/pokemon-game/getPokemonOptions';

import { Pokemon } from '@/interfaces/pokemon-game';

export default function usePokemon() {
    const showPokemon = ref(false);
    const showAnswer = ref(false);
    const message = ref("Who is that pokemon?");
    const won = ref(false);
    const options = ref<Pokemon[]>([]);
    const answer = ref<Pokemon>({ id: 0, name: "" });

    //fetch pokemon options
    const getPokemons = async () => {
      const pokemons = await getPokemonOptionsFromStorage();
      // options.value = pokemons;
      answer.value = pokemons[Math.floor(Math.random() * pokemons.length)];
      options.value = pokemons;
    };

    getPokemons();

    //define method check answer
    const checkAnswer = (id: number = 0) => {
      if (id === answer.value!.id) {
        showAnswer.value = true;
        won.value = true;
        message.value = "Correct! You are a Pokemon Master!";
      } else {
        showAnswer.value = true;
        message.value = "Wrong! Try again!";
      }

      showPokemon.value = true;
    };

    const resetGame = () => {
      showPokemon.value = false;
      showAnswer.value = false;
      message.value = "Who is that pokemon?";
      won.value = false;
      answer.value = { id: 0, name: "" };
      getPokemons();
    };

    return {
      options,
      answer,
      showPokemon,
      showAnswer,
      message,
      won,
      checkAnswer,
      resetGame,
    };
}