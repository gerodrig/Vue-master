<script setup lang="ts">
import { toRef } from 'vue';
import { Character } from '../../interfaces/breakingbad/cast';
import { useRouter } from 'vue-router';


const props = defineProps<{character: Character}>();

const character = toRef(props, 'character');

const router = useRouter();

const navigateToCharacter = () => {
    router.push(`by/${character.value.id}`);
}

</script>

<template>
    <div class="flex flex-col items-center mx-2 mb-3 hover:cursor-pointer" @click="navigateToCharacter">
        <img :src="character.image.medium" :alt="character.name" class="w-64 rounded-md shadow-lg hover:shadow-md hover:shadow-slate-100 hover:transition-all hover:duration-500" />
        <h3 class="my-3 text-2xl">{{  character.name }}</h3>
    </div>
</template>

<style>
img {
    transition: all;
}
</style>