<template>

  <div
    class="relative w-full h-[80vh] md:h-screen bg-cover bg-[url(@/assets/pokemon-game/background.png)] transform -translate-y-36"
  >
    <h1 v-if="!options">Loading please wait...</h1>

    <PokemonPicture
      v-else
      class="absolute left-28 top-64 md:left-56 md:top-56 xl:left-1/4 xl:top-1/3"
      :pokemon-id="answer.id"
      :show-pokemon="showPokemon"
    />

    <GameNotifications
      :message="message"
      :won="won"
      :show-answer="showAnswer"
      @reset-game="resetGame"
    />

  </div>
  <div class="-mt-36">
    <PokemonOptions
      :options="options"
      :disabled="showAnswer"
      @chosen-pokemon="checkAnswer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  PokemonPicture,
  PokemonOptions,
  GameNotifications,
} from "@components/pokemon-game";
import usePokemon from "@/composables/pokemon-game/usePokemon";

export default defineComponent({
  components: {
    PokemonPicture,
    PokemonOptions,
    GameNotifications,
  },
  name: "Pokemon",
  setup() {

    const {
      options,
      answer,
      showPokemon,
      showAnswer,
      message,
      won,
      checkAnswer,
      resetGame,
    } = usePokemon();

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
  },
});
</script>
