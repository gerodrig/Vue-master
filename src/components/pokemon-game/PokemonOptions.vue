<template>
    <div class="bg-black opacity-80">
        <div class="flex items-center mx-auto justify-center max-w-[800px]">
            <ul class="flex-wrap justify-center py-6 text-blue-700 list-none md:flex">
            <li
                v-for="{ name, id } in options"
                @click="$emit('chosenPokemon', id)"
                :class="{ 'opacity-50': disabled }"
                :style="{ 'pointer-events': disabled ? 'none' : 'auto' }"
                :aria-disabled="disabled"
                :key="id">{{
                name.toLocaleUpperCase()
                }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { Pokemon } from '@interfaces/pokemon-game/index';

export default defineComponent({
  name: 'PokemonOptions',
  props: {
    options: {
      type: Array as () => Pokemon[],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    
    const options = toRef(props, 'options');
    const disabled = toRef(props, 'disabled');

    //upercase first letter
    options.value.forEach((option) => {
      option.name = option.name[0].toUpperCase() + option.name.slice(1);
    });
    return {
      options,
      disabled,
    };
  },
});
</script>

<style scoped>
li {
  @apply bg-white rounded-md border border-gray-300 cursor-pointer mb-3 w-96 hover:bg-gray-100 text-center py-2 md:mr-3;
}
</style>
