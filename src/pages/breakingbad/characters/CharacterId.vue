<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Loader from '@/components/shared/Loader.vue';
import usePerson from '@/composables/breakingbad/usePerson';

defineProps<{ title: string; visible: boolean }>();

const router = useRouter();
const route = useRoute();

const { id } = route.params as { id: string };

const {person, hasError, errorMessage, isLoading} = usePerson(id);

//watch for any errors and if component is not loading and push user to character page
watchEffect(() => {
    if (hasError.value && !isLoading.value) {
        router.replace('/breakingbad/characters');
    }
});
</script>


<template >
    <Loader :isLoading="isLoading" />
    <template v-if="hasError">
        <div class="flex flex-col items-center justify-center h-screen">
            <h1 class="text-4xl text-red-500">{{ errorMessage }}</h1>
        </div>
    </template>
    <template v-else-if="person">
        <div class="flex flex-row my-10">
            <img class="w-64 rounded-md shadow-lg hover:shadow-md hover:shadow-slate-100 hover:transition-all hover:duration-500" :src="person.image.medium" :alt="person.name" />
            <ul class="ml-20">
                <li class="my-3 text-2xl">Name: {{ person.name }}</li>
                <li class="my-3 text-2xl">Birthday: {{ person.birthday }}</li>
                <li class="my-3 text-2xl">Gender: {{ person.gender}}</li>
                <li class="my-3 text-2xl">Country: {{ person.country.name }}</li>
                <li class="my-3 text-2xl">Status: {{ person.deathday || 'Alive' }}</li>
            </ul>
        </div>
    </template>
</template>