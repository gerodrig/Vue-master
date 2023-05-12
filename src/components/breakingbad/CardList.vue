<script setup lang="ts">
import CharacterCard from '@/components/breakingbad/CharacterCard.vue';
// import { useQuery } from '@tanstack/vue-query';
// import { breakingBadApi } from '@/api';

// import { useCharacters } from '@/composables/breakingbad/useCharacters';
import { Character } from '@/interfaces/breakingbad';

//? 1 - Using normal suspended component
// const { data: characters } = await breakingBadApi.get('/characters');
// const characters = ref(characters);

//? 2- Using composable function
// const { isLoading, characters, hasError, errorMessage } = useCharacters();

//? 3- Using Tanstack's useQuery
// const getCharactersSlow = async (): Promise<Character[]> => {
//     const { data } = await breakingBadApi.get<Cast[]>('/cast');

//     const characters = data.map(({character}) => character);

//     return characters;
// };

// const { isLoading, isError: hasError, data: characters, error: errorMessage} = useQuery(['characters'], getCharactersSlow);

const props = defineProps<{characters: Character[]}>();

</script>
<template>

    <div class="flex flex-row flex-wrap">
        <CharacterCard v-for="character of props.characters" :key="character.id" :character="character"/>
    </div>
</template>


<style scoped>

</style>