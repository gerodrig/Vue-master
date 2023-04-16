
<template>
  <div :class="className">
    <img
      v-show="id != 0"
      :src="imgSrc"
      alt="`Pokemon ?`"
      :class="{ 'hidden-pokemon': !showPokemon, fadeIn: showPokemon }"
    />
    <!-- <button @click="toggleReveal">Toggle Hide</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue';
export default defineComponent({
  name: 'PokemonPicture',
  props: {
    pokemonId: {
      type: Number || undefined,
      required: true,
    },
    showPokemon: {
      type: Boolean,
      default: false,
    },
    defaultPath: {
      type: String,
      default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/',
    },
    class: {
      type: String,
      default: 'container flex flex-col justify-center my-10 h-52 debug',
    },
  },
  setup(props) {

    const showPokemon = toRef(props, 'showPokemon');
    const id = toRef(props, 'pokemonId');
    const className = toRef(props, 'class');

    const imgSrc = computed(() => {
      const validId =
        props.pokemonId >= 1 && props.pokemonId <= 649 ? props.pokemonId : 0;
      if (validId === 0) {
        return 'https://upload.wikimedia.org/wikipedia/commons/3/3b/MissingNo.svg';
      } else {
        return `${props.defaultPath}${validId}.svg`;
      }
    });

    

    return {
        id,
      showPokemon,
      imgSrc,
      className,
    };
  },
});
</script>

<style scoped>
.fadeIn {
  animation: fadeIn 0.6s;
}

.hidden-pokemon {
  filter: brightness(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* :style="{objectFit: 'cover', maxWidth: '100%', width: '100%'}" */

img {
object-fit: cover;
max-width: 100%;
width: 100%;
  height: 400px;
  right: 32%;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}

@media screen and (max-width: 768px) {
  img {
    height: 200px;
  }
    
}
</style>
